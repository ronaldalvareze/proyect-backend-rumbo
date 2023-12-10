const Newsletter = require ("../models/newsletter.model")
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/


function suscribeEmail(req, res) {
    const { email } = req.body

    if (!email)
    return res.status(400).send({msg: "Email obligatorio"})
   

    const newsletter = new Newsletter({
        email: email.toLowerCase(),
    })

    newsletter.save((error) => {
        if (error) {
            res.status(400).send({msg: " El email ya esta registrado"})
        } else {
            res.status(200).send ({msg: "Email registrado con exito"})
        }
    })
}


function getEmails(req, res) {
    const { page = 1, limit = 10} = req.query

    const options = {
        paqe: parseInt(page),
        limit: parseInt(limit),
    }

    Newsletter.paginate({}, options, (error, emailStored) => {
        if (error) {
            res.status(400).send({msg: "Error al obtener los email"})
        } else {
            res.status(200).send(emailStored)
        }
    })
}

function deleteEmail(req, res) {
    const { id } = req.params

    Newsletter.findByIdAndDelete(id, (error) => {
        if (error) {
            res.status(400).send({msg: "Error al elininar el registro"})
        } else {
            res.status(200).send({ msg: "Elininacion correcta"})
        }
    })
}

module.exports = {
    suscribeEmail,
    getEmails,
    deleteEmail,
}