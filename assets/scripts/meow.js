//
// theme switcher stuff
//

const themes = [
    "styles.css",
    "dark.css",
    "meow.css"
]

const currentTheme = [
    "default",
    "dark",
    "work in progress ;P"
]

let i = 0;
function cycleTheme() {
    i++;
    const theme = document.getElementById("theme");
    theme.href = "assets/styles/" + themes[i];
    if (i == 3) {
        i = 0;
        theme.href = "assets/styles/" + themes[i];
    }
    console.log("theme is: " + currentTheme[i]);

    const button = document.getElementById("switcher");
    button.textContent = "Cycle theme: " + "(" + currentTheme[i] + ")";
}

//
// stuff for loading content
//

function loadContent(content) {
    const quizcontent = document.getElementById("content");
    quizcontent.innerHTML='<object type="text/html" data="' + content +  '.html" ></object>';
}

//
// the quiz code (I stole this idk fully how it works :3)
//

let questions;
let currentQuestion = 0;
let correctAnswers = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');

function loadQuiz() {
    const select = document.getElementById('quiz-select');
    const selectedQuiz = select.options[select.selectedIndex].value;

    if (!selectedQuiz) return;

    fetch(selectedQuiz)
        .then(response => response.json())
        .then(data => {
            questions = data;
            currentQuestion = 0;
            correctAnswers = 0;
            loadQuestion();
        })
        .catch(error => {
            console.error('Error loading quiz:', error);
        });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function loadQuestion() {
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;

    const answerOptions = [];
    for (let option in question) {
        if (option !== 'question' && option !== 'correct_answer') {
            answerOptions.push({ key: option, value: question[option] });
        }
    }
    shuffleArray(answerOptions);

    optionsElement.innerHTML = '';

    answerOptions.forEach(option => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="radio" name="answer" value="${option.key}"> ${option.value} <br>`;
        optionsElement.appendChild(label);
    });
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        resultElement.textContent = 'Select an answer';
        return;
    }

    const userAnswer = selectedOption.value;
    const correctAnswer = questions[currentQuestion].correct_answer;

    if (userAnswer === correctAnswer) {
        resultElement.textContent = 'Correct!';
        correctAnswers++;
    } else {
        resultElement.textContent = 'Answer was: ' + questions[currentQuestion][correctAnswer];
    }

    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        resultElement.textContent += ' [QUIZ OVER]';
        scoreElement.textContent = `${correctAnswers}/${questions.length} questions correct`;
    }
}