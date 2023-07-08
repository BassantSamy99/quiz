class Setting {
    constructor() {
        this.start = document.getElementById('startBtn');
        this.start.addEventListener('click',this.getUrl);
    }

    async getUrl() {
        this.category = document.getElementById('category').value;
        this.difficulity = Array.from(document.getElementsByName('difficulty')).filter(e=>e.checked)[0].value;
        this.amount = document.getElementById('numberOfQuestions').value;
        this.url = `https://opentdb.com/api.php?amount=${this.amount}&category=${this.category}&difficulty=${this.difficulity}`;
        this.response = await(await fetch(this.url)).json();
        this.resultQ = this.response.results;
        if (this.resultQ.length > 0) {
            $('#setting').fadeOut(500,()=> $('#quiz').fadeIn(500));
            new Quiz(this.resultQ);
        }
         
    }

}


class Quiz {
    constructor(questions) {
        this.questions=questions;
        this.i=0;
        this.countCorrectAns=0;
        this.questionNumber=document.getElementById('currentQuestion');
        this.totalNoOfQuestions = document.getElementById('totalNumberOfQuestions');
        this.currentQuestion=document.getElementById('question');
        this.answer=document.getElementById('rowAnswer');
        this.next=document.getElementById('next');
        this.showQuiz();

    }
     showQuiz () {
            this.questionNumber.innerHTML = (this.i)+1;
            this.totalNoOfQuestions.innerHTML=this.questions.length;
            this.currentQuestion.innerHTML=this.questions[this.i].question;
            this.correctAns = this.questions[this.i].correct_answer;
            this.inCorrectAns = this.questions[this.i].incorrect_answers;
            this.answers=[this.correctAns,...this.inCorrectAns];
            this. shuffledAnswers = shuffle(this.answers);

            function shuffle(array) {
                let currentIndex = array.length;
                let randomIndex;
                while (currentIndex != 0) {
                  randomIndex = Math.floor(Math.random() * currentIndex);
                  currentIndex--;
                  [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]];
                }
                return array;
              }


              for (let y=0 ; y<this.shuffledAnswers.length;y++) {
                this.answer.innerHTML +=`<div class="form-check">
            <label class="form-check-label">
                <input type="radio" class="form-check-input" name="answer" id='answer${y+1}' value='${this.shuffledAnswers[y]}'>
                ${this.shuffledAnswers[y]}
            </label>
        </div>`
              }

              this.next.addEventListener('click',  this.checkAnswer.bind(this));
            
        }

        checkAnswer() {
            this.answerRadios=document.getElementsByName('answer');
            this.chosenAnswer=[...this.answerRadios].filter((e)=>e.checked)[0].value;
            
            if (this.chosenAnswer==this.correctAns) {
                this.countCorrectAns++;
                console.log(this.countCorrectAns);
                $('#Correct').fadeIn(500,()=>
                $('#Correct').fadeOut(500));
            } else {
                $('#inCorrect').fadeIn(500,()=>
                $('#inCorrect').fadeOut(500));
            }

            this.nextQuestion();
        }
        
     nextQuestion() {
        this.i++;  
        if(this.i < this.questions.length){
            this.answer.innerHTML='';
            this.showQuiz();
        } else {
            $('#quiz').fadeOut(500,()=>$('#finish').fadeIn(500));
            new Finish(this.countCorrectAns);

        }


    }
    }
    
class Finish {
    constructor(noOfCorrectAns){
        this.noOfCorrectAns=noOfCorrectAns;
        this.score=document.getElementById('score');
        this.try=document.getElementById('tryBtn');
        this.fillScore();
    }

    fillScore() {
        this.score.innerHTML=`${this.noOfCorrectAns}`;
        this.try.addEventListener('click',this.tryAgain.bind(this));
    }
    tryAgain() {
        $('#finish').fadeOut(500,()=>
        $('#setting').fadeIn(500));
        location.reload()
    }
}

new Setting();































        // let i = 0;
        // do{
        //     this.questionNumber.innerHTML = i+1;
            // this.totalNoOfQuestions.innerHTML=this.questions.length;
        //     this.currentQuestion.innerHTML=this.questions[i].question;
        //     this.next.onclick = function() {
        //         i++;
        //     }
        // }while(i<this.questions.length);
       

 // for (let i=0; i<this.questions.length;i++) {
        //     this.questionNumber.innerHTML = i+1;
        //     this.totalNoOfQuestions.innerHTML=this.questions.length;
        //     this.currentQuestion.innerHTML=this.questions[i].question;


        // }
        

// console.log(this.amount);
//         console.log(this.start);
//         console.log(this.difficulity);
// let start = document.getElementById('startBtn');
// let amount =  document.getElementById('numberOfQuestions').value;
// let difficulity = document.getElementsByName('difficulty').checked;
// let start = document.getElementById('startBtn');
// start.onclick = function() {

// let amount =  document.getElementById('numberOfQuestions').value;
// let category = document.getElementById('category').value;
// let radioNode = document.getElementsByName('difficulty');
// let radioCheckedlement = Array.from(radioNode).filter(e=>e.checked)[0].value;
// console.log(category);
// console.log(radioCheckedlement)
// console.log(amount);



// }
// let radioArray = Array.from(radioNode);

// radioArray.forEach( (e) => {
//     if (e.checked) {
//         console.log(e.value)
//     }
// });


// for (radio of radioArray) {
//     if (radio.checked) {
//         console.log (radio.value)
//     }
// }



    
