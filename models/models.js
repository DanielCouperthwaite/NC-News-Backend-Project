const connection = require('../db/connection')
const fs = require('fs/promises')
// const endpoints = require('../endpoints.json')

exports.fetchTopics = () => {
    console.log('in model')
    return connection.query('SELECT * FROM topics;').then((result) => {    
        return result.rows;
    })
}

// exports.fetchApiInfo = () => {
//     console.log('in model')
//     return fs.readFile(endpoints).then((result) => {    
//         return result;
//     })
// }