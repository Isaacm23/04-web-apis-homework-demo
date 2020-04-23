function quizGame(){
    // Define variables to store questions, time, score, all-time score
    // -- See questions.js for variable being used to store the questions
    var time = 0;
    var defaultTime = (15*questions.length);
    var penaltyTime = 15;
    var currentQuestion = 0;
    timeDisplayEl = document.getElementById("time-display")


    // Create code to start the game.
    // -- This was done with HTML. No need to dynamically generate ... currently
    function firstButtons() {
        document.getElementById("start-btn").addEventListener("click", function(){
            document.getElementById("main-container").innerHTML = "";
            currentQuestion = 0;
            renderQuestion();
            timer();
        });
        document.getElementById("view-highscore-btn").addEventListener("click", function(){
            handleHighscore();
        });
        
    }
};
firstButtons();
    // Start a timer and display countdown
    function timer() {
        time = defaultTime;
        // Creates an interval that runs every 1000 ms or 1 second.
        // Referenced instructors example for creating a timer.
        mainInterval = setInterval(function(){
            // Used to calculate the current time. The interval runs every second. Therefore, 1 second is subtracted every interation.
            time = time - 1;

            // Changes the inner html of the element that displays the time remaining ever interval, ie every second.
            timeDisplayEl.innerHTML = time;

            if (time <= 0){
                // Causes mainInterval to end
                clearInterval(mainInterval);
                // Due to the time subtraction, sometimes the final time is less than 0. This causes the display to be 00 when the clock runs out.
                timeDisplayEl.innerHTML = "00";
                // Only used for testing.
                renderEndGame();
            }
        }, 1000);

    }