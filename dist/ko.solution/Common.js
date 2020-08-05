/* 이 자바스크립트 설정은 모든 문서, 모든 사용자에게 적용됩니다. */

/*===========================================================*/
/*   다음은 틀:풀이과정에 적용될 보이기/숨기기 기능입니다.   */
/*===========================================================*/

//addEventListener을 통해 문서에 있는 모든 틀:풀이과정에 자바스크립트를 적용시킨다.
for(i=0;i<document.getElementsByClassName("solProcess").length;i++)
    {document.getElementsByClassName("solProcess")[i].addEventListener("click",solProcessAction,false);}

//addEventListener로 통해 삽입된 자바스크립트 함수 solProcessAction이다.
function solProcessAction(){
        if(event.target.className=="solProcessButton"){
            var solContent=this.children[1].style;
            //this.children[1]에서, this는 사용자가 클릭한 바로 그 틀:풀이과정을 의미하며, children[1]은 틀:풀이과정에서의 두 번째 자식 노드인 solProcessContent 클래스를 가리킨다.
            
            if(solContent.display=="none"){solContent.display="block";}
            else if(solContent.display=="block"){solContent.display="none";}
            //틀:풀이과정을 다 읽고 solProcessButton을 클릭하여 틀을 닫을 때, 화면은 틀의 처음 부분으로 다시 돌아가야 한다. 관리자 혹은 개발자는 이를 가능케 하도록 코딩에 관심을 가질 것을 요구한다.
        }
    }

/*===========================================================*/
/*   다음은 틀:풀이/수정에 적용될 보이기/숨기기 기능입니다.  */
/*===========================================================*/

/*-------중요사항-------*/
//만일 틀:풀이/수정이 존재하지 않은 문서일 경우, 존재하지 않는 요소에 이벤트를 삽입을 하려고 하여 오류가 발생한다.해당 오류는 다음 스크립트를 수행하지 못하게 방해하는 원인이 되어, 치명적인 결과를 초래한다.
//이러한 문제를 해결하기 위해 현재로써는 스크립트 시험 및 오류 감지 명령어(try 및 catch)를 추가하였다.
/*----------------------*/

//try 명령어 내에 있는 스크립트 수행을 시도한다. 수행 도중에 오류가 발생하지 않으면 정상적으로 적용된다.
try{
    //originalProblem 아이디를 가진 요소에 클릭을 하였을 때, originalAction 함수를 수행하도록 한다.
    document.getElementById("originalProblem").addEventListener("click",originalAction,false);
    
    function originalAction(){
        var orgContent=document.getElementById("originalContent").style;
        if(orgContent.display=="none"){orgContent.display="block";}
        else if(orgContent.display=="block"){orgContent.display="none";}
        //문제 원본이 담겨있는 originalContent가 숨겨져 있을 시, 보이기로 설정한다. 반면에 보여져 있을 시, 숨기기로 설정한다.
    }
}

//try 명령어에 오류가 발생, 즉 틀:풀이/수정이 문서 내에 발견되지 않을 시 아무것도 수행하지 않는다.
catch(err){}