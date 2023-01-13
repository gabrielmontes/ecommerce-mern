FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# RUN npm ci --only=production
RUN npm install 
RUN npm install pm2 -g

# Bundle app source
COPY . .

CMD ["pm2-runtime", "--format","server.js"]