function GetUUID(qName) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var ajaxobj =
      JSON.parse(this.responseText);
      window.UUID = ajaxobj["entities"][0]["card"]["uuid"];
      console.log("[+] Got UUID:", window.UUID)
      console.log("[*] Downloading Answer Set.")
      loadDoc(window.UUID)
    }
  };
  xhttp.open("GET", "https://create.kahoot.it/rest/kahoots/?query="+qName, true);
  xhttp.send();
}
function SetWsHook() {
wsHook.after = function(messageEvent, url, wsObject) {
if(messageEvent.data.indexOf("quizName") != -1) {
    var dat = JSON.parse(messageEvent.data);
    window.qName = JSON.parse(dat[0]["data"]["content"])["quizName"]
    console.log("[+] Got quizName: "+window.qName);
    console.log("[*] Getting UUID...")
    GetUUID(qName);}
    return messageEvent;}
}
function ClickAnswer(aNum) {
	document.getElementsByTagName("button")[aNum].click();
}
function GetCorrectAnswer(qNum) {
    for(i=0;i<window.Answers["questions"][qNum]["choices"].length;i++) {
    	if (window.Answers["questions"][qNum]["choices"][i].correct == true) {
    		return i;
    	}
   	}
}
function GetCurrentQuestionNumber() {
	return parseInt(document.getElementsByClassName("question-top-bar__QuestionNumber-sc-1pwisow-3 ivQNxY")[0].innerText.split(" ")[0]) -1;
}
function loadDoc(ID) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      window.Answers =
      JSON.parse(this.responseText);
    }
  };
  xhttp.open("GET", "https://create.kahoot.it/rest/kahoots/"+ID, true);
  xhttp.send();
}
function GetAndClick() {
	ClickAnswer(GetCorrectAnswer(GetCurrentQuestionNumber()));
}
function AddScript(uri) {
	var x = document.createElement("script")
	x.src=uri
	document.body.append(x);
}
function TryGetAndClick() {
	try {
		GetAndClick();
	} catch {

	}
}
AddScript("https://rt-kt.github.io/wshook/wsHook.js");
setTimeout(SetWsHook, 1000)
setInterval(TryGetAndClick, 200)
