FROM ruby:2.4.2

ENV LANG C.UTF-8
ENV ROOT_PATH /qrnote

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev

RUN curl -sL https://deb.nodesource.com/setup_9.x | bash - && \
    apt-get install nodejs

RUN apt-get update && apt-get install -y curl apt-transport-https wget && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn

RUN mkdir $ROOT_PATH
WORKDIR $ROOT_PATH

ADD Gemfile $ROOT_PATH/Gemfile
ADD Gemfile.lock $ROOT_PATH/Gemfile.lock
RUN gem update bundler
RUN bundle instal

ADD . $ROOT_PATH
