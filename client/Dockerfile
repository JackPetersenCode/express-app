FROM node:20
WORKDIR /app/client/
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
CMD ["npm", "run", "start"]