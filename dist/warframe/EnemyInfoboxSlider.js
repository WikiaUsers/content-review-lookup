/* jshint maxerr: 1000 */
if ($('#slider_div').length) {
    
    slider_div.enemyinfoboxscaler = { };
    var scaler = slider_div.enemyinfoboxscaler;
    
    scaler.init = function() {
        this.clonedflesh_v    = parseInt(clonedflesh.innerHTML, 10);
        this.flesh_v          = parseInt(flesh.innerHTML, 10);
        this.fossilized_v     = parseInt(fossilized.innerHTML, 10);
        this.infested_v       = parseInt(infested.innerHTML, 10);
        this.infestedflesh_v  = parseInt(infestedflesh.innerHTML, 10);
        this.infestedsinew_v  = parseInt(infestedsinew.innerHTML, 10);
        this.machinery_v      = parseInt(machinery.innerHTML, 10);
        this.robotic_v        = parseInt(robotic.innerHTML, 10);
        this.ferritehealth_v  = parseInt(ferritehealth.innerHTML, 10);
        this.alloyhealth_v    = parseInt(alloyhealth.innerHTML, 10);
        this.shieldhealth_v   = parseInt(shieldhealth.innerHTML, 10);
        this.protohealth_v    = parseInt(protohealth.innerHTML, 10);
        this.health_v = this.clonedflesh_v + this.flesh_v + this.fossilized_v + this.infested_v + this.infestedflesh_v + this.infestedsinew_v + this.machinery_v + this.robotic_v + this.alloyhealth_v + this.ferritehealth_v + this.shieldhealth_v + this.protohealth_v;

        this.ferritearmor_v   = parseInt(ferritearmor.innerHTML, 10);
        this.alloyarmor_v     = parseInt(alloyarmor.innerHTML, 10);
        this.cflesharmor_v    = parseInt(cflesharmor.innerHTML, 10);
        this.flesharmor_v     = parseInt(flesharmor.innerHTML, 10);
        this.fossilarmor_v    = parseInt(fossilarmor.innerHTML, 10);
        this.infestedarmor_v  = parseInt(infestedarmor.innerHTML, 10);
        this.iflesharmor_v    = parseInt(iflesharmor.innerHTML, 10);
        this.sinewarmor_v     = parseInt(sinewarmor.innerHTML, 10);
        this.machinearmor_v   = parseInt(machinearmor.innerHTML, 10);
        this.roboarmor_v      = parseInt(roboarmor.innerHTML, 10);
        this.shieldarmor_v    = parseInt(shieldarmor.innerHTML, 10);
        this.protoarmor_v     = parseInt(protoarmor.innerHTML, 10);
        this.armor_v          = this.ferritearmor_v + this.alloyarmor_v + this.cflesharmor_v + this.flesharmor_v + this.fossilarmor_v + this.infestedarmor_v + this.iflesharmor_v + this.sinewarmor_v + this.machinearmor_v + this.roboarmor_v + this.shieldarmor_v + this.protoarmor_v;
     
        this.shieldx_v        = parseInt(shield.innerHTML, 10);
        this.protoshield_v    = parseInt(protoshield.innerHTML, 10);
        this.cfleshshield_v   = parseInt(cfleshshield.innerHTML, 10);
        this.fleshshield_v    = parseInt(fleshshield.innerHTML, 10);
        this.fossilshield_v   = parseInt(fossilshield.innerHTML, 10);
        this.infestedshield_v = parseInt(infestedshield.innerHTML, 10);
        this.ifleshshield_v   = parseInt(ifleshshield.innerHTML, 10);
        this.sinewshield_v    = parseInt(sinewshield.innerHTML, 10);
        this.machineshield_v  = parseInt(machineshield.innerHTML, 10);
        this.roboshield_v     = parseInt(roboshield.innerHTML, 10);
        this.ferriteshield_v  = parseInt(ferriteshield.innerHTML, 10);
        this.alloyshield_v    = parseInt(alloyshield.innerHTML, 10);
        this.shield_v         = this.shieldx_v + this.protoshield_v + this.cfleshshield_v + this.fleshshield_v + this.fossilshield_v + this.infestedshield_v + this.ifleshshield_v + this.sinewshield_v + this.machineshield_v + this.roboshield_v + this.ferriteshield_v + this.alloyshield_v;
     
        this.affinity_v  = parseInt(affinity.innerHTML, 10);
        this.base_lvl_v  = parseInt(baselevel.innerHTML, 10);
        this.spawn_lvl_v = parseInt(spawnlevel.innerHTML, 10);
        
        if (this.spawn_lvl_v === 0) {
            this.spawn_lvl_v = this.base_lvl_v;
        }
    };
        
    scaler.trans = function(start, end, curr_lvl) {
        var transition = Math.min(1, (Math.max(curr_lvl, start + this.base_lvl_v) - (start + this.base_lvl_v))/(end - start));
        return transition;
    };
        
    scaler.update = function() {
        if((curr_lvl = ehp_input.value) >= this.base_lvl_v) {
            var old_health = 1 + 0.015*Math.pow(curr_lvl - this.base_lvl_v, 2);
            var old_shield = 1 + 0.0075*Math.pow(curr_lvl - this.base_lvl_v, 2);
            var old_armor  = 1 + 0.005*Math.pow(curr_lvl - this.base_lvl_v, 1.75);
     
            var new_health = 1 + 10.7332*Math.pow(curr_lvl - this.base_lvl_v, 0.5);
            var new_shield = 1 + 1.6*Math.pow(curr_lvl - this.base_lvl_v, 0.75);
            var new_armor  = 1 + 0.4*Math.pow(curr_lvl - this.base_lvl_v, 0.75);
     
            health_multi = 1 + (1 - this.trans(70, 85, curr_lvl))*(old_health - 1) + this.trans(70, 85, curr_lvl)*(new_health - 1);
            shield_multi = 1 + (1 - this.trans(70, 85, curr_lvl))*(old_shield - 1) + this.trans(70, 85, curr_lvl)*(new_shield - 1);
            armor_multi  = 1 + (1 - this.trans(60, 80, curr_lvl))*(old_armor - 1) + this.trans(60, 80, curr_lvl)*(new_armor - 1);
     
            clonedflesh.innerHTML    = (Math.round(this.clonedflesh_v * health_multi * 100) / 100).toLocaleString();
            flesh.innerHTML          = (Math.round(this.flesh_v * health_multi * 100) / 100).toLocaleString();
            fossilized.innerHTML     = (Math.round(this.fossilized_v * health_multi * 100) / 100).toLocaleString();
            infested.innerHTML       = (Math.round(this.infested_v * health_multi * 100) / 100).toLocaleString();
            infestedflesh.innerHTML  = (Math.round(this.infestedflesh_v * health_multi * 100) / 100).toLocaleString();
            infestedsinew.innerHTML  = (Math.round(this.infestedsinew_v * health_multi * 100) / 100).toLocaleString();
            machinery.innerHTML      = (Math.round(this.machinery_v * health_multi * 100) / 100).toLocaleString();
            robotic.innerHTML        = (Math.round(this.robotic_v * health_multi * 100) / 100).toLocaleString();
            ferritehealth.innerHTML  = (Math.round(this.ferritehealth_v * health_multi * 100) / 100).toLocaleString();
            alloyhealth.innerHTML    = (Math.round(this.alloyhealth_v * health_multi * 100) / 100).toLocaleString();
            shieldhealth.innerHTML   = (Math.round(this.shieldhealth_v * health_multi * 100) / 100).toLocaleString();
            protohealth.innerHTML    = (Math.round(this.protohealth_v * health_multi * 100) / 100).toLocaleString();
     
            ferritearmor.innerHTML   = (Math.round(this.ferritearmor_v * armor_multi * 100) / 100).toLocaleString();
            alloyarmor.innerHTML     = (Math.round(this.alloyarmor_v * armor_multi * 100) / 100).toLocaleString();
            cflesharmor.innerHTML    = (Math.round(this.cflesharmor_v * armor_multi * 100) / 100).toLocaleString();
            flesharmor.innerHTML     = (Math.round(this.flesharmor_v * armor_multi * 100) / 100).toLocaleString();
            fossilarmor.innerHTML    = (Math.round(this.fossilarmor_v * armor_multi * 100) / 100).toLocaleString();
            infestedarmor.innerHTML  = (Math.round(this.infestedarmor_v * armor_multi * 100) / 100).toLocaleString();
            iflesharmor.innerHTML    = (Math.round(this.iflesharmor_v * armor_multi * 100) / 100).toLocaleString();
            sinewarmor.innerHTML     = (Math.round(this.sinewarmor_v * armor_multi * 100) / 100).toLocaleString();
            machinearmor.innerHTML   = (Math.round(this.machinearmor_v * armor_multi * 100) / 100).toLocaleString();
            roboarmor.innerHTML      = (Math.round(this.roboarmor_v * armor_multi * 100) / 100).toLocaleString();
            shieldarmor.innerHTML    = (Math.round(this.shieldarmor_v * armor_multi * 100) / 100).toLocaleString();
            protoarmor.innerHTML     = (Math.round(this.protoarmor_v * armor_multi * 100) / 100).toLocaleString();
     
            damage_redux.innerHTML   = ((Math.round((1 - 300 / (this.armor_v * armor_multi + 300)) * 10000) / 10000) * 100).toLocaleString();
     
            shield.innerHTML         = (Math.round(this.shieldx_v * shield_multi * 100) / 100).toLocaleString();
            protoshield.innerHTML    = (Math.round(this.protoshield_v * shield_multi * 100) / 100).toLocaleString();
            ferriteshield.innerHTML  = (Math.round(this.ferriteshield_v * shield_multi * 100) / 100).toLocaleString();
            alloyshield.innerHTML    = (Math.round(this.alloyshield_v * shield_multi * 100) / 100).toLocaleString();
            cfleshshield.innerHTML   = (Math.round(this.cfleshshield_v * shield_multi * 100) / 100).toLocaleString();
            fleshshield.innerHTML    = (Math.round(this.fleshshield_v * shield_multi * 100) / 100).toLocaleString();
            fossilshield.innerHTML   = (Math.round(this.fossilshield_v * shield_multi * 100) / 100).toLocaleString();
            infestedshield.innerHTML = (Math.round(this.infestedshield_v * shield_multi * 100) / 100).toLocaleString();
            ifleshshield.innerHTML   = (Math.round(this.ifleshshield_v * shield_multi * 100) / 100).toLocaleString();
            sinewshield.innerHTML    = (Math.round(this.sinewshield_v * shield_multi * 100) / 100).toLocaleString();
            machineshield.innerHTML  = (Math.round(this.machineshield_v * shield_multi * 100) / 100).toLocaleString();
            roboshield.innerHTML     = (Math.round(this.roboshield_v * shield_multi * 100) / 100).toLocaleString();
     
            out_ehp.innerHTML        = (Math.round((this.health_v * health_multi * (1 + this.armor_v * armor_multi / 300) + this.shield_v * shield_multi)* 100) / 100).toLocaleString();
     
            affinity.innerHTML       = (Math.round(this.affinity_v * (1 + Math.pow(curr_lvl, 0.5) * 0.1425)* 100) / 100).toLocaleString();
        }
    };
        
    scaler.init();
    
    if (scaler.base_lvl_v > 9) {
        var slider_width = 89;
    } else {
        var slider_width = 92;
    }
        
    if (navigator.userAgent.indexOf("Firefox") != -1) {
        slider_div.innerHTML = "<input type='range' min='" + scaler.base_lvl_v + "' max='" + slider_max.innerHTML + "' value='" + scaler.spawn_lvl_v + "' id='ehp_slider' style='height:3px; background:#3a3a3a; position:absolute; right:18px; -moz-appearance:none; width:" + slider_width + "%;' oninput='ehp_input.value = ehp_slider.value; slider_div.enemyinfoboxscaler.update();'/><div style='position:absolute; margin-top:-6px; left:-8px; font-size:11px; white-space:nowrap;'>" + scaler.base_lvl_v + "</div><div style='position: absolute;margin-top: -6px;left:234px;font-size:11px;white-space:nowrap;'>" + slider_max.innerHTML + "</div>";
    } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (document.documentMode !== undefined)) {
        slider_div.innerHTML = "<input type='range' min='" + scaler.base_lvl_v + "' max='" + slider_max.innerHTML + "' value='" + scaler.spawn_lvl_v + "' id='ehp_slider' style='background:transparent; position:absolute; right:20px; top:-17px; -ms-appearance:none; width:" + slider_width + "%; height:6px;' onchange='ehp_input.value = ehp_slider.value; slider_div.enemyinfoboxscaler.update();'/><div style='position:absolute; margin-top:-6px; left:-8px; font-size:11px; white-space:nowrap;'>" + scaler.base_lvl_v + "</div><div style='position:absolute; margin-top:-6px; left:234px; font-size:11px; white-space:nowrap;'>" + slider_max.innerHTML + "</div>";
    } else {
        slider_div.innerHTML = "<input type='range' min='" + scaler.base_lvl_v + "' max='" + slider_max.innerHTML + "' value='" + scaler.spawn_lvl_v + "' id='ehp_slider' style='height:3px; background:#3a3a3a; position:absolute; right:18px; -webkit-appearance:none; width:" + slider_width + "%;' oninput='ehp_input.value = ehp_slider.value; slider_div.enemyinfoboxscaler.update();'/><div style='position:absolute; margin-top:-6px; left:-8px; font-size:11px; white-space:nowrap;'>" + scaler.base_lvl_v + "</div><div style='position:absolute; margin-top:-6px; left:234px; font-size:11px; white-space:nowrap;'>" + slider_max.innerHTML + "</div>";
    }
 
    out_lvl.innerHTML = "<input type='number' min='" + scaler.base_lvl_v + "' max='9999' value='" + scaler.spawn_lvl_v + "' id='ehp_input' oninput='ehp_slider.value = ehp_input.value; slider_div.enemyinfoboxscaler.update();' style='width:50px; height:18px;'/>";
 
    reset_btn.innerHTML = "<button type='button' onclick='ehp_slider.value = " + scaler.spawn_lvl_v + "; ehp_input.value = " + scaler.spawn_lvl_v + "; slider_div.enemyinfoboxscaler.update();' style='height:20px; padding:0 5px 0 5px; float:right;'>Reset</button>";
 
    scaler.update();
}