/* default skin for navigation boxes */
table.navbox {
    background-color: #f9f9f9;
    border: 1px solid #aaa;
    clear: both;
    font-size: 90%;
    margin: 1em 0em 0em;
    padding: 2px;
    text-align: center;
    width: 100%;
}

table.navbox th {
    background-color: #ccf;
    padding-left: 1em;
    padding-right: 1em;
}

table.navbox tr:not(:first-child) th {
    background-color: #ddf;
}

@media print {
    .navbox {
        display: none;
    }
}

/* Standard Navigationsleisten, aka box hiding thingy from .de.  Documentation at [[Wikipedia:NavFrame]]. */

div.Boxmerge,
div.NavFrame {
        margin: 0px;
        padding: 4px;
        border: 1px solid #aaa;
        text-align: center;
        border-collapse: collapse;
        font-size: 95%;
}
div.Boxmerge div.NavFrame {
        border-style: none;
        border-style: hidden;
}
div.NavFrame + div.NavFrame {
        border-top-style: none;
        border-top-style: hidden;
}
div.NavPic {
        background-color: #fff;
        margin: 0px;
        padding: 2px;
        float: left;
}
div.NavFrame div.NavHead {
        height: 1.6em;
        font-weight: bold;
        background-color: #ccccff;
        position:relative;
}
div.NavFrame p {
        font-size: 100%;
}
div.NavFrame div.NavContent {
        font-size: 100%;
}
div.NavFrame div.NavContent p {
        font-size: 100%;
}
div.NavEnd {
        margin: 0px;
        padding: 0px;
        line-height: 1px;
        clear: both;
}
a.NavToggle {
        position:absolute;
        top:0px;
        right:3px;
        font-weight:normal;
        font-size:smaller;

importScriptPage('ShowHide/code.js', 'dev');