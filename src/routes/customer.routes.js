import { Router } from "express";
import {
  renderHome,
  renderMisReserva,
  renderCotizar,
  iniciarSesion,
  cerrarSesion,
  renderReservar,
} from "../controllers/customerController.js";
const router = Router();

router.get("/", renderHome);
router.get("/index", renderHome);
router.get("/reserva", renderMisReserva);
router.get("/cotizar", renderCotizar);
router.post("/login", iniciarSesion);
router.get("/cerrar", cerrarSesion);
router.get("/reservar", renderReservar);
/*router.post("/add", createCustomers);
router.get("/update/:id", editCustomer);
router.post("/update/:id", updateCustomer);
router.get("/delete/:id", deleteCustomer);*/

export default router;
