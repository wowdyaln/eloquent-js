////////// ch3 p26 測試  ////////////

var f1 = function(x){
  var x=100;
  console.log(x);
};

//調用函數，此時參數給什麼，回傳值通通是 『100』，因為參數 x 拿來重新賦與值了
f1(5);
f1(20);
f1(30);
f1(40);


///////////

x=100;

var f2 = function(x){
  x=50;
  console.log(x);
};


f2(30); //給定參數（local variable）
console.log(x);
f2(40);
console.log(x);
//執行看看就懂了


//p32 Closure 閉包 ; 不好理解，多練習
function wrapValue(n){
  var localVariable = n;
  return function(){
    return localVariable;
  };
}

var wrap1 = wrapValue(1);
var wrap2 = wrapValue(2);

wrap1();
wrap2();

wrap1;
wrap2;


//p32 Closure 閉包 ; 不好理解，多練習
function multiplier(factor){
  return function(number){    //return 一定要加
    return number * factor;   //return 一定要加
  };
}

var twice = multiplier(2);
console.log(twice(5));


///////p31 Recursion 弄很久終於弄懂了，在 https://goo.gl/aJ4nVY 找到解釋 //////////

function power(base, exponent) {
  if (exponent == 0)
    return 1;
  else
    return base * power(base, exponent - 1); //這一行弄懂就能搞懂了
}

console.log(power(2, 3));

//要這樣看


power(2,3) //我們呼叫函數power，給2個參數 base ; exponent ; 分別為 2;3

//return base * power(base, exponent - 1) 這一行執行的結果
            2 * power(2,3-1)

//跳出程式，第2次呼叫power。 base ; exponent ; 分別為 2;2
        power(2,2)
2 *   2*power(2,2─1)


//跳出程式，第3次呼叫power。 base ; exponent ; 分別為 2;1
            power(2,1)
2 * 2 *   2*power(2,1─1)


//跳出程式，第4次呼叫power。 base ; exponent ; 分別為 2;0

            power(2,0) // if (exponent == 0) return 1;
2 * 2 * 2 *   1


////////// p32 超棒的一個範例 ！！ 給一個整數，找出從1開始，每次 +5 或是 *3 的步驟 ////////

function findSolution(target){
  function find(start, history){
    if(start == target)
      return history;

    else if(start > target)
      return null;

    else
      return find(start + 5, "(" + history + " + 5)") ||
             find(start * 3, "(" + history + " * 3)");
  }
  return find(1, "1");
}


console.log(findSolution(15));


////////// 自己改_1 ///////////
function findSolution(target){
  function find(start, history){
    if(start == target)
      return history;

    else if(start > target)
      return null;

    else
      return find(start * 7, "(" + history + " * 7)") ||
             find(start * 3, "(" + history + " * 3)") ||
             find(start + 5, "(" + history + " + 5)") ;
  }
  return find(1, "1");
}


console.log(findSolution(282475249));


////////// 自己改_2 ///////////
function findSolution(target){
  function find(start, history){
    if(start == target)
      return history;

    else if(start > target)
      return null;

    else
      return find(start + 3, "(" + history + " + 3)") ||
             find(start * 6, "(" + history + " * 6)") ||
             find(start * 7, "(" + history + " * 7)") ;
  }
  return find(1, "1");
}


console.log(findSolution(10731));
