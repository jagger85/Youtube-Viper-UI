# Build stage
FROM node:20-alpine as builder
WORKDIR /app
COPY speecher-ui/package*.json ./
RUN npm install
COPY speecher-ui/ ./
COPY speecher-ui/.env.production ./.env
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Configure nginx with debug logging
RUN printf 'events {\n\
    worker_connections 1024;\n\
    }\n\
    \n\
    http {\n\
    include /etc/nginx/mime.types;\n\
    default_type application/octet-stream;\n\
    access_log /dev/stdout combined;\n\
    error_log /dev/stdout debug;\n\
    \n\
    server {\n\
    listen 80;\n\
    \n\
    location / {\n\
    root /usr/share/nginx/html;\n\
    try_files $uri $uri/ /index.html;\n\
    add_header Cache-Control "no-cache";\n\
    }\n\
    \n\
    location /api/ {\n\
    proxy_pass http://web:8000/;\n\
    proxy_set_header Host $host;\n\
    proxy_set_header X-Real-IP $remote_addr;\n\
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n\
    proxy_set_header X-Forwarded-Proto $scheme;\n\
    proxy_read_timeout 300s;\n\
    proxy_connect_timeout 75s;\n\
    proxy_redirect off;\n\
    proxy_buffering off;\n\
    proxy_set_header Connection "";\n\
    proxy_http_version 1.1;\n\
    \n\
    # Debug headers\n\
    add_header X-Debug-Message "Proxying to backend" always;\n\
    add_header X-Proxy-Pass $proxy_host always;\n\
    add_header X-Original-URI $request_uri always;\n\
    }\n\
    \n\
    location /socket.io/ {\n\
    proxy_pass http://web:8000;\n\
    proxy_http_version 1.1;\n\
    proxy_set_header Upgrade $http_upgrade;\n\
    proxy_set_header Connection "upgrade";\n\
    proxy_set_header Host $host;\n\
    proxy_cache_bypass $http_upgrade;\n\
    proxy_read_timeout 300s;\n\
    proxy_connect_timeout 75s;\n\
    }\n\
    }\n\
    }\n' > /etc/nginx/nginx.conf

EXPOSE 80 