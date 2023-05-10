const express = require('express')
const app = express();
const {getTopics, getApiInfo} = require('./controllers/controllers')

app.get('/api/topics', getTopics)

app.get('/api', getApiInfo)

app.all('*', (req, res) => {
    res.status(404).send({ msg: 'Oh no! Please enter a valid url' })
});

app.use((err, req, res, next,) => {
    if(err.status && err.msg){
        res.status(err.status).send({msg: err.msg})
    }
})


module.exports = app;