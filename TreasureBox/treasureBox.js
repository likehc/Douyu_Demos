function getBoxInfo() {
	try{
		var treasureDetail= RoomObj.findByClassName("TreasureDetail");
		if (treasureDetail.length>0) { 
			var openBoxTimer=setInterval(function(){
				if (RoomObj.findByClassName("Treasure").length>0) {
					var title = RoomObj.htmlByClassName("TreasureStatus-text");
					document.title =title;
					var geetest_popup_box =RoomObj.findByClassName("geetest_popup_box");
					if (title =="领取" && geetest_popup_box.length <=0 ) {
						RoomObj.findByClassName("TreasureStatus-text")[0].click();//点击领取
						var geetest_radar_tip =RoomObj.findByClassName("geetest_radar_tip");
						if(geetest_radar_tip.length>0){
							setTimeout(function () {
								// geetest_radar_tip[0].click();//点击验证板
							}, 1500)
								
						}
					}else{
						try{
							geetest_popup_box[0].style['width']="347px";//修改验证码框的大小							
						}catch(err){}
					}
				}else{
					window.close();					
				}
			},800);
		}
	}catch(err){
	}
};
var treasureTimerIndex =0;
var treasureTimer=setInterval(function(){
	treasureTimerIndex++;
	if (treasureTimerIndex>=10) {
		window.clearInterval(treasureTimer);
		return;
	}
	var treasureDetail=RoomObj.findByClassName("TreasureDetail");
	if (treasureDetail.length>0) {
		getBoxInfo();
		window.clearInterval(treasureTimer);
		return;
	}
},1000);