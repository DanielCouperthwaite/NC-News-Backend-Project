const express = require('express')
const app = express();

const {getTopics, getApiInfo, getArticleById, getComments, getAllArticles} = require('./controllers/controllers')


app.get('/api/topics', getTopics)

app.get('/api', getApiInfo)

app.get('/api/articles/:article_id', getArticleById)


app.get('/api/articles/:article_id/comments', getComments)

app.get('/api/articles', getAllArticles)


app.all('*', (req, res) => {
    res.status(404).send({ msg: 'Oh no! Please enter a valid url' })
});

app.use((err, req, res, next) => {
    if(err.code === '22P02'){
        res.status(400).send({msg: 'Oh no! Please enter a valid article ID!'})
    }
    next(err)
})

app.use((err, req, res, next) => {
    if(err.status && err.msg){
        res.status(err.status).send({msg: err.msg})
    }
})


module.exports = app;