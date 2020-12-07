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
    let prove = {"success": true};

    brackets.map(bracket => {
        const peek = stack.peek();
        console.log(bracket)
        if(Object.keys(pairs).includes(bracket)) {
            stack.push(bracket)
        } else {
            for(const [key, value] of Object.entries(brackets)) {
                if(bracket === key && peek !== value) {
                    prove = {
                        "error": `missing ${value}`
                    };
                } else if(bracket === key && peek === value) {
                    stack.pop()
                }
            }
        } 
    })

    res.send(prove)

});

app.listen(3000, () => {
    console.log('started on 3000');
});
