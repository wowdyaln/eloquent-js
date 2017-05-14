//先從簡短的資料量開始

var MOUNTAINS = [
  {name: "Everest", height: 8848},
  {name: "vaalserberg", height: 323}
]


/*目標：輸出這樣
name         height
-----------  ------
Everest      8848
Vaalserberg  323
*/

// bulid a rows array, 書中這個居然放在最後 =_=
function dataTable(data){
  debugger
  var keys = Object.keys(data[0]);
  var headers = keys.map(function(name){
    return new UnderlinedCell(new TextCell(name));
  });

  var body = data.map(function(row){
    return keys.map(function(name){
      return new TextCell(String(row[name]));
    });
  });
  return [headers].concat(body);
}

///// var keys //////=====================
var keys = Object.keys(data[0]);
/*
The standard Object.keys function returns an array of property names in an object.
by data[0] it will look only in the first element in our data.
which is {name: "Everest", height: 8848} and the Object.
keys will pull out their properties. So our keys variable will contain
*/
keys = ["name", "height"];

///// var headers //////=====================
var headers = keys.map(function(name){
  return new UnderlinedCell(new TextCell(name));
});
/*
The map method has been applied on our keys.
The callback function will transform the two inner array
and return them in a new array. The callback function will return this:
*/
return new UnderlinedCell(new TextCell(name));
/*
The each element of keys has been sent to the TextCell contractor
and the result of it has been sent to the UnderlinedCell constructor.
At first, the map method will look at "name"
and this will be passed to the TextCell contractor.
Like this - new TextCell("name");
Let's take a look at new TextCell contractor.
*/
function TextCell(text){
  this.text = text.split("\n");
}
/*
The TextCell contractor will create an Object and the split("\n") method
with turns it into an array. So finally our object will look like this -
*/
{text: ["name"]}

//This result from the Step 1 will be sent to the UnderlinedCell constructor. Like this -
new UnderlinedCell({text: ["name"]});
//Let's take a look at the new UnderlinedCell constructor.
function UnderlinedCell(inner){
  this.inner = inner;
}
/*
The callback function of map will return
{inner: {text: ["name"]}} on the first call and
{inner: {text: ["height"]}} on the second call.
So finally our header variable will contain -
*/
var headers =
[{inner: {text: ["name"]}},{inner: {text: ["height"]}}]


///// var body //////=====================
var body = data.map(function(row){
  return keys.map(function(name){
    return new TextCell(String(row[name]));
  });
});
/*
The map method has been applied to our data and  the callback function
return another 'map' method that has been applied to keys.
It's like a loop into another loop.

Remember what is our data and keys -
**data**
MOUNTAINS = [
{name: "Everest", height: 8848},
{name: "vaalserberg", height: 323}
]

**keys**
keys = ["name", "height"];

at first, the outer map method will look at
{name: "Everest", height: 5895} and the inner map will look at "name".
So the inner map method's callback function will return this -
*/
return new TextCell(String({name: "Everest", height: 8848}["name"]));
// or
return new TextCell(String("Everest"));  //String 是js內建的constructor,會把參數通通變成字串
//回傳值
{text: ["Everest"]}
/*
The inner map method will go over the keys twice.
Second time the inner map method's callback function will return this -
*/
return new TextCell(String({name: "Everest", height: 8848}["height"]));
// or
return new TextCell(String(8848));  //chrome裡面顯示的參數是字串而非數字
//回傳值
{text: ["8848"]}

/////On the first call, the outer map will receive -
[{text: ["Everest"]},{text: ["8848"]}]
//similarly, on the second call, the outer map will receive -
[{text: ["vaalserberg"]},{text: ["323"]}]
//Finally, the body variable will contain -
var body =
[[{text: ["Everest"]},{text: ["8848"]}],[{text: ["vaalserberg"]},{text: ["323"]}]]



///// concat headers and body //////=====================
var headers =
[{inner: {text: ["name"]}},{inner: {text: ["height"]}}]

var body =
[[{text: ["Everest"]},{text: ["8848"]}],[{text: ["vaalserberg"]},{text: ["323"]}]]

return [headers].concat(body);
//回傳值
rows =
[[{inner: {text: ["name"]}},{inner: {text: ["height"]}}],[{text: ["Everest"]},{text: ["8848"]}],[{text: ["vaalserberg"]},{text: ["323"]}]]
//This is our rows. Finally, this rows has been passed to the drawTable function.

///////Get the height //////=====================
function rowHeights(rows){
  return rows.map(function(row){
    return row.reduce(function(max, cell){
      return Math.max(max, cell.minHeight());
    });
  });
}

/*
In the rowHeights function map method has been applied to our rows
and in the callback function reduce method has been applied to the each of the arrays of rows.
So at first the map method will take a look at this as row -
*/
[{inner: {text: ["name"]}},{inner: {text: ["height"]}}]
//and the reduce method will take a look at this as cell -
{inner: {text: ["name"]}}

/*
reduce method's callback function will return the maximum value of height.
cell.minHeight() method will be applied to each of our cells.
Let's take a look at cell.minHeight(),
you have to keep in mind that "inner" object is being created by the UnderlinedCell constructor
so cell.minHeight() refers to the UnderlinedCell prototypes.
*/
UnderlinedCell.prototype.minHeight = function(){
  return this.inner.minHeight() + 1;
};
//回傳值
{text: ["name"]}.minHeight() + 1

/*
Again the "text" object is being created by the TextCell constructor
so minHeight() will refer to the TextCell prototypes.
*/
TextCell.prototype.minHeight = function(){
  return this.text.length;
}
//回傳值
["name"].length +1 ---> 1+1


//rows[1] ; rows[2] 如下，因為沒有 .inner 的屬性，所以.minHeight
[{text: ["Everest"]},{text: ["8848"]}]
[{text: ["vaalserberg"]},{text: ["323"]}]
//and the reduce method will take a look at this as cell -
{text: ["Everest"]}
["Everest"].length --> 1 // 後面的8848也是1

{text: ["vaalserberg"]}
["vaalserberg"].lenght --> 1 //後面323也是1
//
heights = [2,1,1]


///////Get the Width //////=====================
function colWidths(rows){
  return rows[0].map(function(_, i){
    return rows.reduce(function(max, row){
      return Math.max(max, row[i].minWidth());
    });
  });
}
//rows[0]
[{inner: {text: ["name"]}}, {inner: {text: ["height"]}}]

/*
and the callback function of the map has applied reduce method to rows.
We should be careful that the reduce method use the entire rows, not rows[0].
And the reduce method's callback function will return the maximum width. Let's see how.

On the first call, the map will look at the first index of rows[0] which is 0 (zero).
and the second index is 1.

we can see from the arguments of the callback function that the value of rows[0] is not needed.
And the reduce method will loop over the entire rows.

So on the first call, the reduce method will look up for -
*/
Math.max(max, [{inner: {text: ["name"]}}, {inner: {text: ["height"]}}][0].minWidth())
//or
Math.max(max, {inner: {text: ["name"]}}.minWidth())

//minWidth()
//Again first it will refer to the UnderlineCell prototypes and then TextCell prototypes.
UnderlinedCell.prototype.minWidth = function(){
  return this.inner.minWidth();
};
//回傳值
{text: ["name"]}}.minWidth()
//And then the minWidth() of TextCell prototype will be applied -
TextCell.prototype.minWidth = function(){
  return this.text.reduce(function(width, line){
    return Math.max(width, line.length);
  }, 0);
};
/*
minWidth() of TextCell will apply a reduce method to the each of the element in that array.
Currently, we have only one element in our array ["name"].
But in some situation, it may have multiple elements.
The reduce method will return widest characterized word from this array.
In this case, it will return 4. Because "name".length = 4.

For the first call to rows the reduce method receive 4 similarly
for the 2nd and 3rd call it will receive 7 and 11.
And it will return the maximum number to the map which is 11.

Similarly, for the second call of the map, it will look at the second index of row[0],
which is 1. And through the process, it will receive the maximum number which is 6.
So finally our widths variable will contain [11,6].


4  name         6 height
   -----------    ------
7  Everest      4 8848
11 Vaalserberg  3 323
*/
widths = [11,6]


///////Draw the Rows //////=====================
//If we take a close look at what the drawTable function returns we can see this -
return rows.map(drawRow).join("\n");

/*
The map method has been applied to the rows and
the callback function isdrawRow which is defined into the drawTable function.
Let's take a look at drawRow.
*/
function drawRow(row, rowNum){        // rowNum 是index number
  var blocks = row.map(function(cell, colNum){  // colNum 是index number
    return cell.draw(widths[colNum], heights[rowNum]);
  });

  return blocks[0].map(function(_, lineNo){
    return drawLine(blocks, lineNo);
  }).join("\n");
}
/*
The drawRow function receives two arguments from rows.
First is the value and second are the index number.
At first, the drawRow has defined a variable blocks.

In the 'blocks' map method has been applied to the row.
Here map method also receives two parameter - value and index number.
*/
//
blocks
[{inner: {text: ["name"]}}, {inner: {text: ["height"]}}] // rowNum = 0
//And for the first call, the cell will be -
{inner: {text: ["name"]}}   // colNum = 0
//this will return from the first call -
{inner: {text: ["name"]}}.draw([11,6][0], [2,1,1][0]);
//如下
{inner: {text: ["name"]}}.draw(11,2);

///////draw function///
UnderlineCell.prototype.draw = function(width, height){
  return this.inner.draw(width, height - 1)
    .concat([repeat("-", width)]);
};
//如下
UnderlineCell.prototype.draw = function(width, height){
  return {text: ["name"]}}.draw(11,1)  //text 是 TextCell 的屬性
    .concat([repeat("-", width)]);

//Let's take a look at TextCell's draw function.
TextCell.prototype.draw = function(width, height){
  var result = [];
  for (i = 0; i < height; i++){
    var line = this.text[i] || "";
    result.push(line + repeat(" ", width - line.length));
  }
  return result;
}

/*
Again the draw function has been applied to the object
but this time the draw function will refer to the TextCell's prototypes.
The result that return from the draw function (by TextCell Prototype)
it's concatenated ([repeat("-", width)]) with it.
We will get to this point a little bit later.

We can see that there is a for loop into the function.
As our height is 1 this for loop will execute only once.
And there is a variable line which will contain either the text object content or "".
In this case, the line variable will contain -
*/
line = this.text[0]
//
line = ["name"]

///////repeat function/// 這是js內建函數
function repeat(string, times) {
 var result = "";
 for (var i = 0; i < times; i++)
  result += string;
 return result;
}
//The repeat function will receive two parameter
repeat(" ", width - line.length)
repeat(" ", 11 - 4)
// .concat([repeat("-", width)])
["name       "].concat([repeat("-", 11)]);
//  cell.draw(widths[colNum], heights[rowNum]); 如下
["name       ","-----------"]
//On the second call similarly it will receive this
["height      ", "------"]
//So the blocks variable will contain -
blocks =
[["name       ", "-----------"], ["height      ", "------"]]
//Similarly, on the 2nd and 3rd call of the rows in map, the blocks variable will contain something like this -

blocks = [["Everest        "],["8848"]]
blocks = [["Vaalserberg"],["323  "]]


///////Draw The Line //////=====================
return blocks[0].map(function(_, lineNo){
  return drawLine(blocks, lineNo);
}).join("\n");

/*
We can see map method has been applied to the first element of blocks.
On the first call, our blocks variable will contain -
*/
//blocks[0]
[["name       ", "-----------"]]
/*
The callback function will return drawLine function and pass two arguments -
the entire blocks and the lineNo which is 0 for now. It's looks like this -
*/
drawLine([["name       ", "-----------"], ["height      ", "------"]],0)
//Let's take a look at drawLine function.
function drawLine(blocks, lineNo){
  return blocks.map(function(block){
    return block[lineNo];
  }).join(" ");
}
/*
map method has been applied to the blocks.
The blocks containing 2 arrays. so at first the map will look at -
*/
["name       ", "-----------"][0]
["height      ", "------"][0]
//
["name       ","height      "]
//
["name       ","height      "].join(" ")
//
"name        height      "

/*
get back to the step 1. On the 2nd call of the map,
the line number will be 1. So from the drawLine function, we will receive -
*/
["-----------","------"].join(" ")
//
"----------- ------"
//// So finally blocks.map will return -
["name        height      ","----------- ------"]
// drawLine(blocks, lineNo)
["name        height      ","----------- ------"].join("/n")
//
name        height
----------- ------

//Previously we saw that our drawTable function return this -
return rows.map(drawRow).join("\n");
/*
For the first row we will receive our first nicely laid out table header
and for the 2nd and 3rd row similarly we will receive the rest of our
nicely laid out table content.
*/
