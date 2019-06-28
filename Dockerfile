FROM node:8.11.3 as builder

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json

RUN npm install
#RUN npm install react-scripts@1.1.1 -g --silent
COPY . /usr/src/app
RUN npm run build

# production environment
FROM nginx:1.15.0-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

ADD .stack/default.conf /etc/nginx/conf.d/default.conf

ENV BACKEND_API_HOST "0.0.0.0:300"
RUN sed -i -e "s,BACKEND_API_HOST,$BACKEND_API_HOST,g" /usr/share/nginx/html/static/js/main*

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]