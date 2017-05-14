//要貼到 console 裡面去

  document.body.style.background = "blue";
  setTimeout(function(){
    document.body.style.background = "yellow";
  }, 2000);


// clearTimeout
var bombTimer = setTimeout(function(){
  console.log("boom!");
}, 2000);

if (Math.random() < 0.5){
  console.log("defused");
  clearTimeout(bombTimer);
}

// setInterval ; clearInterval
var ticks = 0;
var clock = setInterval(function(){
  console.log("tick", ticks++);
  if (ticks == 10){
    clearInterval(clock);
    console.log("stop.")
  }
}, 200);

//包起來
function tick(){
  var ticks = 0;
  var clock = setInterval(function(){
    console.log("tick", ticks++);
    if (ticks == 10){
      clearInterval(clock);
      console.log("stop.")
    }
  }, 200);
}
