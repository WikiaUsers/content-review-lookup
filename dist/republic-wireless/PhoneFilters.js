/* Any JavaScript here will be loaded for all users on Unsolved Issues page load. */
/* Does not serve phones */

function clearAllDeviceFilters() {
/* show all tables */
    var issuesContent=document.getElementById('issueTables');
    var tableCount=issuesContent.getElementsByTagName("table").length;
    for (var eachTable=0;eachTable<tableCount;eachTable++){
        var cetteTable=issuesContent.getElementsByTagName("table")[eachTable];
        cetteTable.style.display="initial";
        }
/* clear any previous filters - show all rows */
    var tableRow = document.getElementById("issueTables").getElementsByTagName("tr");
    var tableRowCount = tableRow.length;
    for (var eachTableRow=1;eachTableRow<tableRowCount;eachTableRow++){
        tableRow[eachTableRow].style.display="table-row";
    }
/* clear border around selected buttons    */
    document.getElementById("filterE1").style.border="medium double white";
    document.getElementById("filterE2").style.border="medium double white";
    document.getElementById("filterG1").style.border="medium double white";
    document.getElementById("filterG3").style.border="medium double white"; 
    document.getElementById("filterX1").style.border="medium double white";
    document.getElementById("filterX2").style.border="medium double white";
    document.getElementById("filterXT").style.border="medium double white";  
    
}

function hideTables(){
/* if tables are empty after filtering, hide them */
    var emptyRow;
    var issuesContent=document.getElementById("issueTables");
    var tableCount=issuesContent.getElementsByTagName("table").length;
    for (var eachTable=0;eachTable<tableCount;eachTable++){
        emptyRow=1;
        var cetteTable=issuesContent.getElementsByTagName("table")[eachTable];
        var rowCount=cetteTable.getElementsByTagName("tr").length;
        for (var eachRow=1;eachRow<rowCount;eachRow++){
            var cetteRow=cetteTable.getElementsByTagName("tr")[eachRow];
            if (cetteRow.style.display == "none"){
                emptyRow=emptyRow+1;
            }
            if (rowCount == emptyRow){
                cetteTable.style.display="none";
            }
        }
    }
} 

$('#filterClear').click(
    clearAllDeviceFilters);

$('#filterE1').click(function () {
/* clear any previous filters */
    clearAllDeviceFilters();
/* put a border around the button to indicate it is selected */
    document.getElementById("filterE1").style.border="medium double yellow"; 
/* for each device in each row in each table, if there's no match with button name, hide row */    
    var issuesContent=document.getElementById('issueTables');
    var tableCount=issuesContent.getElementsByTagName("table").length;
    for (var eachTable=0;eachTable<tableCount;eachTable++){
        var cetteTable=issuesContent.getElementsByTagName("table")[eachTable];
        var rowCount=cetteTable.getElementsByTagName("tr").length;
        for (var eachRow=1;eachRow<rowCount;eachRow++){
            var cetteRow=cetteTable.getElementsByTagName("tr")[eachRow];
            var deviceList = cetteRow.children[1].innerHTML.split(", ");
            var foundOne=0;
            var deviceCount = deviceList.length;
            for (var eachDevice=0;eachDevice<deviceCount;eachDevice++){
                if (deviceList[eachDevice].replace( /^\s+|\s+$/g,"") == "E1" || deviceList[eachDevice].replace(/\s$/,"") == "All"){
                    foundOne=1;
                }
            }
                        if (foundOne === 0){
                cetteRow.style.display="none";
                }
        }
    }
    hideTables();
});

$('#filterE2').click(function () {
/* clear any previous filters */
    clearAllDeviceFilters();
/* put a border around the button to indicate it is selected */
    document.getElementById("filterE2").style.border="medium double yellow"; 
/* for each device in each row in each table, if there's no match with button name, hide row */    
    var issuesContent=document.getElementById('issueTables');
    var tableCount=issuesContent.getElementsByTagName("table").length;
    for (var eachTable=0;eachTable<tableCount;eachTable++){
        var cetteTable=issuesContent.getElementsByTagName("table")[eachTable];
        var rowCount=cetteTable.getElementsByTagName("tr").length;
        for (var eachRow=1;eachRow<rowCount;eachRow++){
            var cetteRow=cetteTable.getElementsByTagName("tr")[eachRow];
            var deviceList = cetteRow.children[1].innerHTML.split(", ");
            var foundOne=0;
            var deviceCount = deviceList.length;
            for (var eachDevice=0;eachDevice<deviceCount;eachDevice++){
                if (deviceList[eachDevice].replace( /^\s+|\s+$/g,"") == "E2" || deviceList[eachDevice].replace(/\s$/,"") == "All"){
                    foundOne=1;
                }
            }
                        if (foundOne === 0){
                cetteRow.style.display="none";
                }
        }
    }
    hideTables();
});

$('#filterG1').click(function () {
/* clear any previous filters */
    clearAllDeviceFilters();
/* put a border around the button to indicate it is selected */
    document.getElementById("filterG1").style.border="medium double yellow";     
/* for each device in each row in each table, if there's no match with button name, hide row */    
    var issuesContent=document.getElementById('issueTables');
    var tableCount=issuesContent.getElementsByTagName("table").length;
    for (var eachTable=0;eachTable<tableCount;eachTable++){
        var cetteTable=issuesContent.getElementsByTagName("table")[eachTable];
        var rowCount=cetteTable.getElementsByTagName("tr").length;
        for (var eachRow=1;eachRow<rowCount;eachRow++){
            var cetteRow=cetteTable.getElementsByTagName("tr")[eachRow];
            var deviceList = cetteRow.children[1].innerHTML.split(", ");
            var foundOne=0;
            var deviceCount = deviceList.length;
            for (var eachDevice=0;eachDevice<deviceCount;eachDevice++){
                if (deviceList[eachDevice].replace( /^\s+|\s+$/g,"") == "G1" || deviceList[eachDevice].replace(/\s$/,"") == "All"){
                    foundOne=1;
                }
            }
                        if (foundOne === 0){
                cetteRow.style.display="none";
                }
        }
    }
    hideTables();
});

$('#filterG3').click(function () {
/* clear any previous filters */
    clearAllDeviceFilters();
/* put a border around the button to indicate it is selected */
    document.getElementById("filterG3").style.border="medium double yellow";     
/* for each device in each row in each table, if there's no match with button name, hide row */    
    var issuesContent=document.getElementById('issueTables');
    var tableCount=issuesContent.getElementsByTagName("table").length;
    for (var eachTable=0;eachTable<tableCount;eachTable++){
        var cetteTable=issuesContent.getElementsByTagName("table")[eachTable];
        var rowCount=cetteTable.getElementsByTagName("tr").length;
        for (var eachRow=1;eachRow<rowCount;eachRow++){
            var cetteRow=cetteTable.getElementsByTagName("tr")[eachRow];
            var deviceList = cetteRow.children[1].innerHTML.split(", ");
            var foundOne=0;
            var deviceCount = deviceList.length;
            for (var eachDevice=0;eachDevice<deviceCount;eachDevice++){
                if (deviceList[eachDevice].replace( /^\s+|\s+$/g,"") == "G3" || deviceList[eachDevice].replace(/\s$/,"") == "All"){
                    foundOne=1;
                }
            }
                        if (foundOne === 0){
                cetteRow.style.display="none";
                }
        }
    }
    hideTables();
});

$('#filterX1').click(function () {
/* clear any previous filters */
    clearAllDeviceFilters();
/* put a border around the button to indicate it is selected */
    document.getElementById("filterX1").style.border="medium double yellow";     
/* for each device in each row in each table, if there's no match with button name, hide row */    
    var issuesContent=document.getElementById('issueTables');
    var tableCount=issuesContent.getElementsByTagName("table").length;
    for (var eachTable=0;eachTable<tableCount;eachTable++){
        var cetteTable=issuesContent.getElementsByTagName("table")[eachTable];
        var rowCount=cetteTable.getElementsByTagName("tr").length;
        for (var eachRow=1;eachRow<rowCount;eachRow++){
            var cetteRow=cetteTable.getElementsByTagName("tr")[eachRow];
            var deviceList = cetteRow.children[1].innerHTML.split(", ");
            var foundOne=0;
            var deviceCount = deviceList.length;
            for (var eachDevice=0;eachDevice<deviceCount;eachDevice++){
                if (deviceList[eachDevice].replace( /^\s+|\s+$/g,"") == "X1" || deviceList[eachDevice].replace(/\s$/,"") == "All"){
                    foundOne=1;
                }
            }
                        if (foundOne === 0){
                cetteRow.style.display="none";
                }
        }
    }
    hideTables();
});

$('#filterX2').click(function () {
/* clear any previous filters */
    clearAllDeviceFilters();
/* put a border around the button to indicate it is selected */
    document.getElementById("filterX2").style.border="medium double yellow";     
/* for each device in each row in each table, if there's no match with button name, hide row */    
    var issuesContent=document.getElementById('issueTables');
    var tableCount=issuesContent.getElementsByTagName("table").length;
    for (var eachTable=0;eachTable<tableCount;eachTable++){
        var cetteTable=issuesContent.getElementsByTagName("table")[eachTable];
        var rowCount=cetteTable.getElementsByTagName("tr").length;
        for (var eachRow=1;eachRow<rowCount;eachRow++){
            var cetteRow=cetteTable.getElementsByTagName("tr")[eachRow];
            var deviceList = cetteRow.children[1].innerHTML.split(", ");
            var foundOne=0;
            var deviceCount = deviceList.length;
            for (var eachDevice=0;eachDevice<deviceCount;eachDevice++){
                if (deviceList[eachDevice].replace( /^\s+|\s+$/g,"") == "X2" || deviceList[eachDevice].replace(/\s$/,"") == "All"){
                    foundOne=1;
                }
            }
                        if (foundOne === 0){
                cetteRow.style.display="none";
                }
        }
    }
    hideTables();
});

$('#filterXT').click(function () {
/* clear any previous filters */
    clearAllDeviceFilters();
/* put a border around the button to indicate it is selected */
    document.getElementById("filterXT").style.border="medium double yellow";     
/* for each device in each row in each table, if there's no match with button name, hide row */    
    var issuesContent=document.getElementById('issueTables');
    var tableCount=issuesContent.getElementsByTagName("table").length;
    for (var eachTable=0;eachTable<tableCount;eachTable++){
        var cetteTable=issuesContent.getElementsByTagName("table")[eachTable];
        var rowCount=cetteTable.getElementsByTagName("tr").length;
        for (var eachRow=1;eachRow<rowCount;eachRow++){
            var cetteRow=cetteTable.getElementsByTagName("tr")[eachRow];
            var deviceList = cetteRow.children[1].innerHTML.split(", ");
            var foundOne=0;
            var deviceCount = deviceList.length;
            for (var eachDevice=0;eachDevice<deviceCount;eachDevice++){
                if (deviceList[eachDevice].replace( /^\s+|\s+$/g,"") == "XT" || deviceList[eachDevice].replace(/\s$/,"") == "All"){
                    foundOne=1;
                }
            }
                        if (foundOne === 0){
                cetteRow.style.display="none";
                }
        }
    }
    hideTables();
});