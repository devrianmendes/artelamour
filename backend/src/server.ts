import express from 'express';
import router from './routes';
import cors from 'cors'

const server = express();

server.use(express.json())
server.use(cors());
server.use(router);

const port = 7070;

server.listen(7070, () => {
  console.log(`Server running on port ${port}`)
});