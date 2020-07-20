$ ( '#wpTextbox1' ) . wikiEditor ( 'addToToolbar' ,  { 
	section :  'advanced' , 
	group :  'format' , 
	tools :  { 
		"strikethrough" :  { 
			label :  'Strike' , 
			type :  'button' , 
			icon :  '//upload.wikimedia.org/wikipedia/commons/3/30/Btn_toolbar_rayer.png' , 
			action :  { 
				type :  'encapsulate' , 
				options :  { 
					pre :  "<s>" , 
					post :  "</s>" 
				} 
			} 
		} 
	} 
} ) ;