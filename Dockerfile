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

# Stage 2: Serve with nginx (non-root)
FROM nginx:stable-alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Add custom config that listens on 8080 (Digital Ocean App Platform default)
COPY <<'EOF' /etc/nginx/conf.d/default.conf
server {
    listen 8080;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ $uri.html /index.html;
    }
}
EOF

COPY --from=build /app/dist /usr/share/nginx/html

# Run as non-root for security
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chown -R nginx:nginx /var/cache/nginx \
    && chown -R nginx:nginx /var/log/nginx \
    && touch /var/run/nginx.pid \
    && chown nginx:nginx /var/run/nginx.pid

USER nginx

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
