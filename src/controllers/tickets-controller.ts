import { Request, Response } from "express";
import httpStatus from "http-status";
import ticketsService from "@/services/tickets-service";
import { AuthenticatedRequest } from "@/middlewares";

export async function ticketsTypes(req: Request, res: Response) {
    try {
        const ticketType = await ticketsService.getTypes();
        return res.status(httpStatus.OK).send(ticketType);
    } catch (error) {
        return res.status(httpStatus.NOT_FOUND).send({});
    }
}

export async function findTicketsByUser(req: AuthenticatedRequest, res: Response) {
    try {
        const { userId } = req;
        const tickets = await ticketsService.findTicketsByUser(userId);

        if(!tickets){
            return res.status(httpStatus.NOT_FOUND).send({});
        }

        return res.status(httpStatus.OK).send(tickets);
    } catch (error) {
        return res.status(httpStatus.NOT_FOUND).send({});
    }
}

export async function insertTicket(req: AuthenticatedRequest, res: Response) {
    try {
        const { ticketTypeId } = req.body;
        const { userId } = req;

        const ticket = await ticketsService.insertTicket(Number(ticketTypeId),userId);

        if(!ticket){
            return res.status(httpStatus.NOT_FOUND).send({});
        }

        return res.status(httpStatus.OK).send(ticket);
    } catch (error) {
        console.log(error);
        return res.status(httpStatus.NOT_FOUND).send({});
    }
}
