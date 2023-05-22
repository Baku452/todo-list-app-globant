FROM node:18-alpine

WORKDIR /todo-list-app

EXPOSE 3000

COPY package.json ./

RUN yarn install --silent

COPY . ./

CMD ["npm", "run", "dev"]