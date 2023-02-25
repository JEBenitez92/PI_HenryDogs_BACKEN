const {
  getAllDogs,
  serchDog,
  getTempDog,
  serchDogId,
} = require("../controllers/dogControls");

const getDogsHandlers = async (req, res) => {
  const { nombre } = req.query;
  try {
    const dogs = nombre ? await serchDog(nombre) : await getAllDogs();
   return res.status(200).json(dogs);
  } catch (error) {
   return res.status(400).json({ error: error.message });
  }
};

const getDogsHandlersId = async (req, res) => {
  const { id } = req.params;
  try {
    const dog = await serchDogId(id);
    res.status(200).json(dog);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getTempDogHandlers = async (req, res) => {
  try {
    res.status(200).json(await getTempDog());
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getDogsHandlers,
  getTempDogHandlers,
  getDogsHandlersId,
};
