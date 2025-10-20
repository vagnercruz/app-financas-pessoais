import { Router } from "express";
import { registrar, login } from "../controllers/auth.controller";

const router = Router();

/**
 * @route POST /auth/registrar
 * @desc Registra um novo usuário
 */
router.post("/registrar", registrar);

/**
 * @route POST /auth/login
 * @desc Realiza login e retorna token JWT
 */
router.post("/login", login);

export default router;
