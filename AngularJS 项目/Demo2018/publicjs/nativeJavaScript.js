var appStyle = 0;
var dataInfo = "";
window.onload = function() {
	navigatorUserAgent();
};
// 获取终端的相关信息
function navigatorUserAgent() {
	var Terminal = {
		// 辨别移动终端类型
		platform : function() {
			var u = window.navigator.userAgent, app = window.navigator.appVersion;
			var explorer = window.navigator.userAgent;
			return {
				// Windows浏览器
				windows : u.indexOf('Windows') > -1,
				Chrome : u.indexOf('Chrome') > -1,
				// android终端或者uc浏览器
				android : u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
				// 是否为iPhone或者QQHD浏览器
				iPhone : u.indexOf('iPhone') > -1,
				// 是否iPad
				iPad : u.indexOf('iPad') > -1
			};
		}(), // 辨别移动终端的语言：zh-cn、en-us、ko-kr、ja-jp...
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
	} else if (Terminal.platform.Chrome) {

		appStyle = 4;
	}

	return appStyle;
}
/*
 * ios 动作
 */
function iosActionLog(action) {
	var console = new Object();
	// console.log = function(log){
	var iframe = document.createElement("IFRAME");
	iframe.setAttribute("src", "ios-log:#iOS#" + action);
	document.documentElement.appendChild(iframe);
	iframe.parentNode.removeChild(iframe);
	iframe = null;
	// }
	console.debug = console.log;
	// console.info = console.log;
	// console.warn = console.log;
	// console.error = console.log;
}
function messageData(messageJson) {
	// alert(messageJson);
}
/*******************************************************************************
 * 网络是否可用
 */
function netWorkConnection(isAvailable) {
	return isAvailable;
}

function sendUserInfo(userId, userCode) {

}
function htmlLoge(logMsg) {
	switch (appStyle) {
	case 0:
		window.injs.htmlLoge(logMsg);
		break;
	case 1:
		dataInfo = logMsg + ";";
		window.location.href = "htmlLoge://" + encodeURI(dataInfo);
		break;
	case 2:
		dataInfo = logMsg + ";";
		window.location.href = "htmlLoge://" + encodeURI(dataInfo);
		break;
	case 3:
		alert("不支持流浪器底层");
		break;
	}
}
function android_ios_telNumber(tel) {
	switch (appStyle) {
	case 0:
		
		window.injs.telNumber(tel);
		break;
	case 1:
		dataInfo = tel + ";";
		window.location.href = "telNumber://" + encodeURI(dataInfo);
		break;
	case 2:
		dataInfo = tel + ";";
		window.location.href = "telNumber://" + encodeURI(dataInfo);
		break;
	case 3:
		alert("不支持流浪器底层");
		break;
	}
}
// 封装native 接口=============////////////
/*******************************************************************************
 * 
 * 用户登录
 * 
 * @param username
 * @param userPsd
 * @param remberme
 */
function android_ios_callBackLoadingRequstFormNative(username, userPsd,
		remberme) {
	switch (appStyle) {
	case 0:
		window.injs.LoadingRequstFormNative(username, userPsd, remberme);
		break;
	case 1:
		dataInfo = username + ";" + userPsd + ";" + remberme;
		window.location.href = "LoadingRequstFormNative://"
				+ encodeURI(dataInfo);
		break;
	case 2:
		dataInfo = username + ";" + userPsd + ";" + remberme;
		window.location.href = "LoadingRequstFormNative://"
				+ encodeURI(dataInfo);
		break;
	case 3:
		alert("不支持流浪器底层");
		break;
	}
}

/*******************************************************************************
 * 
 * 用户注册
 * 
 * @param username
 * @param userPsd
 * @param remberme
 */
function android_ios_callBackRegisterRequstFormNative(username, userPsd) {
	switch (appStyle) {
	case 0:
		window.injs.registerRequstFormNative(username, userPsd);
		break;
	case 1:
		dataInfo = username + ";" + userPsd + ";";
		window.location.href = "registerRequstFormNative://"
				+ encodeURI(dataInfo);
		break;
	case 2:
		dataInfo = username + ";" + userPsd + ";";
		window.location.href = "registerRequstFormNative://"
				+ encodeURI(dataInfo);
		break;
	case 3:
		alert("不支持流浪器底层");
		break;
	}
}
/*******************************************************************************
 * 显示 隐藏头部bar导航
 * 
 * @returns
 */
function android_ios_showHide_topBar(showstate) {
	switch (appStyle) {
	case 0:
		window.injs.showHideTopBar(showstate);
		break;
	case 1:
		dataInfo = showstate;
		window.location.href = "showHideTopBar://" + dataInfo;
		break;
	case 2:
		dataInfo = showstate;
		window.location.href = "showHideTopBar://" + dataInfo;
		break;
	case 3:
		alert("不支持流浪器底层");
		break;
	}
}
/*******************************************************************************
 * 拍照
 * 
 */
function android_ios_takePicture(callBackSuccessFul) {
	switch (appStyle) {
	case 0:
		android_takePictureFormNative(callBackSuccessFul);
		break;
	case 1:
		ios_takePictureFormNative(callBackSuccessFul);
		break;
	case 2:
		ios_takePictureFormNative(callBackSuccessFul);
		break;
	case 3:
		alert("不支持流浪器底层");
		break;
	}
}
/*******************************************************************************
 * 
 * 考试时间进度
 * 
 * @param timePro
 */
function android_ios_examTimeProgress(timePro) {
	switch (appStyle) {
	case 0:
		window.injs.examTimeProgress(timePro);
		break;
	case 1:
		dataInfo = timePro + ";";
		window.location.href = "examTimeProgress://" + dataInfo;
		break;
	case 2:
		dataInfo = time + ";";
		window.location.href = "examTimeProgress://" + dataInfo;
		break;
	case 3:
		alert("不支持流浪器底层");
		break;
	}
}

/*******************************************************************************
 * 
 * 返回历史
 * 
 */
function android_ios_backHistory() {
	switch (appStyle) {
	case 0:
		window.injs.backHistory();
		break;
	case 1:
		dataInfo = "";
		window.location.href = "backHistory://" + dataInfo;
		break;
	case 2:
		dataInfo = "";
		window.location.href = "backHistory://" + dataInfo;
		break;
	case 3:
		alert("不支持流浪器底层");
		break;
	}
}
/*******************************************************************************
 * 删除动作
 * 
 * @param obj
 */
function android_ios_deleteAction(obj) {
	switch (appStyle) {
	case 0:
		window.injs.deleteAction(obj);
		break;
	case 1:
		dataInfo = obj + ";";
		window.location.href = "deleteAction://" + dataInfo;
		break;
	case 2:
		dataInfo = obj + ";";
		window.location.href = "deleteAction://" + dataInfo;
		break;
	case 3:
		alert("不支持流浪器底层");
		break;
	}
}

/*******************************************************************************
 * 返回信息
 * 
 * html修改需要给前端返回的信息
 * 
 * @param obj
 */
function android_ios_backMsgFormHtml(obj, action) {
	switch (appStyle) {
	case 0:
		window.injs.MsgFormHtml(obj, action);
		break;
	case 1:
		dataInfo = obj + ";" + action;
		window.location.href = "MsgFormHtml://" + dataInfo;
		break;
	case 2:
		dataInfo = obj + ";" + action;
		window.location.href = "MsgFormHtml://" + dataInfo;
		break;
	case 3:
		alert("不支持流浪器底层");
		break;
	}
}

/*******************************************************************************
 * 
 * 消息数据
 * 
 * @param {Object}
 *            callBackSuccessFul
 */
function android_ios_callBackMessageJsonDataFormNative(callBackSuccessFul) {
	switch (appStyle) {
	case 0:
		android_messageJsonDataFormNative(callBackSuccessFul);
		break;
	case 1:
		self.ios_messageJsonDataFormNative(callBackSuccessFul);
		break;
	case 2:
		self.ios_messageJsonDataFormNative(callBackSuccessFul);
		break;
	case 3:
		alert("不支持流浪器底层");
		break;
	}
}

/*******************************************************************************
 * 
 * 消息删除
 * 
 * @param msgid
 */
function android_ios_callBackMsgDeleteFormNative(msgid) {
	switch (appStyle) {
	case 0:
		window.injs.msgDelete(msgid);
		break;
	case 1:
		dataInfo = msgid;
		window.location.href = "msgDelete://" + dataInfo;
		break;
	case 2:
		dataInfo = msgid;
		window.location.href = "msgDelete://" + dataInfo;
		break;
	case 3:
		alert("不支持流浪器底层");
		break;
	}
}
/*******************************************************************************
 * 聊天详情
 * 
 * @param {Object}
 *            toCharUsername
 * @param {Object}
 *            callBackSuccessFul
 */
function android_ios_callBackMessageDetailsJsonDataFormNative(toCharUsername,
		direction, callBackSuccessFul) {
	switch (appStyle) {
	case 0:
		android_messageDetailsJsonDataFormNative(toCharUsername, direction,
				callBackSuccessFul);
		break;
	case 1:
		ios_messageDetailsJsonDataFormNative(toCharUsername, direction,
				callBackSuccessFul);
		break;
	case 2:
		ios_messageDetailsJsonDataFormNative(toCharUsername, direction,
				callBackSuccessFul);
		break;
	case 3:
		alert("不支持流浪器底层");
		break;
	}
}
/*******************************************************************************
 * 查看好友请求信息
 * 
 * @param obj
 */
function android_ios_lookFriendRequstToNative(obj) {
	switch (appStyle) {
	case 0:
		window.injs.lookFriendRequstToNative(obj);
		break;
	case 1:
		dataInfo = obj + ";";
		window.location.href = "lookFriendRequstToNative://"
				+ encodeURI(dataInfo);
		break;
	case 2:
		dataInfo = obj + ";";
		window.location.href = "lookFriendRequstToNative://"
				+ encodeURI(dataInfo);
		break;
	case 3:
		alert("不支持流浪器底层");
		return;
	}
}
function android_ios_callBackUpDataFormNative(JsonStr) {

}

/*******************************************************************************
 * 发送消息
 * 
 * @param {Object}
 *            searchContent
 * 
 * @param {Object}
 *            toCharUsername
 * 
 */
function android_ios_callBackSendMessageFormNative(toCharUsername, nickName,
		content) {
	switch (appStyle) {
	case 0:
		window.injs.sendMessageFormNative(toCharUsername, nickName, content);
		break;
	case 1:
		dataInfo = toCharUsername + ";" + nickName + ";" + content;
		window.location.href = "sendMessageFormNative://" + encodeURI(dataInfo);
		break;
	case 2:
		dataInfo = toCharUsername + ";" + nickName + ";" + content;
		window.location.href = "sendMessageFormNative://" + encodeURI(dataInfo);
		break;
	case 3:
		alert("不支持流浪器底层");
		return;
	}
}
/*******************************************************************************
 * 添加好友
 * 
 * @param toChatUserName
 * @param friendid
 * @param validation
 */
function android_ios_callBackAddFriendsFormNative(useralias, friendid,
		validation) {
	switch (appStyle) {
	case 0:
		window.injs.addFriendsFormNative(useralias, friendid, validation);
		break;
	case 1:
		dataInfo = useralias + ";" + friendid + ";" + validation;
		window.location.href = "addFriendsFormNative://" + encodeURI(dataInfo);
		break;
	case 2:
		dataInfo = useralias + ";" + friendid + ";" + validation;
		window.location.href = "addFriendsFormNative://" + encodeURI(dataInfo);
		break;
	case 3:
		alert("不支持流浪器底层");
		return;
	}
}
/*******************************************************************************
 * 添加好友
 * 
 * @param username
 * @param friendid
 * @param validation
 */
function android_ios_callBackAddFriendsFormNative(username, friendid,
		validation) {
	switch (appStyle) {
	case 0:
		window.injs.addFriendsFormNative(username, friendid, validation);
		break;
	case 1:
		dataInfo = username + ";" + friendid + ";" + validation;
		window.location.href = "addFriendsFormNative://" + encodeURI(dataInfo);
		break;
	case 2:
		dataInfo = username + ";" + friendid + ";" + validation;
		window.location.href = "addFriendsFormNative://" + encodeURI(dataInfo);
		break;
	case 3:
		alert("不支持流浪器底层");
		return;
	}
}
/**
 * 是否同意好友请求
 * 
 * @param friendid
 * @param isAgree
 */
function android_ios_callBackIsAgreeFriendsRequstFormNative(friendid, isAgree) {
	switch (appStyle) {
	case 0:
		window.injs.isAgreeFriendsRequst(friendid, isAgree);
		break;
	case 1:
		dataInfo = friendid + ";" + isAgree;
		window.location.href = "isAgreeFriendsRequst://" + encodeURI(dataInfo);
		break;
	case 2:
		dataInfo = friendid + ";" + isAgree;
		window.location.href = "isAgreeFriendsRequst://" + encodeURI(dataInfo);
		break;
	case 3:
		alert("不支持流浪器底层");
		return;
	}
}

/*******************************************************************************
 * 联系人添加好友
 * 
 * @param username
 * @param friendid
 * @param validation
 */
function android_ios_callBackAddFriendsOfContactsFormNative() {
	switch (appStyle) {
	case 0:
		window.injs.addFriendsOfContactsFormNative();
		break;
	case 1:
		dataInfo = "";
		window.location.href = "addFriendsOfContactsFormNative://"
				+ encodeURI(dataInfo);
		break;
	case 2:
		dataInfo = "";
		window.location.href = "addFriendsOfContactsFormNative://"
				+ encodeURI(dataInfo);
		break;
	case 3:
		alert("不支持流浪器底层");
		return;
	}
}
/*******************************************************************************
 * 扫描二维码
 * 
 * @param username
 * @param friendid
 * @param validation
 */
function android_ios_callBackScanQRCodeFormNative() {
	switch (appStyle) {
	case 0:
		// alert("aa");
		window.injs.scanQRCodeFormNative();
		break;
	case 1:
		dataInfo = "";
		window.location.href = "scanQRCodeFormNative://" + encodeURI(dataInfo);
		break;
	case 2:
		dataInfo = "";
		window.location.href = "scanQRCodeFormNative://" + encodeURI(dataInfo);
		break;
	case 3:
		alert("不支持流浪器底层");
		return;
	}
}
/*******************************************************************************
 * 搜索好友
 * 
 * @param {Object}
 *            searchContent
 */
function android_ios_callBackSearchFriendsFormNative(searchContent) {
	switch (appStyle) {
	case 0:
		return window.injs.searchFriendsFormNative(searchContent);
	case 1:
		dataInfo = searchContent + ";";
		return window.location.href = "searchFriendsFormNative://"
				+ encodeURI(dataInfo);
	case 2:
		dataInfo = searchContent + ";";
		return window.location.href = "searchFriendsFormNative://"
				+ encodeURI(dataInfo);
	case 3:
		alert("不支持流浪器底层");
		return;
	}
}
/*******************************************************************************
 * 上传照片
 * 
 * @param title
 * @param style
 * @returns
 */
function android_ios_openAlbum() {
	switch (appStyle) {
	case 0:
		window.injs.openAlbum();
		break;
	case 1:
		window.location.href = "openAlbum://" + encodeURI(dataInfo);
		break;
	case 2:
		window.location.href = "openAlbum://" + encodeURI(dataInfo);
		break;
	case 3:
		alert("不支持流浪器底层");
		break;
	}
}
/*******************************************************************************
 * toast提示
 * 
 * @param title
 * @param style
 * @returns
 */
function android_ios_callBackToastFormNative(title, style) {
	switch (appStyle) {
	case 0:
		window.injs.ToastFormNative(title, style);
		break;
	case 1:
		dataInfo = title + ";" + style;
		window.location.href = "ToastFormNative://" + encodeURI(dataInfo);
		break;
	case 2:
		dataInfo = title + ";" + style;
		window.location.href = "ToastFormNative://" + encodeURI(dataInfo);
		break;
	case 3:
		alert("不支持流浪器底层");
		break;
	}
}

/*******************************************************************************
 * 注销登录
 * 
 * @returns
 */
function android_ios_callBackOutLoadFormHtml5() {
	switch (appStyle) {
	case 0:
		return window.injs.OutLoadFormHtml5();
	case 1:
		return window.location.href = "OutLoadFormHtml5://";
	case 2:
		return window.location.href = "OutLoadFormHtml5://";

	case 3:
		alert("不支持流浪器底层");
		break;
	}
}
/*******************************************************************************
 * 获取用户信息
 * 
 * @returns
 */
function android_ios_callBackUserInfoFormNative() {
	switch (appStyle) {
	case 0:
		return window.injs.userInfoFormNative();
	case 1:
		return window.location.href = "userInfoFormNative://";
	case 2:
		return window.location.href = "userInfoFormNative://";
	case 3:
		alert("不支持流浪器底层");
		break;
	}
}

/**
 * 个人信息
 * 
 * @returns
 */
function android_ios_callBackPersonalInfoFormNative(callBackSuccessFul) {
	switch (appStyle) {
	case 0:
		android_personalInfoFormNative(callBackSuccessFul);
		break;
	case 1:
		ios_personalInfoFormNative(callBackSuccessFul);
		break;
	case 2:
		ios_personalInfoFormNative(callBackSuccessFul);
		break;
	case 3:
		alert("不支持流浪器底层");
		break;
	}
}

/**
 * 我的个人信息头像
 * 
 * @returns
 */
function android_ios_callBackUserHeadInfoFormNative(callBackSuccessFul) {
	switch (appStyle) {
	case 0:
		android_userHeadInfoFormNative(callBackSuccessFul);
		break;
	case 1:
		ios_userHeadInfoFormNative(callBackSuccessFul);
		break;
	case 2:
		ios_userHeadInfoFormNative(callBackSuccessFul);
		break;
	case 3:
		alert("不支持流浪器底层");
		break;
	}
}

/**
 * 我的二维码
 * 
 * @returns
 */
function android_ios_callBackQRCodeInfoFormNative(callBackSuccessFul) {
	switch (appStyle) {
	case 0:
		android_qrCodeInfoFormNative(callBackSuccessFul);
		break;
	case 1:
		ios_qrCodeInfoFormNative(callBackSuccessFul);
		break;
	case 2:
		ios_qrCodeInfoFormNative(callBackSuccessFul);
		break;
	case 3:
		alert("不支持流浪器底层");
		break;

	}
}

/**
 * 我的关于系统
 * 
 * @returns
 */
function android_ios_callBackVersionInfoFormNative(callBackSuccessFul) {
	switch (appStyle) {
	case 0:
		android_versionInfoFormNative(callBackSuccessFul);
		break;
	case 1:
		ios_versionInfoFormNative(callBackSuccessFul);
		break;
	case 2:
		ios_versionInfoFormNative(callBackSuccessFul);
		break;
	case 3:
		alert("不支持流浪器底层");
		break;

	}
}
/*******************************************************************************
 * 返回登录结果接口
 */
function android_ios_callBackLoadSystem(str) {
	switch (appStyle) {
	case 0:
		window.injs.callBackLoadSystem(str);
		break;
	case 1:
		dataInfo = str;
		window.location.href = "callBackLoadSystem://" + dataInfo;
		break;
	case 2:
		dataInfo = str;
		window.location.href = "callBackLoadSystem://" + dataInfo;
		break;
	case 3:
		alert("不支持流浪器底层");
		break;
	}
}

/*******************************************************************************
 * 跳转视图
 * 
 * @param msg
 */
function android_ios_skipView(msg) {
	switch (appStyle) {
	case 0:
		window.injs.skipView(msg);
		break;
	case 1:
		dataInfo = msg;
		window.location.href = "skipView://" + dataInfo;
		break;
	case 2:
		dataInfo = msg;
		window.location.href = "skipView://" + dataInfo;
		break;
	case 3:
		alert("不支持流浪器底层");
		break;
	}
}
/*******************************************************************************
 * 跳转视图
 * 
 * @param msg
 */
function android_ios_optionAction(msg) {
	switch (appStyle) {
	case 0:
		window.injs.optionAction(msg);
		break;
	case 1:
		dataInfo = msg;
		window.location.href = "optionAction://" + dataInfo;
		break;
	case 2:
		dataInfo = msg;
		window.location.href = "optionAction://" + dataInfo;
		break;
	case 3:
		alert("不支持流浪器底层");
		break;
	}
}
/*******************************************************************************
 * 打开照相机
 * 
 */
function android_ios_openCamera() {
	switch (appStyle) {
	case 0:
		window.injs.openCamera();
		// alert(90);
		break;
	case 1:
		dataInfo = "";
		window.location.href = "openCamera://" + dataInfo;
		break;
	case 2:
		dataInfo = "";
		window.location.href = "openCamera://" + dataInfo;
		break;
	case 3:
		alert("不支持流浪器底层");
		break;

	}
}

/*******************************************************************************
 * 打开相册
 * 
 */
function android_ios_openAlbum() {

	switch (appStyle) {
	case 0:
		window.injs.openAlbum();
		break;
	case 1:
		dataInfo = "";
		window.location.href = "openAlbum://" + dataInfo;

		break;
	case 2:
		dataInfo = "";
		window.location.href = "openAlbum://" + dataInfo;

		break;
	case 3:
		alert("不支持流浪器底层");
		break;

	}
}
/*******************************************************************************
 * 创建数据库
 * 
 */
function android_ios_createDb() {
	switch (appStyle) {
	case 0:
		window.injs.createDb();
		break;
	case 1:
		dataInfo = "";
		window.location.href = "android_ios_createDb://" + dataInfo;
		break;

	case 2:
		dataInfo = "";
		window.location.href = "android_ios_createDb://" + dataInfo;
		break;
	case 3:
		alert("不支持流浪器底层");
		break;
	}

}

// ============================================Native
// 联系Html5====================================
/**
 * 我的界面上的二维码
 * 
 * @param qrCodePath
 * @returns
 */
function qrcodeFormNative(tr) {
}

/**
 * 我的界面上的用户头像
 * 
 * @param qrCodePath
 * @returns
 */
function userHeadFormNative(tr) {
}
/*******************************************************************************
 * 退出当前界面
 * 
 */
function android_ios_finishActivity() {
	switch (appStyle) {
	case 0:
		window.injs.finishActivity();
		// alert(90);
		break;
	case 1:
		dataInfo = "";
		window.location.href = "finishActivity://" + dataInfo;
		break;
	case 2:
		dataInfo = "";
		window.location.href = "finishActivity://" + dataInfo;
		break;
	case 3:
		alert("不支持流浪器底层");
		break;

	}
}
