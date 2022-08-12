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

const question3 = new Question(
    3,
    "In Heretics of Dune, what is the name of the Supreme Bashar of the Bene Gesserit military forces?",
    ['Miles Teg', 'Darwi Odrade', 'Alef Burzmali', 'Tylwyth Waff'],
    "A",
    "Miles Teg"
)

const question4 = new Question(
    4,
    "In Dune Messiah, what name do the Bene Tleilax give to the Duncan Idaho ghola?",
    ['Otheym', 'Korba', 'Bijaz', 'Hayt'],
    "D",
    "Hayt"
)

const question5 = new Question(
    5,
    "What is the Bene Gesserit Missionaria Protectiva?",
    ['A breeding program', 'A form of espionage', 'A program of religious engineering', 'A military campaign'],
    "C",
    "a program of religious engineering"
)

const question6 = new Question(
    6,
    "What type of Ixian starship is invisible to prescient vision?",
    ['A heighliner', 'A no-ship', 'A spice shuttle', 'A defender ship'],
    "B",
    "a no-ship"
)

const question7 = new Question(
    7,
    "What type of genetically-engineered animals are used in the assassination attempt on Leto II and Ghanima?",
    ['Laza tigers', 'D-wolves', 'Chairdogs', 'Futars'],
    "A",
    "laza tigers"
)

const question8 = new Question(
    8,
    "What is Dr. Liet Kynes' field of expertise?",
    ['Medicine', 'Organic chemistry', 'Planetary ecology', 'Geology'],
    "C",
    "planetary ecology"
)

const question9 = new Question(
    9,
    "In Dune Messiah, which sense does Paul Muad'Dib lose?",
    ['Hearing', 'Sight', 'Taste', 'Smell'],
    "B",
    "sight"
)

const question10 = new Question(
    10,
    "In Dune, who is the Warmaster for House Atreides?",
    ['Duncan Idaho', 'Thufir Hawat', 'Hasimir Fenring', 'Gurney Halleck'],
    "D",
    "Gurney Halleck"
)

let questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10];
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
    questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10];
    score = 0;
    questions_asked = 0;
    currentQuestion = questions.pop();
    nextQuestion();
}
