import express from 'express';
import * as postController from '../controllers/post.controller';

const router = express.Router();

router.get('/feed', postController.getPostsFeed); // Переміщено вище
router.post('/', postController.createPost);
router.put('/:id/views', postController.updatePostViews);
router.put('/publish/:id', postController.publishPost);
router.delete('/:id', postController.deletePost);
router.get('/:id', postController.getPostById);
router.get('/:id/drafts', postController.getDraftsByUserId);

export default router;
