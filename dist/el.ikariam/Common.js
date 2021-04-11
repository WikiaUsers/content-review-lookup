// Ρυθμίσεις ετικετών χρηστών.
window.UserTagsJS =
{
	modules: {},
	tags:
	{
		// Ετικέτες FANDOM
		founder:			{ order: 1, u: 'Ιδρυτής', m: 'Ιδρυτής', f: 'Ιδρύτρια' },
		bureaucrat:			{ order: 2, u: 'Γραφειοκράτης' },
		sysop:				{ order: 3, u: 'Διαχειριστής' },

		'mini-sysop':		{ order: 4, u: 'Μικρός Διαχειριστής', m: 'Μικρός Διαχειριστής', f: 'Μικρή Διαχειριστής' },
		chatmoderator:		{ order: 4, u: 'Χειριστής συνομιλίας' },
		patroller:			{ order: 5, u: 'Περιπολών', m: 'Περιπολών', f: 'Περιπολούσα' },
		rollback:			{ order: 6, u: 'Επαναφέρων', m: 'Επαναφέρων', f: 'Επαναφέρουσα' },
		bannedfromchat:		{ order: 7, u: 'Αποκλεισμένος', m: 'Αποκλεισμένος', f: 'Αποκλεισμένη' },
		'vandal-patrol':	{ order: 8, u: 'Ισχυρώς Περιπολών', m: 'Ισχυρώς Περιπολών', f: 'Ισχυρώς Περιπολούσα' },
		bot:				{ order: 80, u: 'Ρομπότ' },
		'bot-global':		{ order: 80, u: 'Καθολικό Ρομπότ' },

		// ΠΡΟΣΑΡΜΟΣΜΕΝΕΣ Ετικέτες
		js:					{ order: 20, u: 'Ειδήμων JavaScript' },
		css:				{ order: 21, u: 'Ειδήμων CSS' },
		template:			{ order: 22, u: 'Ειδήμων προτύπων' },
		programmer:			{ order: 23, u: 'Προγραμματιστής', m: 'Προγραμματιστής', f: 'Προγραμματίστρια' },
		emeritus:			{ order: 23, u: 'Ομότιμος', m: 'Ομότιμος', f: 'Ομότιμη' },

		// Ετικέτα ΑΝΕΝΕΡΓΟΣ
		inactive:		{ order: 99, u: 'Ανενεργός', m: 'Ανενεργός', f: 'Ανενεργή' }
	},
	oasisPlaceBefore: ''
};

UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 60;								// Ένδειξη Ανενεργός μετά από 60 ημέρες
UserTagsJS.modules.mwGroups = ['founder','bureaucrat','chatmoderator','patroller','rollback','sysop','bannedfromchat','bot','bot-global'];	// Προσθήκη ομάδων FANDOM

UserTagsJS.modules.metafilter =
{
	sysop: ['bureaucrat','founder'],							// Απομακρύνει την ομάδα διαχειριστών από τους γραφειοκράτες/ιδρυτές
	bureaucrat: ['founder'],									// Απομακρύνει την ομάδα γραφειοκρατών από τους ιδρυτές
	chatmoderator: ['sysop','bureaucrat']						// Απομακρύνει την ομάδα χειριστών συνομιλίας από τους διαχειριστές/γραφειοκράτες
};

UserTagsJS.modules.userfilter =
{																// Απομακρύνει ετικέτες - Δεν εμφανίζονται ποτέ στο χρήστη
};

UserTagsJS.modules.implode =
{ // Combines tags - If multi-tags then display single tag
	'mini-sysop': ['patroller','rollback','chatmoderator'], 	// Απομακρύνει τα Περιπολών, Επαναφέρων και Χειριστής συνομιλίας, αν είναι όλα και αντικαθίσταται με το «mini-sysop»
	'programmer': ['js','css','template'],						// Απομακρύνει τις επιμέρους γλώσσες προγραμματισμού, αν είναι όλες και αντικαθίσταται με το «Προγραμματιστής»
};

UserTagsJS.modules.explode =									// Επέκταση ετικετών - Προσθέτει επιπλέον ετικέτες αν υπάρχουν συγκεκριμένες ετικέτες
{ 
	'vandal-patrol': ['patroller','rollback']					// Προσθήκη «Ισχυρώς Περιπολών» σε όλους όσους έχουν τις ετικέτες «Περιπολών» και «Επαναφέρων»
};

// Προσθήκη προσαρμοσμένων ομάδων σε χρήστες
UserTagsJS.modules.custom =
{
	'Ifaigios': ['founder'],
	'Panos78':  ['bureaucrat','sysop','js','css','template'],
	'Jrooksjr': ['bureaucrat','sysop','css','template'],
	'Dx4': ['emeritus']
};

// Ρύθμιση ταξινόμησης

mw.config.set('tableSorterCollation',{'ά':'α','έ':'ε','ή':'η','ί':'ι','ϊ':'ι','ΐ':'ι','ό':'ο','ύ':'υ','ϋ':'υ','ΰ':'υ','ώ':'ω'});