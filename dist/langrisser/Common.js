/*heroes sort div events*/
$('.div_heroes>div').click(function(e){ 
    $('.div_heroes>div').css({"filter":"grayscale(1)", "opacity":0.65});
    $(this).css({"filter":"grayscale(0)", "opacity":1});

  // $('.sr_heroes_list').css('display', 'none');
  // $('.r_heroes_list').css('display', 'none');
  // $('.n_heroes_list').css('display', 'none');
  // $('.ssr_heroes_list').css('display', 'none');
  // $('.all_heroes_list').css('display', 'none');
  // $('.protagonists_list').css('display', 'none');
  // $('.legion_of_glory_list').css('display', 'none');
  // $('.princess_alliance_list').css('display', 'none');
  // $('.empires_honor_list').css('display', 'none');
  // $('.strategic_master_list').css('display', 'none');
  // $('.darkness_list').css('display', 'none');
  // $('.meteor_list').css('display', 'none');
  // $('.yeless_legend_list').css('display', 'none');
  // $('.origin_of_light_list').css('display', 'none');
  // $('.heroes_of_time_list').css('display', 'none');
  // $('.mythical_realm_list').css('display', 'none');
  // $('.langrisser_reincarnation_list').css('display', 'none');

  // switch($(this).attr('class')){
  //   case 'all_heroes':
  //        $('.all_heroes_list').css('display', 'block');
  //   break;

  //  case 'sr_heroes':
  //        $('.sr_heroes_list').css('display', 'block');
  //   break;

  //   case 'r_heroes':
  //        $('.r_heroes_list').css('display', 'block');
  //   break;

  //   case 'n_heroes':
  //        $('.n_heroes_list').css('display', 'block');
  //   break;

  //   default:
  //        $('.ssr_hereos_list').css('display', 'block');
  //   break;

  //   case 'protagonists':
  //        $('.protagonists_list').css('display', 'block');
  //   break;

  //   case 'legion_of_glory':
  //        $('.legion_of_glory_list').css('display', 'block');
  //   break;

  //   case 'princess_alliance':
  //        $('.princess_alliance_list').css('display', 'block');
  //   break;

  //   case 'origin_of_light':
  //        $('.origin_of_light_list').css('display', 'block');
  //   break;

  //   case 'darkness':
  //        $('.darkness_list').css('display', 'block');
  //   break;

  //   case 'empires_honor':
  //        $('.empires_honor_list').css('display', 'block');
  //   break;

  //   case 'strategic_master':
  //        $('.strategic_master_list').css('display', 'block');
  //   break;

  //   case 'meteor':
  //        $('.meteor_list').css('display', 'block');
  //   break;

  //   case 'heroes_of_time':
  //        $('.heroes_of_time_list').css('display', 'block');
  //   break;

  //   case 'yeless_legendary':
  //        $('.yeless_legendary_list').css('display', 'block');
  //   break;

  //   case 'langrisser_reincarnation':
  //        $('.langrisser_reincarnation_list').css('display', 'block');
  //   break;

  //   case 'mythical_realm':
  //        $('.mythical_realm_list').css('display', 'block');
  //   break;
  // }

});

/*mini-equipment div toggle action*/
$('.equipment_tabs').click(function(e){
 //---- toggle tabs ---
 $('.equipment_tabs').css('background-color', '#408dbf');
 $(this).css('background-color', '#fd0000d4');

 $('#equipment_gal>div').css('display', 'none');
 
 //---- show/hide galleries ---
switch($(this).text()){
  case 'Weaponry':
       $('.weaponry_div').css("display", "inline-block");
  break;

 case 'Helmets':
       $('.helmets_div').css("display", "inline-block");
  break;

  case 'Armor':
       $('.armor_div').css("display", "inline-block");
  break;

  default:
       $('.accessories_div').css("display", "inline-block");
  break;
} 
}); // <<- end function


/*mini-equipment div paging action*/
$('.pagenation_tabs').click(function(e){
 //---- toggle tabs ---
 $('.pagenation_tabs').css('background-color', 'white');
 $(this).css('background-color', '#58b4f0');

 $('.paging_div').css('display', 'none');
 
 //---- show/hide galleries ---
switch($(this).text()){
  case '1':
       $('.paging_1').css("display", "inline-block");
  break;

 case '2':
       $('.paging_2').css("display", "inline-block");
  break;

  case '3':
       $('.paging_3').css("display", "inline-block");
  break;

  case '4':
       $('.paging_4').css("display", "inline-block");
  break;

  case '5':
       $('.paging_5').css("display", "inline-block");
  break;

  default:
       $('.paging_1').css("display", "inline-block");
  break;
} 
}); // <<- end function

// 6 star parts
$(function () {
  $('.starimage').css("filter", "grayscale(1)");
  $($('.stargroup').children()[0]).css("filter", "");
});

$('.starcontent').css("display", "none");
$($('.starcontentgroup').children()[1]).css("display", "");
$($('.starcontentgroup').children()[1]).css("display", "inline-block");

$('.starimage').click(function(e){
  $('.stargroup>div').css("filter", "");
  $('.stargroup>div').css("filter", "grayscale(1)");
  $(this).css("filter", "grayscale(0)");

  switch($(this).attr('id'))
  {
    case 'starimage1':
          $('.starcontent').css("display", "none");
          $('#starcontent1').css("display", "inline-block");
          
    break;
         
    case 'starimage2':
         $('.starcontent').css("display", "none");
         $('#starcontent2').css("display", "inline-block");
    break;

    case 'starimage3':
         $('.starcontent').css("display", "none");
         $('#starcontent3').css("display", "inline-block");
    break;

    case 'starimage4':
         $('.starcontent').css("display", "none");
         $('#starcontent4').css("display", "inline-block");
    break;

    case 'starimage5':
         $('.starcontent').css("display", "none");
         $('#starcontent5').css("display", "inline-block");
    break;

    case 'starimage6':
         $('.starcontent').css("display", "none");
         $('#starcontent6').css("display", "inline-block");
    break;
  }
}); //<<= end 6stars

/* >> Start the dropdown list box script*/
//-- list_unstyled_hero script
$(".list_unstyled_hero").on("click", ".init", function() {
    $(this).closest(".list_unstyled_hero").children('li:not(.init)').toggle();
    console.log("----init");    
});

var allOptions = $(".list_unstyled_hero").children('li:not(.init)');
$(".list_unstyled_hero").on("click", "li:not(.init)", function(e) {
    allOptions.removeClass('selected');
    $(this).addClass('selected');
    $(".list_unstyled_hero").children('.init').html($(this).html());
    allOptions.toggle();
    console.log("----not init");
    //initiate the faction lists
    $(".list_unstyled_faction .init").text("Faction");
    $($(".list_unstyled_faction").children('li:not(.init)')).removeClass('selected');
    $($(".list_unstyled_faction").children('li:not(.init)')).css('display', 'none');

    // initiate the equipment lists
    $(".list_unstyled_equipments .init").text("Equipments");
    $($(".list_unstyled_equipments").children('li:not(.init)')).removeClass('selected');
    $($(".list_unstyled_equipments").children('li:not(.init)')).css('display', 'none');
    //showing funciton
    show_hide($(this));

});

//-- list_unstyled_faction script
$(".list_unstyled_faction").on("click", ".init", function() {
    $(this).closest(".list_unstyled_faction").children('li:not(.init)').toggle();    
});

var allOptions_ = $(".list_unstyled_faction").children('li:not(.init)');
$(".list_unstyled_faction").on("click", "li:not(.init)", function() {
    allOptions_.removeClass('selected');
    $(this).addClass('selected');
    $(".list_unstyled_faction").children('.init').html($(this).html());
    allOptions_.toggle();
    //initiate the hero lists
    $(".list_unstyled_hero .init").text("Heroes");
    $($(".list_unstyled_hero").children('li:not(.init)')).removeClass('selected');
    $($(".list_unstyled_hero").children('li:not(.init)')).css('display', 'none');
    
    // initiate the equipment lists
    $(".list_unstyled_equipments .init").text("Equipments");
    $($(".list_unstyled_equipments").children('li:not(.init)')).removeClass('selected');
    $($(".list_unstyled_equipments").children('li:not(.init)')).css('display', 'none');
    //showing funciton
    show_hide($(this));
});

//-- list_unstyled_equipments script
$(".list_unstyled_equipments").on("click", ".init", function() {
    $(this).closest(".list_unstyled_equipments").children('li:not(.init)').toggle();
    
});

var _allOptions = $(".list_unstyled_equipments").children('li:not(.init)');
$(".list_unstyled_equipments").on("click", "li:not(.init)", function() {
    _allOptions.removeClass('selected');
    $(this).addClass('selected');
    $(".list_unstyled_equipments").children('.init').html($(this).html());
    _allOptions.toggle();
    //initiate the hero lists
    $(".list_unstyled_hero .init").text("Heroes");
    $($(".list_unstyled_hero").children('li:not(.init)')).removeClass('selected');
    $($(".list_unstyled_hero").children('li:not(.init)')).css('display', 'none');
    
    // initiate the equipment lists
    $(".list_unstyled_faction .init").text("Faction");
    $($(".list_unstyled_faction").children('li:not(.init)')).removeClass('selected');
    $($(".list_unstyled_faction").children('li:not(.init)')).css('display', 'none');

    //showing funciton
    show_hide($(this));
});

/*Define the showing function*/
function show_hide(e){
  $('.sr_heroes_list').css('display', 'none');
  $('.r_heroes_list').css('display', 'none');
  $('.n_heroes_list').css('display', 'none');
  $('.ssr_heroes_list').css('display', 'none');
  $('.all_heroes_list').css('display', 'none');
  $('.protagonists_list').css('display', 'none');
  $('.legion_of_glory_list').css('display', 'none');
  $('.princess_alliance_list').css('display', 'none');
  $('.empires_honor_list').css('display', 'none');
  $('.strategic_master_list').css('display', 'none');
  $('.darkness_list').css('display', 'none');
  $('.meteor_list').css('display', 'none');
  $('.yeless_legend_list').css('display', 'none');
  $('.origin_of_light_list').css('display', 'none');
  $('.heroes_of_time_list').css('display', 'none');
  $('.mythical_realm_list').css('display', 'none');
  $('.langrisser_reincarnation_list').css('display', 'none');

  $('.weaponry_div').css('display', 'none');
  $('.helmets_div').css('display', 'none');
  $('.armor_div').css('display', 'none');
  $('.accessories_div').css('display', 'none');

  console.log($(e).text()+"++++++++");

  switch($(e).text()){
    case 'All':
         $('.all_heroes_list').css('display', 'block');
    break;

    case 'SSR':
         $('.ssr_heroes_list').css('display', 'block');
    break;

    case 'SR':
         $('.sr_heroes_list').css('display', 'block');
    break;

    case 'R':
         $('.r_heroes_list').css('display', 'block');
    break;

    case 'N':
         $('.n_heroes_list').css('display', 'block');
    break;

    case 'Protagonists':
         $('.protagonists_list').css('display', 'block');
    break;

    case 'Origin of Light':
         $('.origin_of_light_list').css('display', 'block');
    break;

    case 'Legion of Glory':
          $('.legion_of_glory_list').css('display', 'block');
    break;

    case 'Princess Alliance':
        $('.princess_alliance_list').css('display', 'block');
    break;

    case "Empire's honor":
        $('.empires_honor_list').css('display', 'block');
    break;

    case "Strategic Masters":
        $('.strategic_master_list').css('display', 'block');
    break;

    case 'Dark Reincarnation':
         $('.darkness_list').css('display', 'block');
    break;

    case 'Yeless Legends':
         $('.yeless_legend_list').css('display', 'block');
    break;

    case 'Meteor':
         $('.meteor_list').css('display', 'block');
    break;

    case 'Heroes of Time':
         $('.heroes_of_time_list').css('display', 'block');
    break;

    case 'Mythical Realm':
         $('.mythical_realm_list').css('display', 'block');
    break;

    case 'Langrisser Reincarnation':
         $('.langrisser_reincarnation_list').css('display', 'block');
    break;

/*----------------------------------*/
    case 'Weapons':
        // $('#equipment_gal').css('display', 'block');
        $('.weaponry_div').css('display', 'block');
    break;

    case 'Helmets':
        // $('#equipment_gal').css('display', 'block');
        $('.helmets_div').css('display', 'block');
    break;

    case 'Body Armor':
        // $('#equipment_gal').css('display', 'block');
        $('.armor_div').css('display', 'block');
    break;

    case 'Accessory':
        // $('#equipment_gal').css('display', 'block');
        $('.accessories_div').css('display', 'block');
    break;
  }
}