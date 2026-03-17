// This will have the interactivity in math page

// Hello reader

// Questions

const questions = [
    {
        question: "What is 5 + 3?",
        choices: ["6", "7", "8", "9"],
        correctAnswer: 2
      },
      {
        question: "What is 12 × 4?",
        choices: ["36", "48", "52", "44"],
        correctAnswer: 1
      },
      {
        question: "What is 100 ÷ 5?",
        choices: ["15", "20", "25", "30"],
        correctAnswer: 1
      },
      {
        question: "What is 15 - 8?",
        choices: ["5", "6", "7", "8"],
        correctAnswer: 2
      },
      {
        question: "What is 7 × 8?",
        choices: ["54", "56", "58", "55"],
        correctAnswer: 1
      },
      {
        question: "What is 36 ÷ 6?",
        choices: ["4", "3", "6", "7"],
        correctAnswer: 2
      },
      {
        question: "What is 25 + 17?",
        choices: ["40", "41", "42", "43"],
        correctAnswer: 2
      },
      {
        question: "What is 9 × 9?",
        choices: ["72", "81", "90", "99"],
        correctAnswer: 1
      },
      {
        question: "What is 100 - 18?",
        choices: ["81", "82", "67", "85"],
        correctAnswer: 1
      },
      {
        question: "What is 12 ÷ 4?",
        choices: ["6", "7", "3", "4"],
        correctAnswer: 2
      }
    
];


// Shuffle questions

function shuffle(array){
    const shuffled = [...array];
    for(let i = shuffled.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * i);
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}


// Game

const finalQuestions = shuffle(questions);
let currentQuestion = 0;
let score = 0;
let numCorrect = 0;

// Needed classes

const correctPage = document.querySelector('.correct')
const incorrectPage = document.querySelector('.incorrect')
const button = document.querySelector(".next");
console.log(button);


// Showing the question

function displayQuestion(){
    let scoreboard = document.getElementById('score');
    let QuestionValue = document.getElementById('question-value');
    let choiceA = document.getElementById('0');
    let choiceB = document.getElementById('1');
    let choiceC = document.getElementById('2');
    let choiceD = document.getElementById('3');

    scoreboard.textContent = "Score: " + score;
    
    QuestionValue.textContent = "Question: " + finalQuestions[currentQuestion].question;
    choiceA.textContent =  "A: " + finalQuestions[currentQuestion].choices[0];
    choiceB.textContent =  "B: " + finalQuestions[currentQuestion].choices[1];
    choiceC.textContent =  "C: " + finalQuestions[currentQuestion].choices[2];
    choiceD.textContent =  "D: " + finalQuestions[currentQuestion].choices[3];
}

// Selecting answer
function answerSelect(){
    let choices = document.querySelectorAll('.choice');

    choices.forEach(answerChoice => {
        answerChoice.addEventListener("click",() =>{
        if(Number(answerChoice.id) === finalQuestions[currentQuestion].correctAnswer){
            document.querySelectorAll(".answer").forEach(text => {
              text.textContent = "Answer: " + finalQuestions[currentQuestion].choices[finalQuestions[currentQuestion].correctAnswer];
            }
            );
            console.log(finalQuestions[currentQuestion].choices[finalQuestions[currentQuestion].correctAnswer]);
            correctPage.style.display = 'block';
            
            score += 10;
            numCorrect++;
            
        } else{
            let correctText = document.querySelectorAll(".answer");
            document.querySelectorAll(".answer").forEach(text => {
              text.textContent = "Answer: " + finalQuestions[currentQuestion].choices[finalQuestions[currentQuestion].correctAnswer];
            }
            );
            incorrectPage.style.display = 'block';
            if((score-10) >= 0){
              score -= 10;
            }
            else{
              score = 0;
            }
        }
        nextQuestion();
        }
        )
    }
    )
}



// Go to next question
function nextQuestion() {
  selectedAnswer = null;
  currentQuestion++;
  if(currentQuestion < finalQuestions.length){
    displayQuestion();
  }
  else{
    let resultsPage = document.querySelector('.result-page');
    let results = document.querySelector('.result');
    
    resultsPage.style.display = 'block';

    results.textContent = "You got: " + numCorrect + "/" + finalQuestions.length +" with a score of: " + score;
    
    
  }
}

// Clicking next button for incorrectPage and correctPage
document.querySelectorAll(".next").forEach(button => {
  button.addEventListener("click", () => {
    correctPage.style.display = 'none';
    incorrectPage.style.display = 'none';
  });
});

// Result Page buttons
const englishBtn = document.getElementById('english')
const homeBtn = document.getElementById('home')
const againBtn = document.getElementById('again')

englishBtn.addEventListener("click", () => {
  window.location.href = "../English/EnglishInteractive.html";
})
homeBtn.addEventListener("click", () => {
  window.location.href = "../index.html";
})
againBtn.addEventListener("click", () => {
  window.location.href = "math.html";
})

// Loads quiz-game
answerSelect();
displayQuestion();