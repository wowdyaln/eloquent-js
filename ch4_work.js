/* p55
創造 函數 range
參數： start ; end
回傳值： start 到 end 的一個 array
*/
function range(start, end){
  var array = [];
  var countstep = (end - start + 1);

  for(i = 0; i < countstep; i++){
    array.push(start);
    start++;
  }
  return array;
}
//執行
range(3,7)
range(-1, 4)

/// 另一個寫法也可以，用 array[index]=value
function range2(start, end){
  var array = [];
  var countstep = (end - start + 1);

  for(i = 0; i < countstep; i++){
    array[i] = start;   //跟上面差別在這一行
    start++;
  }
  return array;
}
//執行
range2(2,25)
range2(-3, 7)



/* p55
創造 函數 sum
參數： 一個 array
回傳值： array 每個元素的加總
*/
function sum(array){
  var total = 0;
  for(i = 0; i < array.length; i++){
    total = total + array[i];
  }
  return total;
}
//執行
var a = [2,5,8];
sum(a);
sum(range(1,10));


/* p56
修改 函數 range
增加參數： step
例如：
range(1, 10, 2) -> [1, 3, 5, 7, 9]
range(3, 0, -1) -> [3, 2, 1, 0]
*/
function range3(start, end, step){
  var array = [];
  var countstep = (end - start)/step;

  if (step < 0){
    countstep++;
  }

  for(i = 0; i < countstep; i++){
    array.push(start);
    start += step;
  }
  return array;
}

range3(1, 10, 2)
range3(5, 2, -1)
range3(23, -5, -2)

//題外話，重要
var a = [2,5,8];
a.reverse() //呼叫物件 a 的 function(或是說 method)
a[1]
a.length // 呼叫物件 a 的 propertie



/* p56
創造 函數 reverseArray
參數： 一個 array
回傳值： 把array 逆轉過來
不能用數組 reverse 方法
*/
function reverseArray(array) {
  var arrayreverse = [];

  for (i = array.length - 1; i >= 0; i--){
    arrayreverse.push(array[i]);
  }
  return arrayreverse;
}
//執行
var a = [2,5,8];
reverseArray(a)

/* p56
創造 函數 reverseArrayInPlace
參數： 每個參數都成為 array 的元素，所以要輸入幾個參數都可以
回傳值： 把 array 逆轉過來
*/
// p53 非常好用的 arguments 變數，要記得！
function reverseArrayInPlace(){
  var agReverse = [];

  for (i = arguments.length - 1; i >= 0; i--){
    agReverse.push(arguments[i]);
  }
  return agReverse;
}
//執行
reverseArrayInPlace(3,"33",5,"dadf",77,"adffaf")




/* p56
創造 函數 arrayToList
參數： 一個 array
回傳值： 建立一個 list (一種資料結構；巢狀object）
list = {
  value:1,
  rest:{
    value:2,
    rest:{
      value:3,
      rest:null
    }
  }
};
*/
//無頭緒，去 stackoverflow 找幫忙吧
//以下這個看起來邏輯沒有錯，但是不行。外層到內層，逐一指派 <--問題所在
以下這個錯誤示範
function arrayToList(array){
  for (i = 0; i < array.length -1; i++){
    var list = {value:null, rest:null};
    list.value = array[i];
    list.result = list;
  }
return list;
}

arrayToList([1,2,3])


//要從內層到外層，逐一指派 <--這樣才對！
這個才對
function arrayToList(array){
  var list = {};          //也可以用 =null

  for (i = array.length-1; i >= 0; i--){
    list = {value:array[i], rest:list};
  }
  return list;
}

arrayToList([1,2,3,10,6,7,8])


/* 很有挑戰!!解開了超有成就感！！
創造 函數 listToArray
參數： 一個 list （巢狀object）
list = {
  value:1,
  rest:{
    value:2,
    rest:{
      value:3,
      rest:null
    }
  }
};
回傳值： 一個 array, [1,2,3]
*/
function listToArray(list){
  var array = [];
  array.push(list["value"]);
  var totheEnd = list["rest"]

  while (totheEnd != null){
    var value = totheEnd["value"];
    totheEnd = totheEnd["rest"];

    if (value != null)    //如果不加這行，會回傳 [1,2,3,undefined]
    array.push(value);
  }

  return array;
}

listToArray(list)


/*這個超簡單
創造 函數 prepend
參數： 一個值；還有一個 list （巢狀object）
回傳值： 一個 list, {value:值, rest:list}
*/

function prepend(newvalue, list){
  list = {value:newvalue, rest:list};
  return list;
}

prepend(10, prepend(20, null))


/*非常簡單阿
創造 函數 nth
參數： 一個 list （巢狀object）；一個index
舉例： nth(arrayToList([10, 20, 30]), 1));
// 回傳值 → 20
*/

function nth(list, index){
  var findvalue = listToArray(list)[index]; //函數後面居然可以這樣加XDXD
  return findvalue;
}

function nth(list, n) {
  if (!list)
    return undefined;
  else if (n == 0)
    return list.value;
  else
    return nth(list.rest, n - 1);
}
nth(arrayToList([10, 20, 30]), 1)
