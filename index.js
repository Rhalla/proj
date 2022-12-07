const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static('./public'));
const db = require('./db')

app.use(express.json())
app.use(express.urlencoded())

app.set('view-engine', 'ejs');
const postsRouter = require('./routes/posts')
const postDetailsRouter = require('./routes/postDetails')

app.use("/", postsRouter)
app.use("/post/:id", postDetailsRouter)

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

