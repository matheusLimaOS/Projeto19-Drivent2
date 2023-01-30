import { SignInParams } from "@/services";
import Joi from "joi";

export const insertPaymentSchema = Joi.object({
    ticketId: Joi.number().required(),
    cardData: Joi.object ({
        issuer: Joi.string().required(),
        number: Joi.string().required(),
        name: Joi.string().required(),
        expirationDate: Joi.string().isoDate().required(),
        cvv: Joi.number().required()
    }).required()
});
