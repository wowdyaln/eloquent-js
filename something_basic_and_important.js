/// javascript 目前的重點心得
// 變數 abc
abc() , 看到(),這個abc是個函數
abc[函數或數字] , 看到 [] 這個abc是個 array 或 object
abc[字串]，看到 [] ,這個abc是個 object，字串代表abc的其中一個屬性名稱

abc 在 () 裡面，表示abc被當做一個參數傳到某個函數裡面去使用了
(abc)
abc 有可能 number, array, boolean, function, object
但是，不會是運算符號（+ , - , / 等等）


//////
var a = [1,2]
a.push(5);
console.log(a);

var a = [1,2]
a[0] = 5;
console.log(a);


var a = [2,5,8];
a.reverse() //呼叫物件 a 的 function ， a 的內容會被改變
a[1]
a.length // 呼叫物件 a 的 propertie

a.slice(0,1) // a 的內容不變

var temp = a.slice(a.length-1); //抓 array 最後一個元素
temp

//array 的 splice 方法
https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/splice


// 建立一個新的物件
var obob = {propertieee: "somevalues"}; //建立一個物件 ,新創一個屬性名稱叫做 propertieee
obob
var obob = {"propertieee": "somevalues"}; //加雙引號也可以，跟上面一樣作用
obob


var ob = {"key":3 , "info":"I am ob"} //正確
// var ob2 = ["key":3 , "info":"I am ob"] //錯誤



var ob = [
          {"key":3 , "info":"I am ob"},
          {"key":2 , "info":" am ob"},
          {"key":1 , "info":" ob"}
        ];  //一個物件 ob 裡面包 3 個物件
ob[1]["key"]

/* 以下錯誤：不能用 {} 包其他物件
var ob2 = {
            {"key":3 , "info":"I am ob"},
            {"key":2 , "info":" am ob"},
            {"key":1 , "info":" ob"}
          };

var ob3 [                     //不能用 [] 包 array
          [1,3],[5,5],[3,4]
        ];

var ob4 {                   //不能用 {} 包 array
          [1,3],[5,5],[3,4]
        };
*/


//p48 Object as map 應用
var obob = {p: "somevalues", p2: "aa", p3: "bb"};

"cc" in obob
"p3" in obob
obob["p"]
obob["p3"]

function  storeProperty(kk, value){  //kk 跟 value 兩個參數，都一定是 string形式
  ob[kk] = value;                    //把一個屬性跟其值 塞入 ob 物件
}

for (var kk in obob)                     //遍歷 ob 的所有屬性
  console.log(kk + " is " + obob[kk]);   //列出 ob 中所有的屬性


storeProperty("year", "1997")
"year" in ob                    //重點是這個 in ，看某個屬性有沒有在某個物件裡面, 回傳bool值
ob["info"]                      //查詢某屬性的值，屬性名稱記得要加 " "



for (var kk in ob)                     //遍歷 ob 的屬性
  console.log(kk + " is " + ob[kk]);   //列出 ob 中所有的屬性

//高級挑戰！巢狀的物件 //p56
list = {
  value:"a",
  rest:{


    value:"b",
    rest:{
      value:"c",
      rest:null
    }
  }
};

//要找到最裡層的 "c" 要像撥洋蔥一樣！！
找a
list["value"]

找b
list["rest"]  ["value"]

找c
list["rest"]["rest"]  ["value"]

list["rest"]["rest"]["rest"]



//forEach 就像是 ruby 的 @groups.each do |group|  這種東西
// |group| 就是所謂的當前元素 （current element）
a =
[{"events":["carrot","exercise","weekend"],"squirrel":true},
{"events":["bread","pudding","brushed teeth","weekend","touched tree"],"squirrel":false},
{"events":["carrot","nachos","brushed teeth","cycling","weekend"],"squirrel":false},
{"events":["brussel sprouts","ice cream","brushed teeth","computer","weekend"],"squirrel":true},
{"events":["potatoes","candy","brushed teeth","exercise","weekend","dentist"],"squirrel":false}]

a.forEach(function(object){
  if (object.events.length < 6)     //可以加邏輯條件
  console.log(object);              // forEach 似乎沒辦法回傳值?? 試過很多方法，沒有回傳值
});

a.forEach(function (object){
  console.log(object);              // forEach 似乎都要搭配 console.log 使用
});

a.forEach(function (object){
  console.log(object);
});

a.forEach(function (object){
  console.log(object.events);
});


a.forEach(function (object){
  return object;              //return 無用！只會回傳 undefined
});


// .filter 後面函數的回傳值，用一些條件過濾
a.filter(function (object){
  return object.events.length == 5;  //這邊要加 return 注意！！！！！
});

a.filter(function (object){
  if (object.squirrel == true)      //可以加邏輯條件
  return object.events.length == 5;
});


a.filter(function (object){
  return object.events;       //沒有過濾的條件，回傳整個 a
});

a.filter(function (object){
  return object.events.indexOf("computer") != -1;
});

a.filter(function(object){
  return object.squirrel;  //當值是 Boolean的時候，只會回傳為 true 的
});


// .map 後面函數的回傳值，指定一個屬性，抽取此屬性進去一個新的空白array
a.map(function(object){
  return object.squirrel;  //
});



a.map(function(object){
  return object.events.length == 5;  /*每個object的 events 數量是否 ==5,
                                       也就是說每個object會回傳一個 Boolean，
                                       個別塞入一個空白array裡面 */
});


a.map(function(object){
  return object.events.length < 6     //類似上面這樣
});

//================== .forEach .filter .map 的背後原理！ ====================================

function forEach(array, f){
  for (i = 0; i < array.length; i++){
    f(array[i]);                      //把元素一個個傳給 f 當參數，沒有回傳值
  }                                   //forEach 會針對陣列中的每個元素各呼叫 f 函數一次
}


function filter(array, f){
  var temp = [];
  for (i = 0; i < array.length; i++){
    if (f(array[i]){        // 函數f 回傳 true, 才會執行 temp.push()
      temp.push(array[i]);
    }
    return temp;            //有回傳值
  }
}



function map(array, f){
  var temp = [];
  for (i = 0; i < array.length; i++){
    temp = temp.push(f(array[i]))     //每個元素都傳到 函數f 當成參數
  }
  return temp;            //有回傳值
}

/*p65 .reduce 的背後原理！ ====================================
(array)陣列
(f)執行合併操作的函數
(start)初始值
*/

function reduce(array, f, start){       /*重要，如果沒有指定start，current 會是array[0]，
                                        然後從array[1]開始塞入 f 的第二個參數 */
  var current = start;
  for (i = 0; i < array.length; i++){
    current = f(current, array[i]);      //跟上面3個函數的差別在這邊，是 .reduce 的中心思想
  }                                      //每一次的循環，給 f 兩個參數：上一次循環的回傳值，跟下一個array的element
  return current;        //經過 array.length 次的循環計算後，回傳最終值
}


var a = [1,3,5];

reduce([1,2,3], function f(a, b){
  return a + b;
});

var a = [1,3,5];
a.reduce(function f(a, b){
  debugger;
  return a + b;
});
// 可以簡寫成
reduce((a, b) =>  a+b)



a.reduce(function f(x, y){
  return x*x + y*y ;
});
/*
array[0]=>  (0,1) => 0*0 + 1*1 => 1
array[1]=>  (1,3) => 1*1 + 3*3 => 10
array[2]=>  (10,5) => 10*10 + 5*5 => 125
*/


var a = [1,2,5,-2,-8,3];
a.reduce(function f(min, cur){
  if (cur < min)
    return cur;
  else
    return min;
});


var a = [1,3,5];
a.forEach(function f(ele){
  console.log(ele);


});

//p80 .join 方法 ,回傳一個打包好的string,
//參數會塞到element 之間
 a = ["I","am","good"]

 a.join("");
 a.join(" ");

 b = [1,3,5]
 b.join(" ");
 b.join();

k =["kiss"]
c = [1,"3",5]
c.join(k);
c.join("k");

//.split 的用法; 跟 .join比較看看
a = "This is a\nTEST"
a.split("\n");

b = "thiskiskakkkTEST"
b.split("k");

// rows
var rows = [];

for (var i = 0; i < 5; i++){
  var row = [];
  for (var j = 0; j < 5; j++){
    if((i+j) % 2 == 0)
      row.push(new TextCell("##"));
    else
      row.push(new TextCell("  "));
  }
  rows.push(row);
}

// { }裡面的就是cell
rows 如下：
[[{text: [“##”]},{text: [“  ”]}],[{text: [“  ”]},{text: [“##”]}]]

TextCell.prototype.minHeight = function() {
  return this.text.length;
};

function rowHeights(rows){
  return rows.map(function(row){  // 每個row的最小高度，丟進一個array裡
    return row.reduce(function(max, cell){  //會從row裡面淬鍊出一個最小高度的值
      return Math.max(max, cell.minHeight());
    },0);
  });
}



rows 如下：
[[{text: [“##”]},{text: [“  ”]}],[{text: [“  ”]},{text: [“##”]}]]

TextCell.prototype.minWidth = function() {
  return this.text.reduce(function(width, line) {
    return Math.max(width, line.length);
  }, 0);
};

function colWidths(rows){
  return rows[0].map(function(_, i){
    return rows.reduce(function(max, row){
      return Math.max(max, row[i].minWidth());
    },0);
  });
}
