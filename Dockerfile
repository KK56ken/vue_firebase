FROM node:14.8.0-alpine3.10

WORKDIR /app

RUN apk update && \
    npm install -g \
           @vue/cli \
           firebase-tools && \
    rm -rf /var/lib/apt/lists/*

CMD ["/bin/ash"]
