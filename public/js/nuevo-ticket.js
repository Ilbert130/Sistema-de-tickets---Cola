
//Referencias HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');


const socket = io();


//Conectado
socket.on('connect', () => {
    // console.log('Conectado');
    btnCrear.disabled = false;
});

//Desconectado
socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnCrear.disabled = false;
});

socket.on('ultimo-ticket', (payload) => {
    lblNuevoTicket.innerText = 'Ticket ' + payload;
});

btnCrear.addEventListener( 'click', () => {

    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    });

});