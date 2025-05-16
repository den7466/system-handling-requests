import { Request, Response, NextFunction } from 'express';
import InternalServerError from '../errors/internal-server-error';
import Handling from '../models/handling';
import NotFoundError from '../errors/not-found-error';
import BadRequestError from '../errors/bad-request-error';
import { IHandling } from '../types/types';

// Получить список обращений с возможность фильтрации по конкретной дате и по диапазону дат
export const getHandlingListByDate = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  // eslint-disable-next-line max-len
  // #swagger.description = 'Получить список обращений с возможность фильтрации по конкретной дате и по диапазону дат'
  try {
    const { date, startDate, endDate } = req.query;
    let result: IHandling[] | [] = [];
    const preparedDate = new Date(date?.toString() || '');
    const preparedTomorrow = new Date(date?.toString() || '');
    preparedTomorrow.setDate(preparedTomorrow.getDate() + 1);
    const preparedStartDate = new Date(startDate?.toString() || '');
    const preparedEndDate = new Date(endDate?.toString() || '');
    preparedEndDate.setDate(preparedEndDate.getDate() + 1);

    if (!(date && startDate && endDate) || !(date && startDate) || !(date && endDate)) {
      result = await Handling.find({});
    }

    if ((date && startDate && endDate) || (date && startDate) || (date && endDate)) {
      return next(new NotFoundError('Данные не найдены'));
    }

    if (date) {
      result = await Handling.find(
        {
          $and: [
            { createDate: { $gte: preparedDate } },
            { createDate: { $lte: preparedTomorrow } },
          ],
        },
      );
    }

    if (startDate && endDate) {
      result = await Handling.find(
        {
          $and: [
            { createDate: { $gte: preparedStartDate } },
            { createDate: { $lte: preparedEndDate } },
          ],
        },
      );
    }

    if (startDate) {
      result = await Handling.find(
        { createDate: { $gte: preparedStartDate } },
      );
    }

    if (endDate) {
      result = await Handling.find(
        { createDate: { $lte: preparedEndDate } },
      );
    }

    return res.status(200).send({
      info: 'Список обращений', data: result, total: result?.length,
    });
  } catch (error) {
    return next(
      new InternalServerError(`Внутренняя ошибка сервера, error: ${error}`),
    );
  }
};

// Создать обращение
export const createHandling = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  // #swagger.description = 'Создать обращение'
  try {
    if (!req.body) {
      return next(
        new BadRequestError('Ошибка запроса'),
      );
    }
    const { title, text } = req.body;
    const nowDate = new Date();

    const createResult = await Handling.create({
      createDate: nowDate,
      title,
      text,
      status: 'new',
    });

    return res.status(201).send({ info: 'Обращение создано', data: createResult });
  } catch (error) {
    return next(
      new InternalServerError(`Внутренняя ошибка сервера, error: ${error}`),
    );
  }
};

// Взять обращение в работу
export const workHandling = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  // #swagger.description = 'Взять обращение в работу'
  try {
    const { id } = req.params;
    const nowDate = new Date();
    const handling = await Handling.findOne({ _id: id });
    if (!handling) {
      return next(new NotFoundError('Данные не найдены'));
    }

    const resultUpdateHandling = await Handling.findOneAndUpdate(
      { _id: id },
      {
        updateDate: nowDate,
        status: 'work',
      },
      { new: true },
    );

    if (!resultUpdateHandling) {
      return next(new InternalServerError('Внутренняя ошибка сервера'));
    }

    return res.status(200).send({ info: 'Обращение взято в работу', data: resultUpdateHandling });
  } catch (error) {
    return next(
      new InternalServerError(`Внутренняя ошибка сервера, error: ${error}`),
    );
  }
};

// Завершить обработку обращения
export const completedHandling = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  // #swagger.description = 'Завершить обработку обращения'
  try {
    const { id } = req.params;
    if (!req.body) {
      return next(
        new BadRequestError('Ошибка запроса'),
      );
    }
    const { resolution } = req.body;
    const nowDate = new Date();
    const handling = await Handling.findOne({ _id: id });
    if (!handling) {
      return next(new NotFoundError('Данные не найдены'));
    }

    const resultUpdateHandling = await Handling.findOneAndUpdate(
      { _id: id },
      {
        updateDate: nowDate,
        completionDate: nowDate,
        status: 'completed',
        resolution,
      },
      { new: true },
    );

    if (!resultUpdateHandling) {
      return next(new InternalServerError('Внутренняя ошибка сервера'));
    }

    return res.status(200).send({ info: 'Обращение завершено', data: resultUpdateHandling });
  } catch (error) {
    return next(
      new InternalServerError(`Внутренняя ошибка сервера, error: ${error}`),
    );
  }
};

// Отменить обращение
export const canceledHandling = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  // #swagger.description = 'Отменить обращение'
  try {
    const { id } = req.params;
    if (!req.body) {
      return next(
        new BadRequestError('Ошибка запроса'),
      );
    }
    const { reasonCancellation } = req.body;
    const nowDate = new Date();
    const handling = await Handling.findOne({ _id: id });
    if (!handling) {
      return next(new NotFoundError('Данные не найдены'));
    }

    const resultUpdateHandling = await Handling.findOneAndUpdate(
      { _id: id },
      {
        updateDate: nowDate,
        status: 'canceled',
        reasonCancellation,
      },
      { new: true },
    );

    if (!resultUpdateHandling) {
      return next(new InternalServerError('Внутренняя ошибка сервера'));
    }

    return res.status(200).send({ info: 'Обращение отменено', data: resultUpdateHandling });
  } catch (error) {
    return next(
      new InternalServerError(`Внутренняя ошибка сервера, error: ${error}`),
    );
  }
};

// endpoint который отменит все обращения, которые находятся в статусе "в работе"
export const canceledAllHandlingAtWork = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  // eslint-disable-next-line max-len
  // #swagger.description = 'endpoint который отменяет все обращения, которые находятся в статусе в работе'
  try {
    if (!req.body) {
      return next(
        new BadRequestError('Ошибка запроса'),
      );
    }
    const { reasonCancellation } = req.body;
    const nowDate = new Date();

    const resultUpdateHandling = await Handling.updateMany(
      { status: 'work' },
      { status: 'canceled', reasonCancellation, updateDate: nowDate },
    );

    if (!resultUpdateHandling) {
      return next(new InternalServerError('Внутренняя ошибка сервера'));
    }

    return res.status(200).send({ info: 'Отменены все обращения со статусом "в работе"', data: resultUpdateHandling });
  } catch (error) {
    return next(
      new InternalServerError(`Внутренняя ошибка сервера, error: ${error}`),
    );
  }
};
