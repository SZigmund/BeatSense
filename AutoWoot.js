//javascript:(function(){$.getScript('');}());

//SECTION MyEVENTS: Events call from host:
var MyVARS = {
	windowTitle: ""
}
var API = {
  SongUpVote: function() {
    try			{ document.querySelector("#currSongThumbUp_forTutorial").click();    } 
	catch (err) { console.log("connectAPI: " + err.message); }
  }
}
var MyEVENTS = {
  connectAPI: function() {
    try{
		var titleEl = document.getElementsByTagName("title")[0];
		var docEl = document.documentElement;

		if (docEl && docEl.addEventListener) {
			docEl.addEventListener("DOMSubtreeModified", function(evt) {
				var t = evt.target;
				if (t === titleEl || (t.parentNode && t.parentNode === titleEl)) { MyEVENTS.eventDjadvance(); }
			}, false);
		} else {
			document.onpropertychange = function() {
				if (window.event.propertyName == "title") { MyEVENTS.eventDjadvance(); }
				if (window.event.propertyName !== "title") { MyEVENTS.eventLog(evt); }
			};
		}
	  
    } catch (err) {
      console.log("connectAPI: " + err.message);
    }
  },
  eventDjadvance: function() {
    try{
		if (MyVARS.windowTitle !== document.getElementsByTagName("title")[0].text && 
		    document.getElementsByTagName("title")[0].text.length > 1) {
	      console.log("Title modifed: " + document.getElementsByTagName("title")[0].text + " > " + document.getElementsByTagName("title")[0].text.length.toString());
		  MyVARS.windowTitle = document.getElementsByTagName("title")[0].text;
		  setTimeout(function() { API.SongUpVote(); }, 1500);
	    }
	  }
    catch (err) {	console.log("eventDjadvance: " + err.message); }
  },
  eventLog: function(evt) {
    try{
	 console.log("EVENT: " + evt.target);
	}
    catch (err) {	console.log("eventDjadvance: " + err.message); }
  },
};

var STARTUP = {
	initbot: function() {
      try{
        if (window.APIisRunning) return;
        window.APIisRunning = true;
	    MyEVENTS.connectAPI();
      } catch (err) {
        console.log("initbot: " + err.message);
      }
	}
};

if (!window.APIisRunning) {
  STARTUP.initbot();
} else {
  setTimeout(function() {
    STARTUP.initbot();
  }, 1000);
}
