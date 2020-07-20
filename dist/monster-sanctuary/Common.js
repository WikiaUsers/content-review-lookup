/* Any JavaScript here will be loaded for all users on every page load. */

/* Waiting for MediaWiki API to load before running */
mw.loader.using('mediawiki.api', function() {
    /* Generating the skill tree highlights and skill level */
    generateSkillTreeDetails();
});

/* Running after DOM loads */
$(function() {
    /* Adding click callbacks to scroll to Skill List on Skill Tree icons */
    addSkillFindingLinks();
});

/* Loads an image from the Wiki */
function loadImage(imgElm, path) {
    //console.log("Loading", path);
    var api = new mw.Api();
    //console.log(api);
    api.get({action: 'query', 
        redirects: '', 
        titles: path,
        prop: 'imageinfo', 
        iiprop: 'url', 
        format: 'json'})
        .done(function(data) {
            var url = null;
            for (var page in data.query.pages) {
                if (page != -1) {
                    url = data.query.pages[page].imageinfo[0].url;
                }
            }
            if (url) {
                imgElm.src = url;
            }
    });
}
    
/* Generates the mouseover function for the skill in a skill tree */
function mouseoverFactory(imgElm, tree, row, skill) {
    var mouseover = function(e) {
        var connects = $('.connect_'+tree+"_"+row+"_"+skill);
        for (var i = 0;i < connects.length;i++) {
            connects[i].style.filter = "";
            connects[i].style['z-index'] = 1;
        }
    }
    return mouseover;
}
    
/* Generates the mouseout function for the skill in a skill tree */
function mouseoutFactory(imgElm, tree, row, skill) {
    var mouseover = function(e) {
        var connects = $('.connect_'+tree+"_"+row+"_"+skill);
        for (var i = 0;i < connects.length;i++) {
            connects[i].style.filter = "grayscale(100%) brightness(.5)";
            connects[i].style['z-index'] = 0;
        }
    }
    return mouseover;
}

/* Generates the click callback for the skill in a skill tree */
function mouseclickFactory(skillList, skillListLink) {
    var mouseclick = function(e) {
        // Showing the correct tab
        skillListLink.click();
        // Scrolling to Skill List entry
        skillList.scrollIntoView({ behavior: 'smooth', block: 'center'});
    }
    return mouseclick;
}
    
/* Generates the extra skill tree details like highlighting tree branches and skill levels */
function generateSkillTreeDetails() {
    var rowHeight = 60;
    var skillWidth = 40;
    
    var skillTreeExtras = document.querySelectorAll('.skillTree_extra');
    for (var sk = 0;sk < skillTreeExtras.length;sk++) {
        // Finding elements
        var skillTreeTable = skillTreeExtras[sk].parentNode.querySelector('.skilltreetable')
        //console.log(skillTreeTable);
        // Retrieving data
        var data = null;
        try {
            var json = skillTreeExtras[sk].innerText;
            //console.log(json);
            data = JSON.parse(json);
        } catch(e) {
            //console.log("Invalid JSON");
            continue;
        }
        //console.log(data);
        // Going through skill trees
        var skillTreeSingles = skillTreeTable.querySelectorAll('.skilltreesingle');
        for (var sks = 0;sks < skillTreeSingles.length;sks++) {
            var skillTreeSingle = skillTreeSingles[sks];
            var skillTreeSingleData = data.skills[sks];
            var floatDiv = $('<div style="position:relative"></div>')[0];
            skillTreeSingle.prepend(floatDiv);
            
            // Finding max skill row size
            var maxSkill = 0;
            for (var i = 0;i < skillTreeSingleData.length;i++) {
                maxSkill = (maxSkill > skillTreeSingleData[i].length) ? maxSkill : skillTreeSingleData[i].length;
            }
            var treeWidthPix = 32*maxSkill + 8*(maxSkill-1) + 16 + 12;
            //console.log("Max Skill Width: ", maxSkill, treeWidthPix);
            
            var y = 8 - rowHeight;
            var x = 0;
            
            
            //console.log("Editing Skill Tree Single", sks, skillTreeSingleData, skillTreeSingle);
            // Going through skill tree rows
            var skillTreeRows = skillTreeSingle.querySelectorAll('.skillrowcell');
            for (var skr = 0;skr < skillTreeSingleData.length;skr++) {
                var skillTreeRow = skillTreeRows[skr];
                var skillTreeRowData = skillTreeSingleData[skr];
                y += rowHeight;
                //console.log("Editing Skill Tree Row", skr, skillTreeRowData, skillTreeRow);
                if (skillTreeRowData.length === 0) {continue;}
                // Going through skills
                var skillTreeSkills = skillTreeRow.querySelectorAll('.skillimgdiv');
                var base = (treeWidthPix - skillTreeSkills.length*32 - 8*(skillTreeSkills.length-1)) / 2;
                x = base - skillWidth - 6;
                for (var ski = 0;ski < skillTreeRowData.length;ski++) {
                    var skill = skillTreeSkills[ski];
                    var skillData = skillTreeRowData[ski];
                    x += skillWidth;
                    //console.log("Editing Skill", ski, skillData, skill);
                    if (skillData.hasOwnProperty('lvl')) {
                        var lvlImg = $('<img style="position:absolute;"></img>')[0];
                        var path = 'File:skill_lvl_'+skillData.lvl+'.png';
                        lvlImg.style['left'] = (x+32) + 'px';
                        lvlImg.style['top'] = (y+32) + 'px';
                        lvlImg.style['z-index'] = 10;
                        floatDiv.append(lvlImg);
                        loadImage(lvlImg, path);
                    }

                    // Adding mouseover/mouseout
                    var skImg = skill.children[0];
                    skImg.onmouseover = mouseoverFactory(skImg, sks, skr, ski);
                    skImg.onmouseout = mouseoutFactory(skImg, sks, skr, ski);
                    
                    // Add default hover image
                    var connectImg = generateConnectImg(x,y,sks,skr,ski,999);
                    floatDiv.append(connectImg);
                    
                    // Going through all connections
                    if (skillData.hasOwnProperty('c')) {
                        var skillLocation = ski - (skillTreeRowData.length - 1)/2.0;
                        //console.log("Skill Location: ", ski, skillTreeRowData.length, skillLocation);
                        for (var c = 0;c < skillData.c.length;c++) {
                            var nextRowMaxSkill = skillTreeRows[skr+1].querySelectorAll('.skillimgdiv').length;
                            var connectIdx = skillData.c[c];
                            var connectLocation = (connectIdx-1) - (nextRowMaxSkill - 1)/2.0;
                            var dist = connectLocation - skillLocation;
                            //console.log("Connection Location: ", connectIdx, nextRowMaxSkill, connectLocation);
                            var connectImg = generateConnectImg(x,y,sks,skr,ski,dist);
                            floatDiv.append(connectImg);
                        }
                    }
                }
                x = 0;
            }
        }
    }
}

function generateConnectImg(xIdx,yIdx,skillTreeIdx,skillTreeRowIdx,skillRowIdx,dist) {
    var connectImg = $('<img style="position:absolute;"/>')[0];
    connectImg.classList.add("connect_"+skillTreeIdx+"_"+skillTreeRowIdx+"_"+skillRowIdx);
    var num = 0;
    if (dist > 0) {
        num = dist*2+1;
        connectImg.style['-moz-transform'] = "scale(-1, 1)";
        connectImg.style['-o-transform'] = "scale(-1, 1)";
        connectImg.style['-webkit-transform'] = "scale(-1, 1)";
        connectImg.style['transform'] = "scale(-1, 1)";
        connectImg.style['left'] = (xIdx+4) + 'px';
    } else {
        num = -dist*2+1;
        connectImg.style['left'] = (xIdx-(num-1)*20+4) + 'px';
    }
    
    // Covering case of default hover image 
    if (dist > 9) { num = 0; }
    
    connectImg.style['top'] = (yIdx+6) + 'px';
    connectImg.style['filter'] = 'grayscale(100%) brightness(.5)';
    connectImg.style['pointer-events'] = 'none';
    var path = 'File:skill_connect_'+num+".png";
    loadImage(connectImg, path);
    return connectImg;
}

/* Adds click functionality to skill icons in skill trees to navigate to the specified skill list */
function addSkillFindingLinks() {
    // Finding all skill icons on the page
    var skills = document.querySelectorAll('.skillimgdiv');
    
    // Looping through all skill icons
    for (var skillIdx = 0;skillIdx < skills.length;skillIdx++) {
        var skillDiv = skills[skillIdx];

        // Getting skill name
        var skillClasses = skillDiv.className.split(/\s+/);
        if (skillClasses.length != 2) { continue; }
        var skillName = skillClasses[1];
        //console.log("Linking " + skillName);

        // Finding Skill List entry on page
        var skillList = document.querySelector('tr' + '.' + skillName)
        if (!skillList) { continue; }
        //console.log("Found Skill List" + skillList);
        
        // Finding Skill List tab
        var skillListTab = skillList.closest('.tabbertab');
        if (!skillListTab) { continue; }
        //console.log(skillListTab);
        var skillListName = skillListTab.getAttribute("title");
        if (!skillListName) { continue; }
        //console.log(skillListName);
        var skillListLink = document.querySelector('a[title=\'' + skillListName + '\']');
        if (!skillListLink) { continue; }
        //console.log("Found Skill List Tab" + skillListTab + skillListLink);
        
        // Adding click callback to skill icon
        skillDiv.onclick = mouseclickFactory(skillList, skillListLink);
    }
    
    
    

        
}