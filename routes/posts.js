const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/', async function(req, res) {
    let postlist = [];
    await db.query(`SELECT * FROM posts`)
        .then(rows => {
            postlist = rows.rows
        })
        .catch(error => {
            console.log(error)
        })
    res.render('home.ejs', {list: postlist})
})

router.get('/new', async function(req, res) {
    res.render('newPost.ejs', )
})

router.post('/new', async function(req, res) {
    let {title, text} = req.body;
    text = text.replaceAll('\r\n', '<br/>')
    await db.query(`INSERT INTO posts (title, text) values ($1, $2)`, [title, text])
        .catch(error => {
            console.log(error)
        })
    res.redirect('/')
})

module.exports = router;
