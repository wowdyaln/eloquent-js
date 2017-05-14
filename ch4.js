// p47
/* phi
參數：table=[n00, n10, n01, n11] 是這樣的 array,
回傳值：關連性（ 1 ~ -1 正相關；負相關）
*/
function phi(table){
  return (table[3]*table[0] - table[2]*table[1])/       //return 後面不能換行; 除法後面可以
  Math.sqrt((table[2]+table[3]) *       //sqrt 開根號
            (table[0]+table[1]) *
            (table[1]+table[3]) *
            (table[0]+table[2]));
}

console.log(phi([76, 9, 4, 1]));




/* hasEvent
參數： event（某個事件）, entry(整組data),
回傳值：data裡面如果有此事件，回傳 true
      data裡面如果沒有此事件，回傳 false
解釋一下書中取名的 entry 物件, 如下
entry = {"events":["potatoes","brushed teeth","running","work"],"squirrel":false}
像是 ruby語言的 hash , hash=[key, value]
*/

function hasEvent(event, entry){
  return entry.events.indexOf(event) != -1;
}

hasEvent("brushed teeth", {"events":["pizza","brushed teeth","computer","work","touched tree"],"squirrel":false})


// 解釋一下書中取名的 journal 物件, 如下的 j, 查詢方式像是 array
j = [
  {"events":["carrot","peanuts","reading","weekend"],"squirrel":true},
  {"events":["potatoes","brushed teeth","running","work"],"squirrel":false},
  {"events":["lasagna","ice cream","work","touched tree"],"squirrel":false},
  {"events":["cauliflower","peanuts","brushed teeth","cycling","work"],"squirrel":false},
 ]

console.log(j.length); // 回傳值：4 代表有4組
console.log(j[0]); //可以取出第一組資料（entry）
console.log(j[0].squirrel); //回傳squirrel的屬性



/* tableFor
參數： event(事件); journal(全部資料,像是上面的 a 那樣)
回傳值：table=[n00, n10, n01, n11] 的一個 array
*/
function tableFor(event, journal){
  var table = [0, 0, 0, 0];

  for (var i = 0; i < journal.length; i++){
    var entry = journal[i];
    var index = 0;

    if (hasEvent(event, entry)) //如果有此 event
      index += 1;               // 從 n00 移動到 n10
    if (entry.squirrel)   //如果 squirrel屬性是 true
      index += 2;         //  從 n00 移動到 n01

    table[index] += 1;        /*  兩個 if 都沒有通過 => n00
                                  第一個if 有；第二個沒有=> n01
                                  第一個if 沒有；第二個有=> n01
                                  兩個 if 都有通過 => n11
                                  非常美妙的判斷式，只要寫2個if  */
  }
  return table;
}

console.log(tableFor("work",j)); //跑跑看


//映射 use object properties named after the event types. // p48
// 以下應用就是 ruby 語言的 Hash 道理一樣 //
// map ; in 的組合用法要多熟悉！！！！！！！！！
// for var in 的組合用法要多熟悉！！！！！！！！！
// storePhi
var map = {};
function storePhi(event, phi){
  map[event] = phi;
}

storePhi("pizza", 0.069);
storePhi("touched tree", -0.081);

console.log("pizza" in map);  //pizza 這個properties有沒有在 map 中？ true ; false
console.log(map["touched tree"]);  //找到對應 properties 的 value

for (var event in map)        //列出 map 中所有的 event
  console.log(event + " is " + map[event]);



/*
gatherCorrelations
參數： journal（記錄的全部資料）
回傳值： phis (每個event 所對應的 phi ; 結構就像是一個 hash)
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


/// 使用 gatherCorrelations 塞入所有最新的資料

var correlations = gatherCorrelations(JOURNAL);
console.log(correlations.pizza);  //跑一下

// 看所有 event 對應的 phi

for (var event in correlations)
  console.log(event + ": " + correlations[event]);


//過濾出 correlations 大於 0.1, 小於 -0.1

for (var event in correlations){
  var correlation = correlations[event];
  if (correlation > 0.1 || correlation < -0.1)
  console.log(event + ": " + correlation);
}


//找出 有 peanuts ; 沒有 brushed teeth 的 entry, 分析關連性
for (var i = 0; i < JOURNAL.length; i++){
  var entry = JOURNAL[i];
  if (hasEvent("peanuts", entry) && !hasEvent("brushed teeth", entry)) //有 peanuts ; 沒有 brushed teeth 的 entry
    entry.events.push("peanuts teeth");  //在這個 entry 的events array後面插入 peanuts teeth元素
}

console.log(phi(tableFor("peanuts teeth", JOURNAL))); //分析 "peanuts teeth" 這個事件跟 squirrel 的關係


/* p51
.indexOf      .lastindexOf  給 元素，找 array 裡面對應的 index
從左邊向找右    從右邊向左找
*/

a = ["asdf","cc", "a43", "adf", "cc"]
console.log(a.indexOf("cc"));
console.log(a.lastIndexOf("cc"));


/* p51
.slice        .concat
分割 array    合併 array
*/    0       1     2       3     4
a = ["asdf","cc", "a43", "adf", "cc"]
b = [1,2,3]

console.log(a.slice(2));
console.log(a.slice(2,4));

a.concat(b)

//來創造一個可以刪除任何一個元素的 函數吧
function remove(array, index){
  return array.slice(0, index).concat(array.slice(index + 1));
}

console.log(remove(a,1) + b + remove(a,4));
console.log(remove(a,1).concat(b).concat(remove(a,4)));
console.log(remove(a,1).concat(b,remove(a,4)));
//concat 可以給多個參數，只要是array都會接起來
console.log(remove(a,1).concat(b,remove(a,4),b,b));


/*
在JavaScript 語言，呼叫函數的時候，參數給多或是給少都沒有問題！
呼叫 函數的時候，會產生一個 arguments 的物件，裡面記錄了預設參數資料
*/
a = ["asdf","cc", "a43", "adf", "cc"]

a.splice(2,1);
