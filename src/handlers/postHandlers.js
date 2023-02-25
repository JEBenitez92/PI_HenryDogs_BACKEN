const { createRaza, addTem } = require("../controllers/postControls");
const { Temperamento } = require("../db");

const createRazeHandler = async (req, res) => {
  const {
    nombre,
    peso_min,
    peso_max,
    altura_min,
    altura_max,
    años_de_vida,
    imagen,
    temperamento,
  } = req.body;

  const newRaza = await createRaza(
    nombre,
    peso_min,
    peso_max,
    altura_min,
    altura_max,
    años_de_vida,
    imagen
  );

  const temperamentoBd = await Temperamento.findOne({
    where: {
      nombre: temperamento,
    },
  });
  const addtemp = await addTem(temperamento);

  temperamentoBd
    ? newRaza.addTemperamentos(temperamentoBd)
    : newRaza.addTemperamentos(addtemp);

  try {
    res.status(201).json(newRaza);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createRazeHandler,
};
