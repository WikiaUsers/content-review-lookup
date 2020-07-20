ul.dropdown {
    background: #A5CBE3;
    box-shadow: 0 0 7px #004976 inset;
}
 
ul.dropdown li.active {
    color:#000;
}
 
ul.dropdown li a {
    background: #FFF;
    color: #000;
}
 
ul.dropdown li a:hover {
    background: #A5CBE3;
}
 
ul.dropdown li:last-child a {
    border-bottom: 3px solid #004976;
}
 
ul.dropdown li:first-child a {
    border-top: 3px solid #004976;
}
 
ul.dropdown:hover {
    border-radius: 10px 10px 0 0;
}
 
ul.dropdown li {
    line-height: 30px;
    padding: 0 !important;
}
 
.inline-alert {
    position: relative;
}
 
ul.dropdown:hover li {
    display: inline;
}
 
ul.dropdown {
    border-radius: 10px;
    border: 2px solid #000;
    height: 30px;
    left: 0;
    line-height: 30px;
    margin-left: auto;
    margin-right: auto;
    position: fixed;
    right: 0;
    top: 13px;
    width: 200px;
    z-index: 9999999;
}
 
ul.dropdown li {
    display: none;
    font-size: 12px;
}
 
ul.dropdown li.active {
    border-radius: 4px;
    cursor: pointer;
    display: block;
    font-size: 14px;
    margin-bottom: -3px;
    padding: 8px;
    text-align:center;
    font-weight:bold;
}
ul.dropdown li.active span {
    color: #fff;
    float: right;
    margin-left: 3px;
}
 
ul.dropdown li a {
    display: block;
    line-height: 15px;
    padding: 8px 8px 8px 10px;
    text-align: left;
    text-decoration: none;
    border:2px solid #000;
    border-top:0;
    border-bottom:0;
    width:182px;
    margin-left:-2px;
}
 
ul.dropdown li:last-child a {
    border-radius: 0 0 10px 10px;
}
 
ul.dropdown li a:hover {
    font-weight: bold;
    padding-left: 10px;
    text-decoration: none;
}