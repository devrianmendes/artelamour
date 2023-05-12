import express from 'express';
import router from './routes';
import cors from 'cors'
import dotenv from 'dotenv';

const server = express();

server.use(express.json())
server.use(cors());
server.use(router);
dotenv.config();

// console.log(__dirname + '/../tmp')
server.use('/images', express.static(__dirname + '/../tmp'));

const port = 3333;

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
});