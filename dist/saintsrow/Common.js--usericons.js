$(function() {

function addAllOfTheThings(u, t) {
  var icons = new iconList(u, t);
  var tags = new tagList(u, t);

/*** Add icons. ***/
  icons.add("452", "UltorSpray", "creating this usericon system");
  icons.add("Erewon", "Photo", "uploading 900+ screenshots in one month");
  icons.add("GlitchBot", "Cid", "being a bot");
  icons.add("TheMoonLightman", "Gold", "adding mission references to character pages");
  icons.add("TheMoonLightman", "Gold", "adding screenshots of all secret areas");
  icons.add("TheMoonLightman", "Photo", "creating vehicle gallery of one of every vehicle from the same angle in Saints Row IV");
  icons.add("TheMoonLightman", "Satchel", "figuring out how to get 10 Satchel Charges");
  icons.add("Danthepest", "Photo", "being DanTheAwesomeImageReplacer");

/*** Add tags. ***/
/* currently all tags are for official purposes only. non-official purposes should probably use icons instead */
  tags.add("452", "Janitor");
  tags.add("GlitchBot", "Bot");

  if (currentuser == "Test") for (var icon in icons.icons) icons.add("Test", icon, "Testing"); if ($('.masthead-info input').attr("value") == 3403151) window.cup = setInterval('$(".masthead-info em").html(((($(".masthead-info em").html().replace(",","")*1)+1)/1000).toFixed(3).replace(".",","));', 4520);
 
}

function tagList(user, targetelement) {
  this.username = user; 
  this.target = targetelement;

  this.add=function(user,tag) {
    if (this.username != user) return;
    $('span.tag:not(.custom)', this.target).remove();  //remove old tags
    $(this.target).append( $("<span>", {class:"tag custom", html:tag }) ); //append tag
  }
}
function iconList(user, targetelement) {
  this.username = user; 
  this.target = targetelement;
  this.icons = {};

  this.add=function(user,icon,reason) {
    if (this.username != user) return;
    if (typeof this.icons[icon] == "undefined") console.log("no such icon"); //check icon exists

    var urlprefix = "", style ="", 
      currenticon = this.icons[icon],
      title = currenticon.display;

    if (reason) title = user+' was awarded a '+currenticon.display+' for ' + reason;
    if (currenticon.width) style = "width:"+currenticon.width; 
    if (currenticon.file.indexOf("http") == -1) urlprefix = "https://images.wikia.nocookie.net/saintsrow/images/";

    $(this.target).append(        
      $("<img>", { 
        src: urlprefix+currenticon.file,
        title: title,
        style: style,
        class:"userstar "+currenticon.name
      }) 
    );
  }

  this.addIcon=function(name,display,file,width) {
    this.icons[name] = new this.icon(name,display,file,width);
  }
  this.icon=function (name,display,file,width) {
    this.name=name;
    this.display=display;
    this.file=file;
    this.width=width;
  }
  this.addIcon("Gold", "Gold star", "6/68/Star_gold.png");
  this.addIcon("Saints", "Saints fleur-de-lys", "thumb/b/b4/Star_saints.png/100px-Star_saints.png", "5em");
  this.addIcon("Angel", "Saints Angel", "thumb/3/3e/Saints_angel_graffiti_test.png/100px-Saints_angel_graffiti_test.png");
  this.addIcon("STAG", "STAG head", "thumb/9/94/Userstar_stag.gif/100px-Userstar_stag.png");
  this.addIcon("Ultor", "Saints-Ultor medal", "thumb/d/d5/Ultor_Saints_Corp.png/100px-Ultor_Saints_Corp.png");
  this.addIcon("Ronin", "Ronin dragon", "thumb/4/4c/Ronin_logo.png/100px-Ronin_logo.png");
  this.addIcon("Photo", "Camera", "4/4e/Ui_hud_icon_camera.png");
  this.addIcon("ZinSpray", "Zin Graffiti", "thumb/e/e7/Zin_spray.png/100px-Zin_spray.png");
  this.addIcon("UltorSpray", "Ultor Graffiti", "thumb/a/a5/Crib_news_ep.png/200px-Crib_news_ep.png", "15em");
  this.addIcon("ZinLogo", "Zin Logo", "thumb/7/74/Zin_logo.png/100px-Zin_logo.png");
  this.addIcon("Satchel", "Satchel Charge", "9/93/Weap_thrown_satchel.png");
  this.addIcon("Broom", "Broom", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Broom_icon.svg/100px-Broom_icon.svg.png");
  this.addIcon("Shaundi4", "Shaundi's severed head", "6/60/Homie_icon_-_Shaundi_in_Saints_Row_IV.png");  
  this.addIcon("Salute", "Salute from The President", "e/ec/Sr4playa.jpg");  
  this.addIcon("Cid", "Cid", "c/c0/Homie_icon_-_CID_in_Saints_Row_IV.png");
  this.addIcon("Cheers", "Cheers", "thumb/7/76/Live%21_With_Killbane_-_Matt_Miller_smart_phone_message.png/100px-Live%21_With_Killbane_-_Matt_Miller_smart_phone_message.png");
  this.addIcon("Vehicle", "Vehicle Homie","b/b6/Ui_homie_vehicle.png");
}
  var currentuser = $('.UserProfileMasthead .masthead-info h1').html(); //get current userpage
  if (typeof currentuser == "undefined") return; //Run on user pages only
  var headingtarget = ".masthead-info hgroup";
  if ((skin == "monobook") && (wgNamespaceNumber == 1200 || wgNamespaceNumber == 2)) {
    currentuser = wgTitle;
    $('#firstHeading').addClass("UserProfileMasthead");
    headingtarget = "#firstHeading";
  }

  addAllOfTheThings(currentuser, headingtarget);

}); // end $(function() block