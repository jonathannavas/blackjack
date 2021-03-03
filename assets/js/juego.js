/*
    Manejo de Cartas
    2C => 2Clubs
    2D => 2Diamonds
    2H => 2Hearts
    2S => 2Spades
*/

let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0;
let puntosComputadora = 0;

//referencias html
const btnPedir = document.querySelector('#btnPedir');
const btnNuevo = document.querySelector('#btnNuevo');
const btnDetener = document.querySelector('#btnDetener');

const puntosHtml = document.querySelectorAll('small');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const crearDeck = () => {

    for(let i  = 2; i<=10;i++){
        for(let tipo of tipos){
            deck.push(i + tipo);
        }
    }
    
    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp + tipo);
        }
    }

    deck = _.shuffle(deck);
    return deck;

}

crearDeck();

//Tomar una carta

const pedirCarta = () => {

    if(deck.length === 0){
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();

    return carta;

}

// pedirCarta();

const valorCarta = (carta) => {

    const valor = carta.substring(0,carta.length-1);
  
    return  (isNaN(valor)) ? 
            (valor === 'A')? 11 : 10
            : Number(valor);

}

//turno de la pc

const turnoComputadora = (puntosMinimos) => {

    do{

        const carta = pedirCarta();

        puntosComputadora += valorCarta(carta);
        puntosHtml[1].innerText = puntosComputadora;
    
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if(puntosMinimos>21){
            break;
        }

    }while((puntosComputadora<puntosMinimos)&&(puntosMinimos<=21));

    setTimeout(() => {

        if(puntosComputadora === puntosMinimos){
            alert('NADIE GANA');
        }else if(puntosMinimos>21){
            alert('Computadora Gana');
        }else if(puntosComputadora > 21){
            alert('Jugador Gana');
        }else{
            alert('Computadora Gana');
        }

    }, 10);

}


//eventos
btnPedir.addEventListener('click',()=>{
    
    const carta = pedirCarta();
    puntosJugador += valorCarta(carta);
    
    puntosHtml[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    
    divCartasJugador.append(imgCarta);

    if(puntosJugador > 21){

        console.warn('Perdiste!!');

        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador);
        
    }else if(puntosJugador === 21){

        console.warn('21, Genial');
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador);
    }


});

btnDetener.addEventListener('click',()=>{
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click',()=>{

    console.clear();

    btnPedir.disabled = false;
    btnDetener.disabled = false;
   
    deck = [];
    deck = crearDeck();
    
    puntosJugador = 0;
    puntosComputadora = 0;

    puntosHtml[0].innerText = 0;
    puntosHtml[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

});