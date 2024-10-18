let secretNumber; // Variable para almacenar el número secreto
let attemptsLeft; // Variable para contar los intentos restantes
let bestScore = 0; // Variable para guardar la mejor puntuación

// Elementos del DOM
const attemptsDisplay = document.getElementById('attempts'); 
const secretNumberDisplay = document.getElementById('secret-number'); 
const hintText = document.getElementById('hint-text'); 
const restartButton = document.getElementById('restart-button'); 
const guessInput = document.getElementById('guess'); 
const body = document.body; 

// Función para iniciar el juego
function startGame() {
    secretNumber = Math.floor(Math.random() * 10) + 1; 
    attemptsLeft = 20; 
    attemptsDisplay.textContent = attemptsLeft; 
    secretNumberDisplay.textContent = "?"; 
    hintText.textContent = "Comencem la partida!"; 
    restartButton.disabled = true; 
    guessInput.value = ''; 
    body.style.backgroundColor = ''; 
}

// Función para manejar la introducción del número
function submitGuess() {
    const userGuess = Number(guessInput.value); // Convierte el input a un número
    
    // Valida que el input sea un número y mayor que 0
    if (isNaN(userGuess) || userGuess < 1) {
        alert("El número introducido no és correcto. Por favor, introduce un número valido.");
        return; 
    }
    
    attemptsLeft--; 
    attemptsDisplay.textContent = attemptsLeft; 
    guessInput.value = ''; 

    // Comprueba si el número introducido es el correcto
    if (userGuess === secretNumber) {
        hintText.textContent = "Has adivinado el número secreto!"; 
        secretNumberDisplay.textContent = secretNumber; 
        body.style.backgroundColor = 'green'; 
        checkBestScore(); 
        restartButton.disabled = false; 
    } else if (attemptsLeft === 0) {
        hintText.textContent = "No te quedan mas jugadas! El número era " + secretNumber; 
        secretNumberDisplay.textContent = secretNumber; 
        body.style.backgroundColor = 'red'; 
        restartButton.disabled = false; 
    } else {
        
        hintText.textContent = userGuess < secretNumber ? "El número es mas grande!" : "El número es mas pequño!";
    }
}

// Función para comprobar la mejor puntuación
function checkBestScore() {
    const currentScore = 20 - attemptsLeft; 
    if (currentScore < bestScore || bestScore === 0) {
        bestScore = currentScore; 
        document.getElementById('best-score').textContent = bestScore; 
    }
}

// Agrega los eventos de clic a los botones
document.getElementById('submit-guess').addEventListener('click', submitGuess); 
restartButton.addEventListener('click', startGame); 

// Inicia el juego al cargar la página
startGame();
