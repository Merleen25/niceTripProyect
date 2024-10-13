import { pool } from "../db.js";
/*
export const renderCustomers = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM estado");
  res.render("customers", { customers: rows });
};

export const createCustomers = async (req, res) => {
  const newCustomer = req.body;
  await pool.query("INSERT INTO customer set ?", [newCustomer]);
  res.redirect("/");
};

export const editCustomer = async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query("SELECT * FROM customer WHERE id = ?", [
    id,
  ]);
  res.render("customers_edit", { customer: result[0] });
};

export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const newCustomer = req.body;
  await pool.query("UPDATE customer set ? WHERE id = ?", [newCustomer, id]);
  res.redirect("/");
};

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("DELETE FROM customer WHERE id = ?", [id]);
  if (result.affectedRows === 1) {
    res.json({ message: "Customer deleted" });
  }
  res.redirect("/");
};*/



//Nuevas Controladores para rutas
export const renderHome = (req, res) => {
  res.render("home", {nombreUsuario: req.cookies.userName, error: req.cookies.error});
};


export const renderMisReserva = (req, res) => {
  res.render("misReserva",  {nombreUsuario: req.cookies.userName, error: req.cookies.error});
};

export const renderCotizar = async (req, res) => {
  const [vehiculos] = await pool.query("select idVehiculo id, modelo, marca, linea, precio, concat(SUBSTRING(descripcion, 1, 50), \"...\") descripcion, imagen from vehiculo");
  res.render("cotizar", {listaVehiculos: vehiculos, nombreUsuario: req.cookies.userName, error: req.cookies.error});
};

export const renderReservar = async (req, res) => {
  const vehiculoId = req.query.vehiculoId;
  const [resultado] = await pool.query("select modelo, marca, linea, precio, descripcion, imagen from vehiculo where idVehiculo = " + vehiculoId);
  res.render("reservar", {vehiculo: resultado[0], nombreUsuario: req.cookies.userName, error: req.cookies.error});
};


export const iniciarSesion = async (req, res) => {
  const user = req.body;
  const queryConsulta = "SELECT idCliente, CONCAT(nomber, \" \", apellido) nombre, numeroTelefono telefono FROM cliente WHERE correoElectronico = '"+user.correo+"' AND clave = '"+user.clave+"'";
  const [resultado] = await pool.query(queryConsulta);
  console.log(queryConsulta);
  console.log(resultado);
  console.log("validation:", (resultado.lengthd > 0));
  if (resultado.length> 0) {
    res.cookie('userName',resultado[0].nombre, { maxAge: 900000, httpOnly: true });
    res.cookie('idCliente',resultado[0].idCliente, { maxAge: 900000, httpOnly: true });
    res.cookie('telefono',resultado[0].telefono, { maxAge: 900000, httpOnly: true });
    res.clearCookie("error");
    res.redirect("/");
  } else {
    res.cookie('error',"Usuario y/o clave incorrectos", { maxAge: 900000, httpOnly: true });
    res.redirect("/");
  }
  
};

export const cerrarSesion = (req, res) => {
  res.clearCookie("userName");
  res.clearCookie("idCliente");
  res.clearCookie("telefono");
  res.clearCookie("error");
  res.redirect("/");
};

