//p83 做一個 2x2 的棋盤
//rows 是一個 二階array
//概念如下
var rows = [];
for(i = 0; i < 2; i++){
  var row = [];
  for (j = 0; j < 2; j++){
    if((j+i % 2 == 0))
      row.push("##"); //push 是string
    else
      row.push("--");
  }
  rows.push(row);
}

// push一個物件進row, 而不只是string而已
var rows = [];
for(i = 0; i < 2; i++){
  var row = [];
  for (j = 0; j < 2; j++){
    if((j+i % 2 == 0))
      row.push(new TextCell("##"));  //push進一個物件
    else
      row.push(new TextCell("--")); //push進一個物件
  }
  rows.push(row);
}

//來定義 TextCell 這個 Constructor（建構式；構造函數）
function TextCell(text) {
  this.text = text.split("\n");
}

//.split 的用法; 跟 .join比較看看
a = "This is a\nTEST"
a.split("\n");

b = "thiskiskakkkTEST"
b.split("k");

//所以 rows 看幾來會像是這樣
[ [{text: ["##"]},{text: ["--"]}],
  [{text: ["--"]},{text: ["##"]}] ]

/* 我們想要把上面的資料圖像化，如下
              ##--
              --##

   第一個row [{"##"},{"--"}]
   第二個row [{"--"},{"##"}]
*/
// drawTable
function drawTable(rows){
  var heights = rowHeights(rows);
  var widths = colWidths(rows);
}

//Find the heights value with the rowHeights function
// rowHeights
function rowHeights(rows){
  return rows.map(function(row){
    return row.reduce(function(max, cell){
      //rows[0] => [{text: ["##"]},{text: ["--"]}]
      return Math.max(max, cell.minHeight();  //minHeight要加()
    }, 0);
  });
}

//minHeight ,在 TextCell 裡面新增一個 minHeight 方法
TextCell.prototype.minHeight = function(){
  return this.text.length;
};
//rows[0] => [{text: ["##"]},{text: ["--"]}]
//rows[1] => [{text: ["──"]},{text: ["##"]}]
整個 rowHeights(rows) 會回傳 [1,1] => [第一個row的最小高度, 第二個row的最小高度]


//Find the widths value with the colWidths function 這個不好理解！！
// colWidths
function colWidths(rows){
  return rows[0].map(function(_, i){
    return rows.reduce(function(max, row){
      return Math.max(max, row[i].minWidth());
    }, 0);
  });
}

//minWidth 這個不好理解
TextCell.prototype.minWidth = function(){
  return this.text.reduce(function(width, line){
    return Math.max(width, line.length);
  }, 0);
};

//rows[0] => [{text: ["##"]},{text: ["--"]}]
//rows[1] => [{text: ["──"]},{text: ["##"]}]
整個 colWidths(rows) 會回傳 [2,2] => [第一個row的最大寬度, 第二個row的最大寬度]

所以， widths == [2,2]     heights == [1,1]


//Find the blocks value
function drawTable(rows){
  var heights = rowHeights(rows);
  var widths = colWidths(rows);

  function drawRow(row, rowNum){  //p82 有說明 , rowNum 表示目前跑到的row
    var blocks = row.map(function(cell, colNum){
      // [{text: ["##"]},{text: ["--"]}]
      return cell.draw(widths[colNum], heights[rowNum]); //.draw 詳見下面TextCell
    });
    return blocks[0].map(function(_, lineNo){
      return drawLine(blocks, lineNo);
    }).join("\n");
  }
  return rows.map(drawRow).join("\n"); //上面的drawRow在這裡用
}


// .draw
TextCell.prototype.draw = function(width, height){
  var result = [];
  for (var i = 0; i < height; i++){
    var line = this.text[i] || "";
    result.push(line + repeat(" ", width - line.length));
                      //repeat 是javascript 內建函數，書中完全沒有解釋
  }
  return result;
}

//repeat 是這樣（內建的小函數）
function repeat(string, times){
  var result = "";
  for (i = 0; i < times; i++){
    result += string;
  }
}


//Create each line of the table/checkerboard with the drawLine function
return blocks[0].map(function(_, lineNo){
  return drawLine(blocks, lineNo); //drawLine 看下面
}).join("\n");


//drawLine 在 drawTable裡面
function drawLine(blocks, lineNo){
  return blocks.map(function(block){
    return block[lineNo];
  }).join(" ");
}
