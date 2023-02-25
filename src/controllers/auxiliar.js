const { Raza, Temperamento } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const urlApi = `https://api.thedogapi.com/v1/breeds?Key=${API_KEY}`;

const filtrarArrayApi = (arr) => {
  const selectDatos = arr.map((dato) => {
    return {
      id: dato.id,
      imagen: dato.image.url,
      nombre: dato.name,
      peso_min: `${dato.weight.metric.slice(0, 2).trim()} Kg`,
      peso_max: `${dato.weight.metric.slice(4).trim()} Kg`,
      altura_min: `${dato.height.metric.slice(0, 2).trim()} cm`,
      altura_max: `${dato.height.metric.slice(4).trim()} cm`,
      años_de_vida: `${dato.life_span.replace('year', 'año')}`,
      Temperamentos: [dato.temperament].join(",")
    };
  });
  return selectDatos;
};

const filtradoRutaPrincipal = (arr) => {
  const selectDatos = arr.map((dato) => {
    return {
      id:dato.id,
      imagen: dato.image.url,
      nombre: dato.name,
      peso_max: `${dato.weight.metric.slice(4).trim()} Kg`,
      Temperamentos: [dato.temperament].join(",")
    };
  });
  return selectDatos;
};

const filtrarArrayBd = (arr) => {
  const selectDatos = arr.map((dato) => {
    return {
      id: dato.id,
      imagen: dato.imagen,
      nombre: dato.nombre,
      peso_min: dato.peso_min,
      peso_max: dato.peso_max,
      altura_min: dato.altura_min,
      altura_max: dato.altura_max,
      años_de_vida: dato.años_de_vida,
      Temperamentos: dato.Temperamentos.map(tem => tem.nombre).join(",")
    };
  });
  return selectDatos;
};

const filtradoRutaPrincipalBd = (arr) => {
  const selectDatos = arr.map((dato) => {
    return {
      id: dato.id,
      imagen: dato.imagen,
      nombre: dato.nombre,
      peso_max: dato.peso_max,
      Temperamentos: dato.Temperamentos.map(tem => tem.nombre).join(",")
    };
  });
  return selectDatos;
};

const unificarBasesId = async () => {
  //buscar en mi base de datos.
  const dataBaseDogsTempe = await Raza.findAll({
    include: {
      model: Temperamento,
      attributes: ['nombre'],
      through: { attributes: [] },
    },
  });
  //mapear mi base de datos para que queden bien los temperamentos
  const dataBaseDogs = filtrarArrayBd(dataBaseDogsTempe)

  //buscar en la api.
  const apiDogsSinModificar = (await axios.get(urlApi)).data;

  //seleccionar solo los datos que necesito de la api.
  const apiDogs = filtrarArrayApi(apiDogsSinModificar);

  //unificar las dos bases para que muestren lo mismo.

  const unificar = [...dataBaseDogs, ...apiDogs];
  return unificar;
};

const unificarBasesRutaPrincipal = async () => {
  //buscar en mi base de datos.
  const dataBaseDogsSinFiltrar = await Raza.findAll({
    attributes: ['id','imagen', 'nombre', 'peso_max'],
    include: {
      model: Temperamento,
      attributes: ['nombre'],
      through: { attributes: [] },
    },
  });

  const dataBaseDogs = filtradoRutaPrincipalBd(dataBaseDogsSinFiltrar)
  //buscar en la api.
  const apiDogsSinModificar = (await axios.get(urlApi)).data;

  //seleccionar solo los datos que necesito de la api.
  const apiDogs = filtradoRutaPrincipal(apiDogsSinModificar);

  //unificar las dos bases para que muestren lo mismo.

  const unificar = [...dataBaseDogs, ...apiDogs];
  return unificar;
};

const temperamentosApi = async () => {
  const apiDogsSinModificar = (await axios.get(urlApi)).data;

  const temperamento = apiDogsSinModificar.map((dato) => {
    return dato.temperament
  });
  const temp = temperamento.join(",").split(",");

  //este para poder sacarle los espacios en blanco a cada string
  const arrTemps = [];
  temp.forEach(tem => {
    if(temp.length > 1){}
    if(!arrTemps.includes(tem)){
      arrTemps.push(tem.trim());
    }
  })

  //Para terminar de flitart y que no se repitan los temperamnetos.
  const arrTemp = [];
  arrTemps.forEach(tem => {
    if(tem.length > 1){
      if(!arrTemp.includes(tem)){
        arrTemp.push(tem);
      }
    }
  })
 
  return arrTemp.sort();
};

module.exports = {
  filtrarArrayApi,
  unificarBasesId,
  temperamentosApi,
  filtradoRutaPrincipal,
  unificarBasesRutaPrincipal
};
