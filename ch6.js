// p74
var empty = {};
console.log(empty.toString);

console.log(empty.toString());

Object.getPrototypeOf() //回傳參數的原形
//例如
Object.getPrototypeOf([])
Object.getPrototypeOf("apple")

//創造一個 prototype

var protoRabbit = {
  speak: function(line){
    console.log("the " + this.type + " rabbit says '" + line + "'");
  }
};


var killerRabbit = Object.create(protoRabbit); //objects have a prototype

killerRabbit.speak("shootoff")
killerRabbit.type = "killer"
Object.getPrototypeOf(killerRabbit)


//創造一個 constructors ,開頭用大寫字母表示！很像一個函數
function Rabbit(type){
  this.type = type;
}

var killerRabbit = new Rabbit("killer");
var blackRabbit = new Rabbit("black");
console.log(blackRabbit.type);


// overriding derived properties

Rabbit.prototype.teeth = "small";
console.log(killerRabbit.teeth);

killerRabbit.teeth = "long, sharp, and bloody";
console.log(killerRabbit.teeth);

console.log(blackRabbit.teeth);


console.log(Rabbit.prototype.teeth);


//p77 prototype interference
Rabbit.prototype.dance = function(){
  console.log("the " + this.type + " rabbit dance a jig.");
};

killerRabbit.dance();

// ch4 的例子
var map = {};
function storePhi(event, phi){
  map[event] = phi;
}

storePhi("pizza", 0.096);
storePhi("touched tree", -0.086);

Object.prototype.nonsense = "hi";
for (var name in map){
  console.log(name);
}


console.log("nonsense" in map);
console.log("toString" in map);


/*
 p80 laying out a tableFor
 參考以下blog
 http://tomi.io/eloquent-javascript-laying-out-a-table/
*/
//原始 data
var MOUNTAINS = [
  {name: "Kilimanjaro", height: 5895, country: "Tanzania"},
  {name: "Everest", height: 8848, country: "Nepal"},
  {name: "Mount Fuji", height: 3776, country: "Japan"},
  {name: "Mont Blanc", height: 4808, country: "Italy/France"},
  {name: "Vaalserberg", height: 323, country: "Netherlands"},
  {name: "Denali", height: 6168, country: "United States"},
  {name: "Popocatepetl", height: 5465, country: "Mexico"}
];
//製作 dataTable
function dataTable(data){
  var keys = Object.keys(data[0]);
  var headers = keys.map(functon(name){
    return new UnderlinedCell(new TextCell(name));
  });

  var body = data.map(function(row){
    return keys.map(function(name){
      return new TextCell(String(row[name]));
    });
  });

  return [headers].concat(body);
}


//getter ; setter
var pile = {
  elements: ["egg", "orange", "worm"],
  get height(){
    return this.elements.length;
  },
  set height(value){
    console.log("ignoring attempt to set height to", value); // setter 不會起作用
  }
};

//
console.log(pile.height)
//
pile.height = 100;

//p85 inheritance
function RTextCell(text){
  TextCell.call(this, text);    //the new constructor will call the old constructor
}

RTextCell.prototype = Object.create(TextCell.prototype); //.create 不知道什麼意思

RTextCell.prototype.draw = function(width, height){     //重新改寫 .draw 。minWidth ; minHeight 繼續沿用
 var result = [];
 for (i = 0; i < height; i++){
   var line = this.text[i] || "";
   result.push(repeat(" ", width - line.length) + line); // 跟 TextCell不同的地方在這裡
 }
 return result;
};

//改寫 dataTable
function dataTable(data){
  var keys = Object.keys(data[0]); //keys 回傳一個array,裡面包含data[0]的所有屬性
  var headers = keys.map(functon(name){
    return new UnderlinedCell(new TextCell(name));
  });

  var body = data.map(function(row){
    return keys.map(function(name){
      var value = row[name]; //這邊加入邏輯 if
      if (typeof value == "number")
        return new RTextCell(String(value));
      else
        return new TextCell(String(value));
    });
  });

  return [headers].concat(body);
}
