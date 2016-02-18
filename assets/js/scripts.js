$(function () {
  'use strict';

  var inputs = $("input:checked");

  $(".card").on("click", flip);

  function flip() {
    console.log("** flip() **");
    $(this).toggleClass("flip");
    $(this).children().toggleClass("showIcon");
    // $(this).children().css({"opacity":"1",
    //                         "transition-delay":"0.25s"});
  }



})  // End of file.
