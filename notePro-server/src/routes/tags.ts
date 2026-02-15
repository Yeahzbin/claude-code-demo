import { Router } from 'express';
import {
  getTags,
  createTag,
  deleteTag,
} from '../controllers/tagsController';
import { auth } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(auth);

router.get('/', getTags);
router.post('/', createTag);
router.delete('/:id', deleteTag);

export default router;
