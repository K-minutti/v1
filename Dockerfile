# Stage 1: Build the static site
FROM node:22-bookworm-slim AS build

# Install system dependencies required by Playwright's browsers
RUN apt-get update && apt-get install -y --no-install-recommends \
    libx11-xcb1 \
    libxrandr2 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxfixes3 \
    libxi6 \
    libgtk-3-0 \
    libatk1.0-0 \
    libasound2 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libcairo2 \
    libgdk-pixbuf-2.0-0 \
    libgbm1 \
    libnss3 \
    libxss1 \
    libxtst6 \
    libdrm2 \
    libdbus-1-3 \
    libatspi2.0-0 \
    fonts-noto-color-emoji \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Install only Chromium (the only browser needed for mermaid rendering)
RUN npx playwright install chromium

COPY . .
RUN npx vocs build

# Stage 2: Serve with nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

# Digital Ocean App Platform expects the app to listen on port 8080
RUN sed -i 's/listen\s*80;/listen 8080;/' /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
