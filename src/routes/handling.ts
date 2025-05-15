import { Router } from 'express';
import {
  canceledAllHandlingAtWork,
  canceledHandling,
  completedHandling,
  createHandling,
  getHandlingListByDate,
  workHandling,
} from '../controllers/handling';
import { validateCanceledHandling, validateCompletedHandling, validateCreateHandling } from '../middlewares/validations';

const router = Router();

router.get('/', getHandlingListByDate);
router.post('/', validateCreateHandling, createHandling);
router.get('/work/:id', workHandling);
router.patch('/completed/:id', validateCompletedHandling, completedHandling);
router.patch('/canceled/', validateCanceledHandling, canceledAllHandlingAtWork);
router.patch('/canceled/:id', validateCanceledHandling, canceledHandling);

export default router;
