const {savelogsTOB} = require('../controller/user')

const date = new Date().toLocaleTimeString()

const logger = (req, res, next) => {
    const data = `\n API with endpoint: "${req.url}" and method "${req.method}" at this time: "${date}"`
    console.log(data)
    savelogsTOB(data)
    next();
}

module.exports = {logger}