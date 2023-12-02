var container = document.getElementById("items-container");
var check1 = document.getElementById("check1");
var showTitles = check1.checked;
function displayItems(titlesBool) {
  container.innerHTML = "";
  for(let i in items) {
    let listNameEl = document.createElement("h2");
    listNameEl.className = "list-name";
    listNameEl.id = i;
    listNameEl.textContent = i;
    container.appendChild(listNameEl);
    
    let listEl = document.createElement("ul");
    listEl.id = i + "-list";
    listEl.className = "no-bullets";
    container.appendChild(listEl);
    
    for(let j = 0; j < items[i].length; j++) {
      let it = items[i][j];
      let itemEl = document.createElement("li");
      itemEl.className = "item";
      itemEl.innerHTML = "<span title='none'>⚪</span> ";
      for(let k in types) {
        if(it.tgs.includes(k)) {
          itemEl.innerHTML = "<span class='type' title='" + k + "'>" + types[k] + "</span> ";
        }
      }
      itemEl.innerHTML +=
      (it.name ? "<i class='item-title'>" + it.name + "</i> by " : "") +
      (it.author || "") +
      "<br>" + 
      (it.titles && titlesBool ? "<span class='series-titles'><i>" + it.titles + "</i></span><br>" : "");
      listEl.appendChild(itemEl);
    }
  }
}

var toc = document.getElementById("toc-container");
var addToToc = document.getElementsByTagName("h2");
var inToc = document.getElementsByClassName("in-toc");
function updateToc() {
  for(let i = 0; i < inToc.length; i++) {
    inToc[i].innerHTML = "<a href='javascript:scroll({ top: " + (addToToc[i + 1].offsetTop - 47) + ", behavior: \"smooth\" })'>" + addToToc[i + 1].textContent + "</a>";
    //the -47 is because after the first time the toc runs, the page is longer. it's a hard number because I don't want to fiddle with that lol
  }
}

//run
displayItems(showTitles);
for(let i = 1; i < addToToc.length; i++) {
  let cont = document.createElement("li");
  cont.className = "in-toc";
  cont.innerHTML = "<a href='javascript:scroll({ top: " + (addToToc[i].offsetTop + 100) + ", behavior: \"smooth\" })'>" + addToToc[i].textContent + "</a>";
  //the 100 is the distance from the top of the page to the bottom of "Table of Contents." i think.
  toc.appendChild(cont);
}

//checkbox action
check1.addEventListener("click", function() {
  showTitles = check1.checked;
  displayItems(showTitles);
  updateToc();
});
