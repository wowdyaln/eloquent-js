//p185

var para = document.querySelector("p");
var button = document.querySelector("button");

para.addEventListener("mousedown", function(event){
  console.log(" handler for button");
  if (event.which == 3)
    event.stopPropagation();
});
