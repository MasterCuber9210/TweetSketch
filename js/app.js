// Variables
const formulario  = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');

let tweets        = [];

// Event Listeners
eventListeners();
function eventListeners() {
    // cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets', tweets)) || [];

        crearHTML();
    })
}


// ----------Funciones----------

function agregarTweet(e) {
    e.preventDefault();
    const tweet = document.querySelector('#tweet').value;
    
    if (tweet === '') {
        mostrarError('El tweet no puede ir vacio');

        return;
    } 

    const tweetObj = {
        id: Date.now(),
        tweet,
    }

    // anadir al arreglo de mis tweets
    tweets = [...tweets, tweetObj];

    // crear HTML con el tweet
    crearHTML();

    // reiniciar el formulario
    formulario.reset();

} 

// mostrar mensaje de error

function mostrarError(error) {
    const mensageError = document.createElement('p');
    mensageError.textContent = `${error}`;
    mensageError.classList.add('error');
    listaTweets.appendChild(mensageError);
    setTimeout(() => {
        mensageError.remove();
    }, 2000);
}

function crearHTML() {

    limpiarHTML();
    
    if (tweets.length > 0) {

        tweets.forEach(tweet => {
            // crear el HTML
            const li = document.createElement('li');
            li.innerText = tweet.tweet;

            // boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            // anadir funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            // asignar el boton
            li.appendChild(btnEliminar);
            
            // insertar el html
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

// limpiar HTML
function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

// agrega los tweets actuales a local storage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Eliminar Tweet
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}