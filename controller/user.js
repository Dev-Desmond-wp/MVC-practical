const database = require('../model/database.json');
const fs = require('fs')
// console.log(database)

const getoneUser = (req, res) => {
    const id = Number(req.params.id)
    const user = database.find((el) => el.id === id)

    if(user == null){
        return res.status(404).json({message: "User not found"})
    }

    res.status(200).json({data: user})
}

const savetoDatabase = (data) => {
    return new Promise((res, req) => {
        fs.writeFile('./model/logger.json', data, (error) => {
            if(error) {
                req('Error writting to file');
            } else {
                res('File written successfully');
            }
        });
    });
}

const savelogsTOB = (data) => {
    return new Promise((res, req) => {
        fs.appendFile('./middleware/logger.txt', data, (error) => {
            if(error) {
                req('Error writting to file');
            } else {
                res('File written successfully');
            }
        });
    });
}

const allUsers = (req, res)=> {
    const users = database;
    res.status(200).json({data: users})
}

const newUser = async (req, res)=> {
    const name = req.body.name;
    const gender = req.body.gender;
    const id = database.length + 1
    const user = {
        id: id,
        name: name,
        gender: gender,
    }
   
    database.push(user)
    await savetoDatabase(JSON.stringify(database, null, 2))

    res.status(201).json({
        message: 'User created successfully',
        data: user
    })
}


const updateUser = async (req, res) =>{
    const id = Number(req.params.id);
    const user = database.find((el) => el.id === id);

    const name = req.body.name;
    const gender = req.body.gender;

    user.name = name || user.name;
    user.gender = gender || user.gender;

    await savetoDatabase(JSON.stringify(database, null, 2));

    res.status(200).json({
        message: 'User updated successfully',
        data: database
    });
}

const deleteoneUser = async (req, res) => {
    const id = Number(req.params.id);

    const indexUser = database.findIndex((el) => el.id === id);

    if (indexUser === -1) {
        return res.status(404).json({
            message: 'User not found'
        });
    }

    database.splice(indexUser, 1);

    await savetoDatabase(JSON.stringify(database, null, 2));

    res.status(200).json({
        message: 'User deleted successfully',
        data: database
    });
};

module.exports = {
    getoneUser ,
    allUsers,
    newUser,
    deleteoneUser,
    updateUser,
    savelogsTOB
}