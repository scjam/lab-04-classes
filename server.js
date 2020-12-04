const express = require('express');
const app = express();

const strip = code => {
    const results = /\(|\)|\{|\}|\[|\]/g;
    return code.match(results);
};

const pairs = {
    '[': ']',
    '{': '}',
    '(': ')'
}
const openers = Object.keys(pairs);

app.use(express.json());

app.post('/lint', (req, res) => {
    const brackets = strip(req.body.code);


});

app.listen(3000, () => {
    console.log('started on 3000');
});
