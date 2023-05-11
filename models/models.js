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

exports.fetchAllArticles = () => {
    return connection.query(`
    SELECT articles.author, articles.title, articles.article_id, articles.topic, 
    articles.created_at, articles.votes, articles.article_img_url, 
    COUNT(*)::INT as comment_count FROM articles 
    JOIN comments ON comments.article_id = articles.article_id 
    GROUP BY articles.article_id 
    ORDER BY articles.created_at DESC;`
    ).then((result) => {
        return result.rows;
    })
} 