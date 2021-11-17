FROM node:14-slim

RUN mkdir -p /app
WORKDIR /app

COPY . ./

ENV NODE_ENV=production

# Install server libraries
RUN npm install

# Install client libraries
RUN npm run client-install

# Build React app
RUN npm run build

EXPOSE 8080
CMD ["node", "app.js"]