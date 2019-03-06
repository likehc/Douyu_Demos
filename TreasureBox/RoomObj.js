function RoomObj() {
};

RoomObj.findByClassName = function(n){
	return document.getElementsByClassName(n);
};

RoomObj.findById = function(id) {
	return document.getElementById(id);
};

RoomObj.removeByClassName = function(n) {
	var e = RoomObj.findByClassName(n);
	for (var i = 0; i < e.length; i++) {
		e[i].remove();
	}
};

RoomObj.removeById= function(id) {
	var e = RoomObj.findById(id);
	if (e != null) {
		e.remove();
	}
};
RoomObj.hideByClassName = function(n) {
	var e = RoomObj.findByClassName(n);
	for (var i = 0; i < e.length; i++) {
		e[i].style.display="none";
	}
};

RoomObj.hideById= function(id) {
	var e = RoomObj.findById(id);
	if (e != null) {
		e.style.display="none";
	}
};
RoomObj.showByClassName = function(n) {
	var e = RoomObj.findByClassName(n);
	for (var i = 0; i < e.length; i++) {
		e[i].style.display="none";
	}
};

RoomObj.showById= function(id) {
	var e = RoomObj.findById(id);
	if (e != null) {
		e.style.display="inline";
	}
};
RoomObj.clickByClassName = function(n) {
	var e = RoomObj.findByClassName(n);
	for (var i = 0; i < e.length; i++) {
		e[i].style.display="inline";
	}
};

RoomObj.clickById= function(id) {
	var e = RoomObj.findById(id);
	if (e != null) {
		e.click();
	}
};

RoomObj.htmlByClassName= function(n) {
	var e = RoomObj.findByClassName(n);
	if (e.length > 0) {
		return e[0].innerHTML;
	}else{
		return undefined;
	}	
};

RoomObj.htmlById= function(id) {
	var e = RoomObj.findById(id);
	if (e != null) {
		return e.innerHTML;
	}else{
		return null;
	}
};