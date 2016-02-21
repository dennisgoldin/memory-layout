$(function () {
  'use strict';

  var firstCard = "";
  var secondCard = "";
  var clickDisabled = false;
  var startTime = new Date().getTime();
  var elapsedTime = 0;
  var remainingLives = $(".life").length;

  var defaultIconPos = [];
// console.log(defaultIconPos);
// for (var i = 0; i < defaultIconPos.length; i++) {
//   console.log(defaultIconPos[i]);
// }

// Make an array of all card icon class strings from the DOM
$(".card-icon").children().each( function(index) {
  defaultIconPos.push($(this).attr("class"));
  console.log(index + " : " + defaultIconPos[index]);
});

console.log("***********");

// Shuffle the order of strings in the array
var randomIconPos = shuffle(defaultIconPos);

$.each(randomIconPos, function(index, value) {
  console.log(index + " : " + value);
});

// Update icon classes with new order via DOM
$(".card-icon").children().each( function(index) {
  $(this).attr("class", randomIconPos[index]);
});


// console.log(randomIconPos);
// for (var i = 0; i < randomIconPos.length; i++) {
//   console.log(i + " : " + randomIconPos[i]);
// }


// $.each(randomIconPos, function(index, arr) {
  // var myArr = $(".card-icon").children();
  // console.log( $(myArr[index]).html() + " : " + $(arr).html());
// });

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

  // function shuffle(array) {
  //   var currentIndex = array.length, temporaryValue, randomIndex;
  //   // While there remain elements to shuffle...
  //   while (0 !== currentIndex) {
  //     // Pick a remaining element...
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex -= 1;
  //     // And swap it with the current element.
  //     temporaryValue = array[currentIndex];
  //     array[currentIndex] = array[randomIndex];
  //     array[randomIndex] = temporaryValue;
  //   }
  //   return array;
  // }

  // Format timer string
  function format(num) {
    if (num < 10) {
      num = "0" + num;
    }
    return num;
  }

  // Timer
  var intervalId = window.setInterval( function() {
    var totalSeconds = Math.round((new Date().getTime() - startTime) / 1000);

    var hours = Math.floor(totalSeconds / 3600);
    totalSeconds = totalSeconds % 3600;

    var minutes = Math.floor(totalSeconds / 60);
    totalSeconds = totalSeconds % 60;

    var seconds = Math.floor(totalSeconds);

    hours = format(hours);
    minutes = format(minutes);
    seconds = format(seconds);

    elapsedTime = hours + ":" + minutes + ":" + seconds;

    $("#timer").text(elapsedTime);
  }, 250);

  // Click event
  $(".card").on("click", flip);

  function flip() {
    // Do not flip while checking for match
    if ( clickDisabled ) {
      return;
    }

    // Set which card was clicked first during attemped match
    if (firstCard === "") {
      firstCard = $(this).children().children().attr("class");
      $(this).addClass("matchAttempt");
      $(this).addClass("justClicked");
      console.log("firstCard => " + firstCard);
    // Set which card was clicked second during attemped match
    } else if (secondCard === "") {
      secondCard = $(this).children().children().attr("class");
      $(this).addClass("matchAttempt");
      $(this).addClass("justClicked");
      console.log("secondCard => " + secondCard);
    }

    // Check for matching cards
    if (firstCard === secondCard) {
      firstCard = "";
      secondCard = "";
      console.log("** Match! **");
      $(".matchAttempt").removeClass("matchAttempt").addClass("matched");
      $(".justClicked").removeClass("justClicked");
      console.log("firstCard => " + firstCard);
      console.log("secondCard => " + secondCard);
    } else if (firstCard != "" && secondCard != "" ) {
      console.log("**  Not a match! **");
      // Remove a heart for a failed match attempt after 600ms
      setTimeout( function () {
        $(".life:nth-child(" + remainingLives-- + ")").removeClass("life").removeClass("fa-heart").addClass("fa-heart-o");
      }, 600);
      firstCard = "";
      secondCard = "";
      clickDisabled = true;
      // Give card time to flip and render icon
      setTimeout( function () {
        clickDisabled = false;
        $(".matchAttempt").toggleClass("flip");
        $(".matchAttempt").children().toggleClass("showIcon");
        $(".matchAttempt").removeClass("matchAttempt");
      }, 1200);

    }
    console.log("** flip() **");
    $(this).addClass("flip");
    $(this).children().addClass("showIcon");
  }

  // User wins game --> popup modal
  window.setInterval( function(){
    if ( $(".matched").length === 24 ) {
      // Pause to allow last card to finish flipping
      setTimeout( function () {
        $(".modal").addClass("showModal");
        // Stop the timer
        window.clearInterval(intervalId);
        $("#elapsedTime").text(elapsedTime);
      }, 1300);
    }
    // User looses game --> popup modal
    if ($(".life").length === 0) {
      // Pause to allow last card to finish flipping
      setTimeout( function () {
        $(".modal").addClass("showModal");
      }, 1300);
    }
  }, 333);

})  // End of file.
