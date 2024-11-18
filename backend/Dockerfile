FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3030

CMD ["sh", "-c", "npm run build && npm run start"]
