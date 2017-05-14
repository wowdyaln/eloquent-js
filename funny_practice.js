

//列出在 number 以下的所有質數
// 100000只要算2秒
function howmany(number){
  var output = [];
  for (var j=3; j< number; j++){ //2是質數，howmany函數會忽略
    for (var i=2; i < j; i++){
      // debugger
      if (j % i == 0)
        break;
      else if (j % i != 0)
        var temp = i;
          if (i+1 == j)
            output.push(j);
        continue;

    }
  }
  return output;
}
