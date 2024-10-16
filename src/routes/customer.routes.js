import { Router } from "express";
import {
  renderHome,
  renderMisReserva,
  renderCotizar,
  iniciarSesion,
  cerrarSesion,
  renderReservar,
  guardarReserva,
  renderRecibo,
  generarExcel,
  renderPrintRecibo,
  cancelarReserva,
  renderPoliticas,
} from "../controllers/customerController.js";
const router = Router();

router.get("/", renderHome);
router.get("/index", renderHome);
router.get("/mis-reservas", renderMisReserva);
router.get("/cotizar", renderCotizar);
router.post("/login", iniciarSesion);
router.get("/cerrar", cerrarSesion);
router.get("/reservar", renderReservar);
router.post("/guardarReserva", guardarReserva);
router.get("/recibo", renderRecibo);
router.get("/reservas-excel", generarExcel);
router.get("/imprimir", renderPrintRecibo);
router.get("/cancelar", cancelarReserva);
router.get("/politicas", renderPoliticas);
/*router.post("/add", createCustomers);
router.get("/update/:id", editCustomer);
router.post("/update/:id", updateCustomer);
router.get("/delete/:id", deleteCustomer);*/

export default router;
