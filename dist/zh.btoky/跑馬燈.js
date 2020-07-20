$('<marquee onMouseOver="this.stop()" onMouseOut="this.start()" scrollamount="5" behavior="scroll" direction="left"><span id="marquee_message"></span></marquee>').appendTo('#marquee');

for (var i=0;i<5;i++) {
    $.get('http://zh.btoky.wikia.com/api.php?format=json&action=expandtemplates&text={{跑馬燈|'+i+'}}',function(data){
        var testmessage = data.expandtemplates['*'];
        console.log('message:'+testmessage);
    });
}
$.get('http://zh.btoky.wikia.com/api.php?format=json&action=parse&text={{跑馬燈}}',function(data){
	var marqueeMessage = data.parse.text['*'];
	$('#marquee_message').html(marqueeMessage);
	console.log(marqueeMessage);
	}
);