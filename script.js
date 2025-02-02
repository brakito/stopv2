document.addEventListener('DOMContentLoaded', () => {
    const mainScreen = document.getElementById('main-screen');
    const gameScreen = document.getElementById('game-screen');
    const timerDisplay = document.getElementById('timer');
    const quadrants = document.querySelectorAll('.quadrant');
    const endGameButton = document.getElementById('end-game');

    let timer;
    let timeLeft;
let categories = [
    { categoria: "fruta", tipo: "Dibujar" },
    { categoria: "fruta", tipo: "Escribir" },
    { categoria: "canción", tipo: "Escribir" },
    { categoria: "país", tipo: "Escribir" },
    { categoria: "animal", tipo: "Dibujar" },
    { categoria: "animal", tipo: "Escribir" },
    { categoria: "película", tipo: "Escribir" },
    { categoria: "deporte", tipo: "Dibujar" },
    { categoria: "deporte", tipo: "Escribir" },
    { categoria: "color", tipo: "Escribir" },
    { categoria: "objeto", tipo: "Dibujar" },
    { categoria: "objeto", tipo: "Escribir" },
    { categoria: "comida", tipo: "Dibujar" },
    { categoria: "comida", tipo: "Escribir" },
    { categoria: "profesión", tipo: "Dibujar" },
    { categoria: "profesión", tipo: "Escribir" },
    { categoria: "marca", tipo: "Escribir" },
    { categoria: "personaje", tipo: "Dibujar" },
    { categoria: "personaje", tipo: "Escribir" },
    { categoria: "superhéroe", tipo: "Dibujar" },
    { categoria: "superhéroe", tipo: "Escribir" },
    { categoria: "instrumento", tipo: "Dibujar" },
    { categoria: "instrumento", tipo: "Escribir" },
    { categoria: "juguete", tipo: "Dibujar" },
    { categoria: "juguete", tipo: "Escribir" },
    { categoria: "lugar", tipo: "Escribir" },
    { categoria: "vehículo", tipo: "Dibujar" },
    { categoria: "vehículo", tipo: "Escribir" },
    { categoria: "serie", tipo: "Escribir" },
    { categoria: "acción", tipo: "Dibujar" },
    { categoria: "acción", tipo: "Escribir" },
    { categoria: "sentimiento", tipo: "Escribir" },
    { categoria: "herramienta", tipo: "Dibujar" },
    { categoria: "herramienta", tipo: "Escribir" },
    { categoria: "nombre", tipo: "Escribir" },
    { categoria: "apellido", tipo: "Escribir" }
];

    // Función para generar un sonido
    function playAlertSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = 'square'; // Tipo de onda (square, sine, triangle, sawtooth)
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Frecuencia en Hz (440 Hz = La4)
        gainNode.gain.setValueAtTime(1, audioContext.currentTime); // Volumen

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start(); // Iniciar el sonido
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1); // Fade out
        oscillator.stop(audioContext.currentTime + 1); // Detener después de 1 segundo
    }

// Modifica la función startGame para aceptar un parámetro "easyMode"
function startGame(minutes, easyMode = false) {
    mainScreen.style.display = 'none';
    gameScreen.style.display = 'block';

    timeLeft = minutes * 60;
    updateTimer();

    // Seleccionar 4 categorías aleatorias
    const selectedCategories = getRandomCategories(4);

    // Generar una letra aleatoria (la misma para todos los cuadrantes en modo fácil)
    const letter = getRandomLetter();

    // Mostrar las categorías en los cuadrantes
    quadrants.forEach((quadrant, index) => {
        const category = selectedCategories[index];
        const currentLetter = easyMode ? letter : getRandomLetter(); // Usar la misma letra en modo fácil
            quadrant.innerHTML = `<strong class="q_type">${category.tipo}</strong>
                                  <strong class="q_category">${category.categoria} con ${currentLetter}</strong>
                                  <strong class="q_letter">${currentLetter}</strong>`;
    });

    // Iniciar el temporizador
    timer = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}
    // Función para terminar el juego
    function endGame() {
        clearInterval(timer);
        playAlertSound(); // Reproducir sonido de alerta
        alert('¡Tiempo terminado!');
        resetGame();
    }

    // Función para reiniciar el juego
    function resetGame() {
        mainScreen.style.display = 'block';
        gameScreen.style.display = 'none';
        quadrants.forEach(quadrant => quadrant.innerHTML = '');
    }

    // Función para actualizar el temporizador
    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // Función para obtener categorías aleatorias
    function getRandomCategories(count) {
        const shuffled = categories.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    // Función para obtener una letra aleatoria
    function getRandomLetter() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return letters[Math.floor(Math.random() * letters.length)];
    }

    // Event listeners para los botones de tiempo
    document.getElementById('1-minute').addEventListener('click', () => startGame(1));
    document.getElementById('2-minutes').addEventListener('click', () => startGame(2));
    document.getElementById('3-minutes').addEventListener('click', () => startGame(3));

    // Event listeners para los botones de modo fácil
    document.getElementById('1-minute-easy').addEventListener('click', () => startGame(1, true));
    document.getElementById('2-minutes-easy').addEventListener('click', () => startGame(2, true));
    document.getElementById('3-minutes-easy').addEventListener('click', () => startGame(3, true));
    // Event listener para el botón de terminar juego
    endGameButton.addEventListener('click', endGame);
});
