import express from 'express';
import router from './routes';
import cors from 'cors'
import dotenv from 'dotenv';

const server = express();

server.use(express.json())
server.use(cors());
dotenv.config();
server.use(router);

// console.log(__dirname + '/../tmp')
server.use('/images', express.static(__dirname + '/../tmp'));

server.get("/ping", (req, res) => {
  return res.json({ message: "pong" });
});

const port = 5000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
});