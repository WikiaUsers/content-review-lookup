// Wiki user script to help maintain {{familytree}} or {{chart}}
// boxes-and-lines diagrams, by allowing you to edit the diagram
// in a simpler and more standard ASCII art format.
// Greg Ubben, 1 Dec 2008
//
// To install, add:   importScript("User:GregU/familytree.js");
// to your vector.js (or monobook.js) page.  This adds an option
// to the toolbox menu when editing familytrees.
//
// IE may work better than Firefox since it supports typeover mode.
//
// TODO:
// - Anything we can do to improve [[WP:ACCESSIBILITY]]
// - Some smarts with border/boxstyle
//
// Advanced ideas:
// - Draw line between start and end of selection
// - Cut/copy/paste rectangular selections (no existing library??)
//   - include overwrite/typeover mode emulation for Firefox
// - Java GUI version where you drag boxes and lines on a grid

addOnloadHook (function() {      // wraps entire script

var Summary  = "Edited {{%s}} using [[User:GregU/familytree.js|familytree.js]]";
var Special  = [ "border", "boxstyle", "colspan", "rowspan" ];
var Template;            // familytree or chart ?
var Style    = null;
var Center   = 40;       // center small diagrams on this column
var Maxwidth = 80;
var Picky    = 0;        // complain instead of self-correct?
var rows;
var boxes;


//  Add/replace convert option at top of toolbox menu on sidebar.
//
function update_menu (item)
{
    var node = document.getElementById("t-diagram");
    if (node)
        node.parentNode.removeChild(node);

    node = document.getElementById("t-whatlinkshere");

    if (item == "wiki2art")
        addPortletLink ("p-tb", "javascript:wiki2art()",
                        "Templates → Art", "t-diagram",
           "Convert {{" + Template + "}}... to ASCII art", "", node);

    if (item == "art2wiki")
        addPortletLink ("p-tb", "javascript:art2wiki()",
                        "Art → Templates", "t-diagram",
           "Convert ASCII art back to {{" + Template + "}}...", "", node);
}

function wiki2art()
{
    try {
        Style = null;
        var textarea = document.editform.wpTextbox1;
        var scroll_pos = textarea.scrollTop;
        var pattern = /\{\{(familytree|chart)\/start[\S\s]*?\{\{\w+\/end}}/ig;

        textarea.value = textarea.value.replace(pattern, wiki2art_replace);
        textarea.setAttribute("wrap", "off");
        // work around problem with Firefox ignoring wrap (bug 302710)
        textarea.style.display = "block";
        textarea.scrollTop = scroll_pos;      // Mozilla only?
        update_menu ("art2wiki");
        document.editform.wpSave.disabled = true;
    }
    catch (e) {
        alert ("Could not convert to ASCII art because:\n\n" + e);
    }
}

function wiki2art_replace (text, tmpl)
{
    var rows  = [];
    var parts = {};

    if (text.indexOf("\n") == -1)
        return text;                // don't convert a 1-line legend

    //  Sanity check, if non-empty but no lines begin with {{.
    //
    if (text.search(/\n\s*\{\{.*\n/)   == -1 &&
        text.search(/\n\s*[^\s<].*\n/) != -1) {
            toss ("Out of sync; looks like this already is art.");
            return text;
    }

    Template = tmpl.toLowerCase();
    Maxwidth = (Template == "chart" ? 50 : 80);
    Style    = Style || new MarkupStyle(text);

    parse_templates (text, rows);
    var start = "{{" + rows.shift().join("|") + "}}\n";
    var end   = "{{" + rows.pop().join("|")   + "}}";
    
    layout_tiles (rows, parts);
    var art = pad_text( touchup( parts.art ));

    var width = art.indexOf("\n") / 2;
    width = (width > 50 && Maxwidth > 50) ? Maxwidth : 50;

    var ruler = Array(11).join("0-1-2-3-4-5-6-7-8-9-")
                         .slice(0, width*2-1);

    return start + "\n" + ruler + "\n" + art +
           "\n" + parts.list + "\n" + end;
}

//  Remember markup spacing styles based on first occurrences.
//  So to change the markup style, just change the first one
//  then toggle twice to "refresh".
//
function MarkupStyle (text)
{
    this.initial = "";
    this.lead    = " ";
    this.equal   = "=";

    var res;
    text = text || "";
    text = text.replace(/^.*\n/, "");   // strip {{familytree/start}}

    res = text.match(/\w( *)\|/);
    if (res) {
        this.initial = res[1];   // space after template name?
    }
    res = text.match(/\|(\s*)\w{2,5}(\s*=\s*)[^\s=|}]/);
    if (res) {
        this.lead  = res[1];     // params indented on new lines?
        this.equal = res[2];
    }
    this.trail = (/\n/.test(this.lead) ? " " : "");
    this.trim  = (text.search(/\| \| (\|?}}|\|\s*\w+\s*=)/) == -1);

    this.param = function(name,value) {
        return this.lead + name + this.equal + value + this.trail;
    }
}

//  Parse textual series of {{familytree|...|...}} templates
//  into a list of parameter lists. The parameters can contain
//  arbitrarily complex nested wiki syntax like [[foo|bar]] and
//  {{foo|bar|{{{1|baz}}}}} but this simple strategy of just
//  counting double brackets and braces should be good enough.
//
function parse_templates (text, rows)
{
    var pattern = /([[\]{}])\1|\||<!--[\S\s]*?-->|<nowiki>[\S\s]*?<\/nowiki>/ig;
    var level = 0;
    var row, start, res;

    while ((res = pattern.exec(text)) != null) {
        if (res[1]) {
            (res[1]=="[" || res[1]=="{") ? level++ : level--;
        }
        if (res[0] == "{{" && level == 1) {
            row   = [];
            start = res.index + 2;
        }
        if (res[0] == "|" && level == 1) {
            row.push(text.slice(start, res.index));
            start = res.index + 1;
        }
        if (res[0] == "}}" && level == 0) {
            row.push(text.slice(start, res.index));
            rows.push(row);
        }
    }
    if (level != 0)
        throw "Mismatched {{...}} or [[...]]";
}

function layout_tiles (rows, parts)
{
    var art     = "";
    var params  = {};
    var order   = [];
    var specpat = new RegExp("^((" + Special.join("|") + ")_)\\s*(\\S.*)" );


    //  Tweak name so it is valid (matches namepat from map_boxes()
    //  and is 2 to 5 characters long) and so it is unique if the
    //  same name is used on several templates with different values.
    //  Then store it in params{} and order[].
    //
    //  Could remember mappings in another hash, and change
    //  back to original name on output (if original name not
    //  already used on line).  Probably best not to though.
    //
    function goodname (name, value)
    {
        var res, prefix="", nn;

        if (res = name.match(specpat)) {
            prefix = res[1];
            name   = res[3];
        }
        nn = alias[name];
        if (!nn) {             // first encounter on this template
            nn = name;
            if (nn.search(/\w.*\w/) == -1 && value.search(/\w.*\w/) > -1)
                nn = value.toUpperCase();
            nn = nn.replace( /[^\w.\/&]/g,               "_");
            nn = nn.replace( /_*([\W_])[\W_]*/g,        "$1");
            nn = nn.replace( /^[\W_]*(.{0,4}[^\W_]).*/, "$1");
            nn = nn.replace( /^.?$/,                    "A0001");

            var base = nn;
            var num  = 1;
            while (nn in params && (params[nn] != value || prefix)) {
                num++;
                nn = base.slice(0, 5 - String(num).length) + num;
            }
            alias[name] = nn;
        }
        nn = prefix + nn;

        if (! (nn in params)) {
            order.push(nn);
            params[nn] = value;
        }
        return nn;
    }

    //   FRANKLIN = Benjamin Franklin    FRANK
    //   FRANKLIN = Frank N. Furter      FRAN2    boxstyle_FRANKLIN = red
    //   FRANKLIN = Franklin Richards    FRAN3
    //   FRANKLIN = Frank N. Furter               boxstyle_FRANKLIN = blue


    for (var r=0; r < rows.length; r++) {
        var row   = rows[r];
        var seen  = {};
        var alias = {};     // mapped to different name on this row?

        if (row[0].search(/^\s*(familytree|chart)\s*$/i) == -1)
            throw "Unrecognized template {{" + row[0] + "}}";

        for (var i=0; i < Special.length; i++)
            alias[Special[i]] = Special[i];    // don't truncate boxstyle

        //  Pass 1:  Do only the assignments first, because if the
        //  same parameter name is used on a previous row with a
        //  different value, then we need to rename this parameter
        //  and its boxes before they are output.
        //
        for (var c=1; c < row.length; c++)
        {
            var cell = row[c];
            var i    = cell.indexOf("=");

            if (i < 0 || cell == "=")
                continue;

            var name  = trim(cell.slice(0,i));
            var value = trim(cell.slice(i+1));

            if (value.indexOf("\n") >= 0)
                toss ('Parameter "' + name + '" spans multiple lines.');
            value = value.replace(/\n\s*/g, " ");

            if (seen[name] && value != seen[name])
                throw 'Parameter "' + name + '" has multiple values on template ' + (r+1);
            seen[name] = value;

            goodname(name, value);
        }

        //  Pass 2:  Now layout the tiles and boxes.
        //
        for (var c=1; c < row.length; c++)
        {
            var cell = trim(row[c]);

            if (istile(cell) && ! (cell in seen))
            {
                art += pad(cell, 2);
            }
            else if (cell.indexOf("=") == -1)        // it's a BOX
            {
                cell = goodname(cell, cell.replace(/_/g, " ")).slice(0,5);

                // Don't adjoin a {{chart}} wide cell if can avoid
                if (cell.length == 4 && /\w$/.test(art))
                    cell = " " + cell;

                art += ("  "+cell+"   ").substr(cell.length/2, 6);
            }
        }
        art += "\n";
    }

    // list the parameter values, one per line
    // TODO:  Styles referenced via [1], [2], etc

    var param_width = 5;
    for (var name in params)
        if (name.length > 8)
            param_width = 14;       // any boxstyle_FOO ?

    var param_list = "";
    while (name = order.shift()) {
        param_list += pad(name, param_width) + " = " + (params[name] || "") + "\n";
    }

    parts.art  = art;
    parts.list = param_list;
}

//  Make the art more readable by converting some symbols.
//  Mainly just fills in --- and ~~~ horizontal lines for now.
//  1.  Fill in a ~ tile followed by a ~ tile or a box
//  2.  Fill in a box    followed by a ~ tile
//  TOM  - v -  SUE    becomes    TOM ---v--- SUE
//
function touchup (art)
{
    art = art.replace( /!/g, "|");
    art = art.replace( /([,`^)}*+-]|\b[Xadijqrv]) (?=[.'^({*+-]|[acijlqrv]| ?\w\w)/g, "$1-");
    art = art.replace( /([~%#\]]|\b[ADFLVfhy]) (?=[~%#[]|[7ACJKVXehy]| ?\w\w)/g,      "$1~");
    art = art.replace( /(\w\w ? ?) (?=[.'^({*+-]|[acijlqrv]\b)/g, "$1-");
    art = art.replace( /(\w\w ? ?) (?=[~%#[]|[7ACJKVXehy]\b)/g,   "$1~");
    art = art.replace( /(\w\w ) (-|~)/g, "$1$2$2");
    return art;
}

//  Trim and pad a multi-line diagram with spaces to its maximum
//  width, adding a margin on both sides and a 1-line padded
//  margin above and below.  Also tweaks the alignment if most
//  of the alignment indicators are mis-aligned on odd.
//  If margin is not given (wiki2art), it depends on the width.
//
function pad_text (text, margin)
{
    // trim trailing spaces and leading and trailing lines
    text = text.replace(/\t/g, "        ");    // just in case
    text = text.replace(/ *\r*$/mg, "");
    text = text.replace(/^\n*/, "\n");
    text = text.replace(/\n*$/, "\n");

    // trim indentation if not empty
    while (text.search(/(^|\n).?\S|^\s*$/) == -1) {
        text = text.replace(/^  /mg, "");
    }
    var rows  = text.split("\n");
    var width = 0;
    var align = 0;
    var alignpat = /[^\w\s=~&\/\[\].-]|[A-Z0-9]+([\/&._]?[A-Z0-9])+/ig;
    var res;

    for (var i=0; i < rows.length; i++) {
        width = Math.max(width, rows[i].length);

        //  Are majority of alignment indicators on odd or even?
        //
        while ((res = alignpat.exec(rows[i])) != null) {
            var len = res[0].length;
            if (len % 2)              // even boxes are ambiguous
                ((res.index + len/2) & 1) ? align-- : align++;
        }
    }

    //  If formatting for display, center diagram on column 40, but
    //  at least a 4-cell left margin unless close to max width.
    //  The margin gives room to draw another box on the left, and
    //  you can then toggle view twice to indent another 4 cells.
    //
    if (margin == null) {
        margin = Center - width / 2;
        margin = Math.max(margin & ~1, 8);
        if (width/2 + margin > Maxwidth)
            margin = 0;
    }
    else if (align < 0)
        margin++;

    margin = pad("", margin);
    text   = "";

    for (var i=0; i < rows.length; i++) {
        text += margin + pad(rows[i], width) + margin + "\n";
    }
    return text;
}

//  Pad str with spaces on right to width len, but don't truncate.
//
function pad (str, len)
{
    if (str.length < len)
        str += Array(len - str.length + 1).join(" ");
    return str;
}

function trim (str)
{
    return str.replace(/^\s+|\s+$/g, "");
}


function art2wiki()
{
    try {
        var textarea = document.editform.wpTextbox1;
        var scroll_pos = textarea.scrollTop;
        var pattern = /\{\{(familytree|chart)\/start[\S\s]*?\{\{\w+\/end}}/ig;

        textarea.value = textarea.value.replace(pattern, art2wiki_replace);
        textarea.removeAttribute("wrap");
        textarea.style.display = "inline";    // Firefox work-around
        textarea.scrollTop = scroll_pos;      // Firefox only?

        document.editform.wpSave.disabled = false;
        update_menu ("wiki2art");
        if (document.editform.wpSummary.value.search(/^(\/\* .* \*\/)? *$/) == 0)
            document.editform.wpSummary.value += Summary.replace("%s", Template);
    }
    catch (e) {
        alert ("Could not convert ASCII art because:\n\n" + e);
    }
}

function art2wiki_replace (text, tmpl)
{
    var label      = {};
    var param_rows = [];

    Template = tmpl.toLowerCase();
    rows     = [];
    boxes    = [];

    if (text.indexOf("\n") == -1)
        return text;                // don't convert a 1-line legend

    //  Sanity check, if any lines begin with {{...
    //
    if (text.search(/\n\s*\{\{.*\n/) != -1) {
        toss ("Out of sync; looks like this already is wikitext.");
        return text;
    }

    var res = text.match(/^(.*}})([\S\s]*)\{\{/);
    if (res == null)
        throw "Didn't find end of /start tag on same line";

    parse_art (res[2], label,rows);
    map_boxes (rows, boxes);
    map_tiles (boxes,rows, param_rows);
    crop_rows (param_rows);
    var temps = to_wikitext (label, param_rows);
    var start = summarize (res[1], boxes.count);

    return start + "\n" + temps + "{{" + tmpl + "/end}}";
}

//  Parse the simple ASCII art, storing the diagram in
//  rows[] and the labels in label{}
//
function parse_art (text, label,outrows)
{
    // remove any rulers or comments (messages)
    text = text.replace(/^.*1-2-3-4-5-6-7-8-9.*\n/mg, "");
    text = text.replace(/^ *\/\/.*/mg, "");

    // Parse the name=value definitions into label{}.
    // We're as flexible as possible, allowing defs
    // with no RHS, defs in multiple columns, and
    // defs quickly jotted to the right of the art.
    // However, a value cannot span lines. And assume
    // foo===bar is part of the art, where === is ---.
    // AAA=Freddy overrides AAA=AAA overrides AAA=
    //
    text = text.replace(/([^\s=]+) *=(?!=) *(.*?)(\t|   (?=.*\w.*=)| *$)/mg, 
        function (str,name,value) {
            if (! /\w/.test(name))      // art
                return str;
            if (! label[name] || label[name] == name && value)
                label[name] = value;
            if (value != label[name] && value != name && value)
                throw 'Parameter "' + name + '" has multiple values.';
            return "";
        });

    // Treat ..... same as ~~~~~
    text = text.replace(/\.{3,}/g, function(s){ return s.replace(/./g, "~"); });

    text = pad_text(text, 4);

    var a = text.slice(0,-1).split("\n");
    while (a.length)
        outrows.push(a.shift());

    // At this point, outrows[] should contain the diagram padded
    // to the maximum width with two extra blank cells on each
    // side (1 box overlap + 1 neighbor) and with the vertical
    // lines aligned on the even characters (assuming diagram is
    // consistent in this).
}


//  Find which cells are occupied by boxes, even if the box
//  names are real short (must be at least 2 characters) or
//  real long.  Doing this first makes processing the tiles
//  easier.  Returns the 2D boxes array.
//
function map_boxes (rows, boxes)
{
    var namepat = /[A-Z0-9]+([\/&._]?[A-Z0-9])+/ig;
    var row, map, res, name, pos;

    boxes.count = 0;

    for (var i=0; i < rows.length; i++) {
        row = rows[i];
        map = new Array(row.length);

        while ((res = namepat.exec(row)) != null) {
            name = res[0];

            //  Handle cases where wide {{chart}} tiles look like boxes.
            //  If it looks like they could be tiles, then they're tiles,
            //  else they're boxes.  We rely on user to not use ambiguous
            //  box names like a2b2c (though names like a2 and a2b should
            //  actually work as long as they remain aligned on odd).
            //
            if (Template == "chart" && res.index % 2 == 0)
            {
                while (name.search(/^[a-z]2[^\W_].../) == 0) {
                    name = name.slice(2);
                    res.index += 2;
                }
                //  Tiles: m2 m2P m2n2 m2n2P   Boxes: m2ab m2abc m2Pn2
                if (name.search(/^([a-z]2)*.?$/) == 0)
                    continue;

                //  Also allow convenience shortcut of  SPPPRPPPPPP
                //  to be used as alternative to        S P R P P P
                if (name.search(/^(?=.*PPP)([bmnoPSYWMHR]P){3,}.?$/) == 0)
                    continue;
            }

            //  Even allow on odd alignment if it's all PPPPPPPPPPPs
            if (Template == "chart" && name.search(/^P{6,}.$/) == 0)
                continue;

            if (name.length % 2 == 1 && res.index % 2 == 0)
                toss (name + " is aligned ambiguously");
            pos = (res.index + name.length / 2) & ~1;
            if (map[pos-2])
                throw "box [" + name + "] overlaps [" + map[pos-2] + "]";

            map[pos-2] = name;
            map[pos]   = name;
            map[pos+2] = name;

            //  Blank out the name.  If it's a long name (>5) and
            //  a horizontal line joins it, extend the line into
            //  the extra space from shortening the name.

            var before = row.slice(0, res.index);
            var blank  = name.replace(/./g, " ");
            var after  = row.slice(res.index + name.length);
            var half   = name.length / 2;

            if (res = before.match(/(-|~) ?$/))
                blank = Array((half+1)|0).join(res[1]) + blank.slice(half);
            if (res = after.match(/^ ?(-|~)/))
                blank = blank.slice(0,half) + Array((half+1.6)|0).join(res[1]);
                 
            row = before + blank + after;
            boxes.count++;

            if (row.slice(pos-2, pos+3).search(/[^\s[\]P~=_-]/) >= 0)
                toss ("A tile overlaps box [" + name + "]");
        }
        boxes.push(map);
        rows[i] = row;
    }
}

function map_tiles (boxes,rows, param_rows)
{
    Tile.invert_symbols();

    for (var r=1; r < rows.length-1; r++)
    {
        var row    = rows[r];
        var params = [];

        var res = row.match(/^.(..)*?([^\s[\]P~=_-])/);
        if (res)
            toss (res[2] + " is mis-aligned on row " + r);

        for (var c=2; c < row.length-2; c += 2)
        {
            if (boxes[r][c]) {
                params.push( boxes[r][c] );
                c += 4;
            }
            else {
                var t = new Tile(r,c);
                t.tweak(r-1, c, 0);
                t.tweak(r+1, c, 2);
                t.tweak(r, c-2, 3);
                t.tweak(r, c+2, 1);
                params.push( t.symbol() );
            }
        }
        param_rows.push(params);
    }
}

//  Crop unneeded spaces from beginnings and ends of parameter
//  lists if entire columns are unused.  The rows are assumed
//  to be the same virtual width.  If a margin is desired, use
//  {{familytree/start| style=margin:1em}}, not empty rows/columns.
//
//  (In rare cases there could also be leading/trailing rows that
//  are empty, but don't crop them. Should only happen if these
//  lines were blank exept for character(s) in the odd cells.
//  Which shouldn't happen by accident.)
//
function crop_rows (rows)
{
    var min = 9999;
    var max = 0;

    //  Find first and last columns used
    //
    for (var r=0; r < rows.length; r++) {
        var params = rows[r];
        var col    = 0;         // virtual column / width
        var first  = 9999;      // first used column
        var last   = 0;         // last used column

        for (var i=0; i < params.length; i++) {
            var param = params[i];
            if (param != ' ' && first > col)
                first = col;
            if (! istile(param))
                col += 2;          // it's a 3-wide box
            if (param != ' ')
                last = col;
            col++;
        }
        min = Math.min(min, first);
        max = Math.max(max, last);
    }

    if (min > max)  return;        // all blank
    var extra = col - max - 1;     // amount to trim on right

    // Now crop leading and trailing params in blank columns.
    // Though the param list lengths vary, their virtual widths
    // should all be the same, and will continue to be consistent
    // after shaving the same amount off of each end.
    //
    for (r=0; r < rows.length; r++) {
        rows[r].splice(0, min);
        rows[r].splice(rows[r].length - extra, extra);
    }
}

function to_wikitext (label, rows)
{
    var style      = Style || new MarkupStyle();
    var result     = "";
    var first_part = "{{" + Template + style.initial;
    var label_used = {};
    var i, attr;

    for (i=0; i < Special.length; i++) {
        attr = Special[i];
        if (attr in label) {
            first_part += "|" + attr + "=" + label[attr];
            label_used[attr] = 1;
        }
    }

    for (var r=0; r < rows.length; r++)
    {
        var params    = rows[r];
        var seen      = {};
        var last_part = "";
        var param;
        result += first_part;

        while (param = params.shift()) {
            result += "|";

            if (istile(param) && !(param in label)) {
                result += param;
                continue;
            }

            if (! (param in seen)) {
                seen[param] = 1;

                if (param in label) {
                    last_part += "|" + style.param(param, label[param]);
                    label_used[param] = 1;
                }
                for (i=0; i < Special.length; i++) {
                    attr = Special[i] + "_" + param;
                    if (attr in label) {
                        last_part += "|" + style.param(attr, label[attr]);
                        label_used[attr] = 1;
                        seen[param]      = 2;
                    }
                }
            }

            //  If param.length < 5, center it so it looks better.
            //  Unless it's used in any per-box attributes like boxstyle_FOO,
            //  in which case it must be flush left to work correctly.

            if (seen[param] == 2 || param.length > 5)
                result += pad(param, 5);
            else
                result += ("  "+param+"  ").substr(param.length/2, 5);
        }

        if (style.trim)
            result = result.replace(/(\| )+$/g, "");    // trim empty cells
        result += last_part + "}}\n";
    }

    var unused = "";

    for (i in label) {
        if (! (i in label_used) && label[i] && label[i] != i)
            unused += "|" + style.param(i, label[i]);
    }
    if (unused)
        result += "<!-- Unused parameters: -->\n" +
                  "{{" + Template + style.initial + unused + "}}\n";
    return result;
}

//  Create a slightly more useful summary than the default.
//  The user is hoped to revise this to a more meaningful summary
//  than can be calculated automatically. For example:
//
//  summary = Family tree diagram for Barack Obama, connecting
//            29 individuals in 4 generations.  Generations are
//            arranged in rows, with Barack appearing 3rd on the
//            3rd such row.
//
function summarize (tag, count)
{
    if (tag.search(/\|\s*summary\s*=/) == -1)
        tag = tag.replace(/}}$/,
           "| summary=Boxes and lines diagram with " + count + " boxes}}");
    else
        tag = tag.replace(/\d+(?= (boxes|nodes|individuals))/, count);
    return tag;
}

function istile (sym)
{
    return sym.length <= 1 ||
           Template == "chart" && /^[a-z]2$/.test(sym);
}


function Tile(r,c)
{
    var a = get_tile(r,c);
    this.orig_sym = a[0];
    this.sides    = a[1].slice(0,4);   // copy vs ref
    this.weight   = a[1][4];

    // If edge is a line but next tile not same with > weight, change it
    // If edge is blank  but next tile is line with >= weight, change it
    //
    this.tweak = function (r,c,dir)
    {
        var neighbor = get_tile(r,c);
        var specs    = neighbor[1];
        var ne_line  = specs[dir ^ 2];
        var us_line  = this.sides[dir];

        if (us_line > 0  && ne_line != us_line && specs[4] > this.weight ||
            us_line == 0 && ne_line > 0        && specs[4] >= this.weight)
                this.sides[dir] = ne_line;
    }

    this.symbol = function()
    {
        var ch = new_symbol[this.sides];
        if (ch == null || /[ :~!-]/.test(ch))
            ch = this.orig_sym;
        return ch;
    }

    function get_tile(r,c)
    {
        if (boxes[r][c])
            return ["BOX", [0, 0, 0, 0, 20]];
        var ch  = rows[r].charAt(c);
        var ch2 = rows[r].charAt(c+1);
        if (/[ P_=~-]/.test(ch) && /[^ [\]P_=~-]/.test(ch2))    // mis-aligned?
            ch = ch2;
        if (/\w/.test(ch) && ch2 == '2')              // {{chart}} long symbol?
            ch += '2';
        if (ch == '|' || ch == '1')
            ch = '!';
        if (ch == '_' || ch == '=')
            ch = '-';
        var specs = symbols[ch] || [0, 0, 0, 0, 20];

        if (specs.length > 5 && Template == "chart")    // t, T, k, G
            specs = specs.slice(5);

        return [ch, specs];
    }
}

//  Build reverse lookup table needed by Tile objects.
//  There is some conflict between the {{familytree}} and {{chart}} symbols.
//  A few recently-added symbols map to different specs, and some specs
//  map back to different symbols.  Hence the extra logic here depending
//  on the current Template family.
//
Tile.invert_symbols = function()
{
    new_symbol = {};
    var start = (Template == "chart") ? -5 : 0;

    for (var sym in symbols) {
        var nesw = symbols[sym].slice(start,start+4).join();
        if (! (nesw in new_symbol) || Template == "chart")
            new_symbol[nesw] = sym;
    }
}

function toss (msg)            // Soft throw.
{
    if (Picky) throw msg;
}


// I haven't tuned many of these weights yet.
// Hopefully we won't need to go to per-edge weights.
//
//        Doubt:
//        0   space
//        1   ^ v ( )
//        2   - ! ~ :
//        3   + . , ' ` / \ BOX

var new_symbol = {};

var symbols = {
//              N, E, S, W, Weight
        " " : [ 0, 0, 0, 0, 90 ],
        "-" : [ 0, 1, 0, 1, 50 ],
        "!" : [ 1, 0, 1, 0, 50 ],
        "+" : [ 1, 1, 1, 1, 20 ],
        "," : [ 0, 1, 1, 0, 20 ],
        "." : [ 0, 0, 1, 1, 20 ],
        "`" : [ 1, 1, 0, 0, 20 ],
        "'" : [ 1, 0, 0, 1, 20 ],
        "^" : [ 1, 1, 0, 1, 70 ],
        "v" : [ 0, 1, 1, 1, 70 ],
        "(" : [ 1, 0, 1, 1, 70 ],
        ")" : [ 1, 1, 1, 0, 70 ],
        "~" : [ 0, 2, 0, 2, 50 ],
        ":" : [ 2, 0, 2, 0, 50 ],
        "%" : [ 2, 2, 2, 2, 20 ],
        "F" : [ 0, 2, 2, 0, 20 ],
        "7" : [ 0, 0, 2, 2, 20 ],
        "L" : [ 2, 2, 0, 0, 20 ],
        "J" : [ 2, 0, 0, 2, 20 ],
        "A" : [ 2, 2, 0, 2, 70 ],
        "V" : [ 0, 2, 2, 2, 70 ],
        "C" : [ 2, 0, 2, 2, 70 ],
        "D" : [ 2, 2, 2, 0, 70 ],
        "*" : [ 2, 1, 2, 1, 51 ],
        "#" : [ 1, 2, 1, 2, 51 ],   // don't tweak ---#---
        "h" : [ 1, 2, 0, 2, 33 ],
        "y" : [ 0, 2, 1, 2, 33 ],
        "{" : [ 2, 0, 2, 1, 33 ],
        "}" : [ 2, 1, 2, 0, 33 ],
        "t" : [ 2, 1, 0, 1, 33,   1, 2, 1, 2, 51 ],
        "[" : [ 1, 0, 1, 2, 33 ],
        "]" : [ 1, 2, 1, 0, 33 ],
        "X" : [ 2, 1, 2, 2, 33 ],
        "T" : [ 0, 1, 2, 2, 33,   0, 0, 3, 3, 20 ],
        "K" : [ 2, 0, 1, 2, 33 ],
        "k" : [ 1, 0, 2, 2, 33,   3, 1, 3, 0, 33 ],
        "G" : [ 2, 2, 1, 0, 33,   3, 0, 3, 3, 70 ],
              // chart
        "P" : [ 0, 3, 0, 3, 50 ],
        "Q" : [ 3, 0, 3, 0, 50 ],
        "R" : [ 3, 3, 3, 3, 20 ],
        "S" : [ 0, 3, 3, 0, 20 ],
        "Y" : [ 3, 3, 0, 0, 20 ],
        "Z" : [ 3, 0, 0, 3, 20 ],
        "W" : [ 3, 3, 0, 3, 70 ],
        "M" : [ 0, 3, 3, 3, 70 ],
        "H" : [ 3, 3, 3, 0, 70 ],
        "c" : [ 2, 0, 2, 1, 33 ],
        "d" : [ 2, 1, 2, 0, 33 ],
        "i" : [ 2, 1, 0, 1, 33 ],
        "j" : [ 0, 1, 2, 1, 33 ],
        "e" : [ 1, 0, 1, 2, 33 ],
        "f" : [ 1, 2, 1, 0, 33 ],
        "a" : [ 3, 1, 3, 1, 51 ],
        "b" : [ 1, 3, 1, 3, 51 ],   // don't tweak ---b---
        "l" : [ 3, 0, 3, 1, 33 ],
        "m" : [ 0, 3, 1, 3, 33 ],
        "n" : [ 1, 3, 0, 3, 33 ],
        "o" : [ 1, 3, 1, 0, 33 ],
        "p" : [ 1, 0, 1, 3, 33 ],
        "q" : [ 3, 1, 0, 1, 33 ],
        "r" : [ 0, 1, 3, 1, 33 ],
       "a2" : [ 3, 2, 3, 2, 54 ],
       "b2" : [ 2, 3, 2, 3, 54 ],
       "k2" : [ 3, 2, 3, 0, 44 ],
       "l2" : [ 3, 0, 3, 2, 44 ],
       "m2" : [ 0, 3, 2, 3, 44 ],
       "n2" : [ 2, 3, 0, 3, 44 ],
       "o2" : [ 2, 3, 2, 0, 44 ],
       "p2" : [ 2, 0, 2, 3, 44 ],
       "q2" : [ 3, 2, 0, 2, 44 ],
       "r2" : [ 0, 2, 3, 2, 44 ]
};

window.wiki2art = wiki2art;     // expose to HTML link
window.art2wiki = art2wiki;

if (document.editform) {
    var textbox = document.editform.wpTextbox1;
    var res = textbox.value.match(/\{\{(familytree|chart)\/start[\S\s]*\{\{\w+\/end/i);
    if (res) {
        Template = res[1];
        if (res[0].search(/^\s*\{\{(familytree|chart)\s*\|/mi) > 0)
            update_menu ("wiki2art");
        else
            update_menu ("art2wiki");
    }
}

} );    // end of script and addOnloadHook() wrapper