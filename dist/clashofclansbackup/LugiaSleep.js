<canvas class="crazy-nessLevel" width="625" height="500" style="border-color:#FFFFFF;">
</canvas>
<script type="text/javascript">
var c=document.getElementsByClassName('crazy-nessLevel');
for(var i=0;i<c.length;i++){
var con=c[i].getContext('2d');
var slp=[6,3,4,7,0,0,17];
col=new Array();
for(var n=0;n<slp.length;n++){
col.push('#'+(Math.random()*0xFFFFFF<<0).toString(16));
}

drawL(15,5,15,485);            /*Vertical axis*/
drawL(15,485,615,485);         /*Horizontal Axis*/
drawV(19);                      /*24-hour vert*/
drawV(20);                     /*23-hour vert*/
drawV(21);                     /*22-hour vert*/
drawV(60);                     /*21-hour vert*/
drawV(80);                     /*20-hour vert*/
drawV(100);                    /*19-hour vert*/
drawV(120);                    /*18-hour vert*/
drawV(140);                    /*17-hour vert*/
drawV(160);                    /*16-hour vert*/
drawV(180);                    /*15-hour vert*/
drawV(200);                    /*14-hour vert*/
drawV(220);                    /*13-hour vert*/
drawV(240);                    /*12-hour vert*/
drawV(260);                    /*11-hour vert*/
drawV(280);                    /*10-hour vert*/
drawV(300);                    /*09-hour vert*/
drawV(320);                    /*08-hour vert*/
drawV(340);                    /*07-hour vert*/
drawV(360);                    /*06-hour vert*/
drawV(380);                    /*05-hour vert*/
drawV(400);                    /*04-hour vert*/
drawV(420);                    /*03-hour vert*/
drawV(440);                    /*02-hour vert*/
drawV(460);                    /*01-hour vert*/
drawV(480);                    /*00-hour vert*/

drawVT('24',0);                /*24-hour text*/
drawVT('23',20);               /*23-hour text*/
drawVT('22',40);               /*22-hour text*/
drawVT('21',60);               /*21-hour text*/
drawVT('20',80);               /*20-hour text*/
drawVT('19',100);              /*19-hour text*/
drawVT('18',120);              /*18-hour text*/
drawVT('17',140);              /*17-hour text*/
drawVT('16',160);              /*16-hour text*/
drawVT('15',180);              /*15-hour text*/
drawVT('14',200);              /*14-hour text*/
drawVT('13',220);              /*13-hour text*/
drawVT('12',240);              /*12-hour text*/
drawVT('11',260);              /*11-hour text*/
drawVT('10',280);              /*10-hour text*/
drawVT('09',300);              /*09-hour text*/
drawVT('08',320);              /*08-hour text*/
drawVT('07',340);              /*07-hour text*/
drawVT('06',360);              /*06-hour text*/
drawVT('05',380);              /*05-hour text*/
drawVT('04',400);              /*04-hour text*/
drawVT('03',420);              /*03-hour text*/
drawVT('02',440);              /*02-hour text*/
drawVT('01',460);              /*01-hour text*/
drawVT('00',480);              /*00-hour text*/

drawH(0);
drawH(100);
drawH(200);
drawH(300);
drawH(400);
drawH(500);
drawH(600);

drawHT('Mon',0);
drawHT('Tue',100);
drawHT('Wed',200);
drawHT('Thu',300);
drawHT('Fri',400);
drawHT('Sat',500);
drawHT('Sun',600);

for(var n=0;n<slp.length;n++){
if(n+1!=slp.length){
drawL(n*100+15,(24-slp[n])*20+5,(n+1)*100+15,(24-slp[n+1])*20+5);
}
}
for(var n=0;n<slp.length;n++){
drawP(n*100+15,(24-slp[n])*20+5,n);
}
}
function drawL(x,y,z,u){
con.moveTo(x,y);
con.lineTo(z,u);
con.stroke();
}
function drawV(y){
drawL(10,y+5,15,y+5);
}
function drawVT(t,y){
con.font="8px Arial";
con.fillText(t,0,y+9);
}
function drawH(x){
drawL(x+15,485,x+15,490);
}
function drawHT(t,x){
con.font="8px Arial";
con.fillText(t,x+8,500);
}
function drawP(x,y,n){
con.beginPath();
con.arc(x,y,3,0,2*Math.PI);
con.fillStyle=col[n];
con.fill();
}
</script>