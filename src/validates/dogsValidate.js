const createValidation = (req, res, next) => {
  const { nombre, peso_min, peso_max, altura_min, altura_max, temperamento } =
    req.body;

  if (!nombre)
    return res.status(400).json({ error: "Falta declarar el nombre" });
  if (nombre.length < 3)
    return res.status(400).json({ error: "El nombre es muy corto" });
  if (nombre.length > 30)
    return res.status(400).json({ error: "El nombre es muy largo" });
  if (!peso_min)
    return res.status(400).json({ error: "Falta declarar el peso minimo" });
  if (parseInt(peso_min) < 1)
    return res
      .status(400)
      .json({ error: "El peso minimo declarado es muy bajo" });
  if (!peso_max)
    return res.status(400).json({ error: "Falta declarar el peso máximo" });
  if (parseInt(peso_max) >= 100)
    return res
      .status(400)
      .json({ error: "El peso máximo declarado es muy alto" });
  if (!altura_min)
    return res.status(400).json({ error: "Falta declarar la altura minima" });
  if (parseInt(altura_min) < 10)
    return res
      .status(400)
      .json({ error: "La altura  minima declarada es muy baja" });
  if (!altura_max)
    return res.status(400).json({ error: "Falta declarar la altura máxima" });
  if (parseInt(altura_max) > 85)
    return res
      .status(400)
      .json({ error: "La altura  máxima declarada es muy alta" });
  if (!temperamento)
    return res.status(400).json({ error: "Falta declarar el temperamento" });
  if (temperamento.length < 3)
    return res.status(400).json({ error: "El temperamento es muy corto" });

  next();
};


module.exports = createValidation;
 

