var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var userClickedPattern = [];

var level = 1;
var keyPress = false;


function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];
  userClickedPattern = [];

  $("h1").text("Level " + level);
  level++;
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  gamePattern.push(randomChosenColour)

}

$(".btn").on("click", function() {

  var userChosenColour = $(this).attr("id");

  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}



$(document).keypress(function() {
  if (keyPress === false) {
    nextSequence();
  }
  keyPress = true;
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over")
    setTimeout(function() {
      $("body").removeClass("game-over");
    });
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart")
    startOver();
  }
}

function startOver(){
  level = 1;
  gamePattern = [];
  keyPress = false;
}
