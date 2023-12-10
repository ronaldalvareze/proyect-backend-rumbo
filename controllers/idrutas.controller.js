const Rutas = require ("../models/rutas.model")


async function getRutaById(req, res)  {
    const { id } = req.params

    try {
        const ruta = await Rutas.findById(id)

        if (!ruta) {
            return res.status(404).send({ msg: "La ruta no existe"})
        }

        res.status(200).send(ruta)
    } catch (error) {
        res.status(500).send({success:false, msg: "Error en el servidor", error: error.message})
    }
}

module.exports = {
    getRutaById,
}
