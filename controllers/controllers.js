const {fetchTopics, fetchArticle} = require('../models/models')

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

