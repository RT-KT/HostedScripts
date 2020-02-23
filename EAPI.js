libnames = {"jquery":"https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js","angular":"https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js","vue":"https://cdn.jsdelivr.net/npm/vue","underscore":"https://underscorejs.org/underscore-min.js","axios":"https://unpkg.com/axios/dist/axios.min.js","polyfill":"https://polyfill.io/v3/polyfill.min.js?features=Array.from,Promise,Symbol,Object.setPrototypeOf,Object.getOwnPropertySymbols","superagent":"https://cdn.jsdelivr.net/npm/superagent","xhook":"//unpkg.com/xhook@latest/dist/xhook.min.js","wshook":"https://rt-kt.github.io/wshook/wsHook.js"};
window.$EAPI = new Object;
$EAPI.Import = async function(uri) {
		var x=document.createElement('script');
		x.src = uri;
		document.body.append(x);
}
$EAPI.LoadCommonLib = async function(LibName) {
		if(libnames[LibName.toLowerCase()] != undefined) {
			var x=document.createElement('script');
			x.src = libnames[LibName.toLowerCase()];
			document.body.append(x);
		} else {
			throw Error("[!] LoadCommonLib was called with a library name not in window.libnames: "+LibName);
		}
}
$EAPI.Init = function () {
	$EAPI.LoadCommonLib("wshook");
	$EAPI.LoadCommonLib("xhook");
}
$EAPI.Analysis = new Object;
$EAPI.Analysis.LogWebsockets = function() {
	wsHook.after = function(messageEvent, url, wsObject) {
    	console.log("Received WS Message From " + url + " :",messageEvent.data);
    	return messageEvent;
	};
	wsHook.before = function(data, url) {
    	console.log("Sending WS Message To " + url + " :",data);}
}
$EAPI.Analysis.LogXHR = function() {
	xhook.after(function(request, response) {
    		console.log("XHR Request Received At "+request.url+":",response);
    	});
	xhook.before(function(request) {
    	console.log("Sending XHR Request To "+request.url+":",request)
    })
}
$EAPI.Analysis.LogSentWebsockets = function() {
	wsHook.before = function(data, url) {
    	console.log("Sending WS Message To " + url + " :", data);}
}
$EAPI.Analysis.LogSentXHR = function() {
	xhook.after(function(request, response) {
    		console.log("XHR Request Received At "+request.url+":",response.text);
    	});
}
$EAPI.Analysis.FindForms = function() {
	var forms = document.getElementsByTagName("form");
	for(i=0;i<forms.length;i++) {
		var inputs = forms[i].getElementsByTagName("input");
		for(i2=0;i2<forms.length;i2++) {
			console.log("Found Form Input From Form "+i+":",inputs[i2].outerHTML+"\n")
		}
	}
}
$EAPI.Analysis.FindInputs = function() {
	var inputs = forms[i].getElementsByTagName("input");
	for(i=0;i<forms.length;i++) {
		console.log("Found Input "+i+":",inputs[i].outerHTML+"\n")
	}
}
$EAPI.Analysis.LogWebsocketsForKeyword = function(Keyword) {
	wsHook.after = function(messageEvent, url, wsObject) {
		if(url.indexOf(Keyword) != -1 || messageEvent.data.indexOf(Keyword) != -1) {
    		console.log("[LogWSForKeyword] Received WS Message From " + url + " : ",messageEvent.data);
    	}
    	return messageEvent;
	};
	wsHook.before = function(data, url) {
		if(url.indexOf(Keyword) != -1 || data.indexOf(Keyword) != -1) {
    		console.log("[LogWSForKeyword] Sending WS Message To " + url + " :",data);
    	}
    };
}
$EAPI.Analysis.LogXHRForKeyword = function(Keyword) {
	xhook.after(function(request, response) {
			if(request.url.indexOf(Keyword) != -1 || response.text.indexOf(Keyword) != -1) {
    			console.log("[LogXHRForKeyword] XHR Request Received At "+request.url+":", response.text);
    		}
    	});
	xhook.before(function(request) {
		if(request.url.indexOf(Keyword) != -1 || response.text.indexOf(Keyword) != -1) {
    		console.log("[LogXHRForKeyword] Sending XHR Request To "+request.url+":", request.text);
    	}
    });
}

$EAPI.Init();
