// Variables globales
let timer = document.querySelector(".timer");
let quizContainer = document.querySelector(".container");
let nextButton = document.getElementById("next-button");
let numOfQuestions = document.querySelector(".number-of-count");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restartButton = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 10;
let countdown;
let quizArray = [];

// Colores predefinidos con sus nombres
const colors = [
    { name: "Rojo", code: "#FF0000" },
    { name: "Azul", code: "#0000FF" },
    { name: "Verde", code: "#00FF00" },
    { name: "Amarillo", code: "#FFFF00" },
    { name: "Naranja", code: "#FFA500" },
    { name: "Morado", code: "#800080" },
    { name: "Rosado", code: "#FFC0CB" },
    { name: "Cyan", code: "#00FFFF" }
];

// Función para generar un valor aleatorio de un array
const generateRandomValue = array => array[Math.floor(Math.random() * array.length)];

// Función para poblar el arreglo de preguntas del quiz
const populateQuiz = () => {
    for (let i = 0; i < 5; i++) {
        let question = generateRandomValue(colors);
        let options = [generateRandomValue(colors), generateRandomValue(colors), generateRandomValue(colors), question];
        options.sort(() => Math.random() - 0.5);
        quizArray.push({ correct: question, options: options });
    }
};

// Función para mostrar la siguiente pregunta
const displayNextQuestion = () => {
    questionCount++;

    if (questionCount === quizArray.length) {
        displayContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        userScore.textContent = `Tu puntuación es ${scoreCount} de ${questionCount}`;
    } else {
        numOfQuestions.textContent = `${questionCount + 1} de ${quizArray.length} Pregunta`;

        displayQuiz(questionCount);

        count = 10;
        clearInterval(countdown);

        displayTimer();
    }

    nextButton.classList.add("hide");
};

// Función para mostrar el temporizador
const displayTimer = () => {
    countdown = setInterval(() => {
        timer.innerHTML = `<span>Tiempo restante: </span>${count}s`;
        count--;
        if (count === 0) {
            clearInterval(countdown);
            displayNextQuestion();
        }
    }, 1000);
};

// Función para mostrar la pregunta actual y sus opciones
const displayQuiz = (questionIndex) => {
    let quizCards = document.querySelectorAll(".container-mid");
    quizCards.forEach(card => card.classList.add("hide"));
    quizCards[questionIndex].classList.remove("hide");
};

// Función para crear el quiz
const createQuiz = () => {
    quizArray.sort(() => Math.random() - 0.5);
    quizArray.forEach(question => {
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        div.innerHTML = `
            <p class="question-color" style="color: ${question.correct.code}">${question.correct.name}</p>
            <div class="button-container">
                <button class="option-div" data-option="${question.options[0].name}" style="background-color: ${question.options[0].code}" onclick="checkAnswer(this)"></button>
                <button class="option-div" data-option="${question.options[1].name}" style="background-color: ${question.options[1].code}" onclick="checkAnswer(this)"></button>
                <button class="option-div" data-option="${question.options[2].name}" style="background-color: ${question.options[2].code}" onclick="checkAnswer(this)"></button>
                <button class="option-div" data-option="${question.options[3].name}" style="background-color: ${question.options[3].code}" onclick="checkAnswer(this)"></button>
            </div>
        `;
        quizContainer.appendChild(div);
    });
};

// Función para verificar la respuesta del usuario
const checkAnswer = (userOption) => {
    let userSolution = userOption.getAttribute("data-option");
    let question = document.querySelectorAll(".container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    if (userSolution === quizArray[questionCount].correct.name) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        options.forEach(element => {
            if (element.getAttribute("data-option") === quizArray[questionCount].correct.name) {
                element.classList.add("correct");
            }
        });
    }

    clearInterval(countdown);
    options.forEach(element => {
        element.disabled = true;
        element.style.cursor = "default"; // Deshabilita el cursor de apuntar
    });
    nextButton.classList.remove("hide");
};

// Función para reiniciar el juego
const restartGame = () => {
    quizArray = [];
    populateQuiz();
    questionCount = 0;
    scoreCount = 0;
    clearInterval(countdown);
    count = 10;
    displayContainer.classList.add("hide");
    scoreContainer.classList.add("hide");
    startScreen.classList.remove("hide");
};

// Asignación de eventos
nextButton.addEventListener("click", displayNextQuestion);
restartButton.addEventListener("click", restartGame);
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    populateQuiz();
    createQuiz();
    displayQuiz(questionCount);
    displayTimer();
});

// Inicialización del juego al cargar la página
window.addEventListener("load", () => {
    restartGame();
});
