//https://sta-op.douyucdn.cn/front-publish/live-master/assets/images/treasure_close_48f5364.png
var blockUrls =[
	// "https://sta-op.douyucdn.cn/front-publish/live-master/js/room/playerAside_*.js",	//宝箱验证


	"https://sta-op.douyucdn.cn/*.jpg*",	// 视频框内游戏推广	
	"https://sta-op.douyucdn.cn/*.png*",	// 视频框内游戏推广	
	"https://sta-op.douyucdn.cn/*.jpeg*",	//视频推荐 房间预览
	"https://sta-op.douyucdn.cn/*.gif*",

	"https://shark.douyucdn.cn/*.gif*",	//源图片出错预备图
	"https://shark.douyucdn.cn/*.jpg*",	//斗鱼公会
	"https://shark.douyucdn.cn/*.png*",	//客户端下载页图片
	"https://shark.douyucdn.cn/*.gif*",

	"https://cs-op.douyucdn.cn/*.jpg*",	//其它游戏推广
	"https://cs-op.douyucdn.cn/*.png*",	//其它游戏推广
	"https://cs-op.douyucdn.cn/*.gif*",

	"http://image.wan.douyu.com/*.png*",	//个人说明里的游戏推广

	"https://msgstatic.douyucdn.cn/*.jpg",
	"https://msgstatic.douyucdn.cn/*.png",
	"https://msgstatic.douyucdn.cn/*.gif",

	"https://gfs-op.douyucdn.cn/*.jpg",
	"https://gfs-op.douyucdn.cn/*.png",
	"https://res.douyucdn.cn/*.jpg",
	"https://res.douyucdn.cn/*.png",
	"https://apic.douyucdn.cn/*.jpg",
	"https://apic.douyucdn.cn/*.png",

	// "https://hm.baidu.com/hm*",	//百度代码统计
	// // "https://www.douyu.com/front-publish/shark-flash-master/*", //flash 播放器
	// "https://*/*/*.m4s",		//html5视频源
	// "*://*/*/*.m4s",		//html5视频源
	// "https://*/*/*.wsv*",
	// "*://*/*/*.mp4*",
	// "https://*.v.smtcdns.net/hlsh5p1.douyucdn2.cn/video/*.m4s",
	// "https://webim.tim.qq.com/*",
	// "https://dotcounter.douyucdn.cn/*",
	// "https://hdl5.douyucdn.cn/*",
	// "https://tc-tct.douyucdn2.cn/*",

	// "https://webconf.douyucdn.cn/*",
	// "https://www.douyu.com/api/*",
	// "https://apmconfig.douyucdn.cn/*",
	// "https://shark.douyucdn.cn/*",
	// "http://image.wan.douyu.com/*",
	// "https://msgstatic.douyucdn.cn/*",

	// "https://gfs-op.douyucdn.cn/*",
	// "https://res.douyucdn.cn/*",
	// "https://apic.douyucdn.cn/*",
	// "https://*.ourdvsss.com/*",
	// "*://accp.douyucdn.cn/*",
	// "*://bjfesdk.douyucdn.cn/*",
	// "https://dotserver.douyucdn.cn/*",
	// "https://club-img.douyucdn.cn/*"

];
var callback =function(details){
	// if (details.url.indexOf("https://sta-op.douyucdn.cn/front-publish/live-master/assets/images/treasure_")>-1) {
	if (details.url.indexOf("https://sta-op.douyucdn.cn/front-publish/live-master/assets/images/treasure_close")>-1) {
		return {redirectUrl: chrome.extension.getURL("ico/treasure_close_48f5364.png")};			
	}
	//宝箱验证
	// if (details.url.indexOf("https://sta-op.douyucdn.cn/front-publish/live-master/js/room/playerAside")>-1) {
	// 	return {redirectUrl: chrome.extension.getURL("js/playerAside_e286d0c.js")};
	// }
	return {cancel: true};
};
var filter = {urls:blockUrls};
var opt_extraInfoSpec = ["blocking"];
chrome.webRequest.onBeforeRequest.addListener(callback, filter, opt_extraInfoSpec);