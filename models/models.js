const connection = require('../db/connection')
const { checkIfExists } = require('../db/seeds/utils')

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


exports.fetchComments = (articleId) => {
    return checkIfExists(articleId).then(() => {
        return connection.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`, [articleId])
        .then((result) => {
            return result.rows
    })
    
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

exports.insertComment = (newComment, articleId) => {
    const {author, body} = newComment;
    return connection
        .query(
            `INSERT INTO comments 
            (author, body, article_id)
            VALUES 
            ($1, $2, $3) 
            RETURNING *;`,
            [author, body, articleId]
        )
        .then(({ rows }) => (rows[0]))
}

exports.alterArticle = (numberVotes, articleId) => {
    return connection
    .query(
        `UPDATE articles
        SET votes = votes + $1
        WHERE article_id = $2
        RETURNING *;`,
        [numberVotes, articleId]
    )
    .then(({rows}) => {
        if(rows.length === 0){
            return Promise.reject({status: 404, msg: "Article not found"});
        }
        return rows[0]
    })
}

