import { celebrate, Segments } from 'celebrate';
import {
  canceledHandlingValidateSchema,
  completedHandlingValidateSchema,
  createHandlingValidateSchema,
} from '../models/handling';

export const validateCreateHandling = celebrate({
  [Segments.BODY]: createHandlingValidateSchema,
});

export const validateCompletedHandling = celebrate({
  [Segments.BODY]: completedHandlingValidateSchema,
});

export const validateCanceledHandling = celebrate({
  [Segments.BODY]: canceledHandlingValidateSchema,
});
