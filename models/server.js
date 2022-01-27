// Servidor de Express
const express = require('express');
const http = require('http'); // Servidor de sockets
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');



class Server {

    constructor () {

        this.app = express();
        this.port = process.env.PORT;

        // Http server
        this.server = http.createServer( this.app );

        // Configuracion de sockets
        this.io = socketio(this.server, { /*Configuraciones*/});

    }

    middlewares() {
        // Desplegar el directorio publico con express
        this.app.use( express.static( path.resolve( __dirname, '../public')))

        // cors
        this.app.use( cors());
    }

    configurarSockets() {
        new Sockets( this.io );
    }

    execute () {

        // Inicializar Middlewares
        this.middlewares();

        // Inicializar sockets
        this.configurarSockets();

        // Inicializar el server
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto:', this.port );
        });
    }

}

module.exports = Server;