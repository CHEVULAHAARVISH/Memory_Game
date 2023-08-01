var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var gameStarted = false;
var level = 0;

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#' + randomChosenColour).fadeOut(200).fadeIn(200);
    playSound(randomChosenColour);
  
}
//user click
$(".btn").on("click",function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer((userClickedPattern.length-1));
});

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 200);
  }
// detecting if key is pressed then start or touch screen or anything
$(document).on("keypress touchstart", function () {

    if (!gameStarted) {
        $("#level-title").text("LEVEL "+level);
        nextSequence();
        gameStarted = true;
        
    }
});
//starting again 
function startOver(){
    level = 0;
    gamePattern=[];
    gameStarted=false;
    

}
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Correct!");
        if (userClickedPattern.length === gamePattern.length) {
            // User finished their sequence correctly, wait a moment before starting the next sequence.
            setTimeout(function () {
                nextSequence();
                userClickedPattern = []; // Reset userClickedPattern for the next level
            }, 1000);
        }
    } else {
        var waudio = new Audio("./sounds/wrong.mp3");
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 300);
        $("h1").text("Game Over, Press Any Key to Restart")
        waudio.play();
        startOver();
        
    }
}





