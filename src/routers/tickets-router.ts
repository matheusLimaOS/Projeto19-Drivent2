import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { ticketsTypes,insertTicket, findTicketsByUser } from "@/controllers/tickets-controller";

const ticketsRouter = Router();

ticketsRouter
.all("/*", authenticateToken)
.get("/types",ticketsTypes)
.post("/",insertTicket)
.get("/",findTicketsByUser)
export { ticketsRouter };
