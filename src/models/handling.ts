import mongoose from 'mongoose';
import Joi from 'joi';
import { IHandling } from '../types/types';

const handlingSchema = new mongoose.Schema<IHandling>({
  createDate: {
    type: Date,
    required: true,
  },
  updateDate: {
    type: Date,
  },
  completionDate: {
    type: Date,
  },
  title: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  text: {
    type: String,
  },
  resolution: {
    type: String,
  },
  reasonCancellation: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
});

export const createHandlingValidateSchema = Joi.object<IHandling>({
  title: Joi.string()
    .min(2)
    .max(30)
    .required()
    .messages({
      'string.base': 'Заголовок должен быть текстом',
      'string.empty': 'Заголовок не может быть пустым',
      'string.min': 'Заголовок должен быть длиной не менее {#limit} символов',
      'string.max': 'Заголовок не может превышать {#limit} символов',
      'any.required': 'Заголовок обязателен',
    }),
  text: Joi.string()
    .messages({
      'string.base': 'Описание должно быть текстом',
    }),
});

export const completedHandlingValidateSchema = Joi.object<IHandling>({
  resolution: Joi.string()
    .required()
    .messages({
      'string.base': 'Резолюция должна быть текстом',
    }),
});

export const canceledHandlingValidateSchema = Joi.object<IHandling>({
  reasonCancellation: Joi.string()
    .required()
    .messages({
      'string.base': 'Причина отмены должна быть текстом',
    }),
});

export default mongoose.model<IHandling>('handling', handlingSchema);
