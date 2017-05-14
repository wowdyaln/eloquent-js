/* http://kurtle.io/2015/09/04/recursion-in-javascript.html
這個程式是從某個後代，回推到源頭 Pauwels van Haverbeke
上面這篇blog 是直接從 Pauwels van Haverbeke 往前慢慢推到後代
可以看出 reduceAncestors 函數 跟 sharedDNA 函數是怎麼搭配的

參數：(person)要計算的某個人的整個object
     (f)合併父母基因的組成比例
     (defualtValue)初始值
Philibert Haverbeke 作者的祖父
Pauwels van Haverbeke 族譜當中最源頭的祖先
*/
//我把 defualtValue 拿掉，直接改成回傳0, 會比較好懂
function reduceAncestors(person, f){
  function valueFor(person){    // valueFor函數：計算某個人的基因組成比例
    if (person == null) //如果找不到這個人，就回傳 0
      return 0;
    else
      return f(person, valueFor(byName[person.mother]),
                       valueFor(byName[person.father]));
  }
  return valueFor(person);  //這一行不要忘了，因為上面return 的只是 f函數的值
}

/*
sharedDNA 函數
參數：(person)要計算的某個人的整個object
     (fromMother) 從母親來的比例，0~1之間
     (fromFather) 從父親來的比例，0~1之間
*/
function sharedDNA(person, fromMother, fromFather){
  if (person.name == "Pauwels van Haverbeke")
    return 1; // Pauwels van Haverbeke 當然等於自己
  else
    return (fromMother + fromFather) / 2; //不然就看自已父母兩者加起來有多少來自 Pauwels van Haverbeke
}


// blog 中，把 sharedDNA 函數，更改成以下，然後去執行看看程式發生了什麼事情（有debug 的概念）
function sharedDNA(person, fromMother, fromFather) {
  if (person.name == "Pauwels van Haverbeke") {
    console.log("landed on Pauwels");
    return 1;
  } else {
    console.log("current person: " + person.name);
    console.log("from Mother: " + fromMother);
    console.log("from Father: " + fromFather);
    return (fromMother + fromFather) / 2;
  }
}


// blog 開始從 Pauwels van Haverbeke 往前慢慢後推到後代
//person 是 Pauwels van Haverbeke 的情況
var pauwels = byName["Pauwels van Haverbeke"];
reduceAncestors(pauwels, sharedDNA);

/*sharedDNA 回傳 1， reduceAncestors 還要等 valueFor(byName[person.mother] 跟 valueFor(byName[person.father] 的計算
return f(person, valueFor(byName[person.mother]),
                 valueFor(byName[person.father]));
*/
return sharedDNA(pauwels, valueFor(byName[null]),
                          valueFor(byName["N. van Haverbeke"]));
//上面直接回傳 1 了， 其實後面兩個 valueFor 回傳的值，對於 sharedDNA 函數已經不重要了

//對於 reduceAncestors 函數，整個 valueFor 函數回傳值 = 1, 所以 reduceAncestors回傳值也就 =1


/*找到 Pauwels van Haverbeke 的兒子 "Lieven van Haverbeke"
//執行看看
var pauwelsChild = byName["Lieven van Haverbeke"];
reduceAncestors(pauwelsChild, sharedDNA, 0);
*/
return sharedDNA(pauwelsChild, valueFor(byName["Lievijne Jans"]),
//Lievijne Jans有資料但是沒有父母的資料,所以整個 valueFor回傳值＝0
                               valueFor(byName["N. van Haverbeke"]);
                              //由剛剛得知 整個回傳值 =1

// 所以 sharedDNA 函數回傳值 =>
else
  return (0 + 1) / 2
//所以 valueFor(pauwelsChild) 還有 reduceAncestors(pauwelsChild, sharedDNA)的回傳值都是 0.5
