import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.use(express.json());

app.use('/api', require('./api'));

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello, Express!');
})

app.listen('8000', () => {
    console.log('Server is now listening to port 8080')
})