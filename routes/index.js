import express from 'express';
import {pool} from './connectionMySQL.js';

const router = express.Router();

const getEstado = async () => {
    try{
        const [result] = await pool.query('SELECT * from estado;');
        console.table(result);
    }catch(error){
        console.error(error);
    }
};

getEstado();

router.get('/index', (req, res) => {  // req = lo que enviamos : res = lo que express nos responde
    res.render('index');
});

router.get('/login', (req, res) => {
    
    const prueba = 'Y AHORA';

    res.render('login', {
        prueba
    });
});
router.get('/reservaciones', (req, res) => {
    
    const prueba = 'reservaciones';

    res.render('reservaciones', {
        prueba
    });
});
router.get('/cotizaciones', (req, res) => {
    
    const prueba = 'cotizaciones';

    res.render('cotizaciones', {
        prueba
    });
});




export default router;
