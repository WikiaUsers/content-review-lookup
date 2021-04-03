<HTML>
<HEAD>
<TITLE>背景及文字颜色的改变</TITLE>
<META http-equiv=Content-Type content="text/html; charset=gb2312">
</HEAD>
<BODY bgColor=#fef4d9>
<CENTER>
<TABLE borderColor=#00FF00 border=5 borderlight="green">
  <TBODY>
  <TR>
    <TD align=middle>
      <SCRIPT language=JavaScript>
function color() {
document.bgColor=(""+ colc.cc.value +"");
document.body.text=(""+ colc.tc.value +"");
}
</SCRIPT>

      <DIV align=center>
      <FORM name=colc>
      <TABLE border=1>
        <TBODY>
        <TR>
          <TD colSpan=2><B>
            <CENTER>请选择颜色</CENTER></B></TD>
        <TR>
          <TD><B>背景色:</B></TD>
          <TD><SELECT size=1 name=cc> <OPTION value=black>Black<OPTION 
              value=blue>Blue<OPTION value=green>Green<OPTION 
              value=skyblue>Light Blue<OPTION value=orange>Orange<OPTION 
              value=purple>Purple<OPTION value=red>Red<OPTION 
              value=silver>Silver<OPTION value=Yellow>Yellow<OPTION value=white 
              selected>White</OPTION></SELECT></TD>
        <TR>
          <TD><B>文字色:</B></TD>
          <TD><SELECT size=1 name=tc> <OPTION value=black 
              selected>Black<OPTION value=blue>Blue<OPTION 
              value=green>Green<OPTION value=skyblue>Light Blue<OPTION 
              value=orange>Orange<OPTION value=purple>Purple<OPTION 
              value=red>Red<OPTION value=silver>Silver<OPTION 
              value=Yellow>Yellow<OPTION value=white>White</OPTION></SELECT> </TD>
        <TR>
          <TD colSpan=2>
            <CENTER><INPUT onclick=color() type=button value=改变颜色 name=button> 
  </CENTER></TD></TR></TBODY></TABLE></FORM></DIV></TD></TR></TBODY></TABLE>
</CENTER>
</BODY>
</HTML>