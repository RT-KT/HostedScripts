var clickbtn = null;
dict={};
var el = document.createElement('el');
xhook="https://jpillora.com/xhook/dist/xhook.min.js"
sc=document.createElement("script")
sc.src=xhook
document.body.append(sc)
function HookID() {
xhook.after(function(request, response) {if(request.url == "/event_logger") {window.re=JSON.parse(request.body);loadDoc("https://quizlet.com/"+getStudyableID())}})
}
function getStudyableID() {
	var i=0;
	for(i=0;i<re.length;i++) {
		if(re[i]["event"]["client_studyable_id"] != undefined) {
			return re[i]["event"]["client_studyable_id"];
		}
	}
}
function MakeDict() {
terms=el.getElementsByClassName("TermText notranslate lang-en")
leng=terms.length-1
for(i=0; i<leng;i=i+2) {dict[terms[i].children[0].innerHTML.replace(/\s/g,"")]=terms[i+1].children[0].innerHTML.replace(/\s/g,"");}
for(i=0; i<leng;i=i+2) {dict[terms[i+1].children[0].innerHTML.replace(/\s/g,"")]=terms[i].children[0].innerHTML.replace(/\s/g,"");}}
function loadDoc(uri) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      el.innerHTML =
      this.responseText;
      MakeDict()
    }
  };
  xhttp.open("GET", uri, true);
  xhttp.send();
}
setTimeout(HookID, 1000)
function getAns() {
var prmpt=document.getElementsByClassName("PMDocument")[0].innerHTML
prmpt=prmpt.replace(/\s/g,"");
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
setInterval(getAns, 2000)
