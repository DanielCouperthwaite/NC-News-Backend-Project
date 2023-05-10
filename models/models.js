const connection = require('../db/connection')

exports.fetchTopics = () => {
    return connection.query('SELECT * FROM topics;').then((result) => {    
        return result.rows;
    })
}

exports.fetchArticle = (id) => {
    
    return connection.query(`SELECT * FROM articles WHERE article_id = $1;`, [id]).then((result) => {
        if(result.rows.length === 0){
            return Promise.reject({status: 400, msg: "Oh no! Please enter a valid article ID!"});
        }
        return result.rows[0];
    })
}