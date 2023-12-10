const Pqrs = require("../models/pqrs.model");
const Car = require("../models/car.model");
const Driver = require("../models/driver.model");

async function getPqrs(req, res) {
  const { active } = req.query;
  let response = null;

  if (active === undefined) {
    response = await Pqrs.find();
  } else {
    response = await Pqrs.find({ active });
  }

  res.status(200).send(response);
}

async function createPqrs(req, res) {
  const { placaVehicular, ...pqrsData } = req.body;

  try {
    /*if (!placaVehicular) {
      const availableCars = await Driver.find()
    return res.status(400).send({ msg: "La placaVehicular es requerida"+ availableCars});
    }*/

    // Buscar el conductor por la placa del vehículo
    const car = await Car.findOne({ placa: placaVehicular });

    if (!car) {
      /*const availableCars = await Car.find()*/
      return res
        .status(404)
        .send({
          msg: " No se encontro conductor con esta placa " /*, availableCars*/,
        });
    }

    const driver = await Driver.findOne({ car: car.id });

    const pqrs = new Pqrs({
      ...pqrsData,
      car: car._id,
      driver: driver.id,
      active: false,
    });

    const savedPqrs = await pqrs.save();

    res.status(201).send({ success: true, data: savedPqrs });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({
        success: false,
        msg: "Error en el servidor",
        error: error.message,
      });
  }
}

module.exports = {
  getPqrs,
  createPqrs,
};
