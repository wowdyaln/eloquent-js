http://stackoverflow.com/questions/111102/how-do-javascript-closures-work
// example1  //====================================
function sayHello(name) {
  var text = 'Hello ' + name;
  var say = function() { console.log(text); }
  say();
}
//run it
sayHello('Joe');

// example2  //====================================
function sayHello2(name) {
  var text = 'Hello ' + name; // Local variable
  var say = function() { console.log(text); }
  return say;
}
var say2 = sayHello2('Bob');
//run it
say2(); // logs "Hello Bob"


/*
For some reason, closures seem really hard to understand
when you read about them, but when you see some examples
it becomes clear how they work (it took me a while).
I recommend working through the examples carefully
until you understand how they work.
If you start using closures without fully understanding how they work,
you would soon create some very weird bugs!
*/

// example3  //====================================
/*
This example shows that the local variables are not copied.
they are kept by reference.
It is kind of like keeping a stack-frame in memory when the outer function exits!
*/
function say667() {
  // Local variable that ends up within closure
  debugger;
  var num = 42;
  var say = function() { console.log(num); }// num are kept by reference
  num++;
  return say;
}

var sayNumber = say667();
//run it
sayNumber(); // logs 43


// example4  //==// 非常好的例子！！！！！==================================
/*
All three global functions have a common reference to the same closure
because they are all declared within a single call to setupSomeGlobals().
*/
var gLogNumber, gIncreaseNumber, gSetNumber;
function setupSomeGlobals() {
  // Local variable that ends up within closure
  var num = 42;
  // Store some references to functions as global variables
  gLogNumber = function() { console.log(num); }
  gIncreaseNumber = function() { num++; }
  gSetNumber = function(x) { num = x; }
}

setupSomeGlobals();
gIncreaseNumber();
gLogNumber(); // 43
gSetNumber(5);
gLogNumber(); // 5

var oldLog = gLogNumber;

setupSomeGlobals();
gLogNumber(); // 42

oldLog() // 5


The three functions have shared access to the same closure —
the local variables of setupSomeGlobals() when the three functions were defined.
Note that in the above example, if you call setupSomeGlobals() again,
then a new closure (stack-frame!) is created.
The old gLogNumber, gIncreaseNumber, gSetNumber variables are overwritten
with new functions that have the new closure.
(In JavaScript, whenever you declare a function inside another function,
the inside function(s) is/are recreated again each time the outside function is called.)

// example 5  //=====看不懂看不懂！！！！！===============================
/*
This one is a real gotcha for many people, so you need to understand it.
Be very careful if you are defining a function within a loop:
the local variables from the closure do not act as you might first think.
*/
function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        var item = 'item' + i;
        result.push( function() {console.log(item + ' ' + list[i])} );
    }
    return result;
}


function testList() {
    var fnlist = buildList([1,2,3]);
    // Using j only to help prevent confusion -- could use i.
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
      //function() {console.log(item + ' ' + 1)}
      //function() {console.log(item + ' ' + 1)}
      //function() {console.log(item + ' ' + 1)}
    }
}

 testList() //logs "item2 undefined" 3 times

//說明如下
The line
result.push( function() {console.log(item + ' ' + list[i])}
adds a reference to an anonymous function three times to the result array.
If you are not so familiar with anonymous functions think of it like:

pointer = function() {console.log(item + ' ' + list[i])};
result.push(pointer);

Note that when you run the example, "item2 undefined" is alerted three times!
This is because just like previous examples,
there is only one closure for the local variables for buildList.
When the anonymous functions are called on the line fnlist[j]();
they all use the same single closure,
and they use the current value for i and
item within that one closure (where i has a value of 3 //什麼阿？？？？？？？
because the loop had completed, and item has a value of 'item2').
Note we are indexing from 0 hence item has a value of item2.
And the i++ will increment i to the value 3. //什麼阿？？？？？？？

// example 6  //====================================
This example shows that the closure contains any local variables
that were declared inside the outer function before it exited.
Note that the variable alice is actually declared after the anonymous function.
The anonymous function is declared first;
and when that function is called it can access the alice variable
because alice is in the same scope (JavaScript does variable hoisting).
Also sayAlice()() just directly calls the function reference returned
from sayAlice() — it is exactly the same as what was done previously,
but without the temporary variable.
// example 6  //======這個還好懂=============================

function sayAlice() {
    var say = function() { console.log(alice); }
    // Local variable that ends up within closure
    var alice = 'Hello Alice';
    return say;
}
sayAlice()();// logs "Hello Alice"

/*
Tricky: note also that the say variable is also inside the closure,
and could be accessed by any other function that might be declared within sayAlice(),
or it could be accessed recursively within the inside function.
*/


// example 7  //====== 也是個很好的例子 =============================
function newClosure(someNum, someRef) {
    // Local variables that end up within closure
    var num = someNum;
    var anArray = [1,2,3];
    var ref = someRef;
    return function(x) {
        num += x;
        anArray.push(num);
        console.log('num: ' + num +
            '; anArray: ' + anArray.toString() +
            '; ref.someVar: ' + ref.someVar + ';');
      }
}
obj = {someVar: 4};
fn1 = newClosure(4, obj);
fn2 = newClosure(5, obj);
fn1(1); // num: 5; anArray: 1,2,3,5; ref.someVar: 4;
fn2(1); // num: 6; anArray: 1,2,3,6; ref.someVar: 4;
obj.someVar++; // 就是 obj.someVar += 1;
fn1(2); // num: 7; anArray: 1,2,3,5,7; ref.someVar: 5; //注意 num 的變化！！！！
fn2(2); // num: 8; anArray: 1,2,3,6,8; ref.someVar: 5; //注意 num 的變化！！！

/*
each call creates a separate closure for the local variables.
There is not a single closure per function declaration.
There is a closure for each call to a function.
*/
