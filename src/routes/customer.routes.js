import { Router } from "express";
import {
  renderHome,
  renderReserva,
  renderCotizar,
  iniciarSesion,
} from "../controllers/customerController.js";
const router = Router();

router.get("/", renderHome);
router.get("/index", renderHome);
router.get("/reserva", renderReserva);
router.get("/cotizar", renderCotizar);
router.post("/login", iniciarSesion);
/*router.post("/add", createCustomers);
router.get("/update/:id", editCustomer);
router.post("/update/:id", updateCustomer);
router.get("/delete/:id", deleteCustomer);*/

export default router;
