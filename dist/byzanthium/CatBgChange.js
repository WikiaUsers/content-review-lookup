/*************************************************/
/*************** Change Background ***************/
/***************    by finding     ***************/
/***************  given Category   ***************/
/*************************************************/

if( mw.config.get( 'wgTitle' ) == 'Ellador'){
  document.body.style.background = '#ffffff';
}else{
  caties = new Array();
  caties = mw.config.get( 'wgCategories' );
  for (var i = 0; i < caties.length; ++i){
    if(caties[i] == 'Ellador'){
      document.body.style.background = '#ffffff';
    }
  }
}

/*************************************************/
/*************** Change Background ***************/
/***************        End        ***************/
/*************************************************/