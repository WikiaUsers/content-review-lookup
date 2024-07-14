function tabsDraw(tabsBox,tabsData){
	console.log('tabsDrawActivated');
    // 创建按钮框
    var toggleBar = document.createElement('ul');       //按钮框为无序列表
    toggleBar.className= 'tabs-toggleBar';              //风格化
    var tempAttr= document.createAttribute('style');
    tempAttr.value='list-style: none;display: flex;margin: 0px;padding: 0px;';
    toggleBar.setAttributeNode(tempAttr);
   
    // 合成
    tabsBox.appendChild(toggleBar);                     //tabsBox为有tabs-container类的div
    for(var buttonKey in tabsData){                     //先添加按钮框，再添加内容框
        // 创建按钮
        var toggleButton = document.createElement('li');
        toggleButton.className= 'tabs-toggleButton';                  //添加class="tabs-toggleButton"
        var toggleButtonAttr = document.createAttribute('onclick');   //添加onclick="buttonSelect(this)"
        toggleButtonAttr.value = "var buttonArray = this.parentNode.getElementsByClassName('tabs-toggleButton');for(var i=0;i<buttonArray.length;i++){buttonArray[i].className='tabs-toggleButton';document.getElementById(buttonArray[i].innerHTML).className='tabs-content';};this.className='tabs-toggleButton tabs-selected';document.getElementById(this.innerHTML).className='tabs-content tabs-show';console.log('buttonSelectDone');";
        toggleButton.setAttributeNode(toggleButtonAttr);
        var tempAttr1= document.createAttribute('style');
        tempAttr1.value='border: 1px solid;margin: 0px;padding: 4px;background-color: #2df;cursor: pointer;';
        toggleButton.setAttributeNode(tempAttr1);
        toggleButton.innerHTML= buttonKey;                            //for中遍历的关键词
        toggleBar.appendChild(toggleButton);
        // 创建内容框
        var toggleContent = document.createElement('div');
        toggleContent.className= 'tabs-content';                      //添加class="tabs-content"
        toggleContent.id= toggleButton.innerHTML;                     //按钮的内容即为对应内容框的id
        toggleContent.innerHTML= tabsData[buttonKey];                 //关键词对应的值
        tabsBox.appendChild(toggleContent);
    }
}

function tabsInfo(){
	console.log('tabsInfoActivated');
    // 获取所有tabs容器位置
    var tabsContainerArray = document.getElementsByClassName('tabs-container');
    // 循环输出数据；条件：有tabs容器，且迭代次数等于容器数（e.g. 0号和1号是2个，0,1<2）
    for(var i = 0;tabsContainerArray[0] && i<tabsContainerArray.length;i++){
        // 获取数据；来自.tabs-container下的.tabs-keys和.tabs-values
        var tabsDataKeys  =  tabsContainerArray[i].getElementsByClassName('tabs-keys');    //获取第i号容器的所有tabs关键词（包括子容器）
        var tabsDataValues=  tabsContainerArray[i].getElementsByClassName('tabs-values');  //获取第i号容器的所有tabs取值（同上）
        var tabsData = {}; //对应tabsDraw的tabsData，存放键值对的字典
        // 向字典写入数据；条件：迭代次数等于键值对数
        for(var j=0;j<=tabsDataKeys.length+1;j++){  //这里开始我也不太懂，比如为啥要+1，但是它能跑还能框套娃框，先用着
	        var wtfman = tabsDataKeys[0].innerHTML;
	        var bugfku = tabsDataValues[0].innerHTML;
            tabsData[wtfman] = bugfku;
            tabsContainerArray[i].removeChild(tabsDataKeys[0]);                            //清除原本的键值数据，仅保留tabs容器的“框（最外层div）”和字典tabsData
            tabsContainerArray[i].removeChild(tabsDataValues[0]);
        }
        tabsDraw(tabsContainerArray[i],tabsData);
    }
}
console.log('tabberLoaded');
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementsByClassName('tabs-container') !== null) {
        tabsInfo();
        console.log('tabberDone');
    } else {
        console.log("tabberFailed");
    }
});