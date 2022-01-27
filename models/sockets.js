class Sockets {

    constructor( io ) {

        this.io = io;
        
        this.socketEvents();

    }

    socketEvents() {
        // On connections
        this.io.on('connection', ( socket ) => { 
        
            // Escuchar evento: mensaje-to-server
            socket.on('mensaje-to-server', (data) => {
                console.log(data);
                
                this.io.emit('mensaje-from-server', data); // manda el mensaje a todos los clientes conectados
            });
        
         });
    }

}


module.exports = Sockets;