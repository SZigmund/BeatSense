//SECTION MyEVENTS: Events call from host:
var MyEVENTS = {
  connectAPI: function() {
    try{
		var titleEl = document.getElementsByTagName("title")[0];
		var docEl = document.documentElement;

		if (docEl && docEl.addEventListener) {
			docEl.addEventListener("DOMSubtreeModified", function(evt) {
				var t = evt.target;
				if (t === titleEl || (t.parentNode && t.parentNode === titleEl)) {
					MyEVENTS.eventDjadvance();
				}
			}, false);
		} else {
			document.onpropertychange = function() {
				if (window.event.propertyName == "title") {
					MyEVENTS.eventDjadvance();
				}
			};
		}
	  
    } catch (err) {
      console.log("connectAPI: " + err.message);
    }
  },
  eventDjadvance: function(obj) {
    try{
	      console.log("Title modifed: " + );
	  }
    } catch (err) {
      console.log("eventDjadvance: " + err.message);
    }
  }
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
