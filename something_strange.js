//=======//codewars=======// Double Cola//=======//=======//=======//=======
/*
Sheldon, Leonard, Penny, Rajesh and Howard are in the queue
for a "Double Cola" drink vending machine; there are no other people in the queue.
The first one in the queue (Sheldon) buys a can, drinks it and doubles!
The resulting two Sheldons go to the end of the queue.
Then the next in the queue (Leonard) buys a can,
drinks it and gets to the end of the queue as two Leonards, and so on.

(1 ≤ r ≤ 1000000000).
For example, Penny drinks the third can of cola and the queue will look like this:
*/
Rajesh, Howard, Sheldon, Sheldon, Leonard, Leonard, Penny, Penny
/*
Write a program that will return the name of a man who will drink the n-th cola.
Note that in the very beginning the queue looks like that:
*/
Sheldon, Leonard, Penny, Rajesh, Howard

whoIsNext(["Sheldon", "Leonard", "Penny", "Rajesh", "Howard"], 1)=="Sheldon"
whoIsNext(["Sheldon", "Leonard", "Penny", "Rajesh", "Howard"], 52)=="Penny"
whoIsNext(["Sheldon", "Leonard", "Penny", "Rajesh", "Howard"], 7230702951)=="Leonard"
//
r （喝幾罐）
1. temp = array.shift(0);
2. array.push(temp)  兩次push
3. 第1步 跟 第2步做 r 次
4. 到了 r 罐的時候，回傳 array 最後一個元素

function whoIsNext(names, r){
  var backup = names; //備份 names
  for (i=1; i<=r; i++){
    var temp = names.shift(0);
    names.push(temp);
    names.push(temp);
  }
  debugger;
  var output = names[names.length-1];
  names = backup; //想要恢復 names 原本資料，debugger 看下來是沒辦法的！非常奇怪！！
  return output;
}
backup 居然會被 names 影響到！
在 whoIsNext 裡面沒辦法恢復 names 變數的原始狀態
