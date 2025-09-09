FROM node:20-alpine

WORKDIR /app

# Install deps first (leverage Docker layer caching)
COPY server/package*.json ./
RUN npm ci --omit=dev

# Copy application source
COPY server ./

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["npm", "start"]


