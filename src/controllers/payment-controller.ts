import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest, validateBody } from "@/middlewares";
import paymentService from "@/services/payment-service";

export async function insertPayment(req: AuthenticatedRequest, res: Response) {
    try {
        const payment = req.body;
        const { userId } = req

        const insert = await paymentService.insertPayment(userId,payment);

        if(!insert.status){
            if(insert.erro === 404){
                console.log(insert);

                return res.status(httpStatus.NOT_FOUND).send({});
            }
            else if(insert.erro === 401){
                return res.status(httpStatus.UNAUTHORIZED).send({})
            }
        }

        return res.status(httpStatus.OK).send(insert.data);
    } catch (error) {
        console.log(error);
        return res.status(httpStatus.NOT_FOUND).send({});
    }
}

export async function getPayment(req: AuthenticatedRequest, res: Response) {
    try {
        const { ticketId } = req.query;
        const { userId } = req

        if(ticketId===undefined || ticketId === ''){
            return res.status(httpStatus.BAD_REQUEST).send({});
        }

        const select = await paymentService.getPayment(userId,Number(ticketId));

        if(!select.status){
            if(select.erro === 404){
                console.log(select);

                return res.status(httpStatus.NOT_FOUND).send({});
            }
            else if(select.erro === 400){
                return res.status(httpStatus.BAD_REQUEST).send({})
            }
        }

        return res.status(httpStatus.OK).send(select.data);
    } catch (error) {
        return res.status(httpStatus.NOT_FOUND).send({});
    }
}