import express from "express";
import {checkNotAuth} from "../utils/auth.js";
import {loginAction, loginIndexAction, logoutAction, registerAction, registerIndexAction} from "../controllers/authController.js";

const router = express.Router();

router.delete('/logout', logoutAction);
router.get('/login', checkNotAuth, loginIndexAction);
router.post('/login', checkNotAuth, loginAction);
router.get('/register', checkNotAuth, registerIndexAction);
router.post('/register', checkNotAuth, registerAction);

export default router;