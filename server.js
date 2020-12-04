const express = require('express');
const Stack = require('./stack');
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

app.use(express.json());

app.post('/lint', (req, res) => {
    const brackets = strip(req.body.code);
    Object.keys(pairs).includes(brackets);

    const stack = new Stack()
    res.send(stack)

});

app.listen(3000, () => {
    console.log('started on 3000');
});
