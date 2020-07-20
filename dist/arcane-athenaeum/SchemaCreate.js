$(function () {
	var col = document.getElementById('Color').value;
	var cog = document.getElementById('Cognition').value;
	var affin = document.getElementById('Affinity').value;
	var apt = document.getElementById('Aptitude').value;
	var res = document.getElementById('Restraint').value;
	var pre = document.getElementById('Precision').value;
	var luck = document.getElementById('Luck'.value);
	var chartWrapper = document.createElement('div')
	var canvasElem = document.createElement('canvas')
          canvasElem.setAttribute('width', 40)
          canvasElem.setAttribute('height', 40)
          chartWrapper.appendChild(canvasElem)
          
    var main = document.getElementByID('Wrapper');
    
    main.appendChild(chartWrapper)
          
	var dataSet = [cog, affin, apt, res, pre, luck];
	
	var myRadarChart = new Chart(ctx, {
	    
    type: 'radar',
    
    data: {
        
        labels: ['Cognition', 'Affinity', 'Aptitude', 'Restraint', 'Precision', 'Luck'],
        
        datasets: [
        {
            fillColor: col,
            strokeColor: col,
            data: dataSet
            
        }//additional datasets can be added
        ]
    }

});

}());