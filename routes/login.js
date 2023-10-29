import express from "express";
import {loginIndex, loginLog} from "../controllers/loginController.js"

const router = express.Router();

router.get('/', loginIndex);
router.post('/', loginLog);

export default router;