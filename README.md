# system-handling-requests
## Test task

## Настройка окружения и запуск проекта
* Установить зависимости
  ```
  npm i
  ```

* Откорректировать .env файл

* Запустить базу данных
  ```
  docker-compose up -d
  ```

* Запустить автоматическую генерацию документацию API
  ```
  npm run swagger:generate
  ```

* Запустить проект
  ```
  npm run start

  или

  npm run dev

  чтобы запустить hotreload
  ```

* Также после запуска будет доступна документация API по адресу:
  ```
  http://localhost:3000/api-docs
  ```
