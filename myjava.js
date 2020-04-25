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
        var landing = document.getElementById("quizTime-container");
        var quizContainerEl = document.getElementById("quiz-container");
        var finalContainerEl = document.getElementById("final-container");
        var submitBnt = document.getElementById("submit");
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
                    //  hide questions 
                    quizContainerEl.setAttribute("class","container d-none");
                    finalContainerEl.setAttribute("class","container");
                    return;
                }
                timeRemaining = timeRemaining - 1;
                Countdown.setAttribute("value",timeRemaining);
            },1000);
            var clickTimeout = false;
            function generateQuestion(questionNum) {
               
                newFunction();

                colEl = quizContainerEl.children[0].children[1];
                for (var i=0; i<4; i++) {
                    var rowEl = document.createElement("div");
                    rowEl.setAttribute("class","row mb-1");
                    colEl.append(rowEl);

                    var colEl2 = document.createElement("div");
                    colEl2.setAttribute("class","col-12");
                    rowEl.append(colEl2);

                    buttonEl = document.createElement("button");
                    buttonEl.setAttribute("class","btn btn-secondary");
                    buttonEl.setAttribute("type","button");
                    buttonEl.innerHTML = questions[currentQuestion-1].choices[i];
                    colEl2.append(buttonEl);
                    buttonEl.addEventListener("click",function(){
                        
                        if (clickTimeout) {
                            return;
                        }
                        clickTimeout = true;
                        clearInterval(myInterval);
                        var colEl = quizContainerEl.children[0].children[1];
                        var rowEl = document.createElement("div");
                        rowEl.setAttribute("class","row border-top");
                        colEl.append(rowEl);

                        colEl = document.createElement("div");
                        colEl.setAttribute("class","col-12");
                        rowEl.append(colEl);

                        var parEl = document.createElement("p");
                        colEl.append(parEl);
                        if (this.innerHTML === questions[currentQuestion - 1].answer) {
                            parEl.innerHTML = "Correct!";
                        } else {
                            parEl.innerHTML = "Incorrect";
                            timeRemaining = timeRemaining - 20;
                            if (timeRemaining < 0) {
                                timeRemaining = 0;
                            }
                            Countdown.setAttribute("value",timeRemaining);
                        }
                        currentQuestion++;
                        if (currentQuestion>questions.length) {
                            score = timeRemaining;
                        }
                        setTimeout(function() {
                           
                            if (currentQuestion>questions.length) {
                                // Move to the results page 
                                quizContainerEl.setAttribute("class","container d-none");
                                finalContainerEl.setAttribute("class","container");
                                final.setAttribute("value",score);
                            } else {
                                generateQuestion(currentQuestion);
                                clickTimeout = false;
                                myInterval = setInterval(function() {
                                    if (timeRemaining<1) {
                                        clearInterval(myInterval);
                                        quizContainerEl.setAttribute("class","container d-none");
                                        finalContainerEl.setAttribute("class","container");
                                        return;
                                    }
                                    timeRemaining = timeRemaining - 1;
                                    Countdown.setAttribute("value",timeRemaining);
                                },1000);
                            }
                        },);
                    });
                }
                

            //creates the questions divs
                function newFunction() {
                    quizContainerEl.innerHTML = "";
                    rowEl = document.createElement("div");
                    rowEl.setAttribute("class", "row");
                    quizContainerEl.append(rowEl);
                    colEl = document.createElement("div");
                    colEl.setAttribute("class", "col-0 col-sm-2");
                    rowEl.append(colEl);
                    colEl = document.createElement("div");
                    colEl.setAttribute("class", "col-12 col-sm-8");
                    rowEl.append(colEl);
                    colEl = document.createElement("div");
                    colEl.setAttribute("class", "col-0 col-sm-2");
                    rowEl.append(colEl);
                    colEl = rowEl.children[1];
                    rowEl = document.createElement("div");
                    rowEl.setAttribute("class", "row mb-3");
                    colEl.append(rowEl);
                    colEl = document.createElement("div");
                    colEl.setAttribute("class", "col-12");
                    rowEl.append(colEl);
                    headerEl = document.createElement("h2");
                    headerEl.innerHTML = questions[questionNum - 1].title;
                    colEl.append(headerEl);
                }
            }
            function saveHighScore() {
                let initialsEl = document.getElementById("initials-entry");
                let newHighScore = {
                    initials: initialsEl.value,
                    highScore: score
                };
                console.log(newHighScore);
                highScores.push(newHighScore);
                console.log(highScores);
                localStorage.setItem("scores",JSON.stringify(highScores));
            }
            submitBnt.addEventListener("click",saveHighScore);
            
            generateQuestion(currentQuestion);
        }

        startBnt.addEventListener("click",startQuiz);

        highscoreBnt.addEventListener("click",function() {
            landing.setAttribute("class","container d-none");
            quizContainerEl.setAttribute("class","container d-none");
            finalContainerEl.setAttribute("class","container d-none");
            highscoreContainerEl.setAttribute("class","container");
            let colEl = document.getElementById("highscore-table");
            for (i=0; i<highScores.length; i++) {
                let rowEl = document.createElement("div");
                rowEl.setAttribute("class","row mb-1");
                colEl.append(rowEl);

                let colEl2 = document.createElement("div");
                colEl2.setAttribute("class","col-12 text-center");
                rowEl.append(colEl2);

                let parEl = document.createElement("div");
                parEl.innerHTML = "Initials: " + highScores[i].initials + "   Score: " + highScores[i].highScore;
                colEl2.append(parEl);
            }
        });
    
    };
    
initQuiz();