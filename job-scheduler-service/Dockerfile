FROM node:20.17.0
WORKDIR /app/job-scheduler-service
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 8081
CMD ["yarn", "run", "start:dev"]
