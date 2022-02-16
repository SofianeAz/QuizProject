 


export class Quiz {

    category;
    correctAnswer;
    question;
    difficulty;
    incorrectAns1;
    incorrectAns2;
    incorrectAns3;

    constructor(arr){
        this.category = arr.category;
        this.correctAnswer = arr.correct_answer;
        this.question = arr.question;
        this.difficulty = arr.difficulty;
        this.incorrectAns1 = arr.answers[0];
        this.incorrectAns2 = arr.answers[1];
        this.incorrectAns3 = arr.answers[2];
    }



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
}
