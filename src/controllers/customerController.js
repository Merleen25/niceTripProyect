import { pool } from "../db.js";
import PDFDocument from 'pdfkit';
import ExcelJS from 'exceljs';
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



// Funcion para generar excel
function generateXLS(data) {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Tasks Data", {
      pageSetup: { paperSize: 9, orientation: "landscape" },
    });

    // Initialize the row index
    let rowIndex = 1;

    let row = worksheet.getRow(rowIndex);
    row.values = ["# Reserva", "Vehiculo", "Fecha Inicio", "Fecha Fin", "Total", "Estado"];
    row.font = { bold: true };

    const columnWidths = [10, 25, 15, 15, 10, 15];
    
    row.eachCell((cell, colNumber) => {
        const columnIndex = colNumber - 1;
        const columnWidth = columnWidths[columnIndex];
        worksheet.getColumn(colNumber).width = columnWidth;
      });

      // Loop over the grouped data
      data.forEach((reserva, index) => {
        const row = worksheet.getRow(rowIndex + index + 1);
        row.getCell("A").value = reserva.idReservacion;
        row.getCell("B").value = reserva.vehiculo;
        row.getCell("C").value = reserva.inicio;
        row.getCell("D").value = reserva.fin;
        row.getCell("E").value = reserva.total;
        row.getCell("F").value = reserva.estado;
       
        //row.getCell("B").alignment = { wrapText: true };
      });
      // Increment the row index
      rowIndex += data.length;

    // Merge cells for the logo
    /*worksheet.mergeCells(
      `A1:${String.fromCharCode(65 + worksheet.columns.length - 1)}1`
    );

    const image = workbook.addImage({
      base64: LOGO_64, //replace it your image (base 64 in this case)
      extension: "png",
    });

    worksheet.addImage(image, {
      tl: { col: 0, row: 0 },
      ext: { width: 60, height: 40 },
    });

    worksheet.getRow(1).height = 40;
    */
    
    // Define the border style
    const borderStyle = {
      style: "thin", // You can use 'thin', 'medium', 'thick', or other valid styles
      color: { argb: "00000000" },
    };

    // Loop through all cells and apply the border style
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.border = {
          top: borderStyle,
          bottom: borderStyle,
        };
      });
    });

    // Generate the XLS file
    return workbook.xlsx.writeBuffer();
  } catch (err) {
    console.log(err);
  }
}

//Nuevas Controladores para rutas
export const renderHome = (req, res) => {
  res.render("home", {idCliente: req.cookies.idCliente, nombreUsuario: req.cookies.userName, error: req.cookies.error});
};


export const renderMisReserva = async (req, res) => {
  if (!req.cookies.idCliente) {
    res.redirect('/cotizar');
  } else {
    const clienteId = req.cookies.idCliente;
    const query = `SELECT r.idReservacion, DATE_FORMAT(fechaInicio,'%d/%m/%Y') inicio, DATE_FORMAT(fechaEntrega,'%d/%m/%Y') fin, 
                      total, CONCAT(v.marca, " ", v.linea, " (", v.modelo, ")") vehiculo, e.estado, v.imagen,
                      CONCAT(c.nomber, " ", c.apellido) nombre, c.correoElectronico correo, c.numeroTelefono telefono, c.direccion,
                      t.direccion direccionTienda, t.telefono telefonoTienda, p.noAutorizacion 
                    FROM reservacion r 
                    INNER JOIN estado e ON e.idEstadoRenta = r.idEstadoRenta 
                    INNER JOIN vehiculo v ON v.idVehiculo = r.idVehiculo 
                    INNER JOIN cliente c ON c.idCliente = r.idCliente 
                    INNER JOIN tienda t ON t.idTienda = v.idTienda 
                    INNER JOIN pago p ON p.idReservacion = r.idReservacion 
                    WHERE r.idCliente = ` + clienteId;
    const [resultado] = await pool.query(query);
    res.render("misReserva",  {idCliente: req.cookies.idCliente, nombreUsuario: req.cookies.userName, misReservas: resultado, error: req.cookies.error});
  }
};

export const renderPrintRecibo = async (req, res) => {
  if (!req.cookies.idCliente) {
    res.redirect('/cotizar');
  } else {
    const idReservacion = req.query.idReservacion;
    const query = `SELECT r.idReservacion, DATE_FORMAT(fechaInicio,'%d/%m/%Y') inicio, DATE_FORMAT(fechaEntrega,'%d/%m/%Y') fin, 
                      total, CONCAT(v.marca, " ", v.linea, " (", v.modelo, ")") vehiculo, e.estado, v.imagen,
                      CONCAT(c.nomber, " ", c.apellido) nombre, c.correoElectronico correo, c.numeroTelefono telefono, c.direccion,
                      t.direccion direccionTienda, t.telefono telefonoTienda, p.noAutorizacion 
                    FROM reservacion r 
                    INNER JOIN estado e ON e.idEstadoRenta = r.idEstadoRenta 
                    INNER JOIN vehiculo v ON v.idVehiculo = r.idVehiculo 
                    INNER JOIN cliente c ON c.idCliente = r.idCliente 
                    INNER JOIN tienda t ON t.idTienda = v.idTienda 
                    INNER JOIN pago p ON p.idReservacion = r.idReservacion 
                    WHERE r.idReservacion = ` + idReservacion;
    const [resultado] = await pool.query(query);
    console.log("query:", resultado);
    res.render("reciboPdfPrint",  {reserva: resultado[0]});
  }
};


export const renderCotizar = async (req, res) => {
  const [vehiculos] = await pool.query("select idVehiculo id, modelo, marca, linea, precio, concat(SUBSTRING(descripcion, 1, 50), \"...\") descripcion, imagen, estado from vehiculo");
  res.render("cotizar", {idCliente: req.cookies.idCliente, listaVehiculos: vehiculos, nombreUsuario: req.cookies.userName, error: req.cookies.error});
};

export const renderReservar = async (req, res) => {
  if (!req.cookies.idCliente) {
    res.redirect('/cotizar');
  } else {
    const vehiculoId = req.query.vehiculoId;
    const [resultado] = await pool.query(`select modelo, marca, linea, precio, descripcion, imagen, estado, direccion, telefono  
                                          from vehiculo v
                                          inner join tienda t on t.idTienda = v.idTienda 
                                          where idVehiculo = ` + vehiculoId);
    const fechaActual = new Date();
    var fechaActualMas1Dia = new Date(fechaActual.getTime() + 24 * 60 * 60 * 1000);
    const hoy = fechaActual.toISOString().slice(0,10);
    const maniana = fechaActualMas1Dia.toISOString().slice(0,10);
    res.render("reservar", {idCliente: req.cookies.idCliente, idVehiculo: vehiculoId, fechaHoy: hoy, fechaManiana: maniana, vehiculo: resultado[0], nombreUsuario: req.cookies.userName, error: req.cookies.error});
  }
};


export const iniciarSesion = async (req, res) => {
  const user = req.body;
  const queryConsulta = "SELECT idCliente, CONCAT(nomber, \" \", apellido) nombre, numeroTelefono telefono FROM cliente WHERE correoElectronico = '"+user.correo+"' AND clave = '"+user.clave+"'";
  const [resultado] = await pool.query(queryConsulta);
  console.log(queryConsulta);
  console.log(resultado);
  console.log("validation:", (resultado.lengthd > 0));
  if (resultado.length> 0) {
    res.cookie('userName',resultado[0].nombre, { maxAge: 9900000, httpOnly: true });
    res.cookie('idCliente',resultado[0].idCliente, { maxAge: 9900000, httpOnly: true });
    res.cookie('telefono',resultado[0].telefono, { maxAge: 9900000, httpOnly: true });
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

export const guardarReserva = async (req, res) => {
  const body = req.body;
  const query = "CALL crearReserva("+body.idCliente+", "+body.idVehiculo+", '"+body.fechaInicio+"', '"+body.fechaFin+"', "+body.totalPagar+", "+body.noAutorizacion+");";
  await pool.query(query);
  res.json({ message: "Reserva guardada" });
};

export const generarReciboPdf = (req, res) => {
  const doc = new PDFDocument()
  res.setHeader('Content-disposition', 'attachment; filename="Recibo-1.pdf"');
  res.setHeader('Content-type', 'application/pdf');
  const content = "Comprobante Documento";
  doc.y = 300
  doc.text(content, 50, 50)
  doc.pipe(res)
  doc.end()
};

export const generarExcel = async (req, res) => {
  if (!req.cookies.idCliente) {
    res.redirect('/cotizar');
  } else {
    const clienteId = req.cookies.idCliente;
    const query = `SELECT r.idReservacion, DATE_FORMAT(fechaInicio,'%d/%m/%Y') inicio, DATE_FORMAT(fechaEntrega,'%d/%m/%Y') fin, total, CONCAT(v.marca, " ", v.linea, " (", v.modelo, ")") vehiculo, e.estado  
                    FROM reservacion r 
                    INNER JOIN estado e ON e.idEstadoRenta = r.idEstadoRenta 
                    INNER JOIN vehiculo v ON v.idVehiculo = r.idVehiculo 
                    WHERE r.idCliente = ` + clienteId;
    const [resultado] = await pool.query(query);
    
    try { 
      if (resultado.length > 0) {
        const xlsBuffer = await generateXLS(resultado);
        res.set("Content-Disposition", "attachment; filename=Reservas-de-cliente.xls");
        res.type("application/vnd.ms-excel");
        res.send(xlsBuffer);
      }
    } catch (err) {
      res.json("Something went wrong");
    }
  }
};

export const renderRecibo = (req, res) => {
  res.render('/reciboPdf');
};
