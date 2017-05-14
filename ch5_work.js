/* Flattening
把 二維array [[2,4],[3,6],["d","cs",3],...] 變成
  一維 array [2,4,3,6,"d","cs",3,...]
  使用 reduce 跟 concat 來達成

[]

array[0]=> [2,4]
array[1]=> [3,6]
array[2]=> ["d","cs",3]

*/
a = [[2,4],[3,6],["d","cs",3]]

// var next = a[1] //注意，不用指定第二個參數，詳見p66
a.reduce(function(current, next){
  console.log(next);
  return current.concat(next);
});


// 計算母親跟孩子的平均年齡差距，用ch5的average函數，byName物件
/*
某人 p = byName[person] 。他的母親 m = byName[person.mother]
某人跟他母親的年齡差距：
p.born - m.born
這一題卡好久～！！！最後看解答了
*/
//篩選出 .mother 不是null的, 即使如此，不見得有mother的資料！
//所以要再篩選出mother 有資料才行
  var exist = ancestry.filter(function (person){
    //注意，不是用 byName.filter, 因為byName只有.name 屬性
    if (person.mother != null && byName[person.mother] != null)
      return person;
  });

//上面多此一舉，只要檢查 byName[person.mother] != null 就可以了
  var exist2 = ancestry.filter(function (person){
    if (person.mother != null)
      return person;
  });


//以上我做的，沒解出來


//答案公布

function average(array) {       //書上的函數，很好懂
    function plus(a, b) { return a + b; }
    return array.reduce(plus) / array.length;
  }

  var byName = {};            //書上的 byName 物件
  ancestry.forEach(function(person) {
      byName[person.name] = person;});

//把 母子的年齡差 把它們 map 出來
  var differences = ancestry.filter(function(person) {
      return byName[person.mother] != null; //條件true的 array才列出來，我上面有做到這裡
    }).map(function(person) {
        return person.born - byName[person.mother].born; //這我也有想到，但不知道要這樣的連續技
      });

        console.log(average(differences));// → 31.2



  var differences = ancestry.filter(function(person) {
      return byName[person.mother] != null; //條件true的 array才列出來，我上面有做到這裡
    }).map(function(person) {
        return person.born - byName[person.mother].born; //這我也有想到，但不知道要這樣的連續技
      });



      /*
      列出壽命90歲以上的人
      每個人屬於其死亡的那個世紀 Math.ceil(person.died/100)
      */

//列出壽命90歲以上的人
ancestry.filter(function(person){
  return person.died - person.born >= 90;
});   //共有4個

//每個人屬於其死亡的那個世紀 Math.ceil(person.died/100)
ancestry.forEach(function f(person){
  var century = Math.ceil(person.died/100);
  console.log(person.name + ": " + century);
});

//算出每個世紀（分組）祖先的平均壽命

ancestry.map(function f(person){
  return Math.ceil(person.died/100);
}).sort();


//列出17世紀的祖先，個別壽命
age17 = ancestry.filter(function(person){
  return Math.ceil(person.died/100) == 17;
}).map(function(person){
  return person.died - person.born;
})

average(age17);

//算出某世紀的平均壽命
function group(array, century){
  var igroup = array.filter(function(person){
    return Math.ceil(person.died/100) == century;
  }).map(function(person){
    return person.died - person.born;
  })
  return igroup;
}

group(ancestry, 18);
//算出17世紀的平均壽命
average(group(ancestry, 18));


//分別算出16~20世紀
function everyAge(array){

  for (i = 16; i < 21; i++){  //有什麼方法可以讓不合理的 i 不要輸出？
      var age = average(group(array, i));
      console.log(i + ": " + age);
  }

}
everyAge(ancestry);



// groupBy 看不懂


// array 的 every;some 方法
// every
a = [2,1,2]

function every(array,f){
  var k = true;
  for (i = 0; i < array.length; i++){
    if (!f(array[i]))
    //只要有一個element = false ，k就=false
      k = false;
  }
  return k;
}

function test(element){
  return element == 2;
}

every(a,test);




// some
a = [1,1,0,3,1,4,0,1,1,1,1,1,1,1,1]

function some(array,f){
  var k = false;
  for (i = 0; i < array.length; i++){
    if (f(array[i]))
    //只要有一個element = true ，k就=true
      k = true;
  }
  return k;
}

function test(element){
  return element == 2;
}

some(a,test);
