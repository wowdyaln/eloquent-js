// p59 呼叫 constructor 沒有加上 new 會怎樣？

function Ninja(){
  this.skulk = function(){
    return this;
  }
}

var a = new Ninja();

var aa = Ninja();  //沒有加 new
//
