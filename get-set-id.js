xhook="https://jpillora.com/xhook/dist/xhook.min.js"
sc=document.createElement("script")
sc.src=xhook
document.body.append(sc)
function HookID() {
xhook.after(function(request, response) {if(request.url == "/event_logger") {window.re=JSON.parse(request.body);window.open("https://quizlet.com/"+getStudyableID())}})
}
function getStudyableID() {
	var i=0;
	for(i=0;i<re.length;i++) {
		if(re[i]["event"]["client_studyable_id"] != undefined) {
			return re[i]["event"]["client_studyable_id"];
		}
	}
}
setTimeout(HookID, 1000)
