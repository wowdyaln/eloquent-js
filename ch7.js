var plan = ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"];
//p90 Vector constructor 用來表示 squares
function Vector(x, y){
  this.x = x;
  this.y = y;
}

Vector.prototype.plus = function(vob){
  return new Vector(this.x + vob.x, this.y + vob.y);
};



/* 一個一維 array ,像是下面這樣 2D 平面化之後，要找到某個位置的 element，推導出
x + (y × width)
很巧妙的公式
use a single array, with size width × height, and decide that
the element at (x,y) is found at position x + (y × width) in the array.

var grid =
["top left", "top middle", "top right",
 "bottom left", "bottom middle", "bottom right"];

// find "bottom middle" (1,1) => 1+(1*width) => 1+(1*3)=4
*/


// Grid constructor
function Grid(width, height){
  this.width = width;
  this.height = height;
  this.space = new Array(width * height); // 屬性length 會等於 width*height，然後每個element都是undefined
  //space屬性就是一個面積的概念
}
//.siInside 看某個vector 是不是在 Grid裡面
Grid.prototype.isInside = function(vector){
  return      //回傳 boolean
  vector.x >= 0 && vector.x < this.width &&
  vector.y >= 0 && vector.y < this.height;
};

//.get 找到 grid 物件的某個 element
Grid.prototype.get = function(vector){
  return this.space[vector.x + (vector.y * this.width)];
};

//.set 設定 grid 物件的某個 element
Grid.prototype.set = function(vector, value){
  this.space[vector.x + (vector.y * this.width)] = value;
};

//測試一下
/*
var a = new Grid(3,3);
a.get(new Grid(2,3));
a.set(new Grid(1,1), "KKBB");

b = new Grid(1,1);
a.get(b);
*/


//把一堆物件；方法 的關係整理在 evernote
//https://www.evernote.com/shard/s25/nl/678273063/4b645d95-e37d-40dc-b750-7516a722a776/

//方向物件
var directions = {
  "n": new Vector(0, -1),
  "ne": new Vector(1, -1),
  "e": new Vector(1, 0),
  "se": new Vector(1, 1),
  "s": new Vector(0, 1),
  "sw": new Vector(-1, 1),
  "w": new Vector(-1, 0),
  "nw": new Vector(-1, -1),
};

//randomElement 從某個 array 裡面隨機取出一個 element
function randomElement(array){
  return array[Math.floor(Math.random() * array.length)];      //Math.random 回傳 0~1 之間的18位小數
                          // floor 回傳的index 由於Math.random 的特性，不用擔心會大於 length ，非常聰明！
}

//方位 array
var directionNames = "n ne e se s sw w nw".split(" ");

// BouncingCritter constructor
function BouncingCritter(){
  this.direction = randomElement(directionNames);
  //每次 new 一個新的 bouncingCritter 物件，其 .direction 都是隨機產生的
}

//test
/*
a = new BouncingCritter();
b = new BouncingCritter();
a.direction
b.direction
*/


//BouncingCritter  .act
BouncingCritter.prototype.act = function(view){
  if (view.look(this.direction) != " ") //往 this.direction 方位看去，如果不是空白
    this.direction = view.find(" ") || "s"; // 就去 find 空白的所在方位 ； 如果周遭都沒有空白，回傳 "s"（防止回傳 null）
  return {type: "move", direction: this.direction}; // this.direction是空白，就回傳一個 move 物件
};


//World constructor
function World(map, legend){
  var grid = new Grid(map[0].length, map.length);
  this.grid = grid;
  this.legend = legend;

  map.forEach(function(line ,y){
    //line 代表每個element 的value; y 代表每個element 的 index
    for (x = 0; x < line.length; x++){ // 然後每個 row 的個別 element (ch)
      grid.set(new Vector(x, y),
                   elementFormChar(legend, line[x])); //把 element 一個個變成圖示
    }
  });
}
//legned 圖例如下，是個object，裡面的值是 constructor
//{"#": Wall, "o": BouncingCritter}

// elementFormChar
function elementFormChar(legend, ch){ //ch 是單個string像是 "o" "#"
  if (ch == " ")     //括弧不要忘了
    return null;    //後面不用加 else
  var element = new legend[ch](); //參考 JS Ninja p59 ，不難懂
  element.originChar = ch;
  return element;
}


// charFromElement
function charFromElement(element){
  if (element == null)    //括弧不要忘了
    return " ";
  else
    return element.originChar;
}

// World 的 toString 方法
World.prototype.toString = function(){
  var output = "";
  for (var y = 0; y < this.grid.height; y++){
    for (var x = 0; x < this.grid.width; x++){
      var element = this.grid.get(new Vector(x, y));
      output += charFromElement(element);
    }
    output += "\n ";  //每次做完一個row之後，就在尾巴加入換行記號
  }
  return output;
};

// Wall constructor
function Wall(){}


// 生成world物件; plan在 07_theworld.js 檔案中
var world = new World(plan, {"#": Wall,
                             "o": BouncingCritter});




/*p94 用網站 MDN 上面的例子來說明比較清楚
function Counter() {
  this.sum = 0;
  this.count = 0;
}
Counter.prototype.add = function(array) { //一個匿名函式
  array.forEach(function(entry) {       //匿名函式中的匿名函式,
    this.sum += entry;                  //this在這個匿名函式中,如果沒有給 thisArg 的話,
    ++this.count;                 //會指向window(而this.sum 跟 this.count 在這種狀況下就是 undefined 了)
  }, this);
  // ^---- thisArg
};

var obj = new Counter();
obj.add([2, 5, 9]);             //obj的參考傳不進 這個匿名函式中的匿名函式中,
obj.count             //所以才要使用thisArg,才能把外部發動了add()的物件(也就是 obj)參考帶入到add()裡面
// 3
obj.sum
// 16
*/


//p94 Grid   .forEach
Grid.prototype.forEach = function(f, context){
  for(var y = 0; y < this.height; y++){
    for(var x = 0; x < this.width; x++){
      var value = this.space[x + y*this.width];
      if (value != null)  //grid 不是null 或 undefined, forEach 就會call 我們傳入的 f 進行處理
        f.call(context, value, new Vector(x, y));   //把value 跟此 value的座標 當做參數，傳入 f，超重要！！
    }
  }
};


// World  .turn
World.prototype.turn = function(){
  var acted = [];     //記錄已經遍歷過的 critter
  this.grid.forEach(function(critter, vector){   // 就是 190行的那兩個參數
    if (critter.act && acted.indexOf(critter) == -1){
      //只有Critter的物件有.cat ; Wall的物件沒有.act ; 就是說，如果碰到Wall的物件就不會執行下面的程式
                            //下面的.letAct 會讓 critter 移動，若移動到我們還沒遍歷的空格，那又會被.letAct一次
                            //為了防止這樣的問題，所以每次遍歷會對照是否已經出現在 acted數組裡面
    acted.push(critter);
    this.letAct(critter, vector);
    }
  }, this); //forEach 的第二個參數 this，就是 185 行的 context
}

// World .letAct 只在World物件內部使用
World.prototype.letAct = function(critter, vector){
  var action = critter.act(new View(this, vector)); //
  if (action && action.type == "move"){               //type 如果是 move
    var dest = this.checkDestination(action, vector); // 就有一個 目的地變數(dest)
    // 根據action跟vecotr ; checkDestination 回傳一個座標(vector)
    if (dest && this.grid.get(dest) == null){  // 如果 dest 是空的
      this.grid.set(vector, null);
      this.grid.set(dest, critter);
    }
  }
};


// World .checkDestination 只在World物件內部使用
World.prototype.checkDestination = function(action, vector){
  if (directions.hasOwnProperty(action.direction)){
    var dest = vector.plus(directions[action.direction]);
    if (this.grid.isInside(dest))  //檢查 目的地座標 是否在世界範圍裡面
      return dest;
  }
};


// View constructor
function View(world, vector){  //vector代表critter目前位置
  this.world = world;
  this.vector = vector;
}

// View .look
View.prototype.look = function(dir){
  var target = this.vector.plus(directions[dir]);
  if (this.world.grid.isInside(target))
    return charFromElement(this.world.grid.get(target));
  else
    return "#";
};

// View .findAll
View.prototype.findAll = function(ch){
  var found = [];
  for (var dir in directions)
    if (this.look(dir) == ch)
      found.push(dir);
  return found;
};

// View .find
View.prototype.find = function(ch){
  var found = this.findAll(ch);
  if (found.length == 0)
    return null;
  else
    return randomElement(found);
};

/*測試
for (var i = 0; i < 5; i++){
  world.turn();
  debugger
  console.log(world.toString());
}
*/
