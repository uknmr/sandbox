FROM node:latest

# Create node-server directory
WORKDIR /usr/src/app/node-server

# Bundle node-server source
COPY ./node-server /usr/src/app/node-server
RUN yarn

EXPOSE 8080
CMD ["yarn", "start"]