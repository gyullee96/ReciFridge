FROM node:20.18.1-alpine

WORKDIR /app
COPY package*.json /app/
RUN \
    npm install @rollup/rollup-darwin-arm64 \
    npm install @rollup/rollup-linux-arm64-musl \
    npm install ci \
    npm ci --force
COPY . /app
EXPOSE 5173
CMD ["npm", "run", "dev"]

# docker build -t recifridge-app:1.0.0-01 .
# docker run --name reci-app -d -p 5173:5173 recifridge-app:1.0.0-01