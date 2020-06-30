import express from 'express'
const app = express();

app.get('/hello', (_request, _response) => {    
    _response.send('Hello Full Stack!')
});

app.get('/bmi/')

const PORT = 3003

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});