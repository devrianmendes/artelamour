FROM node:16.20-alpine3.18

WORKDIR /usr/app/artelamour

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 5000

CMD ["npm", "run", "up"]