import { prisma } from "@/config";
import { Prisma, Ticket, TicketType } from "@prisma/client";

async function findTicketsTypes():Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function findTicketTypeById(TicketTypeId:number):Promise<TicketType> {
  return prisma.ticketType.findUnique({
    where:{
      id:TicketTypeId
    },
  }
  );
}

async function findTicketById(ticketId:number):Promise<Ticket> {
  return prisma.ticket.findUnique({
    where:{
      id:ticketId
    },
    include:{
      TicketType:true
    }
  }
  );
}

async function findTicketByUser(enrollmentId:number):Promise<Ticket[]> {
  return prisma.ticket.findMany({
    where:{
      enrollmentId:enrollmentId
    },
    include:{
      TicketType:true
    }
  }
  );
}

async function insertTicket (ticketTypeId:number,enrollmentId:number):Promise<Ticket> {
  return prisma.ticket.create({
    data:{
      ticketTypeId:ticketTypeId,
      enrollmentId:enrollmentId,
      status:"RESERVED",
    }
  }
  );
}
const ticketsRepository = {
  findTicketsTypes,
  findTicketTypeById,
  insertTicket,
  findTicketById,
  findTicketByUser
};

export default ticketsRepository;
