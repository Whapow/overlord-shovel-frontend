FROM node:9

ARG UID
RUN useradd -ms /bin/bash --uid $UID --non-unique frontend

ENV APP /usr/src/app
RUN mkdir $APP
WORKDIR $APP

COPY package.json yarn.lock $APP/
RUN yarn

COPY . $APP/

CMD ["yarn", "run", "dev"]