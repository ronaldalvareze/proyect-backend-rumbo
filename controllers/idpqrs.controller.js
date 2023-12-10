const Pqrs = require ("../models/pqrs.model")


async function getPqrsById(req, res)  {
    const { id } = req.params

    try {
        const pqrs = await Pqrs.findById(id)

        if (!pqrs) {
            return res.status(404).send({ msg: "El pqrs no existe"})
        }

        res.status(200).send(pqrs)
    } catch (error) {
        res.status(500).send({success:false, msg: "Error en el servidor", error: error.message})
    }
}

module.exports = {
    getPqrsById,
}
