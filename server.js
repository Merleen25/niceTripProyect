import express from 'express';
import router from './routes/index.js';
import bodyParser from 'body-parser';


const app = express();
const PORT = 3000;

// Configuración de Pug como motor de vistas
app.use('/', router);
app.set('view engine', 'pug');

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.listen(PORT, () => {
        console.log(`El servidior esta funcionando en el puerto ${PORT}`)
      })

