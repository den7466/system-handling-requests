import { Router } from 'express';
import handlingRouter from './handling';
import apiDocsRouter from './api-docs';
import otherPages from '../controllers/other';

const router = Router();

router.use('/handling', handlingRouter);
router.use('/api-docs', apiDocsRouter);

router.use('{*any}', otherPages);

export default router;
