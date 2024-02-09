FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV NEXT_PUBLIC_PORT=3000
ENV NEXT_PUBLIC_API_URL=ec2-18-234-156-213.compute-1.amazonaws.com

CMD ["npm", "run", "start"]