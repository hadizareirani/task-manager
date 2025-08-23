FROM node:18-alpine AS development

WORKDIR /usr/src/task-manage

COPY package*.json ./

RUN npm ci --only=development

COPY . .

RUN npm run build

FROM node:18-alpine AS production


WORKDIR /usr/src/task-manage

COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force

COPY --from=development /usr/src/task-manage/dist ./dist

RUN addgroup -g 1001 -S nodejs
RUN adduser -S taskmanage -u 1001

RUN chown -R taskmanage:nodejs /usr/src/task-manage
USER taskmanage


HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["node", "dist/main"]