FROM --platform=linux/amd64 node:18 as builder

WORKDIR /app

COPY ./package.json .
RUN npm cache clean --force
RUN npm install
RUN npm run build
COPY . .

EXPOSE 3000

# CMD npm start
CMD ["npm" , "run" , "start"]
