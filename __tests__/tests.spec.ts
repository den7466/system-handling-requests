import { test, expect } from '@playwright/test';
import shell from 'shelljs';
import 'dotenv/config';

test.describe('#1 Проверка на уязвимость пакетов', () => {
  test('#1.1 Аудит пакетов', () => {
    const result = shell.exec('npm audit', { silent: true });
    expect(result.code).toEqual(0);
  });
});

test.describe('#2 Проверка ендпоинтов', () => {
  test.afterEach(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
  });

  test('#2.1 Выгрузить все записи', async ({ request }) => {
    const response = await request.get(`${process.env.API_URL}/handling/`);
    const data = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(data.data.length > 0).toBeTruthy();
  });

  test('#2.2 Выгрузить все записи за определенныю дату', async ({ request }) => {
    const response = await request.get(`${process.env.API_URL}/handling/?date=2025-05-14`);
    const data = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(data.data.length > 0).toBeTruthy();
  });

  test('#2.3 Выгрузить все записи в диапазоне дат', async ({ request }) => {
    const response = await request.get(`${process.env.API_URL}/handling/?startDate=2025-05-14&endDate=2025-05-14`);
    const data = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(data.data.length > 0).toBeTruthy();
  });

  test('#2.4 Выгрузить все записи с определенной даты', async ({ request }) => {
    const response = await request.get(`${process.env.API_URL}/handling/?startDate=2025-05-14`);
    const data = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(data.data.length > 0).toBeTruthy();
  });

  test('#2.5 Выгрузить все записи до определенной даты', async ({ request }) => {
    const response = await request.get(`${process.env.API_URL}/handling/?endDate=2025-05-14`);
    const data = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(data.data.length > 0).toBeTruthy();
  });

  test('#2.6 Создать новую запись', async ({ request }) => {
    const mockData = {
      title: 'Test title',
      text: 'Test text',
    };
    const response = await request.post(`${process.env.API_URL}/handling`, {
      data: mockData,
    });
    const data = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(data.data).toMatchObject(mockData);
    expect(data.data).toMatchObject({ status: 'new' });
  });

  test('#2.7 Взять обращение в работу', async ({ request }) => {
    const response = await request.get(`${process.env.API_URL}/handling/work/6825d26e6f3f9fa8b59aab54`);
    const data = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(data.data).toMatchObject({ status: 'work' });
  });

  test('#2.8 Завершить обращение', async ({ request }) => {
    const mockData = {
      resolution: 'Test resolution',
    };
    const response = await request.patch(`${process.env.API_URL}/handling/completed/6825d26e6f3f9fa8b59aab54`, {
      data: mockData,
    });
    const data = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(data.data).toMatchObject(mockData);
    expect(data.data).toMatchObject({ status: 'completed' });
  });

  test('#2.9 Отменить обращение', async ({ request }) => {
    const mockData = {
      reasonCancellation: 'Test reason сancellation',
    };
    const response = await request.patch(`${process.env.API_URL}/handling/canceled/6825d26e6f3f9fa8b59aab54`, {
      data: mockData,
    });
    const data = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(data.data).toMatchObject(mockData);
    expect(data.data).toMatchObject({ status: 'canceled' });
  });

  test('#2.10 Отменить все обращения в работе', async ({ request }) => {
    const mockData = {
      reasonCancellation: 'Test reason сancellation',
    };
    const response = await request.patch(`${process.env.API_URL}/handling/canceled/`, {
      data: mockData,
    });
    expect(response.ok()).toBeTruthy();
  });
});
