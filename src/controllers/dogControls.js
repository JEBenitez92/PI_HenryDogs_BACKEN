const { Temperamento } = require("../db");
const { unificarBasesId, temperamentosApi, unificarBasesRutaPrincipal } = require("./auxiliar");

const getTempDog = async () => {
  const arrTemp = await temperamentosApi();
  arrTemp.forEach(async (tem) => {
    return await Temperamento.create({
      nombre: tem,
    });
  });
  return arrTemp;
};

const serchDog = async (nombre) => {
  const result = await unificarBasesId();
  const buscar = nombre.toLowerCase().trim();
  const filterBd = result.filter((raza) => {
    return raza.nombre.toLowerCase().includes(buscar);
  });

  if(filterBd.length) return filterBd 
  throw new Error(`La raza ${nombre} no existe`);
};

const serchDogId = async (id) => {
  const result = await unificarBasesId();
  const idmod = id.length < 5 ? parseInt(id) : id;
  const buscar = result.filter((raza) => {
    return raza.id === idmod;
  });

  if(buscar.length) return buscar
  throw new Error(`El ${id} no existe`);
};

const getAllDogs = async () => {
  return await unificarBasesRutaPrincipal();
};

module.exports = {
  getAllDogs,
  serchDog,
  getTempDog,
  serchDogId,
};
