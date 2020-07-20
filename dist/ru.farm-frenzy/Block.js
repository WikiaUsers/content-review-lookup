//for [[special:block]]

elem('Reason').change( function(){

  if( /неприемлемое имя/.test(this.value) ){
    elem('Expiry', 'infinite')
    if( /рекламное|заблуждение/.test(this.value) ) {
      elem('CreateAccount', false)
      elem('DisableEmail', false)
      elem('AutoBlock', false)
    }

  }else if( /анонимизирующий сервер/.test(this.value) ){
    elem('CreateAccount', true)
    elem('DisableEmail', true)
    elem('HardBlock', true)
    if( elem('Expiry').val() == 'other' && ! elem('Expiry-other').val() )
      elem('Expiry', '5 years')
      
  }else if( /новый участник с провокационным вкладом/.test(this.value) || /«общая» учётная запись/.test(this.value) ){
    elem('Expiry', 'infinite')

  }

})



// get/set MW input element
function elem(name, value){ 
 var $el = $('#mw-input-wp' + name)
 if( !$el.length ) $el = $('[name="wp' + name + '"]')
 if( value !== undefined ){ //set value
   if( $el.prop('tagName') == 'SELECT' ){
     $el.find('option[value*="'+value+'"]').attr('selected', 'selected').end().change()
   }else if( $el.prop('type') == 'checkbox' ){
     $el.setAndHighlight(value)
   }else{ //text
     if( /-other$/.test(name) ) elem( name.replace(/-other$/,''), 'other') //set 'select' above
     $el.val(value)
   }	 
 } 
 return $el  
}


//highlighting changed checkboxes
mw.util.addCSS('input.highlighted {background-color:#aaa}')
jQuery.fn.setAndHighlight = function(val){
 if( $(this).prop('checked') == !! val ) return
 $(this).prop('checked', val).addClass('highlighted')
 setTimeout(function(){ $('.highlighted').removeClass('highlighted')}, 1000)
}