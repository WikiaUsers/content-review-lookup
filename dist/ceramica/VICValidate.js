var VICvalidate = {
 old: null,
 input : null,
 install : function()
 {
  var form = document.getElementsByTagName("FORM")[0];
  var input = form.getElementsByTagName('INPUT');
  VICvalidate.input = input[5];
  form.onsubmit  = VICvalidate.check;
 },
 check : function()
 {
  var image_filter = /^[Cc]ommons:[Vv]alued[ _]image[_ ]candidates\/[Ii]mage:/;
  var file_filter = /^[Cc]ommons:[Vv]alued[ _]image[_ ]candidates\/[Ff]ile:/;
  var prefix_filter = /^[Cc]ommons:[Vv]alued[ _]image[_ ]candidates\//;
  var empty_filter = /^[Cc]ommons:[Vv]alued[ _]image[_ ]candidates\/$/;
  if( !VICvalidate.input ) return true;
  if( image_filter.test( VICvalidate.input.value ) ) 
  {
   alert( "Please remove the 'Image:' prefix." );
   return false;
  }
  if( file_filter.test( VICvalidate.input.value ) ) 
  {
   alert( "Please remove the 'File:' prefix." );
   return false;
  }
  if( !prefix_filter.test( VICvalidate.input.value ) ) 
  {
   alert( "Please keep the 'Commons:Valued_image_candidates/' prefix." );
   return false;
  }
  if( empty_filter.test( VICvalidate.input.value ) ) 
  {
   alert( "Please specify an image name." );
   return false;
  }
 }
};

addOnloadHook( VICvalidate.install );