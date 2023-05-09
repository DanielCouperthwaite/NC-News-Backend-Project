const connection = require('../db/connection')

exports.fetchTopics = () => {
    console.log('in model')
    return connection.query('SELECT * FROM topics;').then((result) => {    
        return result.rows;
    }).catch
}