const Rutas = require("../models/rutas.model");
const Car = require("../models/car.model");
const Driver = require("../models/driver.model")

const ITEMS_PER_PAGE = 100;

async function getRutas(req, res) {
  const { active, lastId, page = 1 } = req.query;
  let response = null;

  const query = active === undefined ? {} : { active };

  // Si se proporciona el ID del último documento, utiliza la paginación basada en él
  if (lastId) {
    query._id = { $gt: lastId };
  }

  try {
    const rutasQuery = Rutas.find(query)
      .sort({ _id: 1 })  // Ordena por ID ascendente para garantizar coherencia en la paginación
      .limit(ITEMS_PER_PAGE);

    if (page > 1) {
      const skip = (page - 1) * ITEMS_PER_PAGE;
      rutasQuery.skip(skip);
    }

    response = await rutasQuery.exec();
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ msg: "Error en el servidor", error: error.message });
  }
}


async function createRutasConductor(req, res) {
  const { placaDespacho, ...rutasData } = req.body;

  try {
    if (!placaDespacho) {
      return res.status(400).send({ msg: "La placaVehicular es requerida" });
    }

    // Buscar el conductor por la placa del vehículo
    const car = await Car.findOne({ placa: placaDespacho  });

    if (!car) {
      return res
        .status(404)
        .send({ msg: " No se encontro conductor con esta placa " });
    }

    const driver = await Driver.findOne({car: car.id});

    if (!driver) {
      return res.status(404).send({ msg: "No se encontró conductor asociado con este coche" });
    }

    const ruta = new Rutas({ ...rutasData, car: car._id,driver:driver.id, active: false });

  
    const savedRutas = await ruta.save();


    res.status(201).send({ success: true, data: savedRutas })


  } catch (error) {
    
    res.status(500)
.send({
        success: false,
        msg: "Error en el servidor",
        error: error.message,
      });
  }
}

async function updateRutas(req, res) {
  const { id } = req.params;
  const rutasData = req.body;


  try {
    const updateRutas = await Rutas.findById(id)

    if (!updateRutas){
    return res.status(404).send ({msg:"La ruta no existe"})
  }

  rutasData.placaDespacho = updateRutas.placaDespacho
  
  const updatedRutas = await Rutas.findByIdAndUpdate(id, rutasData, { new: true })

  if (!updateRutas) {
    return res.status(404).send({ msg: "La ruta no existe" });
  }

  res.status(200).send({msg:"Los datos en la ruta han sido   actualizados", data: updateRutas})
  }catch (error) {
  res.status(400).send({msg: "Ha habido un error al actualizar", error: error.message})   
  }
}

async function deletedRutas(req, res) {
  const { id } = req.params;

  try {
    // Obtén la ruta existente para obtener la placaDespacho
    const rutaExistente = await Rutas.findById(id);

    if (!rutaExistente) {
      return res.status(404).send({ msg: "La ruta no existe" });
    }

    // Realiza la eliminación
    const deletedRutas = await Rutas.findByIdAndDelete(id);

    if (!deletedRutas) {
      return res.status(400).send({ msg: "La ruta no existe" });
    }


    res.status(200).send({ msg: "Ruta eliminada correctamente", data: deletedRutas });
  } catch (error) {
    res.status(500).send({ msg: "Error al eliminar la ruta", error: error.message });
  }
}




module.exports = {
  getRutas,
  createRutasConductor,
  updateRutas,
  deletedRutas,
};
