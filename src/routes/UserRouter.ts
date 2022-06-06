import { Router } from "express";
import UserController from "../controllers/UserController";
import { body } from "express-validator/check";

const router: Router = Router();

router.post(
  "/",
  [
    body("email").isEmail(),
    body("email").notEmpty(),
    body("password").isLength({ min: 6 }),
    body("password").notEmpty(),
    body("name").notEmpty(),
    body("phone").notEmpty(),
  ],
  UserController.createUser
);
router.post(
  "/signin",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  UserController.signInUser
);
router.put("/:userId", UserController.updateUser);
router.get("/:userId", UserController.findUserById);
router.delete("/:userId", UserController.deleteUser);

export default router;
