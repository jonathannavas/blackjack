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
let puntosPC = 0;

//referencias html
const btnPedir = document.querySelector('#btnPedir');
const btnNuevo = document.querySelector('#btnNuevo');
const btnDetener = document.querySelector('#btnDetener');

const puntosHtml = document.querySelectorAll('small');

const divCartasJugador = document.querySelector('#jugador-cartas');

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
    }else if(puntosJugador === 21){
        console.warn('21, Genial');
        btnPedir.disabled = true;
    }


});