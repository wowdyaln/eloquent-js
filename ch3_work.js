
//////  p38 函數min ， 給2個數字，回傳最小值 //////

function min(a, b){
  if (a <= b)
    console.log(a);
  else
    console.log(b);
}

min(5,3);


/*
創造一個函數 isEven , 接受一個參數 number , 偶數回傳值：true, 奇數回傳值：false
不要使用  %2 取餘數的作法，用 number-2 的 recursive 作法
到最後一步 number-2 等於0：true  ;  等於─1：false
*/
// .abs 回傳絕對值
function isEven(number){
  var n = Math.abs(number);
  if (n == 0)
    return true;
  else if (n > 1)
    return isEven(n - 2);
  else if (n == 1)
    return false;
}

isEven(-100);




/*
1. 創造一個函數 countBs, 接受一個String 為參數，然後回傳一個數字
代表這一個 String 裡面有多少個大寫字母 B (例如 rafBaBasdfB 的回傳值為3)

2. 創造一個函數 countChar, 接受一個String 還有 指定字母（例如 A, T, H ...）為參數
; ，然後回傳一個數字代表這一個 String 裡面有多少個指定的大寫字母
重寫 countBs 用在 countChar
*/


/*
拆解
用 .length取出字串的字母數量, 加入變數 number
然後，一個個去抓， .charAt(n) ， n 從0開始 到 number-1
*/

// countBs 成功運作
function countBs(string){

  var number = string.length

  var count = 0;
  for (var n = 0; n < number; n++){
    var letter = string.charAt(n);
    if (letter == "B")
      count++;
  }

  console.log(count);
}

countBs("BBTBBBBBBBSBBBBBBBBBBBA");


////////////countChar 成功，搞了半天！！！！！！！
function countChar(string, target){
  var number = string.length
  var count = 0;

  for (var n = 0; n < number; n++){
    var letter = string.charAt(n);
    if (letter == target)
      count++;
  }

  console.log(count);
}


countChar("dwefBasBasBaBBBdBBBasB", "c")
