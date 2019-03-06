var delHuoJian = true;
var delFiJi = false;
var delTime=30;

function start() {
	var removeTimer=setInterval(function(){
		removeRedRoom();
		// removeRoomByTime();
		if (delHuoJian) {
			var img = document.getElementsByTagName("img");
			for (var k = 0; k < img.length; k++) {
				try{
					// console.log(img[k].src);
					if(img[k].src == "https://www.xiaohulu.com/skin/prop/img/%E7%81%AB%E7%AE%AD.gif"){
						img[k].parentNode.parentNode.parentNode.remove();
					}
				}catch(err){
				}
			}
		}
		if (delFiJi) {
			var img = document.getElementsByTagName("img");
			for (var l = 0; l < img.length; l++) {
				try{
					// console.log(img[k].src);
					if(img[l].src == "https://www.xiaohulu.com/skin/prop/img/%E9%A3%9E%E6%9C%BA.gif"){
						 img[l].parentNode.parentNode.parentNode.remove();
					}
				}catch(err){
				}
			}
		}
		hideSomeRoom();	//隐藏相同的房间
	},1000);//20000毫秒就是20秒发一次
}

function removeRedRoom(){
	var Red_time=document.getElementsByClassName("duration Red_time");
	for (var i = 0; i < Red_time.length; i++) {
		Red_time[i].parentNode.parentNode.parentNode.remove();
	}	
};
function hideSomeRoom() {
	var aTagArr = document.getElementsByTagName("a");
	for (var a = aTagArr.length - 1; a >= 0; a--) {
		var tRoom = aTagArr[a];
		if (tRoom.rel == "noreferrer") {
			hideRoomByUrl(aTagArr,tRoom.href);
		}
	}
};
function hideRoomByUrl(roomArr,roomUrl) {
	var isDel =false;
	for (var b = 0; b < roomArr.length; b++) {
		if (roomArr[b].href ==roomUrl) {
			if (!isDel) {
				isDel =true;
				continue;
			}
			roomArr[b].style.display = "none";
		}		
	}
};
function removeRoomByTime(){
	var roomTime = document.getElementsByClassName("duration Blue_time");
	for (var l = 0; l < roomTime.length; l++) {
		var time = roomTime[l].innerText.split(":");
		if(time[0]==0 && time[1]< delTime){
			roomTime[l].parentNode.parentNode.parentNode.parentNode.remove();
		}
	}
};

function removByClassName(s) {
	var r =document.getElementsByClassName(s);
	for (var j = 0; j < r.length; j++) {
		r[j].remove();
	}
}


// window.onload=function(){
// 	if (document.URL == "https://www.xiaohulu.com/Box/index.html?plat=2") {
// 		start();
// 		removByClassName("public_xhl_header");
// 		removByClassName("public_xhl_header");
// 	}
// };

var adsTimerIndex =0;
var adsTimer = self.setInterval(function() {
	console.log("aaaaaa");
	if (document.URL != "https://www.xiaohulu.com/box/index.html?plat=2") {
		window.clearInterval(adsTimer);
		return;
	}
	if (adsTimerIndex >=10) {
		window.clearInterval(adsTimer);
		return;
	}
	adsTimerIndex++;
	// if (document.getElementsByClassName("gheader").length>0) {
	// 	start();
	// 	removByClassName("public_xhl_header");
	// 	window.clearInterval(adsTimer);
	// 	return;
	// }
	start();
	removByClassName("public_xhl_header");
	removByClassName("xhl_nav clearfix");
	removByClassName("container search_box");
}, 500)

