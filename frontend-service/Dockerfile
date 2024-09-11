FROM node:20.17.0
WORKDIR /app/frontend-service
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]
