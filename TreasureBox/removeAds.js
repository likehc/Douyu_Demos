var isPause =false;
//进行一些页面排版修改
function youhua() {
	//html5
	if (!isPause) {
		if(RoomObj.findByClassName("left-menu-small").length<=0){	//缩小左侧框
			RoomObj.clickByClassName("AsideToggleButton");
		}
		if (RoomObj.findByClassName("left-menu-small").length>0) {
			RoomObj.removeByClassName("layout-Aside");//移除左侧框
		}
		//HTML5 播放器▽▽▽
		if (RoomObj.findByClassName("pause-c594e8").length>0) {
			RoomObj.clickByClassName("pause-c594e8");//暂停
			RoomObj.clickByClassName("pause-81a5c3");//暂停
			RoomObj.clickByClassName("showdanmu-f76338");//弹幕关
			RoomObj.clickByClassName("showdanmu-42b0ac");//弹幕关
			// RoomObj.removeById("__video");	//移除html5播放器
			isPause = true;
		}
		//flash 播放器▽▽▽
		if (RoomObj.findByClassName("room-Player").length >0) {
			RoomObj.removeByClassName("room-Player");	//移除flash播放器
			isPause = true;
		}
	}
};
var removeAdsIndex =0;
function removeAds() {
	var removeAdsTimer=self.setInterval(function(){
		if (removeAdsIndex>=30) {
			window.clearInterval(removeAdsTimer);
			return;
		}
		removeAdsIndex++;
		youhua();
		RoomObj.removeByClassName("YubaGroup-active");//移除悬浮鱼吧
		RoomObj.removeByClassName("SignBarrage");//弹幕区悬浮广告
		RoomObj.removeByClassName("QRcode");//视频内二维码游戏推广
		RoomObj.removeByClassName("normalBg-a5403d");// 视频内亲密互动
		RoomObj.removeByClassName("Title-roomOtherBottom"); //分享，客户端，下载游戏
		RoomObj.removeByClassName("PlayerToolbar-signCont");//背包左边循环浮动广告
		RoomObj.removeById("js-room-activity");	//弹幕右侧悬浮广告(鱼乐盛典)
		RoomObj.removeByClassName("JifenIconGuide");	//礼品兑换
		RoomObj.removeById("js-bottom"); 	//视频下方区域

		//以下清屏
		RoomObj.removeById("js-player-barrage"); 
		RoomObj.removeByClassName("layout-Player-rankAll");
		RoomObj.removeByClassName("layout-Player-userCard");
		RoomObj.removeByClassName("layout-Player-chat");
		RoomObj.removeByClassName("layout-Player-rank");

		RoomObj.removeByClassName("layout-Player-title");
		RoomObj.removeByClassName("layout-Player-guessgame");
		
		RoomObj.removeByClassName("layout-Player-toolbar");
		RoomObj.removeByClassName("layout-Player-videoMain");
		RoomObj.hideById("js-header");	//头部不能删除,否则为登录出错
		// RoomObj.hideByClassName("layout-Player-main")
		
		var layoutPlayer =RoomObj.findByClassName("layout-Player");
		if (layoutPlayer.length>0) {
			layoutPlayer[0].style['top']="150px";	//设置宝箱高度
		}
		//以上清屏

		// document.getElementsByClassName("layout-Player-main")[0].remove();
		// document.getElementsByClassName("layout-Player-aside")[0].style['height']="580px"
	},600);
};
removeAds();