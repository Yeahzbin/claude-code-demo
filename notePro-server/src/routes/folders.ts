import { Router } from 'express';
import {
  getFolders,
  createFolder,
  updateFolder,
  deleteFolder,
} from '../controllers/foldersController';
import { auth } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(auth);

router.get('/', getFolders);
router.post('/', createFolder);
router.put('/:id', updateFolder);
router.delete('/:id', deleteFolder);

export default router;
