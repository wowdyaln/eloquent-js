/*
array = [a,b,c]
array.forEach(function());  //給定函數 function()
*/

var array = ["aka","bkb","ckc"]

//函數直接寫在 forEach 裡面 ，這種比較常用到 p60頁
//就像是 ruby 的 @groups.each do |group|  這種東西
array.forEach(function(element){
  test = element.slice(0,2);
  console.log(test);
});

//也可以呼叫一個定義好的函數
function sliceE(element) {
  test = element.slice(0,2);
  console.log(test);
}

array.forEach(sliceE);



// 回顧一下 ch4 的 function gatherCorrelations
/*
gatherCorrelations 函數，裡面有兩個 for 迴圈
參數： journal（記錄的全部資料,array形式）
回傳值： phis (每個event 所對應的 phi ; 結構就像是一個ruby hash)
*/

function gatherCorrelations(journal){
  var phis = {};

  for (var entry = 0; entry < journal.length; entry++){  //遍歷過每一組 entry
    var events = journal[entry].events; // 某個 entry 的 events 屬性,是一個 array

    for (var i = 0; i < events.length; i++){  //遍歷某個 entry 的所有 event
      var event = events[i];
      if (!(event in phis))     //如果某個 event 沒有在 phis 裡面（回傳值為false）
        phis[event] = phi(tableFor(event, journal));
        //就把這個 event當成屬性 加到 phis 裡面，值為phi tableFor 兩函數的運算結果
    }
  }
  return phis;    //return 的位置注意一下
}


// 使用 array 的內建方法 forEach 來修改 gatherCorrelations
function gatherCorrelations(journal){
  var phis = {};

  journal.forEach(function (entry){   //逐一拿出每一組 entry
    entry.events.forEach(function (event){  //逐一拿出此 entry 裡面的 events屬性 裡面的 event
        if (!(event in phis))         //如果某個 event 沒有在 phis 裡面（回傳值為false）
          phis[event] = phi(tableFor(event, journal));
          //就把這個 event當成屬性 加到 phis 裡面，值為phi tableFor 兩函數的運算結果
    });
  });
  return phis;
}


// p62
function unless(test, then){
  if (!test) then();
}

function repeat(times, body){
  for (var i = 0; i < times; i++)
    body(i);
}

repeat(6, function(n){    // n會被逐次帶進 0,1,2,3,4,5
  unless(n%2, function(){  //餘數如果是0 回傳 fasle, unless 函數中的 if 就會執行 then()
    console.log(n, "is even 是個偶數");
  });
});



// p61
noisy(Boolean)(0);

function noisy(f){
  return function(arg){   //讓上面的 f 成為了一個函數, 我們在此給函數 f 一個參數 arg
    console.log("calling with", arg)
    var val = f(arg);       // val = Boolean(0)
    console.log("called with", arg, "- got", val);
    return val;
  };
}


// p63 JSON

var string = JSON.stringify({name: "X", born: 1980});  //屬性名稱，都轉換成字串
console.log(string);
console.log(JSON.parse(string));
console.log(JSON.parse(string).born);

//============讀入 ANCESTRY_FILE =====================================
var ancestry = JSON.parse(ANCESTRY_FILE);
ancestry.length;

// filter an array
function filter(array, test){   //array 裡面有內建 filter 方法了，這邊可以看出背後原理
  var passed = [];
  for (var i = 0; i < array.length; i++){
    if (test(array[i]))
      passed.push(array[i]);
  }
  return passed;
}


filter(ancestry, function(person){
  return person.born > 1900 && person.born < 1925;
})

//跟上面作用一模一樣
ancestry.filter(function(person){
  return person.born > 1900 && person.born < 1925;
});



//回顧 p47 頁，把 filter 拿來應用
JOURNAL.filter(function(rows){
  // console.log(rows);
  if (rows.events.indexOf("bread") != -1) //把包含 "bread" 這個活動的整筆列出來
    return rows;
});

//回顧 p47 頁。變成松鼠的有幾筆都列出來
JOURNAL.filter(function(bool){
  return bool.squirrel == true;
});


//p66 .reduce
//找出誰是最早的祖先
ancestry.reduce(function(min, cur){
  if (cur.born < min.born)
    return cur;
  else
    return min;
});


//======== p66 算出男生的平均壽命；還有女生的 =====
// 算平均數
function average(array){
  function plus(a, b){return a+b;} //創造一個把兩個參數相加的函數，因為 JS中，運算符號不能當做參數傳遞給一個函數
  return array.reduce(plus)/array.length;
}

//每個人的壽命
function age(ob){ return ob.died - ob.born;}

//型別是男
function male(ob){ return ob.sex == "m";}
//型別是女
function female(ob){ return ob.sex == "f";}

/*
所有男生的平均壽命
步驟 1. 過濾出男生的ob (ob:object 簡稱，方便自己觀察)
    2. 把每個人的壽命 map 到一個 array
    3. 算平均
*/
ancestry.filter(male).map(age) //每個男生的壽命做成一個array了
//把上面整個array 當做 average 函數的參數
average(ancestry.filter(male).map(age)); //算平均




//p68 製作出 [{人名1： {資料1}},{人名2： {資料2}} ... ...] 的資料格式
var ancestry = JSON.parse(ANCESTRY_FILE);

var byName = {};          //
ancestry.forEach(function(object){
  byName[object.name] = object;
});


/*
reduceAncestors 函數 ,這個不好懂！！
請參考這篇解說
http://kurtle.io/2015/09/04/recursion-in-javascript.html

這個程式是從某個後代，回推到源頭 Pauwels van Haverbeke
上面這篇blog 是直接從 Pauwels van Haverbeke 往前慢慢推到後代
可以看出 reduceAncestors 函數 跟 sharedDNA 函數是怎麼搭配的

參數：(person)要計算的某個人的整個object
     (f)合併父母基因的組成比例
     (defualtValue)初始值
Philibert Haverbeke 作者的祖父
Pauwels van Haverbeke 族譜當中最源頭的祖先
*/
function reduceAncestors(person, f, defualtValue){
  function valueFor(person){    // valueFor函數：計算某個人的基因組成比例
    if (person == null)
      return defualtValue;
    else
      return f(person, valueFor(byName[person.mother]),
                       valueFor(byName[person.father]));
  }
  return valueFor(person);  //這一行不要忘了，因為上面return 的只是 f函數的值
}

/*
sharedDNA 函數
參數：(person)要計算的某個人的整個object
     (fromMother) 從母親來的比例，0~1之間
     (fromFather) 從父親來的比例，0~1之間
*/
function sharedDNA(person, fromMother, fromFather){
  if (person.name == "Pauwels van Haverbeke")
    return 1;
  else
    return (fromMother + fromFather) / 2;
}


function reduceAncestors(person, f, defualtValue){
  function valueFor(person){
    if (person == null)
      return defualtValue;
    else
      return f(person, valueFor(byName[person.mother]),
                       valueFor(byName[person.father]));
  }
  return valueFor(person);
}

//找到作者祖父 Philibert Haverbeke 的基因有多少來自 Pauwels van Haverbeke

var ph = byName["Philibert Haverbeke"]; //找到 Philibert Haverbeke這筆物件資料
reduceAncestors(ph, sharedDNA, 0); //注意預設值為零




/*===============p69 combine 以下這些有不懂的地方做了comment
*/
// reduceAncestors 如同上面，這個我懂
function reduceAncestors(person, f, defualtValue){
  function valueFor(person){
    if (person == null)
      return defualtValue;
    else
      return f(person, valueFor(byName[person.mother]), valueFor(byName[person.father]));
  }
  return valueFor(person);
}

// longLivingPercentage
function longLivingPercentage(person){
  var all = countAncestors(person, function(person){  //這個地方不太懂，常試過 var all = true; 這樣有什麼不一樣？
    return true;
  });
  var longLiving = countAncestors(person, function(person){
    return (person.died - person.born) >= 70;
  });

  return longLiving / all;
  console.log("longLiving: " + longLiving);
  console.log("all: " + all);
}

// 新函數 countAncestors, combine
function countAncestors(person, test){
  function combine(person, fromMother, fromFather){
    var thisOneCounts = test(person);     //通過 test函數就回傳 true; 否則回傳false
    return fromMother + fromFather + (thisOneCounts ? 1:0);
    //thisOneCounts 如果ture就1 ；false就2
    // 母親；父親以上祖先壽命高於70的各有多少個，再加上自己（1 或 0）
  }
  return reduceAncestors(person, combine, 0);
}




//Emile Haverbeke 的祖先們（比她小的晚輩不包含）
longLivingPercentage(byName["Emile Haverbeke"]);
