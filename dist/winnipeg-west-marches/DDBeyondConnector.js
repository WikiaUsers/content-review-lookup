console.log('Initialized!');

function initddBeyondElements(){
	const ddBeyondAPI = 'https://character-service.dndbeyond.com/character/v3/character/';
	const ddBeyondElements = document.querySelector('.ddbeyond');
	
	for(let i=0; i < ddBeyondElements.length; i++){
		const ddBeyondEl = ddBeyondElements[i];
		const id = ddBeyondEl.dataset.id;
		
		if(!id){
			console.error('DDBeyond: Wrapper does not have a valid ID');
			continue;
		}
		
		fetch(ddBeyondAPI + id)
		  .then( resp => resp.json() )
		  .then( data => onDataLoaded(data, ddBeyondEl) )
		  .catch(err => {console.error('DDBeyond: Could not load character data', err)})
	}	
}

function onDataLoaded(data, element){
	element.innerHTML = `<h2>${data.name}!!</h2>`;
}

document.addEventListener('DOMContentLoaded', initddBeyondElements);