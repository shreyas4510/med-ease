FROM node:20.17.0
WORKDIR /app/user-service
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 8080
CMD ["yarn", "run", "start:dev"]
