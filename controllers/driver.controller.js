const Driver = require("../models/driver.model");
const Car = require("../models/car.model")
const image = require("../utils/image");

async function getDrivers(req, res) {
  const { active } = req.query;
  let response = null;

  if (active === undefined) {
    response = await Driver.find();
  } else {
    response = await Driver.find({ active });
  }

  res.status(200).send(response);
}

async function createDriver(req, res) {
    const carId  = req.body.idCar; // ID del automóvil relacionado

  const driver = new Driver({ ...req.body, active: false });


  /*if (req.files.avatar) {
    const imagePath = image.getFilePath(req.files.avatar);
    driver.avatar = imagePath;
  }*/

  if (carId) {
    try {
      const car = await Car.findById(carId);
      
      if (!car) {
        return res.status(404).send({ msg: "El automóvil no existe" });
      }
      driver.car = car;
    } catch (error) {
      return res.status(500).send({ msg: "Error al encontrar el automóvil" });
    }
  }

  driver.save((error, driverStored) => {
    if (error) {
      res.status(400).send({ msg: error.message });
    } else {
      // Verificar si el ObjectId del carro se ha agregado
      const carAdded = driverStored.car ? driverStored.car.toString() : "No se ha asignado un carro";
      res.status(201).send({ driverStored, carAdded });
    }
  });
}

async function updateDriver(req, res) {
  const { id } = req.params;
  const driverData = req.body;


  if (req.files.avatar) {
    const imagePath = image.getFilePath(req.files.avatar);
    driverData.avatar = imagePath;
  }

  if (driverData.idCar) {
    driverData.car = driverData.idCar
    delete driverData.idCar
  }

  Driver.findByIdAndUpdate({ _id: id }, driverData, (error) => {
    if (error) {
      res.status(400).send({ msg: "Ha habido un error al actualizar" });
    } else {
      res
        .status(200)
        .send({ msg: "Los datos del conductor han sido actualizados" });
    }
  });
}

async function deleteDriver(req, res) {
  const { id } = req.params;

  try {
    // Buscar y eliminar el conductor por su ID
    const driver = await Driver.findByIdAndDelete(id);

    if (!driver) {
      return res.status(404).send({ msg: "El conductor no existe" });
    }

    // Verificar si el conductor tiene un automóvil asociado
    if (driver.car) {
      // Buscar y eliminar el automóvil por su ID
      await Car.findByIdAndDelete(driver.car);
    }

    // Responder con éxito
    res.status(200).send({ msg: "Conductor y automóvil eliminados correctamente" });

  } catch (error) {
    // Manejar errores durante la operación
    res.status(500).send({ msg: "Error al eliminar el conductor y el automóvil" });
  }
}
module.exports = {
  getDrivers,
  createDriver,
  updateDriver,
  deleteDriver,
};
