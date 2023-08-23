FROM node:alpine
WORKDIR /ha-uploaddocs-frontend
COPY package.json ./
RUN npm install
COPY . .
CMD [ "npm", "start" ]
