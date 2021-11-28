/* 此处的JavaScript将载入于所有用户每一个页面。 */
/*</pre>
=== 表格生成器===
<pre>*/ 
/**
 *
 * English: Generate an  a r r a y  using Mediawiki syntax
 *
 * @author: fr:user:dake
 * @version: 0.1
 */
 
function generateTableau(nbCol, nbRow, border, styleHeader, styleLine)
{
        var code = "\n";
        if (styleHeader==1) {
                code += '{\{entête tableau charte}\}\n';
        } else {
                code += '{| border="' + border + '"\n';
                code += '|+ 表格标题\n';
        }
        
        for (var i=0;i<nbCol;i++) code += '! 表头 ' + i + '\n'
        
        for (var j=0;j<nbRow;j++) {
                if ((j+1)%2==0 && styleLine==1) {
                        code += '|-{'+'{grey row}'+'}\n'
                } else {                
                        code += '|-----\n'
                }
                
                for (var i=0;i<nbCol;i++) code += '| 内容\n';
        }
        
        code += '|}';
        insertTags('','', code); 
}

/**
 *
 * English: Open a popup with parameters to generate an  a r r a y. 
 * The number of rows/columns can be modified. Some additional
 * parameters are related to templates available on :fr
 *
 * @author: fr:user:dake
 * @version: 0.1
 */
 
function popupTableau()
{
  var popup = window.open('','name','height=400,width=500');
  
  javaCode =  '<script type="text\/javascript">function insertCode(){';
  javaCode += 'var row = parseInt(document.paramForm.inputRow.value); '
  javaCode += 'var col = parseInt(document.paramForm.inputCol.value); '
  javaCode += 'var bord = parseInt(document.paramForm.inputBorder.value); '
  javaCode += 'var styleHeader = document.paramForm.inputHeader.checked; '
  javaCode += 'var styleLine = document.paramForm.inputLine.checked; '
  javaCode += 'window.opener.generateTableau(col,row,bord,styleHeader,styleLine); '
  javaCode += '}<\/script>';
  
  popup.document.write('<html><head><title>表格参数</title>');
  popup.document.write('<script type="text\/javascript" src="\/skins-1.5\/common\/wikibits.js"><!-- wikibits js --><\/script>');
  popup.document.write('<style type="text\/css" media="screen,projection">/*<![CDATA[*/ @import "\/skins-1.5\/monobook\/main.css?5"; /*]]>*/<\/style>');
  popup.document.write(javaCode); 
  popup.document.write('</head><body>');
  popup.document.write('<p>请输入想要生成表格的参数：</p>');
  popup.document.write('<form name="paramForm">');
  popup.document.write('行数：<input type="text" name="inputRow" value="3" ><p>');
  popup.document.write('列数：<input type="text" name="inputCol" value="3" ><p>');
  popup.document.write('边框宽度：<input type="text" name="inputBorder" value="1" ><p>');
  popup.document.write('灰色表头：<input type="checkbox" name="inputHeader" checked="1" ><p>');
  popup.document.write('灰色斑马表：<input type="checkbox" name="inputLine" checked="1" ><p>');
  popup.document.write('</form">');
  popup.document.write('<p><a href="javascript:insertCode()"> 将代码插入到编辑窗口中</a></p>');
  popup.document.write('<p><a href="javascript:self.close()"> 关闭</a></p>');
  popup.document.write('</body></html>');
  popup.document.close();
}

//增加弹出表格按钮
function marque_tab()
{
    var toolbar = document.getElementById('toolbar');
    if (!toolbar) return false;

    var textbox = document.getElementById('wpTextbox1');
    if (!textbox) return false;

    if (!document.selection && textbox.selectionStart == null)
    return false;

    var CustomTableButt = document.createElement("img");
    CustomTableButt.width = 23;
    CustomTableButt.height = 22;
    CustomTableButt.src = 'http://upload.wikimedia.org/wikipedia/fr/0/04/Button_ar' + 'ray.png';
    CustomTableButt.border = 0;
    CustomTableButt.style.cursor = "pointer";
    CustomTableButt.alt = '自定义表格';
    CustomTableButt.onclick = function() {popupTableau(); return false;}
    toolbar.appendChild(CustomTableButt);
}

addLoadEvent(marque_tab);


/*</pre>

=== 编辑工具按钮===
<pre>*/ 

if (typeof mwCustomEditButtons!="undefined"&&mwCustomEditButtons)
{
    function addEditButton(imageFile, tagOpen, sampleText, tagClose, speedTip)
    {
        mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/" + imageFile,
        "tagOpen": tagOpen,
        "sampleText": sampleText,
        "tagClose": tagClose,
        "speedTip": speedTip
        };
    }

    addEditButton("he/6/60/Button_insert_table.png", '\n{| border="1" \n|- \n| 第一部分 || 第二部分 \n|- \n| 第三部分 || 第四部分',"","\n|}\n", "插入表格");
}

/*</pre>