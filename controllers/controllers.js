
const {fetchTopics, fetchArticle, fetchComments, fetchAllArticles, insertComment, alterArticle} = require('../models/models')


const endpoints = require('../endpoints.json')

exports.getTopics = (req, res, next) => {
    fetchTopics().then((topics) => {    
        res.status(200).send({topics})
    })
    .catch((err) => {
        next(err);
      });
}

exports.getApiInfo = (req, res, next) => {
    res.status(200).send({endpoints})
    .catch((err) => {
        next(err);
      });
}

exports.getArticleById = (req, res, next) => {
    const id = req.params.article_id
    fetchArticle(id).then((article) => {
        res.status(200).send({article})
    })
    .catch((err) => {
        next(err)
    })
}


exports.getComments = (req, res, next) => {
    const articleId = req.params.article_id
    fetchComments(articleId).then((comments) => {
        res.status(200).send({comments})
    })
  .catch((err) => {
        next(err);
      });
}

exports.getAllArticles = (req, res, next) => {
    fetchAllArticles().then((articles) => {
        res.status(200).send({articles})
    })
    .catch((err) => {
        next(err)
    })
}

exports.postComment = (req, res, next) => {
    const articleId = req.params.article_id
    insertComment(req.body, articleId)
    .then((comment) =>{
        res.status(201).send({ comment })
    })
    .catch((err) => {
        next(err)
    })
}

exports.patchArticle = (req, res, next) => {
    const articleId = req.params.article_id
    alterArticle(req.body.inc_votes, articleId)
    .then((article) => {
        res.status(201).send({ article })
    })
    .catch((err) => {
        next(err)
    })
}
