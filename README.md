# system-handling-requests
## Тестовое задание - система работы с обращениями
#### Стек: TypeScript, NodeJS, ExpressJS, MongoDB, Docker, Swagger, Playwright

## Настройка окружения и запуск проекта
### 1 - Установить зависимости
  `npm i`

### 2 - Откорректировать .env файл

### 3 - Запустить базу данных
  `docker-compose up -d`

### 4 - Запустить автоматическую генерацию документацию API
  `npm run swagger:generate`

### 5 - Запустить проект
  `npm run start`

### или
  `npm run dev`

### чтобы запустить hotreload

### 6 - Также после запуска будет доступна документация API по адресу:
  `http://localhost:3000/api-docs`
