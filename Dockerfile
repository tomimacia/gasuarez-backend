FROM ghcr.io/puppeteer/puppeteer:23.2.1
ENV PUPPPETEER_SKIP_CRHOMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["node","index.js"]