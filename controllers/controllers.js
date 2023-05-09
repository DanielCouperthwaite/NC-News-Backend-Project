const {fetchTopics} = require('../models/models')

exports.getTopics = (req, res) => {
    console.log('in controller')
    fetchTopics().then((topics) => {    
        res.status(200).send({topics})
    })
    .catch((err) => {
        next(err);
      });
}

