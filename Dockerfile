FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV NEXT_PUBLIC_PORT=3000

CMD ["npm", "run", "start"]