$(document).ready(function() {
    var decklist_items = ".decklist dl + ul";
    
    if(document.body.contains(document.querySelector(".decklist dl + ul"))){
        decklist_items = document.querySelectorAll(decklist_items);
        for(var i = 0; i < decklist_items.length; i++){
            if(decklist_items[i].children.length < 3)
                decklist_items[i].style.columnCount = decklist_items[i].children.length;
        }
    }
});