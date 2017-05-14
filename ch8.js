//JS Ninja p59 呼叫 constructor 沒有加上 new 會怎樣？

function Ninja(){
  this.skulk = function(){ //不用參數
    return this;
  }
}

var a = new Ninja();

var ea = Ninja();
//沒有加 new, 會在 window 物件增加屬性：skulk 然後value 是一個匿名function

// p106
function Person(name){
  this.name = name;
}

var a = new Person("roro");

var ea = Person("roro");
//沒有加 new, 會在 window 物件增加屬性：name 然後value 是"roro"
//其實等於就是新建立了一個 global variable: name 然後value 是"roro"

//p108 debugging
// 把任意數字，轉換成2~10進位 （2進位 ，8進位，10進位）
//16進位是不行的！
function numberToString(n, base){
  var result = "", sign = "";
  if (n < 0){
    sign = "-"
    n = -n;
  }
  do {
    debugger
    result = String(n % base) + result;
    n /= base; //這邊錯了！
  } while (n > 0);
  return sign + result;
}
// 修正
function numberToString(n, base){
  var result = "", sign = "";
  if (n < 0){
    sign = "-"
    n = -n;
  }
  do {
    // debugger
    result = String(n % base) + result;
    n = Math.floor(n/base);
  } while (n > 0);
  return sign + result;
}


//自己寫一個 2~9進位的值 => 十進位的值
7進位 245
2*7*7 +4*7 + 5
/*
Math.pow()的語法：
Math.pow(base, exponent)
base：基底。
exponent：指數。

Number("929") => 929
*/


function stringTobaseTen(string, base){
  var array = string.split("")
  var baseTen = 0;
  for(i = 0; i < array.length; i++){
    baseTen += Number(array[i]) * Math.pow(base, (array.length)-1-i);
  }
  return baseTen;
}
//寫出來了！string只能是正整數

// p109  try/catch / throw
function promptNumber(question){
  var result = Number(prompt(question, "")); //把輸入的string 轉換成為 number
  if (isNaN(result))
    return null;
  else
    return result;
}

//
function promptDirection(question){
  var result = prompt(question, "");
  if (result.toLowerCase() == "left")
    return "L";
  if (result.toLowerCase() == "right")
    return "R";
  throw new Error("錯誤的方向：" + result);
}

function look(){
  if (promptDirection("which way") == "L")
    return "a house";
  else
    return "two angry bears"
}

try{
  console.log("you see", look());
} catch (error){
  console.log("something went wrong: " + error);
}
