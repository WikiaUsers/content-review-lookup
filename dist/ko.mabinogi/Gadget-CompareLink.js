/<pre>
/*
 
이 스크립트는 영어 위키백과 사용자 User:Superm401이 제작한 [[en:User:Superm401/Compare link.js]]의 2010년 5월 24일 14:09 (UTC)판(363925947판)을 한국어판에 맞게 약간의 수정을 가한 것입니다.
 
최종수정일: 2010년 7월 12일 13:44 (KST)
 
이 스크립트는 위키백과에서 사용하는 라이선스 및 GPL로 배포됩니다.
 
This function (compare link) is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.
 
This function is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
 
A copy of the GPL is available at http://www.prism.gatech.edu/~mflaschen3/gpl.txt .
 
By modifying "Wikipedia:WikiProject User scripts/Scripts/Compare link":
You agree to dual-license your contributions under both the GFDL (http://en.wikipedia.org/wiki/WP:GFDL)
and version 2 of the GPL (http://www.prism.gatech.edu/~mflaschen3/gpl.txt) or any later version
of the GPL published by the FSF.
 
*/
 
function fixCompare()
{
    var histForm=document.getElementById("mw-history-compare");
    var diffList=document.getElementById("pagehistory");
    var histButtons=getElementsByClassName(histForm, "input", "historysubmit"); // wikibits
    var firstButton=histButtons[0];
    var finalButton=histButtons[1];
    if(!finalButton)
      return null;
 
    finalButton.parentNode.removeChild(finalButton);
    firstButton.parentNode.removeChild(firstButton);
    var compareLink=document.createElement("a");
    var genLink = wgServer + wgScript + "?title=" + histForm.title.value + "&diff=" + histForm.diff[0].value + "&oldid=" + histForm.oldid[1].value;
    compareLink.setAttribute("href", genLink);
    compareLink.setAttribute("class", "compare-link");
    compareLink.appendChild(document.createTextNode("선택한 판들을 비교"));
    histForm.insertBefore(compareLink, diffList);
    var endLink=compareLink.cloneNode(true);
    histForm.appendChild(endLink);
    addHandler(diffList, "change", updateCompare); // wikibits
 
    function updateCompare()
    {
        var selectedRows = getElementsByClassName(histForm, "li", "selected");
 
        var diffRow = selectedRows[0]; // reverse chronological, so diff row is first.
        var diff = diffRow.getElementsByTagName("input")[1].value; // diff second radio
 
        var oldidRow = selectedRows[1]; // old id row later
        var oldid = oldidRow.getElementsByTagName("input")[0].value; // oldid first radio
 
        var genLink = wgServer + wgScript + "?title=" + histForm.title.value + "&diff=" + diff + "&oldid=" + oldid;
        compareLink.setAttribute("href", genLink);
        endLink.setAttribute("href", genLink);
    }
}
 
if(window.location.href.indexOf("action=history")!=-1)
    addOnloadHook(fixCompare);
//</pre>