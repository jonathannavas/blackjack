
const miModulo = (() => {

    'use strict'

    let deck = [];
    const   tipos = ['C','D','H','S'],
            especiales = ['A','J','Q','K'];

    // let     puntosJugador = 0,
    //         puntosComputadora = 0;

    let puntosJugadores = [];

    //referencias html
    const   btnPedir = document.querySelector('#btnPedir'),
            btnNuevo = document.querySelector('#btnNuevo'),
            btnDetener = document.querySelector('#btnDetener');

    const   divCartasJugadores = document.querySelectorAll('.divCartas'),
            puntosHtml = document.querySelectorAll('small');

    const inicializarJuego = (numJugadores=2) => {

        deck = crearDeck();
        puntosJugadores = [];

        for(let i = 0; i<numJugadores;i++){
            puntosJugadores.push(0);
        }

        puntosHtml.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerText = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;

    }
        
    const crearDeck = () => {

        deck = [];

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

        return _.shuffle(deck);
    }


    //Tomar una carta

    const pedirCarta = () => {

        if(deck.length === 0){
            throw 'No hay cartas en el deck';
        }
        return deck.pop();

    }

    //obtener el valor de la carta

    const valorCarta = (carta) => {

        const valor = carta.substring(0,carta.length-1);
    
        return  (isNaN(valor)) ? 
                (valor === 'A')? 11 : 10
                : Number(valor);

    }

    //Turno: 0 => el primer jugador y el ultimo es la pc

    const acumularPuntos = (carta,turno) => {

        puntosJugadores[turno] += valorCarta(carta);
        puntosHtml[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];
    }

    //turno de la pc

    const crearCarta = (carta,turno) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);

    }

    const determinarGanador = () => {

        const [puntosMinimos,puntosComputadora] =  puntosJugadores;

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

    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;
        do{

            const carta = pedirCarta();

            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1 );
            crearCarta(carta, puntosJugadores.length - 1 );

        }while((puntosComputadora<puntosMinimos)&&(puntosMinimos<=21));

        determinarGanador();

    }



    //eventos
    btnPedir.addEventListener('click',()=>{
        
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

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
        turnoComputadora(puntosJugadores[0]);
    });

    btnNuevo.addEventListener('click',()=>{
        inicializarJuego();
    });

    return {
        nuevoJuego: inicializarJuego
    };

})();