const TicketControl = require("../models/ticket-control");



const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.emit('ultimo-ticket', ticketControl.ultimo);
    socket.emit('estado-actual', ticketControl.ultimos4);
    socket.emit('tickets-pendientes', ticketControl.tickets.length);

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguiente();
        callback(siguiente);

        //TODO: Notificar que hay un nuevo ticket pendiente de asignar
        //emicion cuando se crea un nuevo ticket
        socket.emit('tickets-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);
    });

    socket.on('atender-ticket', ({escritorio}, callback) => {

        //validar escritorio
        if(!escritorio){
            callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }

        const ticket = ticketControl.atenderTicket(escritorio);

        //TODO: Notificar en los ultimos cuatros
        socket.broadcast.emit('estado-actual', ticketControl.ultimos4);

        //Emicion cuando se trabaja un ticket
        socket.emit('tickets-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

        if(!ticket){
            callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });

        }else{

            return callback({
                ok: true,
                ticket
            });
        }
    });
}



module.exports = {
    socketController
}

