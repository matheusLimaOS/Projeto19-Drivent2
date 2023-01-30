import { prisma } from "@/config";
import { TicketWithTicketType } from "@/protocols";
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

async function payTicket(ticketId:number) {
  return prisma.ticket.update({
    data:{
      status:"PAID"
    },
    where:{
      id:ticketId
    }
  })
}

async function findTicketById(ticketId:number):Promise<(Ticket & { TicketType: TicketType; })> {
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

async function findTicketByUser(enrollmentId:number):Promise<(Ticket & { TicketType: TicketType; })[]> {
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
  findTicketByUser,
  payTicket
};

export default ticketsRepository;
