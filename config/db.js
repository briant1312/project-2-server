
const mongooseBaseName = 'recipe-tracker'


const database = {
    development: `mongodb://localhost/${mongooseBaseName}-develompent`, 
    test: `mongodb://localhost/${mongooseBaseName}-test`
}

const localDb = process.env.TESTENV ? database.test : database.development

const currentDb = process.env.DB_URI || localDb

module.exports = currentDb