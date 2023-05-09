const express = require('express')
const app = express();
const {getTopics} = require('./controllers/controllers')

app.get('/api/topics', getTopics)

console.log('in app')

app.all('*', (req, res) => {
    res.status(404).send({ msg: 'Oh no! Please enter a valid url' })
});

app.use((err, req, res, next,) => {
    if(err.status && err.msg){
        res.status(err.status).send({msg: err.msg})
    }
})


module.exports = app;