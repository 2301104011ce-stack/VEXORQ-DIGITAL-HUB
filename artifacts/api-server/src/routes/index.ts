import { Router, type IRouter } from "express";
import healthRouter from "./health";
import queriesRouter from "./queries";

const router: IRouter = Router();

router.use(healthRouter);
router.use(queriesRouter);

export default router;
