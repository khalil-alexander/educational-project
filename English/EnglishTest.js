import { loadQuestions, getNextQuestion, checkAnswer } from '../TestEngine/QuestionLoader.js';

// Load questions on window load
window.onload = loadQuestions("C:\\Users\\willi\\Desktop\\GitHub\\educational-game\\educational-game\\Questions\\English Questions");



function selectchoice(id){
    return checkAnswer(id);
}