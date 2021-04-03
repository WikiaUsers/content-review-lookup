/**
 * let->var()=>{}->function(){};es5angry->dontangryagain
 * 
 * //LANGUAGE : ADD LANGUAGES
 * 
 * *written by  bigfishfish
 * *License: Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)
 */

(function () {
    var cate = mw.config.get("wgCategories")[0];
    var pagename = mw.config.get("wgPageName");
    // LANGUAGE limit
    var catas = ["枪支", "Guns", "Пушки"];
    var poison = ["毒镖枪", "Poison_Dart_Gun", "Ядовитое_Оружие"];
    var special = ["霰弹枪", "豹动式霰弹枪", "Shotgun", "JAG-7", "Escopeta", "Дробовик"];
    // 遍历种类没有（-1） 或者 遍历枪有毒镖枪（！-1）
    if (catas.indexOf(cate) == -1 || poison.indexOf(pagename) != -1) return;
    /////////////////////////////// 数据
    // LANGUAGE 语言
    var Language_class = [ // 无序
        "皮肤",
        "Skins",
        "Apariencias",
        "Скины"
    ];
    var Language_Index = 0;
    var Language_List = [
        "zh",
        "zh-cn",
        "zh-tw",
        "en",
        "zh-hk"
    ];
    var Text_limit = [
        "造成 100 点伤害所需子弹数分界点：",
        "造成 100 点伤害所需子弹数分界点：",
        "造成 100 點傷害所需子彈數分界點：",
        "The cut-off point of shots needed to deal 100 damage:&nbsp",
        "造成 100 點傷害所需子彈數分界點："
    ];
    var Text_limitopinion = [
        " 颗子弹 (",
        " 颗子弹 (",
        " 顆子彈 (",
        " shots (",
        " 顆子彈 ("
    ];
    var Text_to100distance = [
        " 颗子弹造成 100 点伤害(",
        " 颗子弹造成 100 点伤害(",
        " 顆子彈造成 100 點傷害(",
        "Longest distance to deal 100 damage with ",
        " 顆子彈造成 100 點傷害("
    ];
    var Text_dis = [
        "距离：",
        "距离：",
        "距離：",
        "Distance:&nbsp",
        "距離："
    ];
    var Text_dmg = [
        "伤害：",
        "伤害：",
        "傷害：",
        "Damage:&nbsp",
        "傷害："
    ];
    var Text_unit = [
        "（每颗弹丸）",
        "（每颗弹丸）",
        "（每顆彈丸）",
        "&nbsp(per pellet)",
        "（每顆彈丸）"
    ];
    var Text_to100shotnum = [
        "造成 100 点伤害所需子弹数：",
        "造成 100 点伤害所需子弹数：",
        "造成 100 點傷害所需子彈數：",
        "Shots needed to deal 100 damage:&nbsp",
        "造成 100 點傷害所需子彈數："
    ];
    var Text_noorder_shot = [ // 无序
        ["子弹", "弹丸"],
        ["子彈", "彈丸"],
        ["shot", "pellet"],
        ["Shot", "Pellet"]
    ];
    Language_Index = Language_List.indexOf(mw.config.get("wgPageContentLanguage"));
    if (Language_Index == -1) Language_Index = 3;
    var change = special.indexOf(pagename) == -1 ? 0 : 1;
    // 原始数据
    var box = document.getElementsByClassName("infoboxtable")[0];
    var ins = null;
    for (var i = Language_class.length - 1; i >= 0; i--) {
        ins = document.getElementById(Language_class[i]);
        if (ins !== null) {
            ins = ins.parentNode;
            break;
        }
    }
    // 子弹种类数
    var Bullet_L = box.children[0].children[4].children[1].children.length;
    // 子弹种类
    var Bullet_Class = [];
    for (var i = 0; i < Bullet_L; i++) {
        Bullet_Class.push(box.children[0].children[4].children[1].children[i].title);
    }
    // 出膛伤害
    var Bullet_MaxDmg = [];
    for (var i = 0; i < Bullet_L; i++) {
        Bullet_MaxDmg.push(box.children[0].children[4].children[1].children[i].innerText);
    }
    // 射程
    var Bullet_Range = [];
    for (var i = 0; i < Bullet_L; i++) {
        Bullet_Range.push(box.children[0].children[5].children[1].children[i].innerText);
    }
    // 衰减距离
    var Bullet_Dmgto0_Dis = [];
    for (var i = 0; i < Bullet_L; i++) {
        Bullet_Dmgto0_Dis.push(box.children[0].children[6].children[1].children[i].innerText);
    }
    // 武器图片
    var Bullet_Img = box.children[0].children[1].children[0].children[0].children[0].src;

    /////////////////////////////// 前端
    var bar_box = document.createElement("div");
    var bar_img = document.createElement("div");
    var bar_data = document.createElement("div");

    // bar_box.appendChild(bar_img);
    bar_box.appendChild(bar_data);

    bar_box.id = "foxy";
    bar_box.style.width = "100%";
    bar_box.style.height = "200px";
    bar_box.style.backgroundColor = "#202020";

    bar_img.style.width = "200px";
    bar_img.style.height = "200px";
    bar_img.style.display = "table-cell";
    bar_img.style.backgroundImage = "url(" + Bullet_Img + ")";
    bar_img.style.backgroundSize = "cover";

    bar_data.style.position = "relative";
    bar_data.style.width = "90%";
    bar_data.style.height = "200px";
    bar_data.style.display = "inline-block";
    bar_data.style.backgroundColor = "#202020";
    bar_box.style.textAlign = "center";

    var scaleL = 5;
    var scale = [];
    for (var i = 0; i < scaleL; i++) {
        scale.push(document.createElement("div"));
        scale[i].appendChild(document.createElement("div"));
        scale[i].appendChild(document.createElement("div"));
        scale[i].children[0].style.zIndex = 1;
        scale[i].children[1].style.zIndex = 1;
    }
    var BAR = document.createElement("input");
    var BARD = document.createElement("div");

    for (var i = 0; i < scaleL; i++) {
        bar_data.appendChild(scale[i]);
    }
    bar_data.appendChild(BAR);
    bar_data.appendChild(BARD);

    for (var i = 0; i < scaleL; i++) {
        scale[i].style.position = "absolute";
        scale[i].style.width = "30px";
        scale[i].style.left = "calc(" + 100 / (scaleL - 1) * i + "% - " + 2 / (scaleL - 1) * i + "px)";
        scale[i].style.top = "105px";
        scale[i].children[0].style.position = "relative";
        scale[i].children[0].style.left = "-14px";
        scale[i].children[0].innerText = i * 30;
        scale[i].children[0].style.color = "#fff";
        scale[i].children[0].style.fontSize = "15px";
        scale[i].children[0].style.lineHeight = "15px";
        scale[i].children[1].style.width = "2px";
        scale[i].children[1].style.height = "20px";
        scale[i].children[1].style.backgroundColor = "#fff";
    }

    BAR.id = "dmg_range";
    BAR.type = "range";
    BAR.max = "120";
    BAR.min = "0";
    BAR.step = "1";
    BAR.style.position = "absolute";
    BAR.style.width = "100%";
    BAR.defaultValue = "0";
    BAR.style.height = "5px";
    BAR.style.backgroundColor = "#fff";
    BAR.style.top = "130px";
    BAR.style.left = "0";
    BAR.style.outline = "none";
    BAR.style.margin = "0px";
    BAR.style.zIndex = "2";

    BARD.className = "dmg_BARD";
    BARD.style.left = "calc(0% - 5px)";

    var somestyle = document.createElement("style");
    somestyle.type = "text/css";
    somestyle.innerHTML = "\
    #foxy {\
        -moz-user-select: none;\
        -webkit-user-select: none;\
        -khtml-user-select: none;\
    }\
    input[type=range] {\
        -webkit-appearance: none;\
    }\
    input[type=range]::-webkit-slider-thumb {\
        -webkit-appearance: none;\
        height: 20px;\
        width: 2px;\
    }\
    input[type=range]::-webkit-slider-runnable-track {\
    }\
    .dmg_BARD{\
        position: absolute;\
        width: 10px;\
        height: 20px;\
        background-color: grey;\
        top: 120px;\
        z-index: 3;\
        -webkit-pointer-events: none;\
        -moz-pointer-events: none;\
        -ms-pointer-events: none;\
        -o-pointer-events: none;\
        pointer-events: none;\
    }\
    ";
    document.getElementsByTagName("head")[0].appendChild(somestyle);

    var dis_dmg = document.createElement("div");
    var de0 = document.createElement("div");
    var de1 = document.createElement("div");
    var vdis = document.createElement("div");
    var vdmg = [];
    var de2 = document.createElement("div");
    var vkill = [];

    for (var i = 0; i < Bullet_L; i++) {
        vdmg.push(document.createElement("div"));
        vdmg[i].id = "d" + i;
        vdmg[i].style.display = "inline-block";
        vdmg[i].style.color = CalColor(Bullet_Class[i]);
        vdmg[i].title = Bullet_Class[i];

        vkill.push(document.createElement("div"));
        vkill[i].id = "k" + i;
        vkill[i].style.display = "inline-block";
        vkill[i].style.color = CalColor(Bullet_Class[i]);
        vkill[i].title = Bullet_Class[i];
    }

    dis_dmg.style.position = "absolute";
    dis_dmg.style.top = "140px";
    dis_dmg.style.left = "0px";
    dis_dmg.style.color = "#fff";
    dis_dmg.style.fontWeight = "bold";
    dis_dmg.style.textAlign = "left";

    de0.innerHTML = ChangeText(Text_dis[Language_Index]);
    de0.style.display = "inline-block";
    de1.innerHTML = ChangeText(Text_dmg[Language_Index]);
    de1.style.display = "inline-block";
    de2.innerHTML = ChangeText(Text_to100shotnum[Language_Index]);
    de2.style.display = "inline-block";
    vdis.style.display = "inline-block";
    vdis.id = "distance";

    bar_data.appendChild(dis_dmg);
    dis_dmg.appendChild(de0);
    dis_dmg.appendChild(vdis);
    dis_dmg.appendChild(document.createElement("br"));
    dis_dmg.appendChild(de1);
    for (var i = 0; i < Bullet_L; i++) {
        dis_dmg.appendChild(vdmg[i]);
        if (i != Bullet_L - 1) dis_dmg.innerHTML += " / ";
        else if (i == Bullet_L - 1) dis_dmg.innerHTML += ChangeText(change ? Text_unit[Language_Index] : "");
    }
    dis_dmg.appendChild(document.createElement("br"));
    dis_dmg.appendChild(de2);
    for (var i = 0; i < Bullet_L; i++) {
        dis_dmg.appendChild(vkill[i]);
        if (i != Bullet_L - 1) dis_dmg.innerHTML += " / ";
    }


    ins.parentNode.insertBefore(bar_box, ins);

    /////////////////////////////// 计算
    function CalColor(word) {
        switch (word) {
            // LANGUAGE English
            case "Common":
                return "#d4dadd";
            case "Uncommon":
                return "#6bbf00";
            case "Rare":
                return "#00b5f2";
            case "Epic":
                return "#8733c6";
            case "Legendary":
                return "#f7cd0f";

            // LANGUAGE Russian
            case "Обычный":
                return "#d4dadd";
            case "Необычный":
                return "#6bbf00";
            case "Редкий":
                return "#00b5f2";
            case "Эпический":
                return "#8733c6";
            case "Легендарный":
                return "#f7cd0f";
        }
    }

    function CalDmg(V, i) {
        if (V >= parseInt(Bullet_Dmgto0_Dis[i])) return 0;
        return (Bullet_MaxDmg[i] * (Bullet_Dmgto0_Dis[i] - V) / Bullet_Dmgto0_Dis[i]).toFixed(2);
    }

    function UpdateData() {
        var V = BAR.value;
        BARD.style.left = "calc(" + V * 100 / 120 + "% - " + (2 * V / 120 + 5) + "px)";
        document.getElementById("distance").innerHTML = "" + V;
        for (var i = 0; i < Bullet_L; i++) {
            document.getElementById("d" + i).innerHTML = "" + CalDmg(V, i);
            document.getElementById("k" + i).innerHTML = "" + Math.ceil(100 / CalDmg(V, i));
        }
    }

    function KillInTimes() {

    }

    function CalKITDistance() {

    }

    function ChangeDisplay(d) {
        for (var i = 0; i < 4; i++) {
            if (i == d) {
                document.getElementById("bar" + i).style.opacity = 1;
                document.getElementById("display" + i).style.opacity = 1;
            }
            else {
                document.getElementById("bar" + i).style.opacity = 0;
                document.getElementById("display" + i).style.opacity = 0;
            }
        }
    }

    function ChangeText(text) {
        var temp = text;
        for (var i = 0; i < Text_noorder_shot.length; i++) {
            temp = temp.replace(Text_noorder_shot[i][0], Text_noorder_shot[i][change]);
        }
        return temp;
    }

    UpdateData();
    BAR.onmousemove = function () {
        UpdateData();
    }
    BAR.ontouchmove = function () {
        UpdateData();
    }

    var ExactKill = [50, 33.34, 25, 20];

    // TODO 四舍五入在极端距离下的x枪击杀误差暂未解决
    var select = document.createElement("div");
    select.style.position = "absolute";
    select.style.display = "inline-block";
    select.style.textAlign = "left";
    select.style.top = "10px";
    select.style.left = "0px";
    select.style.color = "white";
    select.innerHTML = ChangeText(Text_limit[Language_Index]);
    select.appendChild(document.createElement("form"));
    select.children[0].id = "select";
    select.children[0].style.display = "inline-block";
    for (var i = 0; i < 4; i++) {
        var tempi = document.createElement("input");
        var templ = document.createElement("label");
        tempi.type = "radio";
        tempi.id = "select" + i;
        tempi.name = "which";
        templ.setAttribute("for", "select" + i);
        templ.innerHTML = i + 2 + "/" + (i + 3) + ChangeText(Text_limitopinion[Language_Index]) + ExactKill[i] + ")";
        select.children[0].appendChild(tempi);
        select.children[0].appendChild(templ);
    }
    bar_data.appendChild(select);

    // i 击杀伤害 j 品质
    for (var i = 0; i < ExactKill.length; i++) {
        // 每一个x枪必杀的总和
        var onediv = document.createElement("div");
        // 每一个标识条的总和
        var onebar = document.createElement("div");

        onediv.style.position = "absolute";
        onediv.style.color = "white";
        onediv.style.top = "60px";
        onediv.style.fontWeight = "bold";
        onediv.id = "display" + i;
        onediv.innerHTML = i + 2 + "枪击杀（" + ExactKill[i] + "）距离：";
        switch (Language_Index) {
            case 0:
                onediv.innerHTML = i + 2 + ChangeText(Text_to100distance[Language_Index]) + ExactKill[i] + ")" + Text_dis[Language_Index];
                break;
            case 1:
                onediv.innerHTML = i + 2 + ChangeText(Text_to100distance[Language_Index]) + ExactKill[i] + ")" + Text_dis[Language_Index];
                break;
            case 2:
                onediv.innerHTML = i + 2 + ChangeText(Text_to100distance[Language_Index]) + ExactKill[i] + ")" + Text_dis[Language_Index];
                break;
            case 3:
                onediv.innerHTML = ChangeText(Text_to100distance[Language_Index]) + (i + 2) + Text_noorder_shot[2][0] + "s:&nbsp"
                break;
        }

        onebar.style.position = "absolute";
        onebar.style.top = "100px";
        onebar.style.left = "0px";
        onebar.style.width = "100%";
        onebar.style.height = "1px";
        onebar.style.overflow = "visible";
        onebar.id = "bar" + i;

        for (var j = 0; j < Bullet_L; j++) {
            // 计算是否存在该伤害，有就计算位置
            var MinDmg = CalDmg(120, j);
            var ExactDistance = "x";
            if (Bullet_MaxDmg[j] >= ExactKill[i] && ExactKill[i] >= MinDmg) {
                // 公式： 衰减距离 - 目前伤害 / 最大伤害 * 衰减距离
                ExactDistance = (Bullet_Dmgto0_Dis[j] - Bullet_Dmgto0_Dis[j] * ExactKill[i] / Bullet_MaxDmg[j]).toFixed(2);
            }
            var onenumdiv = document.createElement("div");
            var onebardiv = document.createElement("div");

            onenumdiv.style.display = "inline-block";
            onenumdiv.style.color = CalColor(Bullet_Class[j]);
            onenumdiv.style.fontWeight = "bold";
            onenumdiv.title = Bullet_Class[j];
            onenumdiv.innerHTML = ExactDistance;

            onebardiv.style.position = "absolute";
            onebardiv.style.width = "2px";
            onebardiv.style.height = "30px";
            onebardiv.style.backgroundColor = CalColor(Bullet_Class[j]);
            onebardiv.style.top = "0px";
            onebardiv.style.left = "calc(" + ExactDistance / 1.20 + "% - " + 2 * ExactDistance / 120 + "px)";

            onediv.appendChild(onenumdiv);
            if (ExactDistance != "x") onebar.appendChild(onebardiv);
            if (j < Bullet_L - 1) onediv.innerHTML += " / ";
        }
        bar_data.appendChild(onediv);
        bar_data.appendChild(onebar);
    }

    select.children[0].children[0].checked = true;
    ChangeDisplay(0);
    select.onclick = function () {
        var i = 0;
        for (; i < 4; i++) {
            if (select.children[0].children[i * 2].checked == true) break;
            if (i == 4) i = 0;
        }
        ChangeDisplay(i);
    }
})()