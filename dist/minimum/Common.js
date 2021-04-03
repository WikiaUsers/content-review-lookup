/* Any JavaScript here will be loaded for all users on every page load. */

window.onload = function(){

/**************************
* Weaponbox functionality *
**************************/
var weaponShowcases = document.getElementsByClassName("weaponShowcase");
var length = weaponShowcases.length;

function setWeaponSelectBox(i, selectBox, weaponImage, link)
{
    selectBox.onmouseover = function()
    {
        weaponImage.src="https://minimum.gamepedia.com/Special:FilePath/"+wgPageName+(i+1)+".png";
        link.href ="https://minimum.gamepedia.com/File:"+wgPageName+(i+1)+".png";
    };
}

function setWeaponShowcase(i)
{
        var selectBoxes = weaponShowcases[i].getElementsByClassName("weaponSelectbox");
        var weaponImage = weaponShowcases[i].getElementsByClassName("weaponShowcaseImage")[0];
        var link = weaponShowcases[i].getElementsByClassName("image")[0];

        var length = selectBoxes.length;
        for(var j = 0; j < length; j++){
            var preLoadImage = new Image(); //used to pre-load images
            preLoadImage.src ="https://minimum.gamepedia.com/Special:FilePath/"+wgPageName+(j+1)+".png";
            setWeaponSelectBox(j, selectBoxes[j], weaponImage, link);
        }    
    
}

for(var i = 0; i < length; i++){
   setWeaponShowcase(i);
}
};