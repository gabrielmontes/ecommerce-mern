# Build:
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
COPY . .
RUN yarn && yarn build

# Deploy:
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html/
EXPOSE 3000
ENTRYPOINT ["nginx", "-g", "daemon off;"]