/* Οποιοσδήποτε κώδικας JavaScript εδώ θα φορτωθεί για όλους τους χρήστες σε κάθε φόρτωση σελίδας. */

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		leader: { u:'ΑΡΧΗΓΟΣ ΟΜΑΔΑΣ' },
		military: { u:'OW ΣΤΡΑΤΟΥ' },
		building: { u:'OW ΚΤΗΡΙΩΝ' },
		community: { u:'OW ΚΟΙΝΟΤΗΤΑΣ' },
		research: { u:'OW ΕΡΕΥΝΩΝ' }
	}
};

UserTagsJS.modules.custom = {
	'Dx4': ['leader'], 
	'Oratios103': ['military'], 
	'Xrusaki': ['building'], 
	'Panos78': ['building'], 
};

// Config Sorting

mw.config.set('tableSorterCollation',{'ά':'α','έ':'ε','ή':'η','ί':'ι','ϊ':'ι','ΐ':'ι','ό':'ο','ύ':'υ','ϋ':'υ','ΰ':'υ','ώ':'ω'});