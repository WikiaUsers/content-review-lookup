/*
    ALog3D Item API Hex Editor
    Copyright (C) 2015  RuneApps

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// ==UserScript==
// @name         ALog3D Item API Hex Editor
// @version      1.0.0.1
// @description  Modify Hex information of items for use with the Item API
// @author       Skillbert
// @contributor  Cook Me Plox
// @contributor  Ryan M (RyanMakise)
// @homepage     http://runeapps.org/
// @match        http://services.runescape.com/m=adventurers-log/*/character
// @match        http://services.runescape.com/m=adventurers-log/*/character?searchName=*
// @match        http://services.runescape.com/m=adventurers-log/*/character?searchname=*
// @match        http://services.runescape.com/m=adventurers-log/character?searchName=*
// @match        http://services.runescape.com/m=adventurers-log/character?searchname=*
// @run-at       document-end
// @grant        none
// ==/UserScript==

/* jshint bitwise: false, funcscope:true, expr:true, -W083, -W089 */
/* globals imgcapt:true, Module:true, curbin:true, binindex:true, chars:true,
   loadedStr:true, byteblock:true, setframecam:true, width:true, height:true,
   GIFEncoder:true, Whammy:true, GIF:true, scr:true, $ */

var GIF, GIFEncoder, Whammy, binindex, byteblock, chars, curbin, height, imgcapt, loadedStr, scr, setframecam, width;

function ab() {
  'use strict';

  if (window.imgcapt) {
    imgcapt.firstLoad = false;
  } else {
    imgcapt = {
      firstLoad: true
    };
  }

  //Definitions
  chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*-";
  curbin = "000000001111111110111110000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";

  //General
  imgcapt.currentPlayer = "";
  imgcapt.currentStr = "";

  //Player profile
  imgcapt.strlist = [];
  imgcapt.captured = [];
  imgcapt.captCnv = false;
  imgcapt.lastLoad = 0;
  imgcapt.skipTime = 15000;
  imgcapt.settleTime = 2000;
  imgcapt.unloadTime = 3000;
  imgcapt.checkTime = 500;

  //String editor
  imgcapt.stredit = {};

  //RuneApps Libraries
  imgcapt.liborigin = "http://runeapps.org";
  imgcapt.libs = ["/apps/avatarcapt/lib/gif/LZWEncoder.js", "/apps/avatarcapt/lib/gif/NeuQuant.js", "/apps/avatarcapt/lib/gif/GIFEncoder.js", "/apps/avatarcapt/lib/webm/whammy.js", "/apps/avatarcapt/lib/gif2/gif.js", "/apps/avatarcapt/items.js"];
  imgcapt.libstrings = {
    gif2workerstr: "/apps/avatarcapt/lib/gif2/gif_transfix.worker.js"
  };

  //Hex table
  imgcapt.drawstr = function(str) {
    var a, b, c, r, parts, block, blocks, hex, root;

    //Byteblock class
    byteblock = function() {
      this.hex = "";
      this.read = function(l) {
        return parseInt(this.hex.slice(0, l * 2), 16);
      };
      this.readHex = function(l) {
        return this.hex.slice(0, l * 2);
      };
      this.setint = function(n, l) {
        this.hex = numToHex(n, l * 2);
      };
    };

    //Parsers
    var parsegender = function(obj) {
      obj.l = 1;
      obj.control = {
        t: "dropdown",
        v: obj.read(1),
        opts: [
          [0, "Male"],
          [1, "Female"]
        ],
        func: function(obj, v) {
          obj.setint(v, 1);
        }
      };
      obj.reset = function(obj) {
        obj.setint(0, 1);
      };
    };
    var parseslot = function(obj) {
      var id;
      if (obj.read(1) !== 0) { //Equipped
        id = obj.read(2) - 0x4000;
        obj.l = 2;
        obj.control = {
          t: "int",
          v: id,
          func: function(obj, v) {
            obj.l = 2;
            obj.setint(+v + 0x4000, 2);
          }
        };
        /*if (id >= 0) {
         console.log("Parse Slot ID: 0 or less.");
        }*/
        obj.reset = function(obj) {
          obj.l = 1;
          obj.setint(0, 1);
        };
      } else {
        obj.l = 1;
        obj.control = {
          t: "button",
          v: "Equip",
          func: function(obj) {
            obj.l = 2;
            obj.setint(0x4000, 2);
          }
        };
      }
    };
    var setrecol = function(obj, index) {
      var a, b, len;
      obj.l = 2;
      a = numToBin(parseInt(obj.read(2)), 16);
      len = a.length - 1;
      for (b = len; b >= 0; b--) {
        if (a[b] == "0") {
          continue;
        }
        parts.splice(++index, 0, {
          n: "c." + slotnames[len - b],
          parse: parseitemdata
        });
      }
    };
    var parseitemdata = function(obj, index) {
      var flags;
      obj.l = 1;
      flags = obj.read(1);
      if (flags && 0x1) {
        parts.splice(++index, 0, {
          n: "Data 0",
          l: 2
        });
        parts.splice(++index, 0, {
          n: "Data 1",
          l: 2
        });
        parts.splice(++index, 0, {
          n: "Data 2",
          l: 2
        });
        parts.splice(++index, 0, {
          n: "Data 3",
          l: 2
        });
      }
      /*if (flags && 0x2) { //Not in use
        //console.log("Slot Data Flag: 0x2?");
      }*/
      if (flags && 0x4) {
        parts.splice(++index, 0, {
          n: "type",
          parse: parsecol
        });
      }
      /*if (flags && 0x8) { //Not in use
        //console.log("Slot Data Flag: 0x8?");
      }*/
    };
    var parsecol = function(obj, index) {
      var code;
      obj.l = 2;
      code = obj.read(2);
      if (code == 0x3210) {
        parts.splice(index + 1, 0, {
          n: "color",
          type: "color4"
        });
      }
      if (code == 0x8001 || code == 0x220f) {
        parts.splice(index + 1, 0, {
          n: "col 0",
          type: "color"
        });
        parts.splice(index + 2, 0, {
          n: "col 1",
          type: "color"
        });
      }
    };
    var slotnames = ["Helm", "Cape", "Neck", "Weapon", "Body", "Off-hand", "Arms", "Legs", "Face", "Hands", "Boots", "Jaw", "Aura", "Sh. mh", "Sh. oh", "Wings"];
    parts = [{
        n: "Gender",
        parse: parsegender
      }, {
        n: "Helm",
        parse: parseslot
      }, {
        n: "Cape",
        parse: parseslot
      }, //Can also be Wing
      {
        n: "Neck",
        parse: parseslot
      }, {
        n: "Weapon",
        parse: parseslot
      }, //Item id +64, 0x40 boogie bow
      {
        n: "Body",
        parse: parseslot
      }, {
        n: "Off-hand",
        parse: parseslot
      }, {
        n: "Arms",
        parse: parseslot
      }, {
        n: "Legs",
        parse: parseslot
      }, {
        n: "Face",
        parse: parseslot
      }, {
        n: "Hands",
        parse: parseslot
      }, {
        n: "Boots",
        parse: parseslot
      }, {
        n: "Jaw",
        parse: parseslot
      }, {
        n: "Aura",
        parse: parseslot
      }, {
        n: "Sh. mh",
        parse: parseslot
      }, //mh
      {
        n: "Sh. oh",
        parse: parseslot
      }, {
        n: "Wings",
        parse: parseslot
      }, {
        n: "Recol",
        parse: setrecol
      }, {
        n: "C.Hair",
        l: 1
      }, {
        n: "C.Top",
        l: 1
      }, {
        n: "C.Legs",
        l: 1
      }, {
        n: "C.Boots",
        l: 1
      }, {
        n: "C.Wrist",
        l: 1
      }, {
        n: "Bin",
        l: 2
      }, {
        n: "Bin",
        l: 2
      }, {
        n: "Bin",
        l: 1
      }, {
        n: "Anim",
        l: 2,
        type: "int"
      }
    ];
    hex = base64ToHex(str);
    blocks = [];
    for (a = 0; a < parts.length; a++) {
      block = new byteblock();
      block.hex = hex;
      block.name = parts[a].n;
      if (parts[a].parse) {
        parts[a].parse(block, a);
      }
      if (parts[a].l !== undefined) {
        block.l = parts[a].l;
      }
      if (parts[a].type) {
        if (parts[a].type == "int") {
          block.control = {
            v: block.read(block.l),
            t: "int",
            func: function(obj, v) {
              obj.setint(+v, obj.l);
            }
          };
        }
        if (parts[a].type == "color") {
          block.l = 2;
          block.control = {
            v: block.readHex(2),
            t: "color",
            func: function(obj, v) {
              obj.hex = rgbToHsl(v.slice(1));
            }
          };
        }
        if (parts[a].type == "color4") {
          block.l = 8;
          block.control = {
            v: block.readHex(8),
            t: "color4",
            func: function(obj, v) {
              obj.hex = obj.hex.slice(0, v[0] * 4) + rgbToHsl(v[1].slice(1)) + obj.hex.slice(v[0] * 4 + 4);
            }
          };
        }
      }
      block.hex = hex.slice(0, block.l * 2);
      hex = hex.slice(block.l * 2);
      blocks.push(block);
    }
    r = "<table><tr><th>Name</th><th>Hex</th><th>Edit</th><th>Reset</th></tr>";
    for (a = 0; a < blocks.length; a++) {
      block = blocks[a];
      r += "<tr>";
      //Name
      r += "<td>" + block.name + "</td>";
      //Hex
      r += "<td>";
      c = "";
      for (b = 0; b < block.l; b++) {
        c += (b === 0 ? "" : " ") + block.hex.slice(b * 2, b * 2 + 2);
      }
      r += "<input style='width:35px;' onkeydown='imgcapt.blockkeydown(" + a + ",event);' onchange='imgcapt.editblockhex(" + a + ",this.value)' value='" + c + "'/>";
      r += "</td>";
      //Edit
      if (block.control) {
        r += "<td>";
        if (block.control.t == "button") {
          r += "<input type='button' style='width:64px;' onclick='imgcapt.editblock(" + a + ",true)' value='" + block.control.v + "' />";
        }
        if (block.control.t == "int") {
          r += "<input type='number' style='width:64px;' " + (block.control.title ? "title='" + block.control.title.replace(/'/g, "&apos;") + "'" : "") + " onchange='imgcapt.editblock(" + a + ",this.value)' value='" + block.control.v + "' />";
        }
        if (block.control.t == "dropdown") {
          r += "<select onchange='imgcapt.editblock(" + a + ",this.value)'>";
          for (b = 0; b < block.control.opts.length; b++) {
            r += "<option " + (block.control.v == block.control.opts[b][0] ? "selected" : "") + " value='" + block.control.opts[b][0] + "'>" + block.control.opts[b][1] + "</option>";
          }
          r += "</select>";
        }
        if (block.control.t == "color") {
          r += "<input type='color' style='width:64px' onchange='imgcapt.editblock(" + a + ",this.value);' value='#" + hslToRgb(block.control.v) + "' />";
        }
        if (block.control.t == "color4") {
          r += "<input type='color' style='width:15px; padding:0px;' onchange='imgcapt.editblock(" + a + ",[0,this.value]);' value='#" + hslToRgb(block.control.v.slice(0, 4)) + "' />";
          r += "<input type='color' style='width:15px; padding:0px;' onchange='imgcapt.editblock(" + a + ",[1,this.value]);' value='#" + hslToRgb(block.control.v.slice(4, 8)) + "' />";
          r += "<input type='color' style='width:15px; padding:0px;' onchange='imgcapt.editblock(" + a + ",[2,this.value]);' value='#" + hslToRgb(block.control.v.slice(8, 12)) + "' />";
          r += "<input type='color' style='width:15px; padding:0px;' onchange='imgcapt.editblock(" + a + ",[3,this.value]);' value='#" + hslToRgb(block.control.v.slice(12, 16)) + "' />";
        }
        r += "</td>";
      }
      //Reset
      if (block.reset) {
        r += "<td><input type='button' onclick='imgcapt.resetblock(" + a + ");' value='X'/></td>";
      }
    }
    r += "</table>";
    root = document.createElement("div");
    root.style.position = "fixed";
    root.id = "streditroot";
    root.style.left = "0px";
    root.style.top = "0px";
    root.style.zIndex = "10000";
    root.style.background = "url(http://www.runescape.com/img/rs3/6-box-top.jpg) -1px 0px no-repeat, url(http://www.runescape.com/img/rs3/content_repeat_y.jpg) -1px 310px no-repeat";
    root.style.padding = "2px";
    root.style.border = "2px solid black";
    root.style.boxShadow = "2px 2px 10px 1px rgba(0, 0, 0, 0.7)";
    root.style.maxHeight = "100%";
    root.style.overflowX = "auto";
    root.style.width = "220px";
    root.style.overflowX = "hidden";
    root.onmousewheel = function(e) {
      root.scrollTop -= e.wheelDeltaY;
      return false;
    };
    root.innerHTML = r;
    if (imgcapt.editel) {
      imgcapt.editel.remove();
    }
    document.body.appendChild(root);
    imgcapt.editel = root;
    imgcapt.stredit.blocks = blocks;
    imgcapt.stredit.hextail = hex;
  };
  imgcapt.blockkeydown = function(index, e) {
    var block, key;
    key = String.fromCharCode(e.keyCode);
    block = imgcapt.stredit.blocks[index];
    if (key == "Q") {
      block.hex = numToHex(parseInt(block.hex, 16) + 1, block.l * 2);
      e.preventDefault();
      imgcapt.buildstr();
    }
    if (key == "W") {
      block.hex = numToHex(parseInt(block.hex, 16) - 1, block.l * 2);
      e.preventDefault();
      imgcapt.buildstr();
    }
  };
  imgcapt.resetblock = function(index) {
    var block;
    block = imgcapt.stredit.blocks[index];
    block.reset(block);
    imgcapt.buildstr();
  };
  imgcapt.editblockhex = function(index, value) {
    var block;
    value = value.toLowerCase();
    value = value.replace(/[^\da-f]/g, "");
    block = imgcapt.stredit.blocks[index];
    block.hex = value;
    imgcapt.buildstr();
  };
  imgcapt.editblock = function(index, value) {
    var block;
    block = imgcapt.stredit.blocks[index];
    block.control.func(block, value);
    imgcapt.buildstr();
  };
  imgcapt.buildstr = function() {
    var a, b, str, block, nth, nth2, selectstart, root, scroll;
    str = "";
    for (a = 0; a < imgcapt.stredit.blocks.length; a++) {
      block = imgcapt.stredit.blocks[a];
      str += block.hex;
    }
    str += imgcapt.stredit.hextail;
    if (window.event) {
      root = document.getElementById("streditroot");
      if (root) {
        scroll = root.scrollTop;
      }
      a = window.event.target;
      if (a) {
        if (a.type == "text") {
          selectstart = a.selectionStart;
        }
        a = a.parentElement;
      }
      if (a) {
        nth2 = 1;
        b = a;
        while (b.nodeType === Node.ELEMENT_NODE && (b = b.previousSibling)) {
          nth2++;
        }
        a = a.parentElement;
      }
      if (a) {
        nth = 1;
        b = a;
        while (b.nodeType === Node.ELEMENT_NODE && (b = b.previousSibling)) {
          nth++;
        }
      }
    }
    imgcapt.setstring(hexToBase64(str));
    if (nth !== undefined) {
      a = "#streditroot > table > tbody > tr:nth-child(" + nth + ") > td:nth-child(" + nth2 + ") > *";
      b = document.querySelector(a);
      if (b) {
        b.focus();
        if (selectstart !== undefined) {
          b.selectionStart = selectstart;
        }
      }
      root = document.getElementById("streditroot");
      if (root && scroll !== undefined) {
        root.scrollTop = scroll;
      }
    }
  };

  //Start
  imgcapt.start = setTimeout(function() {
    console.clear();
    if (imgcapt.firstLoad) {
      //imgcapt.loadlibs();
    }
    imgcapt.controlPanel();
    document.location.search.replace(/searchName=([\w%_]+)(\&|$)/, function(a, b) {
      imgcapt.setplayer(b);
    });
  }, 3000);
  
  //Set block
  imgcapt.setNextPlayer = function() {
    var a, b, c;
    for (a in imgcapt.strlist) {
      b = true;
      for (c in imgcapt.captured) {
        if (imgcapt.captured[c].str == imgcapt.strlist[a].avatarstr) {
          b = false;
          break;
        }
      }
      if (b) {
        imgcapt.setstring(imgcapt.strlist[a].avatarstr);
        imgcapt.logupload("new string: " + imgcapt.currentStr);
        setTimeout(imgcapt.checkImg, imgcapt.unloadTime);
        return;
      }
    }
    imgcapt.stopUpload();
  };
  imgcapt.setplayer = function(player) {
    player = player.replace(/( |\-|\u00a0|%A0|%20)/g, "_");
    imgcapt.currentPlayer = player;
    //avatarViewer.avatarChange(player);
    dlpage("http://services.runescape.com/m=avatar-rs/" + encodeURIComponent(player) + "/appearance.dat", function(t) {
      if (t.indexOf(" ") != -1) {
        imgcapt.setMessage("Failed to load: " + player);
        return;
      }
      else {
	    console.log('Avatar Details (Item API): ' + 'http://services.runescape.com/m=adventurers-log/avatardetails.json?details=' + t);
      }
      imgcapt.setstring(t);
    });
  };
  imgcapt.setstring = function(str) {
    str;
    imgcapt.currentStr = str;
    document.getElementById("imgcaptstring")
      .value = str;
    document.getElementById("imgcaptstringhex")
      .value = base64ToHex(str);
    imgcapt.drawstr(str);
    $('#avatarDetails-link').attr('href','avatardetails.json?details=' + str);
  };
  imgcapt.setstringbin = function(str) {
    imgcapt.setstring(binToBase64(str));
  };
  imgcapt.setstringhex = function(str) {
    imgcapt.setstring(hexToBase64(str));
  };

  imgcapt.controlPanel = function() {
    if (imgcapt.controlel) {
      imgcapt.controlel.remove();
    }
    var root, str, funcs, sp, up, hh;
    root = document.createElement("div");
    root.style.position = "fixed";
    root.style.top = "0px";
    root.style.right = "0px";
    root.style.zIndex = "100000";
    root.style.display = "flex";
    root.style.alignItems = "flex-end";
    root.style.flexDirection = "column";
    root.style.fontFamily = "sans-serif";
    root.style.fontSize = "14px";
    root.style.textAlign = "center";
    root.style.color = "white";
    root.style.padding = "2px";
    root.style.border = "2px solid black";
    root.style.background = "url(http://www.runescape.com/img/rs3/6-box-top.jpg) -1px 0";
    root.style.boxShadow = "-2px 2px 10px 1px rgba(0, 0, 0, 0.7)";
    root.dragstart = false;
    root.dragstartangle = false;
    imgcapt.controlfuncs = funcs;

    str = "";
    sp = "<span style='display: inline;'><label style='color: ghostwhite; font-weight: bold; text-shadow: 2px 2px black;'>";
    hh = "<span id='imgcaptvhex' title='Toggle hex table visibility' style='color:yellow; font-weight:bold; text-shadow: 2px 2px black; cursor:pointer; padding:0 7px 0 5px;'" +
         "onclick='$(\"#streditroot\").toggle($(\"#streditroot\").display);imgcapt.setMessage(\"Toggled hex table visiblity\")'>Hex Table</span>";

    str = "";
    str += "<div id='alog3d-title' style='color: whitesmoke; font-weight: bold; line-height:18px; padding: 2px; text-shadow: 2px 2px black;'>Adventurer's Log Item API Hex Editor UI</div>";
    str += "<hr style='background-color: yellow; margin: 0 2px 5px; width: 280px;' />";
    str += "<input id='imgcaptstring' type='text' style='width:280px;' placeholder='loadoutstring base64' title='Base64 string' onkeydown='if(event.keyCode==13){imgcapt.setstring(this.value);}'/>";
    str += "<input id='imgcaptstringhex' type='text' style='width:280px;' placeholder='loadoutstring hex' title='Hex string' onkeydown='if(event.keyCode==13){imgcapt.setstringhex(this.value);}'/>";
    str += "<div id='imgcaptmes' style='color: yellow; font-weight: bold; line-height:18px; height: 18px; padding: 2px; text-shadow: 2px 2px black;'></div>";
    str += "<div style='display: inline;'>" + hh + sp + "Player: </label><input type='text' maxlength=12 style='width:150px;' placeholder='Player Name' onkeydown='if(event.keyCode==13){imgcapt.setplayer(this.value);}'/></span></div>";
    str += "<div id='imgcaptanims'></div>";
    str += "<div id='stredit' style='background:#333;'></div>";
	str += "<a id='avatarDetails-link' href='http://services.runescape.com/m=adventurers-log/avatardetails.json?details=' target='_blank' style='color:yellow; font-weight:bold; text-shadow: 2px 2px black; cursor:pointer; padding:0 7px 0 5px;')'>View Item API Info (Avatar Details JSON)</a>";
    $(up).insertBefore('#advlog-search');
    root.innerHTML = str;
    document.body.appendChild(root);
    imgcapt.controlel = root;
  };
  imgcapt.printmatrix = function() {
    var str, a, b;
    str = "[\n";
    for (a = 0; a < 4; a++) {
      str += "  ";
      for (b = 0; b < 4; b++) {
        str += imgcapt.verticleMatrix[a * 4 + b].toFixed(1) + ", ";
      }
      str += "\n";
    }
    return str + "]";
  };
  imgcapt.printcam = function() {
    console.log(JSON.stringify(imgcapt.cam));
  };
  imgcapt.setMessage = function(str) {
      document.getElementById("imgcaptmes")
        .innerHTML = str;
  };

  //Conversions
  function binToBase64(str) {
    var a, b, r;
    r = "";
    for (a = 0; a < str.length; a += 6) {
      b = parseInt(str.substr(a, 6), 2) | 0;
      r += chars[b];
    }
    return r;
  }

  function hexToBase64(str) {
    var a, b, r, len;
    str = str.toUpperCase();
    len = str.length;
    str += "000"; //ensure we pad it
    r = "";
    for (a = 0; a < len; a += 3) {
      b = parseInt(str.substr(a, 3), 16);
      r += chars[b >> 6] + chars[b % 64];
    }
    return r;
  }

  function base64ToHex(str) {
    var a, b, r;
    r = "";
    for (a = 0; a < str.length; a += 2) {
      b = chars.indexOf(str[a]) * 64;
      b += chars.indexOf(str[a + 1]);
      r += numToHex(b, 3);
    }
    return r;
  }

  function numToHex(n, length) {
    var a, r;
    r = n.toString(16);
    for (a = r.length; a < length; a++) {
      r = "0" + r;
    }
    return r.slice(-length);
  }

  function numToBin(n, length) {
    var a, r;
    r = n.toString(2);
    for (a = r.length; a < length; a++) {
      r = "0" + r;
    }
    return r;
  }

  //Player information
  loadedStr = "";

  //Color
  function hslToRgb(hsl) {
    var num, rgb, h, s, l;
    num = parseInt(hsl, 16);
    h = num >> 10;
    s = (num >> 7) & 0x7;
    l = num & 0x7f;
    rgb = _hslToRgb(h / 63, s / 7, l / 127);
    return numToHex((rgb[0] << 16) + (rgb[1] << 8) + rgb[2], 6);
  }

  function rgbToHsl(rgb) {
    var num, hsl, r, g, b;
    num = parseInt(rgb, 16);
    r = num >> 16;
    g = (num >> 8) & 0xff;
    b = num & 0xff;
    hsl = _rgbToHsl(r, g, b);
    return numToHex((Math.round(hsl[0] * 63) << 10) + (Math.round(hsl[1] * 7) << 7) + Math.round(hsl[2] * 127), 4);
  }

  function _hslToRgb(h, s, l) {
    var r, g, b;
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      var hue2rgb = function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  function _rgbToHsl(r, g, b) {
      r /= 255, g /= 255, b /= 255;
      var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
      var h, s, l = (max + min) / 2;
      if (max == min) {
        h = s = 0; // achromatic
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }
      return [h, s, l];
    }

  //Library
  function dlpage(url, func, errorfunc) {
      var req;
      req = new XMLHttpRequest();
      if (func) {
        req.onload = function() {
          func(req.responseText);
        };
      }
      if (errorfunc) {
        req.onerror = function() {
          errorfunc();
        };
      }
      req.open("GET", url, true);
      req.send();
    }

}
setTimeout(ab(), 3000);