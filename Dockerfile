#* ✈️ Production 
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json .

RUN npm install --only=production

RUN npm install -g @nestjs/cli

COPY . .

RUN npm run build

EXPOSE 5555

CMD [ "npm", "run", "start:prod" ]