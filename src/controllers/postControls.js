const { Raza, Temperamento } = require("../db");

const createRaza = async (nombre, peso_min, peso_max, altura_min,altura_max, años_de_vida, imagen) => {
  const newRaza = await Raza.create({
    imagen: imagen || undefined,
    nombre: nombre,
    peso_min:`${peso_min.trim()} Kg`,
    peso_max:`${peso_max.trim()} Kg`,
    altura_min:`${altura_min.trim()} cm`,
    altura_max:`${altura_max.trim()} cm`,
    años_de_vida:`${años_de_vida} años`
  });

  return newRaza;
};

const addTem = async (temperamento) =>
  await Temperamento.create({
    nombre: temperamento,
  });

module.exports = {
  createRaza,
  addTem,
};
