# Linter Lab

- dependencies
  - express
- dev dependencies
  - supertest
  - jest
  - nodemon

In this lab you'll be creating a web API that receives a block of code
and responds with a linting status.

We are only going to check that all brackets match.

- `{` and `}`
- `[` and `]`
- `(` and `)`

## Stack

A stack is a First In Last Out (FILO) data structure. When you:

- `push` to a stack it puts an item on the top of the stack
- `pop` from a stack it removes the top item on the stack

## Linting Steps

1. strip away everything but the brackets
2. iterate through all the brackets

- if we see an opening bracket push to the stack
- if we see a closing bracket pop from the stack and compare

We're going to use a stack to check all brackets.

### Example One

```js
function add(a, b) {
  return a + b;
}
```

If we striped away everything except the brackets we would have: `(){}`.
Whenever we come across an opening bracket we are going to push to a stack.
Whenever we come across a closing bracket we are going to pop:

1. To begin our stack is empty [] (denoting a stack as an array where the last item is the top of the stack)
1. first we see a `(`. It's an opening bracket so we push to the stack ['(']
1. next we see a `)`. It's a closing bracket so we pop and compare. When we pop we
   get back a `(` which is the opener to the closing bracket we are analyzing. []
1. next we see a `{`. It's an opening bracket so we push to the stack ['{']
1. finally we see a `}`. It's a closing bracket so we pop and compare. When we pop
   we get back a `{` which is the opener to the closing bracket we are analyzing. []

### Example Two

```js
function getFirstInArray(arr) {
  const first = arr[0];
  return first;
}
```

1. strip away everything except the brackets: `(){[]}`
1. we see a `(` so we push ['(']
1. we see a `)` so we pop and compare: `(` and `)` match. our stack is empty now []
1. we see a `{`. so we push ['{']
1. we see a `[`. so we push ['{', '[']
1. we see a `]`. so we pop and compare: `[` and `]` match. our stack is now ['{']
1. we see a `}`. so we pop and compare: `{` and `}` match. our stack is now empty []

### Example Three

```js
function getSecondInArray(arr)) {
  const second = arr[1];
  return second;
}
```

1. strip away everything except the brackets `()){[]}`
1. we see a `(` so we push ['(']
1. we see a `)` so we pop and compare: `(` and `)` match. our stack is empty now []
1. we see a `)` so we pop and compare: `undefined` (because the stack is empty) and `)` **fail**.

### Example Four

```js
function getSecondInArray(arr) {
  const second = arr[1;
  return second;
}
```

1. strip away everything except the brackets: `(){[}`
1. we see a `(` so we push ['(']
1. we see a `)` so we pop and compare: `(` and `)` match. our stack is empty now []
1. we see a `{`. so we push ['{']
1. we see a `[`. so we push ['{', '[']
1. we see a `}`. so we pop and compare: `[` and `}` **fail**.

## Endpoints

- Post `/lint`:

Request:

```json
{
  "code": "const add = (a, b) => { return a + b };"
}
```

Response:

```json
{
  "success": true
}
```

or

```json
{
  "error": "missing `{`"
}
```

## Rubric

- Stack implementation 5 points
- Stack usage 5 points
