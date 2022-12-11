const express = require('express');
const bodyParser = require('body-parser');
const list = require('./Router/listRouter');

const PORT = 3003;
const app = express();

app.use(bodyParser.json());
app.use('/list',list);

app.listen(PORT, () => {
    console.log(`app is listening on ${PORT}`)
});