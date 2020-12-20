FROM node:v12.18.x
WORKDIR /apps
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]