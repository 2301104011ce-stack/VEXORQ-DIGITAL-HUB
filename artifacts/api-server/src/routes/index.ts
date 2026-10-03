import { Router, type IRouter } from "express";
import healthRouter from "./health";
import queriesRouter from "./queries";
import uploadRouter from "./upload";

const router: IRouter = Router();

router.use(healthRouter);
router.use(queriesRouter);
router.use(uploadRouter);

export default router;
