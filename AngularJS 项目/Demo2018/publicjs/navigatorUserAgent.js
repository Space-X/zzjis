/***
 * date:2016，08,04 
 * 
 * @author liyunayou
 *
 * 
 * native 原生交互类
 * 
 */
/** 应用类型* */
var appStyle = 0;
var dataInfo = "";
// 获取终端的相关信息
function navigatorUserAgent() {
	var Terminal = {
		// 辨别移动终端类型
		platform : function() {
			var u = navigator.userAgent, app = navigator.appVersion;
			return {
				// Windows浏览器
				windows : u.indexOf('Windows') > -1,
				// android终端或者uc浏览器
				android : u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
				// 是否为iPhone或者QQHD浏览器
				iPhone : u.indexOf('iPhone') > -1,
				// 是否iPad
				iPad : u.indexOf('iPad') > -1
			};
		}(),
		// 辨别移动终端的语言：zh-cn、en-us、ko-kr、ja-jp...
		language : (navigator.browserLanguage || navigator.language)
				.toLowerCase()
	}
	if (Terminal.platform.android) {
		// 你的Android APP对应下载地址：apk文件地址
		appStyle = 0;
	} else if (Terminal.platform.iPhone) {
		// 你的iPhone APP对应下载地址：APP Store地址
		appStyle = 1;
	} else if (Terminal.platform.iPad) {
		appStyle = 2;
	} else if (Terminal.platform.windows) {
		appStyle = 3;
	} else {
		appStyle = 4;
	}
	return appStyle;
}
/*******************************************************************************
 * 获取链接中的id
 */
function getArgs(strName) {
	var strHref = window.document.location.href;
	var intPos = strHref.indexOf("?");
	var strRight = strHref.substr(intPos + 1);
	var arrTmp = strRight.split("&");
	for (var i = 0; i < arrTmp.length; i++) {
		var arrTemp = arrTmp[i].split("=");
		if (arrTemp[0].toUpperCase() == strName.toUpperCase())
			return arrTemp[1];
	}
	return "";
}

// native的 Dialog 对话框
function showAlert() {
	navigator.notification.alert('You are the winner!', // message
	'Game Over',
	// title
	'Done'
	// buttonName
	);
}

// Beep three times
// 响铃3声
function playBeep() {
	navigator.notification.beep(3);
}
// Vibrate for 2 seconds
// 振动
function vibrate() {
	navigator.notification.vibrate(100000);
}
// 跳转
function intent() {
	navigator.intent.demo(1);
}


/*******************************************************************************
 * 打开相机和相册**************************************
 * 
 * 
 * 参数1:成功回调方法
 * 
 * 参数2:baseType相机/相册（0/1）
 * 
 * 参数3:userId 用户id
 * 
 */
function openCameraAlbum(baseType, userId, successCallback) {

	navigator.cameraAlbum.openCameraAlbum(function(objs) {
		// 返回函数
		successCallback(objs);
	}, baseType, userId);

}
/**
 * toast提示
 * 
 * @param message(String)
 * @param toastStyle(int)
 */
function showToast(message, toastStyle) {
	navigator.toast.MyToast(message, toastStyle);
}

/**
 * 获取手机设备信息
 * 
 * 手机uuid, 手机型号, 版本号, 系统版本号, 手机厂商
 * 
 * message :uuid 直接使用 device设备信息
 * 
 * @param successCallback
 * @param message(String)
 */
function getPhoneDevice(message) {
	navigator.phoneDevice.getPhoneDevice(function successCallback(msg) {
		deviceInfo = msg;
	}, message);
}
/*******************************************************************************
 * 
 * 登录
 * 
 * @param username
 * @param userpsd
 * @param isforgetInfo
 */
function loadingRequst(successCallback, username, userpsd, isforgetInfo) {
	navigator.httpLoading.loadingRequst(successCallback, username, userpsd,
			isforgetInfo, 0);
}
/*******************************************************************************
 * 
 * 注册
 * 
 * @param username
 * @param userpsd
 * @param isforgetInfo
 */
function registerRequst(successCallback, username, userpsd) {
	navigator.httpLoading.loadingRequst(successCallback, username, userpsd,
			null, 1);
}
/*******************************************************************************
 * 
 * @param successCallback
 * @param get_post(get
 *            或者post请求)
 * @param action（接口动作）
 * @param args（参数
 *            数组）
 */
function HttpUrl(successCallback, get_post, action, args) {

	navigator.httpUrl.httpUrl(successCallback, get_post, action, args);
}
function LoadingShow($ionicLoading, msg) {

	$ionicLoading.show({
		// template : msg,
		content : msg,
		animation : 'fade-in',
		showBackdrop : true,
		maxWidth : 200,

		showDelay : 0
	});
}
function LoadingHide($ionicLoading) {
	$ionicLoading.hide();
}
function sikpActivity() {
	navigator.skipactivity.skip("d");

}

// 视屏
function video() {
	navigator.video.play("http://www.baidu.com");
}

function loadView() {
	navigator.view.loadingView("ok");
}

/*******************************************************************************
 * 文件管理
 * 
 * 
 * @param successCallback
 * @param baseType
 * @param filePath
 * @param fileName
 * @param suffix
 */
function fileManager(successCallback, baseType, filePath, fileName, suffix) {
	navigator.fileData.fileManager(successCallback, baseType, filePath,
			fileName, suffix);

}
/*******************************************************************************
 * 
 * plist管理 （用户信息等小数据信息）
 * 
 * @param successCallback
 *            成功回调
 * 
 * @param baseType
 *            0是保存数据,1是取数据，2 是删除数据
 * @param key
 * @param values
 */
function plistManager(successCallback, baseType, key, values) {
	navigator.plistData.plistManager(successCallback, baseType, key, values);

}
