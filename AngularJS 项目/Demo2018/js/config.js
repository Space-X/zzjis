/**
 * Created by liyuanyou 2016,08,12
 */
var configMod = angular.module("lmsApp.config", []);

configMod.constant("ENV", {
	// "name": "production",
	"debug": false,
	"api": "http://www.phonegap100.com/appapi.php",
	'siteUrl': "http://www.phonegap100.com",
	'imgUrl': "http://www.phonegap100.com/data/attachment/",
	'version': '1.0.1',
	// 'rootUrl' : "http://192.168.1.150:8082/tsx/app",
	// 'rootUrl' : "http://192.168.1.169:8082/tsx/app",
	// 'rootUrl' : "http://lexue.net.cn:18100/tsx/app",
	// 'rootUrl' : "http://192.168.1.214:7615/tsx/app",
	// 'rootUrl' : "http://192.168.1.150:8082/tsx/app",
	// 'rootUrl' : "http://192.168.1.169:8082/tsx/app",// 王廷兴
	// 'rootUrl' : "http://192.168.1.169:8082/tsx/app",
	// 'rootUrl' : "http://lexue.net.cn:18100/tsx/app",
	// 'rootUrl' : "http://192.168.1.150:8082/tsx/app",// 潘磊
	// 'rootUrl' : "http://192.168.1.214:7615/tsx/app",// 苏毅进
	//'rootUrl' : "http://192.168.1.169:7697/tsx/app",// 裴晓琳
	//'rootUrl' : "http://192.168.1.172:7699/Learning3/app",// 裴晓琳
	'rootUrl': "http://192.168.0.103:9095/Gk/app", // 裴晓琳

});