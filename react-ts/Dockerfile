# Stage 1: Build stage
FROM node:22.17.0-alpine AS builder

WORKDIR /app

# Копіюємо package.json та lock-файли
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо весь проєкт
COPY . .

# Збираємо продакшн-білд
RUN npm run build


# Stage 2: Final image for runtime
FROM node:22.17.0-alpine

WORKDIR /app

# Ставимо сервер для static serving (наприклад serve)
RUN npm install -g serve

# Копіюємо білд із першого етапу
COPY --from=builder /app/dist ./dist

# Стандартний порт Vite-білду
EXPOSE 3000

# Запуск статичного сервіса
CMD ["serve", "-s", "dist", "-l", "3000"]