// importiamo express una volta che lo instaliamo
  // Importa il framework Express.js
  const express = require('express')
  // Importa il middlewares cors
  
  // Crea un'istanza dell'applicazione Express
  const app = express();
  const cors = require('cors');

  // Definisce la porta su cui il server ascolterà le richieste
  const port = 3000

// importiamo il roputer dei piatti
const piattiRouter = require('./routers/posts');

// importiamo il middleware di gestione errore server
const errorsHandler = require("./middlewares/errorsHandler");

// importiamo il middleware di gestione errore 404
const notFound = require("./middlewares/notFound");

// definiamo la cartella per i file statici (le immagini)
app.use(express.static("./public/imgs/posts/"));

// registro il body-parser per "application/json"
app.use(express.json());

app.use(cors({origin: "http://localhost:5173"}));
// progetto base con rotta "/"
app.get('/', (req, res) => {
   res.send("Ciao sono la rotta Home, dell mio locale!!!");
});

// utilizzo il midllewares cors


// utilizziamo la rotta dei piatti andando a definire la parte iniziale delle rotte
app.use("/piatti", piattiRouter)

// utilizzo middleware di gestione errore server
app.use(errorsHandler);

// utilizzo middleware di gestione not found 404
app.use(notFound);

  // avvio del server sulla porta specificata
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})