import Joi from "joi";

export const insertTicketSchema = Joi.object({
    TicketTypeId: Joi.number().required()
});
