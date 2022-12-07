const express = require('express')
const router = express.Router({ mergeParams: true });
const db = require('../db')

router.get('/', async function(req, res) {
    let id = req.params.id;
    let postlist = {};
    await db.query(`SELECT * FROM posts where id = $1`, [id])
        .then(rows => {
            postlist = rows.rows[0]
        })
        .catch(error => {
            console.log(error)
        })
    res.render('postDetails.ejs', {list: postlist})
})

router.get('/edit', async function(req, res) {
    let id = req.params.id;
    let postlist = {};
    await db.query(`SELECT * FROM posts where id = $1`, [id])
        .then(rows => {
            postlist = rows.rows[0]
        })
        .catch(error => {
            console.log(error)
        })
    res.render('postEdit.ejs', {post: postlist})
})

router.post('/edit', async function(req, res) {
    let id = req.params.id;
    let {title, text} = req.body;
    text = text.replaceAll('\r\n', '<br/>')
    await db.query(`UPDATE posts set title = $1, text = $2 where id = $3`, [title, text, id])
        .catch(error => {
            console.log(error)
        })
    res.redirect('/post/'+id)
});

router.post('/delete', async function(req, res) {
    let id = req.params.id;
    await db.query(`DELETE FROM posts where id = $1`, [id])
        .catch(error => {
            console.log(error)
        })
    res.redirect('/')
});

module.exports = router;
