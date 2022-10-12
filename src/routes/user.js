import express from 'express';
import { auth, role } from '../middleware';
import controller from '../controllers/user';

const router = express.Router();


/**
 * @openapi
 * /api/users/index:
 *   get:
 *     name: User
 *     description: List all users!
 *     responses:
 *       200:
 *         description: Returns a list of users.
 */
router.get(
  "/index",
  controller.index
);

router.get(
  "/all",
  controller.allAccess
);

router.get(
  "/user",
  [auth.verifyToken],
  controller.userContent
);

router.get(
  "/moderator",
  [auth.verifyToken, role.isModerator],
  controller.moderatorContent
);

router.get(
  "/admin",
  [auth.verifyToken, role.isAdmin],
  controller.adminContent
);

module.exports = (app) => app.use('/api/users', router);