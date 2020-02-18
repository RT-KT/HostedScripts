
function getAns() {
var prmpt=document.getElementsByClassName("StudentPrompt-inner")[0].innerText
var answr=dict[prmpt]
var aTags=document.getElementsByTagName("div")
for (var i = 0; i < aTags.length; i++) {
  if (aTags[i].innerHTML == answr) {
    clickbtn = aTags[i];
    break;
  }
}
if(clickbtn != null) {
	clickbtn.click();
	clickbtn=null;	
}
}
setInterval(getAns, 1500)
