var aa = [213,16,2058,54,10,1965,67,9];

aa.sort(function(a, b){
  // debugger
  return a-b;
});

var bb = [21, 4, 5, 33];
bb.sort(function(a, b){
  // debugger
  return b-a;
});

假如sortfunction(a, b)<0，a會排在b前面。
假如sortfunction(a, b)=0，a，b不改變(ECMAScript不保證這種做法)。
假如sortfunction(a, b)>0，a會排在b後面。


// !! 轉換布林值

function trueOrfalse(value){
  return !! (value)
}

// 參數包著 Grave accent ``符號
var a = 5;
var b = 10;
console.log(`Fifteen is ${a + b} and
not ${2 * a + b}.`);
// "Fifteen is 15 and
// not 20."


//
const

在ES6 之前，JavaScript 並沒有常數這種東西。大多數時候，人們會按照命名慣例，將一個全部以英文字母大寫表示的變數當作一個常數。
小心留意不將它們放在左值。但是一個還沒接觸命名慣例的初學者，隨時可能搞砸它們。
所以ES6也增加了const這個定義。凡是用const定義的符號，其繫結的內容僅能在定義時設定初值，之後不允許再改變。這就是常數了。
試圖改變const常數的敘述，都是語法錯誤。除此之外，const的語法限制和let相同，不允許重複宣告、不允許宣告前使用。
const 常數還有一點要注意，它可以在定義時計算初值。所以定義時的初值部份不限定為字面內容，而可以使用變數或函數等運算敘述。
若初值部份用了變數或運算敘述， JavaScript 會將計算結果作為初值。即使你之後改變了那個變數，也不會影響const 常數的內容。
