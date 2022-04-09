const Joi = require('joi');

const AgencyAndClient = require('../../controllers/agency_and_client');

const router = [
    {
        path: '/create-agency-client',
        method: 'post',
        options:{
            handler: AgencyAndClient.createAgencyAndClient,
            description: 'Agency and client creation',
            tags: ['api','agency-client'],
            validate:{
                payload: Joi.object({
                    agencyName: Joi.string().required(),
                    address1: Joi.string().required(),
                    address2: Joi.string().allow(''),
                    state: Joi.string().required(),
                    city: Joi.string().required(),
                    agencyPh: Joi.number().required(),
                    clientName: Joi.string().required(),
                    clientEmail: Joi.string().required(),
                    clientPh: Joi.number().required(),
                    totalBill: Joi.number().required()
                })
            }
        }
    },
    {
        path: '/client-create-update',
        method: 'post',
        options:{
            handler: AgencyAndClient.createUpdateClient,
            description: 'Create or update client',
            tags: ['api','agency-client'],
            auth: false,
            validate:{
                payload: Joi.object({
                    clientName: Joi.string().required(),
                    clientEmail: Joi.string().required(),
                    clientPh: Joi.number().required(),
                    totalBill: Joi.number().required(),
                    id: Joi.string().allow(''),
                    agency: Joi.string().required()
                })
            }
        }
    }
]

module.exports = router;