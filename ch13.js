//p169
//作用： scans a document for text nodes containing a given string
//and returns true when it has found one:
function talksAbout(node, string){
  if (node.nodeType == document.ELEMENT_NODE) { // == 1 的意思
    for(i = 0; i < node.childNodes.length; i++){
      if (talksAbout(node.childNodes[i],string)) //這一行很巧妙的call 自己
        return true;
    }
    return false;
  }

  else if (node.nodeType == document.TEXT_NODE) { // == 3 的意思
    return node.nodeValue.indexOf(string) > -1; //回傳 true ; false
  }
}



//p172 createElement ; 建立一個 nodeType == 1 的node
//執行看看
document.createElemnet("ohmytag")
document.body.getElementsByTagName("ohmytag") //回傳一個空的node

document.body.textContent

document.getElementsByTagName("div")
document.getElementsByTagName("div")[1].style // p
