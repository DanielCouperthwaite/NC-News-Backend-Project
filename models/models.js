const connection = require('../db/connection')

exports.fetchTopics = () => {
    return connection.query('SELECT * FROM topics;').then((result) => {    
        return result.rows;
    })
}

exports.fetchArticle = (id) => {
    
    return connection.query(`SELECT * FROM articles WHERE article_id = $1;`, [id]).then((result) => {
        if(result.rows.length === 0){
            return Promise.reject({status: 404, msg: "Oh no! Please enter a valid article ID!"});
        }
        return result.rows[0];
    })
}

exports.fetchComments = (id) => {

    return connection.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`, [id]).then((result) => {
        if(result.rows.length === 0){
            return Promise.reject({status: 404, msg: "Oh no! Please enter a valid article ID!"});
        }
        return result.rows
    })

}