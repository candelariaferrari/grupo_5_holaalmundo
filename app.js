const express = require('express');
const path = require('path');
const app = express();


app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/inicioGuests.html'));
});

app.get('/paquetes', (req, res) => {
    res.sendFile(path.join(__dirname, './views/detailView.html'));
});

app.listen(3000, () => { 
    console.log("Servidor corriendo en puerto 3000");
});

