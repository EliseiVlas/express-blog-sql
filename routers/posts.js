// Importiamo express e utilizziamo la parte di routing

    // importa il framework Express.js
    const express = require('express')
    // Crea un'istanza di router
    const router = express.Router();

// importiamo il roputer dei piatti
const piattiController = require('../controllers/piattiControler');

// rotte di CRUD dei piatti
// index
router.get('/', piattiController.index);

// show
router.get('/:id', piattiController.show);

// store
router.post('/', piattiController.store);

// update
router.put('/:id', piattiController.update);

// modify
router.patch('/:id', piattiController.modify);

// destroy
router.delete('/:id', piattiController.destroy);
// esportiamo il modulo del router
module.exports = router;