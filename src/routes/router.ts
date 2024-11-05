import { Router } from "express";
import authRouter from "@routes/authRoutes";
import userRouter from "@routes/userRoutes";
import potholeRouter from "@routes/potholeRoutes";
import potholeImageRouter from "./potholeImageRoutes";
import reportRouter from "./reportRoutes";

const router: Router = Router();

router.get("/healthcheck", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is healthy." });
});

router.use(authRouter);
router.use(userRouter);
router.use(potholeRouter);
router.use(potholeImageRouter);
router.use(reportRouter);

export default router;
