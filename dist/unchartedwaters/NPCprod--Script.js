/*
<source lang=javascript>
*/

console.log("loading NPCprod script");

if ($('div.tabberlive ul li a').length) {
    w = 16;
    h = w + 4;
    $n = $('div.tabberlive ul li a').length;
    for (i = 0; i < $n; i++) {
        $t = $('div.tabberlive ul li a:eq(' + i + ')');
        $skill = $t.text().replace(/\n/g, ''); ;
        //NPCproddebug();

        switch ($skill) {
            case 'Cooking':
                $t.html('\n<img alt="Cooking" src="http://images1.wikia.nocookie.net/__cb20120207144317/unchartedwaters/images/d/d4/Skill_cooking.png" height="' + h + '" width="' + w + '">&nbsp;' + $skill);
                break;
            case 'Sewing':
                $t.html('\n<img alt="Sewing" src="http://images3.wikia.nocookie.net/__cb20120207145138/unchartedwaters/images/0/07/Skill_sewing.png" height="' + h + '" width="' + w + '">&nbsp;' + $skill);
                break;
            case 'Casting':
                $t.html('\n<img alt="Casting" src="http://images3.wikia.nocookie.net/__cb20120207144222/unchartedwaters/images/0/0c/Skill_casting.png" height="' + h + '" width="' + w + '">&nbsp;' + $skill);
                break;
            case 'Storage':
                $t.html('\n<img alt="Storage" src="http://images1.wikia.nocookie.net/__cb20120207145234/unchartedwaters/images/2/24/Skill_storage.png" height="' + h + '" width="' + w + '">&nbsp;' + $skill);
                break;
            case 'Handicrafts':
                $t.html('\n<img alt="Handicrafts" src="http://images3.wikia.nocookie.net/__cb20120207144511/unchartedwaters/images/2/23/Skill_handicrafts.png" height="' + h + '" width="' + w + '">&nbsp;' + $skill);
                break;
            case 'Linguistics':
                $t.html('\n<img alt="Handicrafts" src="http://images2.wikia.nocookie.net/__cb20120207144607/unchartedwaters/images/c/ca/Skill_linguistics.png" height="' + h + '" width="' + w + '">&nbsp;' + $skill);
                break;
        }
    }
}

function NPCproddebug(a) {
    msg = (a) ? a : 'NPCproddebug';
    alert(msg + ':eq ' + i
          + '\nSkill: ' + $skill);
}

/*
</source>
{{BioSign|22:04, August 6, 2012 (UTC)}}
[[Category:Templates/BioBrain|{{PAGENAME}}]]
*/