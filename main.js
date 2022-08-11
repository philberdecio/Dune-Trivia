class Question {
    constructor(number, question, choices, answer, answerDisplay) {
        this.number = number;
        // integer
        this.question = question;
        // string
        this.choices = choices;
        // array of strings
        this.answer = answer;
        // integer referencing index in answers array
        this.answerDisplay = answerDisplay;
        this.asked = false;
    }
}

//single question for testing below

const question1 = new Question(
    1,
    "In God Emperor of Dune, what is the name of Leto's army?",
    ['The Sardaukar', 'The Honored Matres', 'The Fish Speakers', 'The House Guards'],
    "C",
    "the Fish Speakers"
)

const question2 = new Question(
    2,
    "What's the name of the Fremen who hands Paul a set of maker hooks when he's learning to ride a sandworm?",
    ['Stilgar', 'Shishkali', 'Shoab', 'Shamir'],
    "B",
    "Shishkali"
)

const questions = [question1, question2];
//this array will hold all questions

let score = 0;
let questions_asked = 0;
let currentQuestion = questions.pop();

document.querySelector("#start-button").addEventListener("click", nextQuestion);

function checkNext() {
    document.querySelector("#button-div").innerHTML = "";
    if (questions.length > 0) {
        currentQuestion = questions.pop();
        nextQuestion()
    } else {
        endGame();
    }
}


function nextQuestion() {
    let answerResult = document.querySelector("#result-div");
    answerResult.innerHTML = `<p id = "display-result"></p>`;
    document.querySelector("#button-div").innerHTML= ""
    currentQuestion.asked = true;
    let currentAnswer = currentQuestion.answerDisplay;
    renderQuestion(currentQuestion)
    let radios = document.querySelectorAll("input")
    let submitButton = document.querySelector("#toSubmit")
    submitButton.addEventListener("click",(e) => {
        e.preventDefault();
        for (let i = 0; i < radios.length; i++) {
            console.log(`length: ${radios.length}`)
            if (radios[i].checked === true) {
                if (radios[i].value === currentQuestion.answer) {
                        document.querySelector("#display-result").innerText = "Correct!"
                        score++;
                        document.querySelector("#button-div").innerHTML = `<button id ="next-button" type="button">Next</button>`
                        document.querySelector("#next-button").addEventListener("click", checkNext);
                        
                    } else if (radios[i] !== currentQuestion.answer) {
                        document.querySelector("#display-result").innerText = `Incorrect! The correct answer is ${currentAnswer}`;
                        document.querySelector("#button-div").innerHTML = `<button id ="next-button" type="button">Next</button>`
                        document.querySelector("#next-button").addEventListener("click", checkNext);
                        
                        
                    }
                }   
            }
        })
}

function renderQuestion (questionObject) {
    let questionText = document.querySelector(".q-text");
    let answers = document.querySelector("#answers-div");
    questionText.innerText = questionObject.question;
    answers.innerHTML = "<form id='answers-form'></form>";
    let answersForm = document.querySelector("#answers-form");
    answersForm.innerHTML = "<fieldset></fieldset>"
    let fieldSet = document.querySelector("fieldset");
    let answer1 = questionObject.choices[0];
    let answer2 = questionObject.choices[1];
    let answer3 = questionObject.choices[2];
    let answer4 = questionObject.choices[3];
    fieldSet.innerHTML = `<input type="radio" id="choice-A" name="choices" value="A"></input>
    <label class = "labels" id="label-a" for="A">${answer1}</label><input type="radio" id="choice-B" name="choices" value="B"></input>
    <label class = "labels" id = "label-b" for="B">${answer2}</label><input type="radio" id="choice-C" name="choices" value="C"></input>
    <label class = "labels" id="label-c" for="C">${answer3}</label><input type="radio" id="choice-D" name="choices" value="D"></input>
    <label class = "labels" id="label-d" for="D">${answer4}</label><button id="toSubmit" type="submit" form="answers-form">Submit</button>`
}

function endGame () {
    let displayResults = document.querySelector(".q-text");
    document.querySelector("#answers-div").innerHTML = `<p class="starter-text">Want to try again? Click the button below to get started!</p>`
    document.querySelector("#display-result").innerText = ""
    document.querySelector("#button-div").innerHTML = `<button id ="start-button" type="button">start</button>`
    document.querySelector("#start-button").addEventListener("click", newGame);
    if (score < 5) {
        displayResults.innerHTML = `You scored ${score} out of 10. Time to study up on your Dune lore!`;
    } else if (score < 8) {
        displayResults.innerHTML = `You scored ${score} out of 10. You really know your way around the Imperium!`
    } else {
        displayResults.innerHTML = `You scored ${score} out of 10. Nice job! You're practically a mentat!`
    }
}

function newGame () {
    const questions = [question1, question2];
    let score = 0;
    let questions_asked = 0;
    let currentQuestion = questions.pop();
    nextQuestion();
}
