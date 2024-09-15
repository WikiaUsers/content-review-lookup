/*
	Author of this calculator is Ashi.
	
	This code calculates the stat growth of a familiar.
	The user has to input the yellow stats in the sliders.
*/

/*
<html>
<head/>
<body>
<h1>Katana Nomogramma Pet Calculator</h1>
<p>Health</p>
<input id="pc_rangeHealth" type=range min=1 max=25 default=13
    oninput="on_change_hp()"
    onchange="on_change_hp()"
>
</br>
<p>Damage</p>
<input id="pc_rangeDamage" type=range min=1 max=9 default=5
    oninput="pc_onChangeDamage()"
    onchange="pc_onChangeDamage()"
    >
</br>
<p>Defence</p>
<input id="pc_rangeDefence" type=range min=1 max=9 default=5
    oninput="pc_onChangeDefence()"
    onchange="pc_onChangeDefence()"
>
</br>
<p>Speed</p> 
<input id="pc_rangeSpeed" type=range min=1 max=3 default=1
    oninput="pc_onChangeSpeed()"
    onchange="pc_onChangeSpeed()"
>
</br>
</br>
<table border=1>
    <colgroup>
        <col span="1" width="100px">
        <col span="11" id="pc_tableHide1" width="20px">
        <col span="1" id="pc_tableLevel12" width="20px">
        <col span="2" id="pc_tableHide2" width="20px">
        <col span="1" id="pc_tableLevel15" width="20px">
        <col span="2" id="pc_tableHide3" width="20px">
        <col span="1" id="pc_tableLevel18" width="20px">        
        <col span="2" id="pc_tableHide4" width="20px">
        <col span="1" id="pc_tableLevel21" width="20px">        
    </colgroup>
    <tr height="25px">
        <td id="pc_VisButton" onclick="pc_tableVisClick();" >Hide</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        <td>8</td>
        <td>9</td>
        <td>10</td>
        <td>11</td>
        <td>12</td>
        <td>13</td>
        <td>14</td>
        <td>15</td>
        <td>16</td>
        <td>17</td>
        <td>18</td>
        <td>19</td>
        <td>20</td>
        <td>21</td>     
    </tr>
    <tr id="pc_tableHealthPrevRow" height="25px">
        <td id="pc_tableHealthPrevVal">Health prev</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        <td>8</td>
        <td>9</td>
        <td>10</td>
        <td>11</td>
        <td>12</td>
        <td>13</td>
        <td>14</td>
        <td>15</td>
        <td>16</td>
        <td>17</td>
        <td>18</td>
        <td>19</td>
        <td>20</td>
        <td>21</td>     
    </tr>
    <tr id="pc_tableHealthRow" height="25px">
        <td id="pc_tableHealthVal">Health</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        <td>8</td>
        <td>9</td>
        <td>10</td>
        <td>11</td>
        <td>12</td>
        <td>13</td>
        <td>14</td>
        <td>15</td>
        <td>16</td>
        <td>17</td>
        <td>18</td>
        <td>19</td>
        <td>20</td>
        <td>21</td>     
    </tr>   
    <tr id="pc_tableHealthNextRow" height="25px">
        <td id="pc_tableHealthNextVal">Health next</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        <td>8</td>
        <td>9</td>
        <td>10</td>
        <td>11</td>
        <td>12</td>
        <td>13</td>
        <td>14</td>
        <td>15</td>
        <td>16</td>
        <td>17</td>
        <td>18</td>
        <td>19</td>
        <td>20</td>
        <td>21</td>     
    </tr>   
    <tr id="pc_tableDamageRow" height="25px">
        <td id="pc_tableDamageVal">Damage</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        <td>8</td>
        <td>9</td>
        <td>10</td>
        <td>11</td>
        <td>12</td>
        <td>13</td>
        <td>14</td>
        <td>15</td>
        <td>16</td>
        <td>17</td>
        <td>18</td>
        <td>19</td>
        <td>20</td>
        <td>21</td>     
    </tr>
    <tr id="pc_tableDefenceRow" height="25px">
        <td id="pc_tableDefenceVal">Defence</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        <td>8</td>
        <td>9</td>
        <td>10</td>
        <td>11</td>
        <td>12</td>
        <td>13</td>
        <td>14</td>
        <td>15</td>
        <td>16</td>
        <td>17</td>
        <td>18</td>
        <td>19</td>
        <td>20</td>
        <td>21</td>     
    </tr>
    <tr id="pc_tableSpeedRow" height="25px">
        <td id="pc_tableSpeedVal">Speed</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        <td>8</td>
        <td>9</td>
        <td>10</td>
        <td>11</td>
        <td>12</td>
        <td>13</td>
        <td>14</td>
        <td>15</td>
        <td>16</td>
        <td>17</td>
        <td>18</td>
        <td>19</td>
        <td>20</td>
        <td>21</td>     
    </tr>   
</table>
 
<script>
    pc_onChangeSpeed();
    pc_onChangeDefence();
    pc_onChangeDamage();
    on_change_hp();
 
    function on_change_hp(){
        let x = parseInt(document.getElementById("pc_rangeHealth").value);
        pc_tableRowPrintHealth(x);
        document.getElementById("pc_tableHealthPrevVal").textContent = printHealth(x-1);
        document.getElementById("pc_tableHealthVal").textContent = printHealth(x);
        document.getElementById("pc_tableHealthNextVal").textContent = printHealth(x+1);
    }
 
    function pc_onChangeSpeed(){
        let x = parseInt(document.getElementById("pc_rangeSpeed").value);
        pc_tableRowPrintSpeed(x);
        document.getElementById("pc_tableSpeedVal").textContent = printSpeed(x);
    }
 
    function pc_onChangeDefence(){
        let x = parseInt(document.getElementById("pc_rangeDefence").value);
        pc_tableRowPrintDefence(x);
        document.getElementById("pc_tableDefenceVal").textContent = printDefence(x);
    }
 
    function pc_onChangeDamage(){
        let x = parseInt(document.getElementById("pc_rangeDamage").value);
        pc_tableRowPrintDamage(x);
        document.getElementById("pc_tableDamageVal").textContent = printDamage(x);
    }
    
    function pc_tableRowPrintDamage(x){
        let row = document.getElementById("pc_tableDamageRow");
        for (let i = 1; i<=21; i++){
            row.cells[i].textContent = calcDamage(x,i);
        }
    }
    function pc_tableRowPrintDefence(x){
        let row = document.getElementById("pc_tableDefenceRow");
        for (let i = 1; i<=21; i++){
            row.cells[i].textContent = calcDefence(x,i);
        }
    }
    function pc_tableRowPrintSpeed(x){
        let row = document.getElementById("pc_tableSpeedRow");
        for (let i = 1; i<=21; i++){
            row.cells[i].textContent = calcSpeed(x,i);
        }
    }   
    function pc_tableRowPrintHealth(x){
        let row0 = document.getElementById("pc_tableHealthPrevRow");
        let row1 = document.getElementById("pc_tableHealthRow");
        let row2 = document.getElementById("pc_tableHealthNextRow");
        for (let i = 1; i<=21; i++){
            if (x>1) {row0.cells[i].textContent = calcHealth(x-1,i);}
            else {row0.cells[i].textContent = "♥"}
            row1.cells[i].textContent = calcHealth(x,i);
            if (x<25) {row2.cells[i].textContent = calcHealth(x+1,i);}
            else {row2.cells[i].textContent = "♥"}
        }
    }       
 
    function pc_tableHideCols(){
        document.getElementById("pc_tableHide1").style.visibility='collapse';
        document.getElementById("pc_tableHide2").style.visibility='collapse';
        document.getElementById("pc_tableHide3").style.visibility='collapse';
        document.getElementById("pc_tableHide4").style.visibility='collapse';
        document.getElementById("pc_VisButton").textContent = "Show";
    }
    function pc_tableShowCols(){
        document.getElementById("pc_tableHide1").style.visibility='visible';
        document.getElementById("pc_tableHide2").style.visibility='visible';
        document.getElementById("pc_tableHide3").style.visibility='visible';
        document.getElementById("pc_tableHide4").style.visibility='visible';
        document.getElementById("pc_VisButton").textContent = "Hide";
    }
    function pc_tableVisClick(){
        if (document.getElementById("pc_tableHide1").style.visibility=='collapse') {
            pc_tableShowCols();
        }
        else {
            pc_tableHideCols();
        }
    }
 
    function printHealth(value){
        let result = "";
        let x = parseInt(value);
        for(let i=0;i<x/6;i++){
            result+="♥"
        }
        switch(x-Math.floor(x/6)*6){
            case 1:
                result += ""
                break;
            case 2:
                result += "⅙";
                break;
            case 3:
                result += "⅓";
                break;
            case 4:
                result += "½";
                break;
            case 5:
                result += "⅔";
                break;
            case 0:
                result += "⅚";
                break;
        default:
            result+= "?";
        }
        if (x==0) {result="---";}
        if (x==26) {result="+++";}
        return result;  
    }
    
        function printDamage(value){
        let result = ""; 
        switch(value){
            case 1:
                result = "♠";
                break;
            case 2:
                result = "♠½";
                break;
            case 3:
                result = "♠♠";
                break;
            case 4:
                result = "♠♠½";
                break;
            case 5:
                result = "♠♠♠";
                break;
            case 6:
                result = "♠♠♠½";
                break;
            case 7:
                result = "♠♠♠♠";
                break;
            case 8:
                result = "♠♠♠♠½";
                break;
            case 9:
                result = "♠♠♠♠♠";
                break;
        default:
            result = "?";
        }
        return result;  
    }
        function printDefence(value){
        let result = ""; 
        switch(value){
            case 1:
                result = "♦";
                break;
            case 2:
                result = "♦½";
                break;
            case 3:
                result = "♦♦";
                break;
            case 4:
                result = "♦♦½";
                break;
            case 5:
                result = "♦♦♦";
                break;
            case 6:
                result = "♦♦♦½";
                break;
            case 7:
                result = "♦♦♦♦";
                break;
            case 8:
                result = "♦♦♦♦½";
                break;
            case 9:
                result = "♦♦♦♦♦";
                break;
        default:
            result = "?";
        }
        return result;  
    }
        function printSpeed(value){
        let result = ""; 
        switch(value){
            case 1:
                result = "●";
                break;
            case 2:
                result = "●●";
                break;
            case 3:
                result = "●●●";
                break;
        default:
            result = "?";
        }
        return result;  
    }   
    
    function calcBase(x,y)  {
        let result = 0;
        if ((x>0) && (y>0)) {
            result = Math.round(0.8+(y-1)*(x-1-Math.floor(x/5))/20) + Math.floor(x/5);
        }
        return result;
    }
    function calcDamage(x,y)    {
        let result = 0;
        if ((x>0) && (y>0)) {
            result = calcBase(x+11,y)+2;
        }
        return result;
    }
    function calcDefence(x,y)   {
        let result = 0;
        if ((x>0) && (y>0)) {
            result = calcBase(x+7,y);
        }
        return result;
    }   
    function calcSpeed(x,y) {
        let result = 0;
        if ((x>0) && (y>0)) {
            result = calcBase(x,y)+2;
        }
        return result;
    }   
    function calcHealth(x,y)    {
        let result = 0;
        if ((x>0) && (y>0)) {
            result = calcBase(x+3,y)+y+11;
        }
        return result;
    }
    
</script>
</body>
</html>*/

function create_slider ( stat_type, min_stat, max_stat, default_stat ){
	var paragraph = document.createElement("p");
	paragraph.innerHTML = stat_type;
	paragraph.appendChild(document.createElement("br"));
	var slider_input = document.createElement("input");
	slider_input.id = "range_" + stat_type.slice(0,3);
	slider_input.type = "range";
	slider_input.min = min_stat;
	slider_input.max = max_stat;
	slider_input.default = default_stat;
	//slider_input.oninput = "on_change_hp()";
	//slider_input.onchange = "on_change_hp()";
	paragraph.appendChild(slider_input);
	return paragraph;
}

//Creates sliders on page "Dungeon:_familiars".
if (mw.config.get("wgPageName") === "Dungeon:_familiars") {
	/*
	
	*/
	var hp_paragraph = create_slider ( "Health", "1", "25", "13" );
	var dmg_paragraph = create_slider ( "Damage", "1", "9", "5" );
	var def_paragraph = create_slider ( "Defense", "1", "9", "5" );
	var ap_paragraph = create_slider ( "Action points", "1", "3", "1" );
	var sliders = document.createElement("div");
	sliders.appendChild(hp_paragraph);
	sliders.appendChild(dmg_paragraph);
	sliders.appendChild(def_paragraph);
	sliders.appendChild(ap_paragraph);
	
	//var inputBox = document.createElement("div");
	//var input = document.createElement("input");
	//input.id = "fragments";
	//var getAnswer = document.createElement("button");
	//getAnswer.innerHTML = "Calculate"; 
	//getAnswer.id = "myBtn";
	//getAnswer.addEventListener("click", mosaic_calculator_f); 
	//inputBox.appendChild(input);
	//inputBox.appendChild(getAnswer);
	/*inputBox.addEventListener("keyup", function(event) {
		//When Enter is pressed:
		if (event.keyCode === 13) {
			event.preventDefault();
			document.getElementById("myBtn").click();
		}
	});*/
	//document.getElementById("familiar_stat_calculator").appendChild(sliders);
	var x = document.createElement("div");
	/*
	<p>Health</p>
<input id="pc_rangeHealth" type=range min=1 max=25 default=13
    oninput="on_change_hp()"
    onchange="on_change_hp()"
>
</br>
<p>Damage</p>
<input id="pc_rangeDamage" type=range min=1 max=9 default=5
    oninput="pc_onChangeDamage()"
    onchange="pc_onChangeDamage()"
    >
</br>
<p>Defence</p>
<input id="pc_rangeDefence" type=range min=1 max=9 default=5
    oninput="pc_onChangeDefence()"
    onchange="pc_onChangeDefence()"
>
</br>
<p>Speed</p> 
<input id="pc_rangeSpeed" type=range min=1 max=3 default=1
    oninput="pc_onChangeSpeed()"
    onchange="pc_onChangeSpeed()"
>*/
	x.innerHTML = "Health<br /><input id=&quot;pc_rangeHealth&quot; type=range min=1 max=25 default=13 oninput=&quot;on_change_hp()&quot; onchange=&quot;on_change_hp()&quot;>";
	document.getElementById("familiar_stat_calculator").appendChild(x);
}