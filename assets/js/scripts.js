$(function () {
  'use strict';

  // var inputs = $("input:checked");

  $(".card").on("click", flip);

  function flip() {
    console.log("** flip() **");
    $(this).toggleClass("flip");
    $(this).children().toggleClass("showIcon");
  
  }



})  // End of file.
