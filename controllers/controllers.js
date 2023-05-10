const {fetchTopics, fetchApiInfo} = require('../models/models')

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
    console.log('in controller')  
    res.status(200).send({endpoints})
    .catch((err) => {
        next(err);
      });
}

