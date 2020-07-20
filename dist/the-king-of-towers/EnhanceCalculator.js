(function($){
	$(function(){
		var target=$('#EnhanceCalculator');
		if(target.length===0) return;
		var data = [
			{goldCostRate:0.7,name:'Common',gs:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
			{goldCostRate:1,name:'Special',gs:[0,0,0,1,2,3,4,6,8,10,12,13,14,18,22,24,26,28,30,35,40]},
			{goldCostRate:1.3,name:'Elite',gs:[0,0,2,2,3,4,5,7,9,11,13,14,15,20,24,30,35,40,45,50,55]},
			{goldCostRate:1.5,name:'Wicked',gs:[0,1,2,3,4,5,6,8,10,12,14,15,16,22,26,30,35,40,45,50,55]},
			{goldCostRate:3,name:'Legendary',gs:[2,3,4,5,6,7,8,10,12,14,16,17,18,25,30,35,40,45,50,55,60]}
		];
		var level=1, type=0, labs='';
		data.forEach(function(obj,id){labs += '<label><input type="radio" name="type" value="'+id+'"'+(id===0?' checked':'')+'> '+obj.name+'</label>';});
		$('#EnhanceCalculator_labels').html(labs).find('input[type=radio]').on('change', function(){type = $(this).val()*1;update();});
		$('<input type="number" name="level" value="1" min="1" max="109" step="1">').appendTo($('#EnhanceCalculator_level').empty()).on('input', function(){level = $(this).val()|0;update();});
		function calbylv(lvl){
			var l = lvl|0,cost=0;
			if( l <= 21 ) cost=0.5*(l-1)*(l-1)+17.5*(l-1)+22;
			else if(l<=41) cost=1.1*(l-22)*(l-22)+37.8*(l-22)+580;
			else if(l<=100) cost=2.1*(l-42)*(l-42)+83*(l-42)+1810;
			else if(l<=110) cost=2.1*(100-42)*(100-42)+83*(100-42)+1810;
			cost = Math.floor(cost);
			costLower = lowerVal(cost);
			if (costLower / 5 == 0.2) cost += 4;
            else if (costLower / 5 == 0.4) cost += 3;
            else if (costLower / 5 == 0.6) cost += 2;
            else if (costLower / 5 == 0.8) cost += 1;
			return (Math.floor(cost)*data[type].goldCostRate)|0;
		}
		function lowerVal(result) {
                var i = 1;
                while (result - i*5 > 5){
                    i++;
                }
                return (result - i*5);
            }
		
		function update(){
			var totalG=levelG=totalGS=levelGS=cgs=0,gs=data[type].gs,gsl=[4,9,14,19,29,34,39,44,49,54,60,65,70,75,80,85,90,95,100,105,110];
			for(var i=2;i<=level;i++) {
				totalG+= levelG = calbylv(i);
				if(i>gsl[cgs])cgs++;
				totalGS += levelGS = gs[cgs];
			}
			if(i>gsl[cgs])cgs++;
			levelG = calbylv(i);
			levelGS = gs[cgs]>=0?gs[cgs]:'Unknown';
			target.find('span.field-level-cost').text('Gold x '+levelG+', GS x '+levelGS);
			target.find('span.field-total-cost').text('Gold x '+totalG+', GS x '+totalGS);
		}
		update();
	});
})(jQuery);