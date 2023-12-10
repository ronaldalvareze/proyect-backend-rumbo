const Car = require("../models/car.model");
const image = require("../utils/image");

async function getCars(req, res) {
  const { active } = req.query;
  let response = null;

  if (active === undefined) {
    response = await Car.find();
  } else {
    response = await Car.find({ active });
  }

  res.status(200).send(response);
}

async function createCar(req, res) {

  const car = new Car({ ...req.body, active: false })
  

  car.save((error, carStored) => {
    if (error) {
      
      res.status(400).send({ msg: "Error al crear el formato vehiculo!" });
    } else {
      res.status(201).send(carStored);
    }
  });
}

async function updateCar(req, res) {
  const { id } = req.params;
  const carData = req.body;


  Car.findByIdAndUpdate({ _id: id }, carData, (error) => {
    if (error) {
      res.status(400).send({ msg: "Se generado un error al actualizar" });
    } else {
      res
        .status(200)
        .send({ msg: "Los datos del formato han sido actualizados" });
    }
  });
}

async function deleteCar(req, res) {
  const { id } = req.params;

  Car.findByIdAndDelete(id, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al eliminar el formato" });
    } else {
      res.status(200).send({ msg: "Formato Eliminado" });
    }
  });
}

module.exports = {
  getCars,
  createCar,
  updateCar,
  deleteCar,
};
