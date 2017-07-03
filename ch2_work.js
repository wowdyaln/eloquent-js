
//Eloquent JavaScript 簡體中文版
//p24 FizzBuzz

  for (var number=1; number<=100; number++)
    {
      var three = number%3;
      var five = number%5;

      if ( (three == 0) && (five != 0) )
      {
        console.log("Fizz");
      }

      else if( (five == 0) && (three != 0) )
      {
        console.log("Buzz");
      }

      else if( (three == 0) && (five == 0) )
      {
        console.log("FizzBuzz");
      }

      else {
        console.log(number);
      };
    }


// p23 loopingaTriangle

var hash = "#";
for(var count=1; count <=7; count++){
  //debugger
    console.log(hash);
    hash += "#";
}

var hash = "#";
for(var count=1; count <=7; count++){
  hash += "#";
    console.log(hash);
}

function add(){
  for(var count=1; count <=7; count++){
    debugger
      console.log(hash);
      hash += "#";
  }
}



//p23 棋盤 還沒解出來

var s = "_";
var h = "#";
// s+h+s+h+s+h+s+h+"\n"+s+h+s+h+s+h+s+h

var temp = ""
for(i=0; i<8; i++){

  for(j=0; j<8; j++){
    if (j%2 == 0)
      temp += h;
    if (j%2 == 1)
      temp += s;
  }
  temp += "\n";

}
//======================
/*

j 01010101   i
  #_#_#_#_   0
  _#_#_#_#   1
  #_#_#_#_   0
  _#_#_#_#   1
  #_#_#_#_   0
  _#_#_#_#   1
  #_#_#_#_   0
  _#_#_#_#   1

*/
var s = "_";
var h = "#";
// s+h+s+h+s+h+s+h+"\n"+s+h+s+h+s+h+s+h
var temp = ""

for(i=0; i<8; i++){

  for(j=0; j<8; j++){
    if ((j%2 == 0 && i%2 == 0) || (j%2 == 1 && i%2 == 1))
      temp += h;
    if ((j%2 == 1 && i%2 == 0) || (j%2 == 0 && i%2 == 1))
      temp += s;
  }
  temp += "\n";

}


//更簡潔的寫法
var s = "_";
var h = "#";
// s+h+s+h+s+h+s+h+"\n"+s+h+s+h+s+h+s+h
var temp = ""

for(i=0; i<8; i++){
  temp += "\n";

  for(j=0; j<8; j++){
    if ((j+i)%2 == 0)
      temp += h;
    if ((j+i)%2 == 1)
      temp += s;
  }
}



// 任意長寬的棋盤
var width = 3;
var height = 5;



function board(width, height){
  var temp = ""

  for(i=0; i<height; i++){
    temp += "\n";
debugger;
    for(j=0; j<width; j++){
      if ((j+i)%2 == 0)
        temp += h;
      if ((j+i)%2 == 1)
        temp += s;
    }
  }
  return temp;
}




