function update_scaling() {
    if((curr_lvl = ehp_input.value) >= base_lvl_v) {
        clonedflesh.innerHTML = (Math.round(clonedflesh_v * (1 + Math.pow(curr_lvl - base_lvl_v, 2) * 0.015)* 100) / 100).toLocaleString();
        flesh.innerHTML = (Math.round(flesh_v * (1 + Math.pow(curr_lvl - base_lvl_v, 2) * 0.015)* 100) / 100).toLocaleString();
        fossilized.innerHTML = (Math.round(fossilized_v * (1 + Math.pow(curr_lvl - base_lvl_v, 2) * 0.015)* 100) / 100).toLocaleString();
        infested.innerHTML = (Math.round(infested_v * (1 + Math.pow(curr_lvl - base_lvl_v, 2) * 0.015)* 100) / 100).toLocaleString();
        infestedflesh.innerHTML = (Math.round(infestedflesh_v * (1 + Math.pow(curr_lvl - base_lvl_v, 2) * 0.015)* 100) / 100).toLocaleString();
        infestedsinew.innerHTML = (Math.round(infestedsinew_v * (1 + Math.pow(curr_lvl - base_lvl_v, 2) * 0.015)* 100) / 100).toLocaleString();
        machinery.innerHTML = (Math.round(machinery_v * (1 + Math.pow(curr_lvl - base_lvl_v, 2) * 0.015)* 100) / 100).toLocaleString();
        robotic.innerHTML = (Math.round(robotic_v * (1 + Math.pow(curr_lvl - base_lvl_v, 2) * 0.015)* 100) / 100).toLocaleString();
 
        ferritearmor.innerHTML = (Math.round(ferritearmor_v * (1 + Math.pow(curr_lvl - base_lvl_v, 1.75) * 0.005)* 100) / 100).toLocaleString();
        alloyarmor.innerHTML = (Math.round(alloyarmor_v * (1 + Math.pow(curr_lvl - base_lvl_v, 1.75) * 0.005)* 100) / 100).toLocaleString();
        cflesharmor.innerHTML = (Math.round(cflesharmor_v * (1 + Math.pow(curr_lvl - base_lvl_v, 1.75) * 0.005)* 100) / 100).toLocaleString();
        flesharmor.innerHTML = (Math.round(flesharmor_v * (1 + Math.pow(curr_lvl - base_lvl_v, 1.75) * 0.005)* 100) / 100).toLocaleString();
        fossilarmor.innerHTML = (Math.round(fossilarmor_v * (1 + Math.pow(curr_lvl - base_lvl_v, 1.75) * 0.005)* 100) / 100).toLocaleString();
        infestedarmor.innerHTML = (Math.round(infestedarmor_v * (1 + Math.pow(curr_lvl - base_lvl_v, 1.75) * 0.005)* 100) / 100).toLocaleString();
        iflesharmor.innerHTML = (Math.round(iflesharmor_v * (1 + Math.pow(curr_lvl - base_lvl_v, 1.75) * 0.005)* 100) / 100).toLocaleString();
        sinewarmor.innerHTML = (Math.round(sinewarmor_v * (1 + Math.pow(curr_lvl - base_lvl_v, 1.75) * 0.005)* 100) / 100).toLocaleString();
        machinearmor.innerHTML = (Math.round(machinearmor_v * (1 + Math.pow(curr_lvl - base_lvl_v, 1.75) * 0.005)* 100) / 100).toLocaleString();
        roboarmor.innerHTML = (Math.round(roboarmor_v * (1 + Math.pow(curr_lvl - base_lvl_v, 1.75) * 0.005)* 100) / 100).toLocaleString();
 
        damage_redux.innerHTML = ((Math.round((1 - 300 / (armor_v * (1 + Math.pow(curr_lvl - base_lvl_v, 1.75) * 0.005) + 300)) * 10000) / 10000) * 100).toLocaleString();
 
        shield.innerHTML = (Math.round(shieldx_v * (1 + Math.pow(curr_lvl - base_lvl_v, 2) * 0.0075)* 100) / 100).toLocaleString();
        protoshield.innerHTML = (Math.round(protoshield_v * (1 + Math.pow(curr_lvl - base_lvl_v, 2) * 0.0075)* 100) / 100).toLocaleString();
 
        out_ehp.innerHTML = (Math.round((health_v * (1 + Math.pow(curr_lvl - base_lvl_v, 2) * 0.015) * (1 + armor_v * (1 + Math.pow(curr_lvl - base_lvl_v, 1.75) * 0.005) / 300) + shield_v * (1 + Math.pow(curr_lvl - base_lvl_v, 2) * 0.0075))* 100) / 100).toLocaleString();
 
        affinity.innerHTML = (Math.round(affinity_v * (1 + Math.pow(curr_lvl, 0.5) * 0.1425)* 100) / 100).toLocaleString();
    }
}
 
if ($('#slider_div').length) {
    var clonedflesh_v = parseInt(clonedflesh.innerHTML, 10);
    var flesh_v =  parseInt(flesh.innerHTML, 10);
    var fossilized_v =  parseInt(fossilized.innerHTML, 10);
    var infested_v =  parseInt(infested.innerHTML, 10);
    var infestedflesh_v =  parseInt(infestedflesh.innerHTML, 10);
    var infestedsinew_v =  parseInt(infestedsinew.innerHTML, 10);
    var machinery_v =  parseInt(machinery.innerHTML, 10);
    var robotic_v =  parseInt(robotic.innerHTML, 10);
    var health_v = clonedflesh_v + flesh_v + fossilized_v + infested_v + infestedflesh_v + infestedsinew_v + machinery_v + robotic_v;
 
    var ferritearmor_v = parseInt(ferritearmor.innerHTML, 10);
    var alloyarmor_v =  parseInt(alloyarmor.innerHTML, 10);
    var cflesharmor_v =  parseInt(cflesharmor.innerHTML, 10);
    var flesharmor_v =  parseInt(flesharmor.innerHTML, 10);
    var fossilarmor_v =  parseInt(fossilarmor.innerHTML, 10);
    var infestedarmor_v =  parseInt(infestedarmor.innerHTML, 10);
    var iflesharmor_v =  parseInt(iflesharmor.innerHTML, 10);
    var sinewarmor_v =  parseInt(sinewarmor.innerHTML, 10);
    var machinearmor_v =  parseInt(machinearmor.innerHTML, 10);
    var roboarmor_v =  parseInt(roboarmor.innerHTML, 10);
    var armor_v = ferritearmor_v + alloyarmor_v + cflesharmor_v + flesharmor_v + fossilarmor_v + infestedarmor_v + iflesharmor_v + sinewarmor_v + machinearmor_v + roboarmor_v;
 
    var shieldx_v = parseInt(shield.innerHTML, 10);
    var protoshield_v =  parseInt(protoshield.innerHTML, 10);
    var shield_v = shieldx_v + protoshield_v;
 
    var affinity_v = parseInt(affinity.innerHTML, 10);
    var base_lvl_v = parseInt(baselevel.innerHTML, 10);
    var spawn_lvl_v = parseInt(spawnlevel.innerHTML, 10);
    if (spawn_lvl_v === 0) {
        spawn_lvl_v = base_lvl_v;
    }
 
    if (base_lvl_v > 9) {
        var slider_width = 89;
    } else {
        var slider_width = 92;
    }
 
    if (navigator.userAgent.indexOf("Firefox") != -1){
        slider_div.innerHTML = "<input type='range' min='" + base_lvl_v + "' max='" + slider_max.innerHTML + "' value='" + spawn_lvl_v + "' id='ehp_slider' style='height: 3px;background: #3a3a3a;position: absolute;right: 10px;-moz-appearance: none;width: " + slider_width + "%;' oninput='ehp_input.value = ehp_slider.value; update_scaling();'/><div style='position: absolute;margin-top: -6px;left: -8px;font-size:11px;white-space:nowrap;'>" + base_lvl_v + "</div><div style='position: absolute;margin-top: -6px;left:234px;font-size:11px;white-space:nowrap;'>" + slider_max.innerHTML + "</div>";
    } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode === true )){
        slider_div.innerHTML = "<input type='range' min='" + base_lvl_v + "' max='" + slider_max.innerHTML + "' value='" + spawn_lvl_v + "' id='ehp_slider' style='background: transparent;position: absolute;right: 20px;top:-17px;-ms-appearance: none;width: " + slider_width + "%;height:6px;' onchange='ehp_input.value = ehp_slider.value; update_scaling();'/><div style='position: absolute;margin-top: -6px;left: -8px;font-size:11px;white-space:nowrap;'>" + base_lvl_v + "</div><div style='position: absolute;margin-top: -6px;left:234px;font-size:11px;white-space:nowrap;'>" + slider_max.innerHTML + "</div>";
    } else {
        slider_div.innerHTML = "<input type='range' min='" + base_lvl_v + "' max='" + slider_max.innerHTML + "' value='" + spawn_lvl_v + "' id='ehp_slider' style='height: 3px;background: #3a3a3a;position: absolute;right: 18px;-webkit-appearance: none;width: " + slider_width + "%;' oninput='ehp_input.value = ehp_slider.value; update_scaling();'/><div style='position: absolute;margin-top: -6px;left: -8px;font-size:11px;white-space:nowrap;'>" + base_lvl_v + "</div><div style='position: absolute;margin-top: -6px;left:234px;font-size:11px;white-space:nowrap;'>" + slider_max.innerHTML + "</div>";
    }
 
    out_lvl.innerHTML = "<input type='number' min='" + base_lvl_v + "' max='9999' value='" + spawn_lvl_v + "' id='ehp_input' oninput='ehp_slider.value = ehp_input.value; update_scaling();' style='width:50px; height:18px;'/>";
 
    reset_btn.innerHTML = "<button type='button' onclick='ehp_slider.value = " + spawn_lvl_v + "; ehp_input.value = " + spawn_lvl_v + "; update_scaling();' style='height:20px; padding:0 5px 0 5px; float:right;'>Reset</button>";
 
    update_scaling();
}