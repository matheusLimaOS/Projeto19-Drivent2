import { prisma } from "@/config";
import { insertPaymentData } from "@/protocols";
import { Payment, Ticket, TicketType } from "@prisma/client";

async function insert(payment:Payment) {
    return prisma.payment.create({
        data:payment
    })
}

async function findPaymentByTicketId(ticketId:number) {
    return prisma.payment.findFirst({
        where:{
            ticketId:ticketId
        }
    })
}

const paymentRepository = {
    insert,
    findPaymentByTicketId
};

export default paymentRepository;
