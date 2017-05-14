//p88
// Your code here.
console.log(new Vector(1, 2).plus(new Vector(2, 3)));
// → Vector{x: 3, y: 5}
console.log(new Vector(1, 2).minus(new Vector(2, 3)));
// → Vector{x: -1, y: -1}
console.log(new Vector(3, 4).length);
// → 5
/* constructors Vector
參數：x, y 用 array 表示object 的位置

.plus(vob)  //vob:另一個Vector 物件
回傳值： 一個新的Vector 物件，是 this跟vob 的和

.minus(vob)  //vob:另一個Vector 物件
回傳值： 一個新的Vector 物件，是 this跟vob 的差

Add a getter property length
to the prototype that computes the length of the vector—
that is, the distance of the point (x, y) from the origin (0, 0)
*/


function Vector(x, y){
  this.x = x;
  this.y = y;

  this.plus = function(vob){
    var xplus = this.x + vob.x;
    var yplus = this.y + vob.y;
    var pp = [xplus, yplus];
    return pp;
  };

  this.minus = function(vob){
    var xminus = this.x - vob.x;
    var yminus = this.y - vob.y;
    var pp = [xminus, yminus];
    return pp;
  };
}

//測試很久寫出來了，參考 p85
Object.defineProperty(Vector.prototype, "length", {
  get: function(){
    var lx = Math.pow(this.x, 2);
    var ly = Math.pow(this.y, 2);
    var powerplus = lx + ly;
    return Math.sqrt(powerplus);
  }
});




//寫法二： methods 在原型裡面
function Vector(x, y){
  this.x = x;
  this.y = y;
}

Vector.prototype.plus = function(vob){
  var xplus = this.x + vob.x;
  var yplus = this.y + vob.y;
  var pp = [xplus, yplus];
  return pp;
};

Vector.prototype.minus = function(vob){
  var xminus = this.x - vob.x;
  var yminus = this.y - vob.y;
  var pp = [xminus, yminus];
  return pp;
};

Object.defineProperty(Vector.prototype, "length", {
  get: function(){
    var lx = Math.pow(this.x, 2);
    var ly = Math.pow(this.y, 2);
    var powerplus = lx + ly;
    return Math.sqrt(powerplus);
  }
});

//答案：
function Vector(x, y) {
  this.x = x;
  this.y = y;
}

Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y); //這樣簡潔多了
};

Vector.prototype.minus = function(other) {
  return new Vector(this.x - other.x, this.y - other.y);
};

Object.defineProperty(Vector.prototype, "length", {
  get: function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
});

Object.defineProperty(Vector.prototype, "length", {
  get: function() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
});
