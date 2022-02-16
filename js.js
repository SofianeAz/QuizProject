// import * as Quiz from 'module/classQuiz.js';

// const { Quiz } = require('./module/classQuiz');

// Quiz = require('module/classQuiz.js');


const url = 'https://opentdb.com/api.php?amount=20&category=9&type=multiple';


const quizArray = new Array();


const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const resetBtn = document.getElementById('restart-btn');

const result = document.getElementById('result');
const quizContainer = document.getElementById('quiz');
const cssObj = window.getComputedStyle(quizContainer, null);

var Total = 20;
var countGood = 0;

async function startQuiz() {
    const data = await fetch(url).then((response) => response.json());
    // console.log(data.results);
    data.results.forEach(element => {
        quizArray.push(element);
    });
    createHtmlQuestion();
    createQuiz(quizArray[0]);
    quizArray.shift();
    nextBtn.addEventListener('click', () => {
        // if all questions left put restart
        if(quizArray.length == 0){
            console.log(countGood);
            result.classList.remove('hide');
            result.innerHTML = '';
            result.appendChild(document.createTextNode('Resultat : '+countGood+' / 10'));
            // message selon le resultat
            resultMsg();
            // on switch l'affichage des boutons 
            resetBtn.classList.remove('hide');
            nextBtn.classList.add('hide');
            //changement du background color
            document.getElementById('main').setAttribute('style', 'background: rgb(53, 109, 182);');
        } else {
            // else do next question && re enable buttons
            enableButtons();
            // counter
            let x = document.getElementById('main').style.background;
            console.log(x);
            if(x == 'rgb(53, 170, 49)'){
                countGood += 1;
                console.log(countGood);
            }  
            //
            quizContainer.innerHTML = '';
            createHtmlQuestion();
            createQuiz(quizArray[0]);
            quizArray.shift();
            document.getElementById('main').setAttribute('style', 'background: rgb(53, 109, 182);');  
            // let x = document.getElementById('main').style.background;
            
        }
    })
    // if(quizArray[0] == undefined){
    //     resetBtn.classList.remove('hide');
    // }
    // if(quizArray.length === 0){
    //     resetBtn.classList.remove('hide');
    // }
};

// bouton qui start le quiz
startBtn.addEventListener('click', () => {  
    result.classList.add('hide');  
    startBtn.classList.add('hide');
    startQuiz();
})
// bouton restart
resetBtn.addEventListener('click', () => { 
    countGood = 0;  
    result.innerHTML = '';
   quizContainer.innerHTML = '';   
   result.classList.add('hide');
   resetBtn.classList.add('hide');
    startQuiz();
})

function createQuiz(param) {
    let question = param;
    createQuestion(question);
}
////// test pour l'utf8++//////////////
function decode_utf8(s) {
    return decodeURIComponent(escape(s));
  }


function createQuestion(data) {
    console.log(data);
    const right = document.getElementById('right');
    right.innerText = "Good answer : " + data.correct_answer;
    right.setAttribute('class', 'hide');
    // for (const [key, value] of Object.entries(data)) {
    for (const values in data){
        console.log(values)
        if (values == 'category') {
            const cat = document.getElementById('category');
            cat.innerText = data.category;
        }
        if (values == 'question') {
            const question = document.getElementById('question');
            question.innerText = decode_utf8(data.question);
            // /data.question;
           
        }
        if (values == 'correct_answer') {
            const corrects = document.getElementById('correct');
            corrects.innerText = data.correct_answer;
            corrects.addEventListener('click', () => {
                    document.getElementById('main').setAttribute('style', 'background: rgb(53, 170, 49);;');
                    showAnswer(right);
                    disableButtons();
                    nextBtn.classList.remove('hide');
                    document.getElementById('main').dataset = 'correct';
                    setBtnColors();
            })
        }

        if (values == 'incorrect_answers') {
            for(i = 0; i < data.incorrect_answers.length; i++){
                const falseAnswer = document.getElementById('false'.concat(i));
                falseAnswer.innerText = data.incorrect_answers[i];
                falseAnswer.addEventListener('click', () => {
                    document.getElementById('main').setAttribute('style', 'background: rgb(156, 39, 39);');
                    showAnswer(right);
                    disableButtons();
                    nextBtn.classList.remove('hide');
                    document.getElementById('main').dataset = 'false';
                    setBtnColors();
             })
            }
        }
        
    }

}

function showAnswer(param){
    param.classList.remove('hide');
}

function createHtmlQuestion() {

    let htmlShuffle = new Array();
    // category
    const categ = document.createElement('p');
    categ.setAttribute('id', 'category');
    quizContainer.appendChild(categ);
    // question
    const question = document.createElement('h3');
    question.setAttribute('id', 'question');
    quizContainer.appendChild(question);
    // correct answer
    const correct = document.createElement('button');
    correct.setAttribute('id', 'correct');
    htmlShuffle.push(correct);
    // quizContainer.appendChild(correct);


    // reponse 1  
    const answer1 = document.createElement('button');
    answer1.setAttribute('id', 'false0');
    htmlShuffle.push(answer1);
    // quizContainer.appendChild(answer1);

    // reponse 2 
    const answer2 = document.createElement('button');
    answer2.setAttribute('id', 'false1');
    htmlShuffle.push(answer2);
    // quizContainer.appendChild(answer2);
    // reponse 3   
    const answer3 = document.createElement('button');
    answer3.setAttribute('id', 'false2');
    htmlShuffle.push(answer3);
    // quizContainer.appendChild(answer3);

    // bonne reponse
    const resultAns = document.createElement('h4');
    resultAns.setAttribute('id', 'right');
    resultAns.setAttribute('class', 'hide');
    quizContainer.appendChild(resultAns);
    let shuffled = htmlShuffle.sort(() => Math.random() - .5)
    shuffled.forEach(ele => quizContainer.appendChild(ele));
}

function disableButtons(){
    const ele1 = document.getElementById('false0');
    const ele2  = document.getElementById('false1');
    const ele3  = document.getElementById('false2');
    const ele4  = document.getElementById('correct');
    ele1.disabled = true;
    ele2.disabled = true;
    ele3.disabled = true;
    ele4.disabled = true;

}
function enableButtons(){
    const ele1 = document.getElementById('false0');
    const ele2  = document.getElementById('false1');
    const ele3  = document.getElementById('false2');
    const ele4  = document.getElementById('correct');
    ele1.disabled = false;
    ele2.disabled = false;
    ele3.disabled = false;
    ele4.disabled = false;

}

function resultMsg(){
    if(countGood == 20){
       return quizContainer.innerHTML = `<img src='https://st2.depositphotos.com/4071863/5889/v/950/depositphotos_58896203-stock-illustration-congratulations-typography-lettering-text-card.jpg' class='image'>
                                    <h4 class="done">WELL DONE ! YOU\'RE A BEAST !!!</h4>`;
    }
    if(countGood >= 15 && countGood < 20){
        return quizContainer.innerHTML = `<img src='https://st2.depositphotos.com/4071863/5889/v/950/depositphotos_58896203-stock-illustration-congratulations-typography-lettering-text-card.jpg' class='image'>
                                     <h4 class="done"> Wow you're pretty good! Well done but not perfect yet !</h4>`;
    }
    if(countGood >= 10 && countGood < 15){
       return quizContainer.innerHTML = `<img src='https://st2.depositphotos.com/4071863/5889/v/950/depositphotos_58896203-stock-illustration-congratulations-typography-lettering-text-card.jpg' class='image'>
                                    <h4 class="done">Not bad! You can do better I am sure of it !</h4>`;
    }
    if(countGood < 10 && countGood <= 5){
        return quizContainer.innerHTML = `<img src='https://st2.depositphotos.com/4071863/5889/v/950/depositphotos_58896203-stock-illustration-congratulations-typography-lettering-text-card.jpg' class='image'>
                                    <h4 class="done">Eww that was bad bruh !</h4>`;
    }
    if(countGood > 10 && countGood < 15){
       return quizContainer.innerHTML = `<img src='https://st2.depositphotos.com/4071863/5889/v/950/depositphotos_58896203-stock-illustration-congratulations-typography-lettering-text-card.jpg' class='image'>
                                    <h4 class="done">DONE ! Here is your result!</h4>`;
    }
}

function setBtnColors(){
    const ele1 = document.getElementById('false0');
    const ele2  = document.getElementById('false1');
    const ele3  = document.getElementById('false2');
    const corr  = document.getElementById('correct');
    if(ele1.disabled == true && ele2.disabled == true && ele3.disabled == true && corr.disabled == true){
        ele1.style.background = 'rgb(156, 39, 39)';
        ele2.style.background = 'rgb(156, 39, 39)';
        ele3.style.background = 'rgb(156, 39, 39)';
        corr.style.background = 'rgb(53, 170, 49)';
        ele1.style.color = 'white';
        ele2.style.color = 'white';
        ele3.style.color = 'white';
        corr.style.color = 'white';
    } else {
        ele1.style.background  = 'black';
        ele2.style.background  = 'black';
        ele3.style.background  = 'black';
        corr.style.background  = 'black';
    }
}
// function getRandomInt(max) {
//     return Math.floor(Math.random() * max);
// }
//     category: "General Knowledge"
// correct_answer: "Economics"
// difficulty: "medium"
// incorrect_answers: Array(3)
// 0: "Philosophy"
// 1: "Politics"
// 2: "Physics"
// length: 3
// [[Prototype]]: Array(0)
// question: "This field is sometimes known as &ldquo;The Dismal Science.&rdquo;"
// type: "multiple"