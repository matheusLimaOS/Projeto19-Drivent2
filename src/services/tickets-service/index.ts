import { TicketType, Ticket } from "@prisma/client";
import ticketsRepository from "@/repositories/tickets-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";

async function getTypes(): Promise<TicketType[]> {
    const ticketsTypes = await ticketsRepository.findTicketsTypes();
    return ticketsTypes;
}

async function findTicketsByUser(userId:number):Promise<Ticket[] | boolean> {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

    if(enrollment===null){
        return false;
    }

    const ticket = await ticketsRepository.findTicketByUser(enrollment.id);

    if(ticket.length===0){
        return false;
    }

    return ticket;
}

async function insertTicket(ticketTypeId:number,userId:number):Promise<Ticket | boolean> {
    const ticketsTypes = await ticketsRepository.findTicketTypeById(ticketTypeId);
    console.log(ticketsTypes);
    if(!ticketsTypes){
        return false;
    }
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    const insertTicket = await ticketsRepository.insertTicket(ticketTypeId,enrollment.id);

    const ticket = await ticketsRepository.findTicketById(insertTicket.id);
    return ticket;
}

const ticketsService = {
    getTypes,
    insertTicket,
    findTicketsByUser
};
  
export default ticketsService;
  