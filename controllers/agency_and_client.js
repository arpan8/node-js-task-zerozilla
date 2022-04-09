const Agency = require('../model/agency');
const Client = require('../model/client');
const {success, error} = require('../response/macros');

module.exports = {
    createAgencyAndClient,
    createUpdateClient
}

async function createAgencyAndClient(req, res){
    try {

        const { agencyName, address1, address2, state, city, agencyPh, clientName, clientEmail, clientPh, totalBill} = req.payload;
        
        const { _id } = req.user; 

        if(await Agency.findOne({name: agencyName}).exec()){
            return error({},'Agency with this name already present', 500)(res)
        }

        if(await Client.findOne({name: clientName}).exec()){
            return error({},'Client with this name already present', 500)(res)
        }

        let agencyJson={
            name: agencyName,
            address1,
            address2,
            state,
            city,
            ph_no: agencyPh,
            user: _id
        }

        let clientJson = {
            name: clientName,
            email: clientEmail,
            ph_no: clientPh,
            total_bill: totalBill
        }

        const createAgency = await new Agency(agencyJson).save();

        clientJson.agency = createAgency._id;

        const createClient = await new Client(clientJson).save();

        return success({agency: createAgency, client: createClient}, 'Agency and client created')(res);

    } catch (error) {
        console.log(error)
    }
}

async function createUpdateClient(req, res){
    try {
        const { clientName, clientEmail, clientPh, totalBill, id, agency } = req.payload; 

        let clientJson = {
            name: clientName,
            email: clientEmail,
            ph_no: clientPh,
            total_bill: totalBill,
            agency
        }

        let createClient = null, updateClient = null

        if(id){
            updateClient = await Client.findByIdAndUpdate({_id: id},clientJson,{new: true})
        }else{
            createClient = await new Client(clientJson).save()
        }

        let msg = updateClient ? 'Client updated successfully' : 'Client created successfully';

        return success({client: updateClient ? updateClient: createClient}, msg)(res);


    } catch (error) {
        console.log(error)
    }
}




