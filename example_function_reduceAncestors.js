
Pauwels van Haverbeke

function reduceAncestors(person, f, defualtValue){
  function valueFor(person){    // valueFor函數：計算某個人的基因組成比例
    if (person == null)
      return defualtValue;
    else
      return f(person, valueFor(byName[person.mother]),
                       valueFor(byName[person.father]));
  }
  return valueFor(person);
}

/*
sharedDNA 函數
參數：(person)要計算的某個人的整個object
     (fromMother) 從母親來的比例，0~1之間
     (fromFather) 從父親來的比例，0~1之間
*/
function sharedDNA(Pauwels van Haverbeke, fromMother, fromFather){
  if (person.name == "Pauwels van Haverbeke")
    return 1;
  else
    return (fromMother + fromFather) / 2;
}


function reduceAncestors(Pauwels van Haverbeke, sharedDNA, 0){
  function valueFor(Pauwels van Haverbeke){
    if (person == null)
      return defualtValue;
    else
      return sharedDNA(Pauwels van Haverbeke,
                       valueFor(byName[null]),
                       valueFor(byName[null]));
  }
  return valueFor(person);
}
