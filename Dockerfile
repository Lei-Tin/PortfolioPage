FROM ruby:3.2-slim

RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /site

COPY Gemfile Gemfile.lock ./

RUN gem install bundler --no-document && bundle install --jobs 4 --retry 3

COPY . .

EXPOSE 4000

CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--watch", "--force_polling", "--livereload"]

