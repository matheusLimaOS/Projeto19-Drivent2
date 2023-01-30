import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getPayment, insertPayment } from "@/controllers";
import { insertPaymentSchema } from "@/schemas";
import { validateBody } from "@/middlewares";

const paymentsRouter = Router();

paymentsRouter
.all("/*", authenticateToken)
.get("/",getPayment)
.post("/process",validateBody(insertPaymentSchema),insertPayment)
export { paymentsRouter };
