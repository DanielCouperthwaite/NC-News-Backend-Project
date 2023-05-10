const express = require('express')
const app = express();
const {getTopics, getApiInfo, getArticleById} = require('./controllers/controllers')

app.get('/api/topics', getTopics)

app.get('/api', getApiInfo)

app.get('/api/articles/:article_id', getArticleById)

app.all('*', (req, res) => {
    res.status(404).send({ msg: 'Oh no! Please enter a valid url' })
});

app.use((err, req, res, next) => {
    if(err.code === '22P02'){
        res.status(404).send({msg: 'Oh no! Please enter a valid article ID!'})
    }
    next(err)
})

app.use((err, req, res, next) => {
    if(err.status && err.msg){
        res.status(err.status).send({msg: err.msg})
    }
})


module.exports = app;