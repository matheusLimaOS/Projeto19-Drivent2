import { Payment } from "@prisma/client";
import paymentRepository from "@/repositories/payment-repository";
import { insertPaymentData } from "@/protocols";
import ticketsRepository from "@/repositories/tickets-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";

async function insertPayment(userId:number,payment:insertPaymentData) {
    const ticket = await ticketsRepository.findTicketById(payment.ticketId);

    if(ticket===null){
        return {status:false,erro:404};
    }
    
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

    if(enrollment === null){
        return {status:false,erro:401};
    }

    else if(enrollment.id !== ticket.enrollmentId){
        return {status:false,erro:401};
    }

    let pay:Payment = {
        id:undefined,
        ticketId:payment.ticketId,
        value: ticket.TicketType.price,
        cardIssuer: payment.cardData.issuer,
        cardLastDigits: payment.cardData.number.toString().slice(-4),
        createdAt:undefined,
        updatedAt:undefined
    }

    const insert = paymentRepository.insert(pay)

    return {
        status:true,
        data:insert
    }
}

async function getPayment(userId:number,ticketId:number) {
    const ticket = await ticketsRepository.findTicketById(ticketId);
    
    if(ticket===null){
        return {status:false,erro:404};
    }
    
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

    if(enrollment === null){
        return {status:false,erro:401};
    }

    else if(enrollment.id !== ticket.enrollmentId){
        return {status:false,erro:401};
    }

    const payment = await paymentRepository.findPaymentByTicketId(ticketId);
    const pay = await ticketsRepository.payTicket(payment.ticketId);
    
    return {
        status:true,
        data:payment
    }

}

const paymentService = {
    insertPayment,
    getPayment
};
  
export default paymentService;
  