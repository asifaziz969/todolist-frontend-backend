const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    var my = "ihdfdsuf";
    res.render('list', { today: my });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
