// questions
    var questions = [ 
        {
            title: "Question 1: :What is string interpolation?",
            choices: ["printing string to console", "joining multiple strings together", "using template literals to embed varibles into strings", "changing the value of a varible"],
            answer: "using template literals to embed varibles into strings"
        },
        {
            title: "Question 2: What is the correct way to call the random method on the Math global object?",
            choices: ["random.Math(", "Math.random()", "math.random()", "math(random)"],
            answer: "Math.random()"
        },
        {
            title: "Question 3: What function is used to print code into the console",
            choices: ["console.log()", "ConsoleLog", "function()", "Chicken()"],
            answer: "console.log()"
        },
        {
            title: "Question 4: What charters are used to comment in javascript code ",
            choices: ["--", "...", "comment/", "//"],
            answer: "//"
        },
       
    ];


function initQuiz() {
    
        let timeRemaining=0;
    
        
// variables used 
        var Countdown = document.getElementById("countdown");
        var startBnt = document.getElementById("start-button");
        var final = document.getElementById("final-score");
        var numQuestions = questions.length;
        var landing = document.getElementById("landing-container");
        var quizContainerEl = document.getElementById("quiz-container");
        var finalContainerEl = document.getElementById("final-container");
        var submitBnt = document.getElementById("submit-initials");
        var highscoreContainerEl = document.getElementById("highscore-container");
        var highscoreBnt = document.getElementById("highscore-button");
        var highScores = [];
            //  stores and receives arrays
        if (JSON.parse(localStorage.getItem('scores')) !== null) {
            highScores = JSON.parse(localStorage.getItem("scores"));
        }
    
        function startQuiz() {

            quizContainerEl.setAttribute("class","container");
            var currentQuestion = 1;
            var score = 0;
    // 4 questions and 20 seconds for each one
            timeRemaining = numQuestions * 20;
            Countdown.setAttribute("value",timeRemaining);
            //  Stops the interval
            var myInterval = setInterval(function() {
                if (timeRemaining<1) {
                    clearInterval(myInterval);
                    //  When the final question is answered or the timer reaches zero, the quiz container is hidden and the score container is displayed, where the user enters their initials
                    quizContainerEl.setAttribute("class","container d-none");
                    finalContainerEl.setAttribute("class","container");
                    return;
                }
                timeRemaining = timeRemaining - 1;
                Countdown.setAttribute("value",timeRemaining);
            },1000);
           