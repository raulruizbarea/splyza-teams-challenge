FROM node:16.13.2-alpine as builder

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build --configuration=production

FROM nginx:1.21.6 as production
## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /app/dist/splyza-teams-challenge/ /usr/share/nginx/html
## Copy our nginx config
COPY ./nginx.conf /etc/nginx/nginx.conf
## Expose 80
EXPOSE 80