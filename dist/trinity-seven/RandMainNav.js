// Media Configurations
var media_configs = [
{name: "Manga", 
 link: "Trinity Seven: The Seven Magicians",
 image: "Levi Yui Arin Lilith Lieselotte Arata Mira Akio illustration SM MA.png",
 config: {feature: {match: "w", coordinates: ""}, 
          top: {match: "h" , coordinates: "left: 27%; height: 26%; top: -28%"}, 
          bottom: {match: "h", coordinates: "right: 67%"}
         }}, 
{name: "Anime", 
 link: "Trinity Seven: (Anime)",
 image: "Trinity_Seven_Anime_Poster.jpg",
 config: {feature: {match: "w", coordinates: "top: -1%"}, 
          top: {match: "w", coordinates: "left: 35%; width: 115%"}, 
          bottom: {match: "w", coordinates: "bottom: -2%; top: auto; right: 23%; width: 130%"}
         }}, 
{name: "Light Novel", 
 link: "Trinity Seven The Novel: Holy Maiden & Eighth Library",
 image: "Hijiri_Arin_Ceres_swimsuit_vol3_LN.jpeg",
 config: {feature: {match: "w", coordinates: ""}, 
          top: {match: "h", coordinates: "left: -9.5%; height: 55%; top: -58%"}, 
          bottom: {match: "h", coordinates: "right: 116%; height: 65%; top: 0%;"}
         }}, 
{name: "Film", 
 link: "Trinity Seven: Heavens Library & Crimson Lord",
 image: "Abyss_Lilith_Hijri_Arin_Arata_Mira_Lieselotte_Yui_Selina_Lugh_Judecca_Akio_Levi_poster_HL_MV.jpg",
 config: {feature: {match: "w", coordinates: "top:-9%; width: 105%; left: -4%"}, 
          top: {match: "w", coordinates: "left: 40%; top:-6%"}, 
          bottom: {match: "w", coordinates: "widht: 110%; top: auto; right: 31%; bottom: -9%"}
         }}, 
{name: "Game", 
 link: "Trinity Seven: Phantasm Library & Seventh Sol",
 image: "Lilith promo PS GA.jpg",
 config: {feature: {match: "h", coordinates: ""}, 
          top: {match: "h", coordinates: ""}, 
          bottom: {match: "h", coordinates: "right: 75%"}
         }}];

// Build navigation controls
var containers = document.getElementsByClassName("main-nav-random");

for (var i = 0; i < containers.length; i++) {
  var container = containers[i];
  
  var featureIdx = Math.floor(Math.random() * media_configs.length);
  
  container.appendChild(buildNav(featureIdx));
}

function buildNav(featureIdx) {
  var nav_container = document.createElement("div");
  nav_container.className = "wiki-main-nav";
  
  nav_container.appendChild(buildFeature(media_configs[featureIdx]));
  
  var sub_media = [];
     
  for (var i = 1; i <= media_configs.length - 1; i++) {
    var subIdx = (featureIdx + i) % media_configs.length;
    sub_media.push(media_configs[subIdx]);
  }

  nav_container.appendChild(buildSubFeatures(sub_media));
  
  return nav_container;
}

function buildFeature(feature_media) {
  var feature_container = document.createElement("div");
  feature_container.className = "feature"; 
  
  var featureConfigs = feature_media.config.feature;
  
  feature_container.appendChild(buildImgContainer(featureConfigs.match, feature_media.link, feature_media.image, featureConfigs.coordinates));
  feature_container.appendChild(buildLabel(feature_media.name, feature_media.link));
  return feature_container;
}

function buildSubFeatures(sub_medias) {
  var sub_features = document.createElement("div");
  sub_features.className = "sub-features"
  
  var sub_menus = [];

  for (var i = 0; i < sub_medias.length; i += 2) {
    var top_media = null;
    var bottom_media = null;
    
    if (i < sub_medias.length) {
      top_media = sub_medias[i];
    }
    
    if (i + 1 < sub_medias.length) {
      bottom_media = sub_medias[i + 1];
    }
    
    var sub_menu = buildSubMenu(top_media, bottom_media, sub_menus.length == 0);
    sub_menus.push(sub_menu);
    
  }

  for (var i = 0; i < sub_menus.length; i++) {
    sub_features.appendChild(sub_menus[i]);
  }
  
  return sub_features;
}

function buildSubMenu(top_media, bottom_media, is_first) {
  var sub_menu = document.createElement("div");
  sub_menu.className = "right-menu-box";
  
  if (top_media != null) {
    sub_menu.appendChild(buildMenuItem("top", top_media.config.top.match, top_media.link, top_media.image, top_media.name, top_media.config.top.coordinates, is_first));
  }
  
  if (bottom_media != null) {
    sub_menu.appendChild(buildMenuItem("bottom", bottom_media.config.bottom.match, bottom_media.link, bottom_media.image, bottom_media.name, bottom_media.config.bottom.coordinates, is_first));
  }
  
  return sub_menu;
}

function buildMenuItem(level, media_match, media_link, media_image, media_name, media_coordinates, hide_top_border) {
  var menuItem = document.createElement("div");
  menuItem.className = level;
  menuItem.appendChild(buildImgContainer(media_match, media_link, media_image, media_coordinates));
  menuItem.appendChild(buildLabel(media_name, media_link))

  if (hide_top_border) {
    menuItem.style = "border-top-style: hidden";
  }
  
  return menuItem;
}

function buildImgContainer(match, media_link, media_image, media_coordinates) {
  var img_container = document.createElement("div");
  var container_classes = ["img-container"];
  
  switch (match) {
    default:
      break;
    case "w":
      container_classes.push("match-width");
      break;
    case "h":
      container_classes.push("match-height");
      break;
  }
  
  for (var i = 0; i < container_classes.length; i++) {
    img_container.classList.add(container_classes[i]);
  }

  img_container.style = media_coordinates;
  
  var link = buildLink(media_link);
  
  var image = buildImage(media_image);
  
  link.appendChild(image);
  
  img_container.appendChild(link);
  
  return img_container;
}

function buildLink(link_name) {
  var link = document.createElement("a");
  link.href = "/wiki/" + link_name;
  link.title = link_name;
  
  return link;
}

function buildImage(image_name) {
  var img = document.createElement("img");
  img.src = "/wiki/special:filepath/" + image_name;
  
  return img;
}

function buildLabel(media_label, media_link) {
  var label = document.createElement("span");
  label.className = "label";
 
  var link = buildLink(media_link);
  link.innerHTML = media_label;
 
  label.appendChild(link);
  
  return label;
}