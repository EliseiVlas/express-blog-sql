// importiamo il roputer dei piatti
const connection = require('../data/db');

// gruppo delle funzione della logica relativa alle rotte delle pizze
// index
function index(req, res) {

    // prepariamo la query
    const sql = 'SELECT * FROM posts';

    // eseguiamo la query!
    connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database query failed' });
    res.json(results);
    console.log(results);
    
});
};
// show
function show(req, res) {

    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id)

    const sql = 'SELECT * FROM posts WHERE id = ?';
    connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database query failed' });
    if (results.length === 0) return res.status(404).json({ error: 'piatto not found' });

    const piatti = results[0];

    const ingredientsSql = `
            SELECT tags.*
            FROM tags
            JOIN post_tag ON tags.id = post_tag.tag_id
            WHERE post_tag.post_id = ?
            `;


        // Se è andata bene, eseguiamo la seconda query per gli ingredienti
        connection.query(ingredientsSql, [id], (err, ingredientsResults) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });

            // Aggoiungiamo gli ingredienti alla pizza
            piatti.ingredienti = ingredientsResults;

    res.json(piatti);
    });
    });
};
// store
function store(req, res) {

    // Creiamo un nuovo id incrementando l'ultimo id presente
    const ultimoPiatto = dataPiatti[dataPiatti.length - 1];
    const idUltimoPiatto = ultimoPiatto.id;
    const newId = idUltimoPiatto + 1;

    // Creiamo un nuovo oggetto piatto
    const nuovoPiatto = {
        id: dataPiatti.length === 0 ? 1 : newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }

    // Aggiungiamo il nuovo piatto al menu
    dataPiatti.push(nuovoPiatto);

    // controlliamo
    console.log(dataPiatti);
    
    // Restituiamo lo status corretto e il piatto appena creato
    res.status(201);
    res.json(nuovoPiatto);
};
// update
function update(req, res) {

   // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id);

    // cerchiamo il piatto tramite id
    const piatto = dataPiatti.find(piatto => piatto.id === id);

    // Facciamo il controllo
    if (!piatto) {
        // ritorno lo stato di errore 404, non trovato
        res.status(404);
        // ritorno un messaggio di errore (formato json)
        return res.json({
            error: "Not Found",
            message: "piatto non trovata"
        })
    }
    //  modifichiamo i dati dell piatto trovato
    piatto.title = req.body.title;
    piatto.content = req.body.content;
    piatto.image = req.body.image;
    piatto.tags = req.body.tags;

    // stampiamo in console il menu
    console.log(dataPiatti);

    // ritorniamo l'oggetto modificato
    res.json(piatto);

};
// modify
function modify (req, res){
    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id);

    // cerchiamo il piatto tramite id
    const piatto = dataPiatti.find(piatto => piatto.id === id);

    // Facciamo il controllo
    if (!piatto) {
        // ritorno lo stato di errore 404, non trovato
        res.status(404);
        // ritorno un messaggio di errore (formato json)
        return res.json({
            error: "Not Found",
            message: "Piatto non trovata"
        })
    }
    //  modifichiamo i dati parziali dell piatto trovata
    req.body.title ? piatto.title = req.body.title : piatto.title = piatto.title;
    req.body.content ? piatto.content = req.body.content : piatto.content = piatto.content;
    req.body.image ? piatto.image = req.body.image : piatto.image = piatto.image;
    req.body.tags ? piatto.tags = req.body.tags : piatto.tags = piatto.tags;

    // stampiamo in console il menu
    console.log(dataPiatti);

    // ritorniamo l'oggetto modificato
    res.json(piatto);
};
// destroy
function destroy(req, res) {
    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id)
    // cerchiamo il piatto tramite id
    const piatti = dataPiatti.find(piatto => piatto.id === id);
    // Facciamo il controllo
    if (!piatti) {
        // ritorno lo stato di errore 404, non trovato
        res.status(404);
        // ritorno un messaggio di errore (formato json)
        return res.json({
            error: "Not Found",
            message: "piatto non trovata"
        })
    }
    // cancello il piatto trovato
    dataPiatti.splice(dataPiatti.indexOf(piatti), 1);
    // log di riscontro di check su aggiornamento dati
    console.log(dataPiatti);
    // ritorno la risposta positiva di avvenuta cancellazione
    res.sendStatus(204);
};
module.exports = { index, show, store, update, modify, destroy }