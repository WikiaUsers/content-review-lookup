/*
    ALog3D Viewer UI
    ALog3D vertical movement, zoom, view NPC's, players and models
    Styles added to pages that will persist.
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
// @name         ALog3D Viewer UI
// @version      1.0.7.7
// @description  Modify ALog3D to move vertically, zoom, view NPC's, players and models
// @author       Skillbert
// @contributor  Cook Me Plox
// @contributor  Ryan M (RyanMakise)
// @homepage     http://runeapps.org/
// @updateURL    http://runescape.wikia.com/wiki/MediaWiki:AL3DUI.js?action=raw
// @match        http://services.runescape.com/m=adventurers-log/*/avatar?searchName=*
// @match        http://services.runescape.com/m=adventurers-log/avatar?searchName=*
// @run-at       document-end
// @grant        none
// ==/UserScript==

/* jshint bitwise: false, funcscope:true, expr:true, -W083, -W089 */
/* globals imgcapt:true, Module:true, curbin:true, binindex:true, chars:true,
   loadedStr:true, byteblock:true, setframecam:true, width:true, height:true, $ */

var binindex, byteblock, chars, curbin, height, imgcapt, loadedStr, setframecam, width;

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

  //Stack Debugging (deprecated)
  imgcapt.stacks = {};
  imgcapt.stackcapt = false;

  //Camera
  imgcapt.overrideCam = true;
  imgcapt.overridecenter = true;
  imgcapt.verticleMatrix = [];
  imgcapt.cam = {
    angle: [0.052, 0.24, 0],
    pos: [0, 0, 560],
    fov: 0.17
  };

  //String editor
  imgcapt.stredit = {};

  //GIF
  imgcapt.anims = {};
  imgcapt.anims.rotate = {
    cam: {
      angle: [0.052, 0.24, 0],
      pos: [0, 0, 560],
      fov: 0.17
    },
    anim: {
      angle: [0, Math.PI * 2, 0],
      pos: [0, 0, 0],
      fov: 0
    },
    startisend: true,
    crop: {
      x: 325,
      y: 50,
      w: 350,
      h: 600
    },
    recordtime: 5400,
    realtime: true
  };
  imgcapt.anims.test = {
    cam: {
      angle: [0, 0, 0],
      pos: [0, 0, 550],
      fov: 0.6
    },
    anim: {
      angle: [0, Math.PI * 2, 0],
      pos: [0, 0, 0],
      fov: 0
    },
    recordtime: 1000,
    realtime: true,
    startisend: true
  };
  imgcapt.anims.idle = {
    cam: {
      angle: [0.052, 0.24, 0],
      pos: [0, 0, 560],
      fov: 0.17
    },
    anim: {
      angle: [0, 0, 0],
      pos: [0, 0, 0],
      fov: 0
    },
    recordtime: 1800,
    recordinterval: 50,
    realtime: true,
    crop: {
      x: 75,
      y: 50,
      w: 350,
      h: 600
    }
  };
  imgcapt.anims.king = {
    cam: {
      angle: [-0.33, 0.38, 0],
      pos: [0, 0, 660],
      fov: 0.96
    },
    anim: {
      angle: [0, Math.PI * 2, 0],
      pos: [0, 0, 0],
      fov: 0
    },
    recordtime: 13200,
    realtime: true,
    startisend: true,
    crop: {
      x: 360,
      y: 200,
      w: 410,
      h: 500
    },
    framesize: [1000, 700]
  };
  imgcapt.makeGif = function(template, format) {
    var cnv, ctx, trans, encoder;
    var addframe, finish, log;
    var framenumber, animended;
    var starttime, intervaltimer, lastframetime, start, lastframeduration;
    if (!format) {
      format = "gif";
    }
    if (!template.crop) {
      template.crop = {
        x: 0,
        y: 0,
        w: imgcapt.el.width,
        h: imgcapt.el.height
      };
    }
    starttime = Date.now();
    trans = 0xFFFFFF;
    animended = false;
    framenumber = 0;
    cnv = document.createElement("canvas");
    ctx = cnv.getContext("2d");
    log = function(t) {
      console.log(new Date()
        .toLocaleTimeString(), t);
    };
    setframecam = function() {
      var camprogress, totalsteps;
      if (!template.realtime) {
        totalsteps = template.frames;
        if (!template.frames || !totalsteps) {
          camprogress = 0;
        } else {
          camprogress = framenumber / totalsteps;
        }
      } else {
        camprogress = (Date.now() - starttime) / template.recordtime;
      }
      imgcapt.cam.angle[0] = template.cam.angle[0] + template.anim.angle[0] * camprogress;
      imgcapt.cam.angle[1] = template.cam.angle[1] + template.anim.angle[1] * camprogress;
      imgcapt.cam.angle[2] = template.cam.angle[2] + template.anim.angle[2] * camprogress;
      imgcapt.cam.pos[0] = template.cam.pos[0] + template.anim.pos[0] * camprogress;
      imgcapt.cam.pos[1] = template.cam.pos[1] + template.anim.pos[1] * camprogress;
      imgcapt.cam.pos[2] = template.cam.pos[2] + template.anim.pos[2] * camprogress;
      imgcapt.cam.fov = template.cam.fov + template.anim.fov * camprogress;
      imgcapt.setCam();
    };
    finish = function() {
      var url;
      log("finished - " + (Date.now() - starttime) + "ms");
      animended = true;
      if (format == "gif") {
        encoder.finish();
        url = "data:image/gif;base64," + btoa(encoder.stream()
          .getData());
      }
      if (url) {
        window.open(url);
      }
    };
    addframe = function() {
      var islastframe, frametime;
      if (animended) {
        return;
      }
      //check if this is last frame
      islastframe = false;
      if (template.frames) {
        if (framenumber >= template.frames - 1) {
          islastframe = true;
        }
      } else if (template.recordtime) {
        if (Date.now() + lastframeduration * (template.startisend ? 0.5 : -0.5) > starttime + template.recordtime) {
          islastframe = true;
        }
      }
      //make sure the image is drawn if on timer
      if (template.recordinterval) {
        if (islastframe) {
          clearInterval(intervaltimer);
        }
      }
      //Get the frame duration
      if (template.realtime) {
        frametime = Date.now() - lastframetime;
      } else {
        frametime = template.interval;
      }
      //Copy frame
      cnv.width = template.crop.w;
      cnv.height = template.crop.h;
      ctx.fillStyle = "#" + numToHex(trans, 6);
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(imgcapt.el, -template.crop.x, -template.crop.y);
      //Finish if done
      log("frame finished: " + framenumber + ", frametime: " + (Date.now() - lastframetime));
      lastframeduration = Date.now() - lastframetime;
      lastframetime = Date.now();
      if (islastframe) {
        finish();
        return;
      }
      //Start next frame
      framenumber++;
      setframecam();
    };
    start = function() {
      lastframeduration = 0;
      lastframetime = Date.now();
      setframecam();
      if (template.recordinterval) {
        intervaltimer = setInterval(addframe, template.recordinterval);
      } else {
        addframe();
      }
    };
    width = imgcapt.el.width;
    height = imgcapt.el.height;
    start();
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
      if (obj.read(1) !== 0) { //is equiped
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
          n: "C." + slotnames[len - b],
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
          n: "Data 1", //Model ID Goes here
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
      if (flags && 0x4) {
        parts.splice(++index, 0, {
          n: "Type",
          parse: parsecol
        });
      }
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

  imgcapt.setSize = function(w, h) {
    Module.setCanvasSize(w, h);
  };
  imgcapt.stackstart = function() {
    imgcapt.stacks = {};
    imgcapt.stackcapt = true;
  };
  imgcapt.stackend = function() {
    imgcapt.stackcapt = false;
    console.log(imgcapt.stacks);
  };
  imgcapt.getUrlForWorker = function(bodyString) {
    //Convert JS string into a URL to run a web worker from. Allows cross-domain worker injection.
    var blob = new Blob([bodyString], {
      type: 'text/javascript'
    }); //Pass a useful mime type here
    return URL.createObjectURL(blob);
  };
  imgcapt.getImg = function() {
    imgcapt.saveCnv.width = imgcapt.uploadcrop.w;
    imgcapt.saveCnv.height = imgcapt.uploadcrop.h;
    imgcapt.saveCtx.drawImage(imgcapt.el, -imgcapt.uploadcrop.x, -imgcapt.uploadcrop.y);
    return imgcapt.saveCnv.toDataURL("image/png");
  };
  imgcapt.displayImg = function() {
    var cnv, ctx;
    cnv = document.createElement("canvas");
    cnv.width = imgcapt.el.width;
    cnv.height = imgcapt.el.height;
    ctx = cnv.getContext("2d");
    ctx.drawImage(imgcapt.el, 0, 0);
    window.open(cnv.toDataURL("image/png"));
  };

  //Start
  imgcapt.start = setTimeout(function() {
    console.clear();
    //Log ASM events
    Module.addOnInit(function() {
      console.log("init");
    });
    Module.addOnPreRun(function() {
      console.log("prerun");
    });
    Module.addOnPreMain(function() {
      console.log("premain");
    });
    Module.addOnPostRun(function() {
      console.log("postrun");
    });
    Module.addOnExit(function() {
      console.log("exit");
    });
    imgcapt.el = document.getElementById("canvas");
    imgcapt.captCnv = document.createElement("canvas");
    imgcapt.captCtx = imgcapt.captCnv.getContext("2d");
    imgcapt.saveCnv = document.createElement("canvas");
    imgcapt.saveCtx = imgcapt.saveCnv.getContext("2d");
    if (imgcapt.firstLoad) {
      imgcapt.overrideContext();
    }
    imgcapt.overrideCam();
    imgcapt.controlPanel();
    imgcapt.setCam();
    document.location.search.replace(/searchName=([\w%_]+)(\&|$)/, function(a, b) {
      imgcapt.setplayer(b);
    });
  }, 3000);
  imgcapt.overrideContext = function() {
    imgcapt.oldGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(type, args) {
      if (type == "webgl") {
        args.preserveDrawingBuffer = true;
        console.log("Webgl context created.");
      }
      return imgcapt.oldGetContext.apply(this, arguments);
    };
  };
  imgcapt.overrideCam = function() {
    imgcapt.oldUniformMatrix4fv = imgcapt.oldUniformMatrix4fv || WebGLRenderingContext.prototype.uniformMatrix4fv;
    WebGLRenderingContext.prototype.uniformMatrix4fv = function() {
      if (imgcapt.overrideCam) {
        //Override 3D rasterizer
        if (imgcapt.overrideCam && arguments[2][0] != 1) {
          for (var a = 0; a < 16; a++) {
            arguments[2][a] = imgcapt.verticleMatrix[a];
          }
        } else {
          //Vertical lock
          if (imgcapt.overridecenter && arguments[2][13] < -200) {
            arguments[2][13] = -400;
          }
        }
        //Begin detection stacks
        if (imgcapt.stackcapt) {
          var stack = new Error()
            .stack;
          var stackstr = "";
          stack.replace(/:(\d+:\d+)\)/g, function(a, b) {
            stackstr += b + " - ";
          });
          if (!imgcapt.stacks[stackstr]) {
            imgcapt.stacks[stackstr] = {};
          }
          var arstr = "";
          for (a = 0; a < 16; a++) {
            arstr += arguments[2][a].toFixed(1) + ",";
          }
          if (!imgcapt.stacks[stackstr][arstr]) {
            imgcapt.stacks[stackstr][arstr] = 0;
          }
          imgcapt.stacks[stackstr][arstr]++;
        }
        //End detection stacks
      }
      imgcapt.oldUniformMatrix4fv.apply(this, arguments);
    };
  };
  
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
    console.log("Upload done.");
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
        imgcapt.setMessage("Loaded player: " + player);
        console.log('Avatar Details (Item API): ' + 'http://services.runescape.com/m=adventurers-log/avatardetails.json?details=' + t);
      }
      imgcapt.setstring(t);
    });
  };
  imgcapt.setNpc = function(id) {
        var str;
        str = "00ffff" + numToHex(+id, 4) + "000000000000000000000000000000000000000000ffff0";
        str = hexToBase64(str);
        callString(str);
        imgcapt.setMessage("Loaded NPC: " + id);
        imgcapt.setstring(str);
        $("#streditroot").remove();
  };
  imgcapt.setmodel = function (n) {
    var index = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*-";
    n = n * 4;
    var model = index.charAt(~~(n / 262144)) + index.charAt(~~((n % 262144) / 4096)) + index.charAt(~~((n % 4096) / 64)) + index.charAt(~~((n % 64) / 1));
    imgcapt.setMessage("Model (string): " + n / 4 + " (" + model + ")");
    Module.avatar.module.ccall("SetAppearance", "void", ["string"], ['AEABQAFAAUABQAFAAUABQAFAAUABQAFAAUABnHoAACAAAYA' + model + 'eAASMyDDcQAwAADAAAAAqL']);
    imgcapt.setstring("AEABQAFAAUABQAFAAUABQAFAAUABQAFAAUABnHoAACAAAYA" + model + "eAASMyDDcQAwAADAAAAAqL");
    $("#streditroot").remove();
  };
  imgcapt.setAnim = function(id) {
    Module.avatar.SetAnimID(+id);
    if (id === undefined){
      Module.avatar.SetAnimID(0);
    }
  };
  imgcapt.setstring = function(str) {
    Module.ccall("SetAppearance", "void", ["string"], [str]);
    imgcapt.currentStr = str;
    document.getElementById("imgcaptstring")
      .value = str;
    document.getElementById("imgcaptstringhex")
      .value = base64ToHex(str);
    imgcapt.drawstr(str);
    $('#avatarDetails-link').attr('href', 'avatardetails.json?details=' + str);
    var avatarAjax = $.ajax({
      type: 'GET',
      url: ('http://services.runescape.com/m=adventurers-log/avatardetails.json?details=' + str),
      async: false,
      contentType: "application/json",
      dataType: "jsonp",
    }).responseText;
    $('#avatarDetails-json textarea').text(avatarAjax);
	$('#avatarDetails-json textarea:contains("400 - Bad request")').text('No viewable information.');
    $('#avatarDetails-json textarea:contains("{}")').text('No viewable information.');
  };
  imgcapt.setstringbin = function(str) {
    imgcapt.setstring(binToBase64(str));
  };
  imgcapt.setstringhex = function(str) {
    imgcapt.setstring(hexToBase64(str));
  };

  function dlpagepost(url, data, func, errorfunc) {
      var req, post, a, b;
      if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
      }
      if (func) {
        req.onload = function() {
          func(req.responseText);
        };
      }
      if (errorfunc) {
        req.onerror = errorfunc;
      }
      post = "";
      b = "";
      for (a in data) {
        post += b + encodeURIComponent(a) + "=" + encodeURIComponent(data[a]);
        b = "&";
      }
      req.open("POST", url, true);
      req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      req.send(post);
    }

  //Math
  function vmpr(v, m) { //Vector-matrix product
    var a, b, r, vl;
    r = [];
    vl = v.length;
    for (a = 0; a < vl; a++) {
      r[a] = 0;
      for (b = 0; b * vl < m.length; b++) {
        r[a] += v[b] * m[a + b * vl];
      }
    }
    return r;
  }

  function mmpr(m1, m2) {
    var a, b, c, size, r;
    size = Math.sqrt(m1.length);
    r = [];
    for (b = 0; b < size; b++) {
      for (a = 0; a < size; a++) {
        r[a + size * b] = 0;
        for (c = 0; c < size; c++) {
          r[a + size * b] += m1[c + size * b] * m2[a + size * c];
        }
      }
    }
    return r;
  }

  imgcapt.setCam = function(camobj) {
    var tr1, tr2, tr3, r, initial, aspect;
    var aa, ab, ac, x, y, z;
    if (camobj) {
      aa = camobj.angle[0];
      ab = camobj.angle[1];
      ac = camobj.angle[2];
      x = camobj.pos[0];
      y = camobj.pos[1];
      z = camobj.pos[2];
      imgcapt.fov = camobj.fov;
    } else {
      aa = imgcapt.cam.angle[0];
      ab = imgcapt.cam.angle[1];
      ac = imgcapt.cam.angle[2];
      x = imgcapt.cam.pos[0];
      y = imgcapt.cam.pos[1];
      z = imgcapt.cam.pos[2];
    }
    imgcapt.cam.angle = [aa, ab, ac];
    imgcapt.cam.pos = [x, y, z];
    initial = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ];
    tr1 = [1, 0, 0, 0, 0, Math.cos(aa), -Math.sin(aa), 0, 0, Math.sin(aa), Math.cos(aa), 0, 0, 0, 0, 1];
    tr2 = [Math.cos(ab), 0, Math.sin(ab), 0, 0, 1, 0, 0, -Math.sin(ab), 0, Math.cos(ab), 0, 0, 0, 0, 1];
    tr3 = [Math.cos(ac), -Math.sin(ac), 0, 0, Math.sin(ac), Math.cos(ac), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    r = mmpr(mmpr(mmpr(initial, tr2), tr1), tr3);
    aspect = imgcapt.el.height / imgcapt.el.width;
    //Fix aspect ratio, scale x
    r[0] *= aspect;
    r[4] *= aspect;
    r[8] *= aspect;
    r[3] = r[2] * imgcapt.cam.fov;
    r[7] = r[6] * imgcapt.cam.fov;
    r[11] = r[10] * imgcapt.cam.fov;
    r[12] = x;
    r[13] = y;
    r[14] = 200;
    r[15] = z;
    imgcapt.verticleMatrix = r;
    return r;
  };
  imgcapt.controlPanel = function() {
    if (imgcapt.controlel) {
      imgcapt.controlel.remove();
    }
    var a, root, str, funcs, sp, di, db, re, rc, orc, hh;
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
    //override previous funcs
    if (imgcapt.controlfuncs) {
      imgcapt.el.removeEventListener("mousedown", imgcapt.controlfuncs.mousedown);
      imgcapt.el.removeEventListener("mouseup", imgcapt.controlfuncs.mouseup);
      imgcapt.el.removeEventListener("mousemove", imgcapt.controlfuncs.mousemove);
      imgcapt.el.removeEventListener("mousewheel", imgcapt.controlfuncs.mousewheel);
    }
    funcs = {
      mousemove: function(e) {
        e.preventDefault();
        if (root.dragstart) {
          imgcapt.cam.angle = [
            (e.offsetY - root.dragstart[0]) * Math.PI / 180 + root.dragstartangle[0], (e.offsetX - root.dragstart[1]) * Math.PI / 180 + root.dragstartangle[1],
            imgcapt.cam.angle[2]
          ];
          imgcapt.setCam();
        }
      },
      mousedown: function(e) {
        e.preventDefault();
        root.dragstart = [e.offsetY, e.offsetX, 0];
        root.dragstartangle = [imgcapt.cam.angle[0], imgcapt.cam.angle[1], imgcapt.cam.angle[2]];
        e.preventDefault();
      },
      mouseup: function(e) {
        e.preventDefault();
        root.dragstart = false;
      },
      mousewheel: function(e) {
        imgcapt.cam.pos[2] += e.deltaY;
        imgcapt.setCam();
      },
      DOMMouseScroll: function(e) {
        imgcapt.cam.pos[2] += (e.detail) * 10;
        imgcapt.setCam();
      }
    };
    for (a in imgcapt.controlfuncs) {
      imgcapt.el.removeEventListener(a, imgcapt.controlfuncs[a], true);
    }
    for (a in funcs) {
      imgcapt.el.addEventListener(a, funcs[a], true);
    }
    imgcapt.controlfuncs = funcs;

    str = "";
    sp = "<span style='display: inline;'><label style='color: ghostwhite; font-weight: bold; text-shadow: 2px 2px black;'>";
    re = '$("#3d-yaxis").val(0);$("#3d-xaxis").val(0);imgcapt.cam.pos[0]=0;imgcapt.cam.pos[1]=0;imgcapt.cam.pos[2]=560;imgcapt.cam.angle[0]=0.05;imgcapt.cam.angle[1]=0.25;imgcapt.setCam();imgcapt.setMessage("Default camera position");';
    rc = "<div id='3d-reset' title='Reset camera to original position' style='color:yellow; font-weight:bold; text-shadow: 2px 2px black;'><span style='cursor:pointer; padding:0 34px 0 5px' onclick='" + re + "'>Reset</span>";
    di = '$("#3d-yaxis").val(0);$("#3d-xaxis").val(0);imgcapt.cam.pos[0]=0;imgcapt.cam.pos[1]=0;imgcapt.cam.pos[2]=560;imgcapt.cam.angle[0]=1.5;imgcapt.cam.angle[1]=0;imgcapt.setCam();imgcapt.setMessage("Detailed item image position (top-down)");';
    db = "<div id='3d-dii' title='Set the camera to top-down view' style='color:yellow; font-weight:bold; text-shadow: 2px 2px black;'><span style='cursor:pointer; padding:0 34px 0 5px' onclick='" + di + "'>Detail</span>";
    orc = "<span title='Toggle Y-Axis center point override' style='color:" + (imgcapt.overridecenter ? "lime" : "red") + "; cursor:pointer; height:20px; font-weight:bold; padding: 0 17px 0 5px; text-shadow: 2px 2px black;'" + 
          "onclick='imgcapt.overridecenter=!imgcapt.overridecenter; this.style.color=(imgcapt.overridecenter?\"lime\":\"red\");imgcapt.setMessage((imgcapt.overridecenter?\"Override Center: On\":\"Override Center: Off\"))'>Center Y</span>";
    hh = "<span id='imgcaptvhex' title='Toggle hex table visibility' style='color:yellow; font-weight:bold; text-shadow: 2px 2px black; cursor:pointer; padding:0 7px 0 5px;'" +
         "onclick='$(\"#streditroot\").toggle($(\"#streditroot\").display);imgcapt.setMessage(\"Toggled hex table visiblity\")'>Hex Table</span>";

    str = "";
    str += "<div id='alog3d-title' style='color: whitesmoke; font-weight: bold; line-height:18px; padding: 2px; text-shadow: 2px 2px black;'>Adventurer's Log 3D Character Viewer UI</div>";
    str += "<hr style='background-color: yellow; margin: 0 2px 5px; width: 280px;' />";
    str += "<input id='imgcaptstring' type='text' style='width:280px;' placeholder='loadoutstring base64' title='Base64 string' onkeydown='if(event.keyCode==13){imgcapt.setstring(this.value);}'/>";
    str += "<input id='imgcaptstringhex' type='text' style='width:280px;' placeholder='loadoutstring hex' title='Hex string' onkeydown='if(event.keyCode==13){imgcapt.setstringhex(this.value);}'/>";
    str += "<div id='imgcaptmes' style='color: yellow; font-weight: bold; line-height:18px; height: 18px; padding: 2px; text-shadow: 2px 2px black;'></div>";
    str += "<div style='display: inline;'>" + hh + sp + "Player: </label><input type='text' maxlength=12 style='width:150px;' placeholder='Player Name' onkeydown='if(event.keyCode==13){imgcapt.setplayer(this.value);}'/></span></div>";
    str += "<div style='display: inline;'>" + orc + sp + "Model: </label><input type='number' min=0 max=250000 style='width:150px;' placeholder='Model (Number)' onkeydown='if(event.keyCode==13){imgcapt.setmodel(this.value);}'/></span></div>";
    str += "<div style='display: inline;'>" + sp + "Anim: </label><input type='number' min=0 max=50000 style='width:150px;' placeholder='Animation ID (Number)' onkeydown='if(event.keyCode==13){imgcapt.setAnim(this.value);}'/></span></div>";
    str += "<div style='display: inline;'>" + sp + "NPC: </label><input type='number' min=0 max=50000 style='width:150px;' placeholder='NPC ID (Number)' onkeydown='if(event.keyCode==13){imgcapt.setNpc(this.value);}'/></span></div>";
    str += db + sp + "X-Axis: </label><input type='range' value='" + imgcapt.cam.pos[0] + "' min='-600' max='600' step='5' style='width:150px;' oninput='imgcapt.cam.pos[0]=this.value; imgcapt.setCam();' id='3d-xaxis'/></span></div>";
    str += rc + sp + "Y-Axis: </label><input type='range' value='" + imgcapt.cam.pos[1] + "' min='-600' max='600' step='5' style='width:150px;' oninput='imgcapt.cam.pos[1]=this.value; imgcapt.setCam();' id='3d-yaxis'/></span></div>";
    str += "<div id='imgcaptanims'></div>";
    str += "<div id='stredit' style='background:#333;'></div>";
    str += "<hr style='background-color: yellow; margin: 0 2px 5px; width: 280px;' />";
    str += "<a id='avatarDetails-link' href='http://services.runescape.com/m=adventurers-log/avatardetails.json?details=' target='_blank' style='color:whitesmoke; font-weight:bold; line-height:18px; text-shadow: 2px 2px black; cursor:pointer; padding:0 7px 0 5px;')'>View Item API Info (Avatar Details JSON)</a>";
	str += "<div id='avatarDetails-json' style='height:54px; width:285px;'><textarea style='height:85px; width:280px; max-height:85px; max-width:280px;'></textarea></div>";
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

  // String detect / API calls
  function callString(str) {
    Module.ccall("SetAppearance", "void", ["string"], [str]);
  }

  function callHex(str) {
    callString(hexToBase64(str));
  }

  function callBin(str) {
    callString(binToBase64(str));
  }

  function callEquip(itemlist) {
      var a, b, str;
      str = "1";
      for (a = 0; a < 19; a++) {
        if (itemlist[a] !== undefined) {
          b = itemlist[a] + 1 << 14;
        } else {
          b = 0;
        }
        str += numToBin(b, 16);
      }
      str += "000000000000000000001001100000111000001110100011000000100000001000000000000000000000000000000000000010101001010000000000000000000000000000";
      callBin(str);
      console.log(str);
    }

  //Binary
  function flipbit(index) {
    curbin = curbin.substr(0, index) + (curbin[index] == "1" ? "0" : "1") + curbin.substr(index + 1);
    callBin(curbin);
  }
  binindex = 0;

  function flipnext() {
    flipbit(binindex);
    binindex++;
    return (binindex - 1)
      .toString(8);
  }

  function flipcurrent() {
      flipbit(binindex - 1);
      return (binindex - 1)
        .toString(8);
    }

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

  function base64ToBin(str) {
    var a, b, r;
    r = "";
    for (a = 0; a < str.length; a++) {
      b = chars.indexOf(str[a]);
      r += numToBin(b, 6);
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

  function loadphex(player) {
    dlpage("http://services.runescape.com/m=avatar-rs/" + encodeURIComponent(player) + "/appearance.dat", function(t) {
      if (t.indexOf(" ") != -1) {
        return;
      }
      var hex = base64ToHex(t);
      console.log(hex);
      loadedStr = hex;
      callHex(hex);
    });
  }

  function loadpbin(player) {
    dlpage("http://services.runescape.com/m=avatar-rs/" + encodeURIComponent(player) + "/appearance.dat", function(t) {
      if (t.indexOf(" ") != -1) {
        return;
      }
      var bin = base64ToBin(t);
      console.log(bin);
      loadedStr = bin;
      callBin(bin);
    });
  }

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

  //Other
  function scanmem(str) {
    var a, b, r;
    r = [];
    for (a = 0; a < Module.HEAP8.length; a++) {
      if (a % 10000000 === 0) {
        console.log("memscan:", a);
      }
      for (b = 0; b < str.length; b++) {
        if (Module.HEAP8[a + b] != str.charCodeAt(b)) {
          break;
        }
      }
      if (b == str.length) {
        r.push(a);
      }
    }
    console.log(r);
  }

  function testwithmem(str) {
    callString(str);
    scanmem(str);
  }

  function escapeHtml(unsafe) {
    return unsafe.replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
  
  function test(){
    vmpr();
    callEquip();
    flipnext();
    flipcurrent();
    loadphex();
    loadpbin();
    testwithmem();
    escapeHtml();
  }
}
setTimeout(ab(), 3000);