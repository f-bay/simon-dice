const $botonJugar = document.querySelector('#boton-jugar');
let secuenciaMaquina = [];
let secuenciaUsuario = [];
let ronda = 0;

$botonJugar.onclick = comenzarJuego;

actualizarMensaje('Toca el boton "Jugar" para comenzar 👇');
bloquearInputUsuario();

function comenzarJuego() {
    ocultarBotonJugar()
    mostrarContador();
    reiniciarRonda();
    manejarRonda();
}

function reiniciarRonda() {
    secuenciaMaquina = [];
    secuenciaUsuario = [];
    ronda = 0;
}

function manejarRonda() {
    actualizarMensaje('Turno de la máquina 💻');
    bloquearInputUsuario();

    const $nuevoColor = obtenerColorAleatorio();
    secuenciaMaquina.push($nuevoColor);

    const RETRASO_TURNO_JUGADOR = (secuenciaMaquina.length + 1) * 1000;

    secuenciaMaquina.forEach(($color, index) => {
        const RETRASO_MS = (index + 1) * 1000;
        setTimeout(() => {
            resaltar($color); 
        }, RETRASO_MS);
    });

    setTimeout(() => {
        actualizarMensaje('Turno del jugador 💪');
        desbloquearInputUsuario();
    }, RETRASO_TURNO_JUGADOR);

    secuenciaUsuario = [];
    ronda++;
    actualizarNumeroRonda(ronda);
}

function manejarInputUsuario(e) {
    const $colorUsuario = e.target;
    resaltar($colorUsuario);
    secuenciaUsuario.push($colorUsuario);

    const $colorMaquina = secuenciaMaquina[secuenciaUsuario.length - 1];
    if($colorUsuario.id !== $colorMaquina.id) {
        perder();
        return;
    }

    if(secuenciaUsuario.length === secuenciaMaquina.length) {
        actualizarMensaje(textoGanador());
        bloquearInputUsuario();
        setTimeout(manejarRonda, 2000);
    }
}

function obtenerColorAleatorio() {
    const $colores = document.querySelectorAll('.color');
    const index = Math.floor(Math.random() * $colores.length);
    return $colores[index];
}

function actualizarNumeroRonda(ronda) {
    document.querySelector('#numero-ronda').textContent = ronda;
}

function actualizarMensaje(mensaje, error = false) {
    const $mensaje = document.querySelector('#mensaje');
    $mensaje.textContent = mensaje;
    
    if(error) {
        $mensaje.classList.remove('alert-primary');
        $mensaje.classList.add('alert-danger');
    } else {
        $mensaje.classList.remove('alert-danger');
        $mensaje.classList.add('alert-primary');
    }
}


function resaltar(color) {
    color.style.opacity = 1;
    setTimeout(() => {
        color.style.opacity = 0.5;
    }, 500);
}

function bloquearInputUsuario() {
    document.querySelectorAll('.color').forEach(color => {
        color.onclick = function() {};
    });
}

function desbloquearInputUsuario() {
    document.querySelectorAll('.color').forEach(color => {
        color.onclick = manejarInputUsuario;
    })
}

function perder() {
    mostrarBotonJugar();
    ocultarContador();
    bloquearInputUsuario();
    actualizarMensaje(textoPerdedor(), true);
}

function mostrarContador() {
    const $contador = document.querySelector('#contador');
    $contador.classList.remove('oculto');
}

function ocultarContador() {
    document.querySelector('#contador').classList.add('oculto');
}

function textoGanador() {
    const frases = [
        'Si señorrr!! 👏',
        'Invente Román invente!! ⚽',
        'Pero mira esa memoria papá 👀',
        'ARRANCA POR LA DERECHA EL GENIO DEL FUTBOL MUNDIAL 🧠',
        'Golazo!! 👌',
        'Como te acordaste??? 😲',
        'Ojalá pudiera tener tu memoria!! 🙌',
        'Fua, la tenes atada! 🤝',
        'Seguí asi!! 🤩',
        'Ok, por lo visto está facilito 😡'
    ];

    const fraseAleatoria = Math.floor(Math.random() * (frases.length - 1));
    return frases[fraseAleatoria];
}

function textoPerdedor() {
    const frases = [
        'Noooooo!!! 😭',
        'No pasa nada mi rey, la proxima lo tenés! 💪',
        'Uhhhh!! Que cerquita! 🤏',
        'Tranqui, tomate un matecito y volve a intentar 🧉',
        'Vos podés, esta es la buena! 🤞',
        'No lo cante, no lo grite, no se abrace!! 🤣',
        'ERROR 404, intente nuevamente. 👾',
        'Ya casi lo tenés!! dale una mas 😉',
        'Uff, yo me jugaría otra jeje 😄',
        'NAAAA BURRAZO 🤮'
    ];
    
    const fraseAleatoria = Math.floor(Math.random() * (frases.length - 1));
    return frases[fraseAleatoria];
}

function ocultarBotonJugar() {
    document.querySelector('#boton-jugar').classList.add('oculto');
}

function mostrarBotonJugar() {
    document.querySelector('#boton-jugar').classList.remove('oculto');
}