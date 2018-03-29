/** *ios成功回调* */
var callBackResult;
/** *ios成功回调时间* */
var requstTime = 200000;
/** *时间计时器 */
var myInterval;
/** 用户id、用户名 */
var userid = "",
	usercode = "",
	fileServer = "";
// =====================================================ios底层共享层=================================================

window.onload = function() {
	// 初始化
	lmsapp.initialize();
};
/*******************************************************************************
 * 
 * 数据保存
 */
var lmsapp = {
	initialize: function() {
		// if(window.localStorage){
		// alert('This browser supports localStorage');
		// }else{
		// alert('This browser does NOT support localStorage');
		// }
		//		
		var userId = this.localStorageGetValue('userid');
		var userCode = this.localStorageGetValue('usercode');
		var FileServer = this.localStorageGetValue('fileServer');
		if(userId == null) {
			userid == "30008";
			usercode = "75a6283c-041b-4aba-8bc8-dd2292b0d13f";
			FileServer = "";
		} else {
			userid = userId;
			usercode = userCode;
			fileServer = FileServer;
		}
		return userid + ";" + usercode + ";" + fileServer;
	},
	// 添加数据
	localStorageSetValue: function(key, value) {
		return window.localStorage.setItem(key, value);
	},
	// 获取数据
	localStorageGetValue: function(key) {
		// window.JSON.parse(

		return window.localStorage.getItem(key);

	},
	// 移除数据
	localStorageRemove: function(key) {
		return window.localStorage.removeItem(key);

	},
	/*
	 * 键盘事件监听
	 * 
	 * @param onkeyDownCallBack
	 */
	windowSoftInputKey: function(onkeyDownCallBack) {
		window.document.onkeydown = disableRefresh;

		function disableRefresh(evt) {
			evt = (evt) ? evt : window.event
			onkeyDownCallBack(evt.keyCode);

		}
		return "";
	},
	/***************************************************************************
	 * 显示加载进度
	 */
	showLoadingPro: function($ionicLoading) {
		$ionicLoading.show({
			content: 'Loading',
			animation: 'fade-in',
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 0
		});
		return "";
	},

	showToast: function($ionicLoading, content) {

		$ionicLoading.show({
			template: content
		});
	},

	/***************************************************************************
	 * 隐藏加载进度
	 */
	hideLoadingPro: function($ionicLoading) {
		$ionicLoading.hide();
		return "";
	},
	/***
	 * 对话框
	 * @param {Object} $ionicPopup
	 * @param {Object} title_
	 * @param {Object} content
	 */
	alertPopup: function($ionicPopup, title_, content) {
		var alertPopup = $ionicPopup.alert({
			title: title_,
			template: content,
			buttons: [{
				text: '<b>确定</b>',
				type: 'button-positive',
				onTap: function(e) {
					//        if (!$scope.data.wifi) {
					//          //必须输入Wifi密码
					//          e.preventDefault();
					//        } else {
					//          return $scope.data.wifi;
					//        }
				}
			}]
		});
		alertPopup.then(function(res) {
			console.log('Thank you for not eating my delicious ice cream cone');
		});

	},
	/***
	 * 对话框
	 */
	confirmPopup: function($scope, $ionicPopup, title_, content, callBack) {
		var confirmPopup = $ionicPopup.confirm({
			title: title_,
			template: content,
			scope: $scope,
			buttons: [{
				text: '取消'
			}, {
				text: '<b>确定</b>',
				type: 'button-positive',
				onTap: function(e) {
					//        if (!$scope.data.wifi) {
					//          //必须输入Wifi密码
					//          e.preventDefault();
					//        } else {
					//          return $scope.data.wifi;
					//        }
				}
			}]
		});
		confirmPopup.then(function(res) {
			callBack(res);
			//			if(res) {
			//				console.log('You are sure');
			//			} else {
			//				console.log('You are not sure');
			//			}
		});
	},

	/***************************************************************************
	 * 搜索好友
	 */
	searchFriendsRequst: function($http, rootUrl, content) {
		var url = rootUrl + "/ContactModule!queryTbuserList.action?&userid=" +
			userid + "&usercode=" + usercode + "&useralias=" + content;
		console.log("url", url);
		htmlLoge(url);
		return url;
	},
	/***************************************************************************
	 * 搜索群
	 */
	searchGroupList: function($http, rootUrl, content) {
		var url = rootUrl + "/ContactModule!queryGroupList.action?&userid=" +
			userid + "&usercode=" + usercode + "&keyword=" + content;
		console.log("url", url);

		htmlLoge(url);
		return url;
	},
	/***************************************************************************
	 * 添加好友
	 */
	addFriendsRequst: function($http, rootUrl, friendid) {
		var url = rootUrl + "/ContactModule!addBuddy.action?&userid=" + userid +
			"&usercode=" + usercode + "&friendid=" + friendid;
		console.log("url", url);
		return url;
	},
	/***************************************************************************
	 * 删除好友
	 */
	deleteFriends: function($http, rootUrl, userid, usercode, tfid) {
		// var url = rootUrl + "/ContactModule!deleteFriends.action?&userid="
		// + userid + "&usercode=" + usercode + "&friendid=" + friendid;
		var url = rootUrl + "/ContactModule!deleteFriends.action?&userid=" +
			userid + "&usercode=" + usercode + "&tfid=" + tfid;
		console.log("url", url);

		htmlLoge(url);
		return url;
	},
	/***************************************************************************
	 * 查询好友
	 */
	queryFriendsList: function($http, rootUrl, userid, usercode) {
		var url = rootUrl + "/ContactModule!queryMyFriendsList.action?&userid=" +
			userid + "&usercode=" + usercode;
		console.log("url", url);

		htmlLoge(url);
		return url;
	},

	/***************************************************************************
	 * 查询好友信息
	 */
	checkFriendsInfo: function($http, rootUrl, userid, usercode, friendid) {
		var url = rootUrl + "/ContactModule!checkFriendsInfo.action?&userid=" +
			userid + "&usercode=" + usercode + "&friendid=" + friendid;
		console.log("url", url);
		htmlLoge(url);
		return url;
	},
	/**
	 * 查询群信息
	 */
	checkGroupInfo: function($http, rootUrl, userid, usercode, ugid) {
		var url = rootUrl + "/ContactModule!checkGroupInfo.action?&userid=" +
			userid + "&usercode=" + usercode + "&ugid=" + ugid;
		console.log("url", url);
		htmlLoge(url);
		return url;
	},

	/***************************************************************************
	 * 我的界面，搜索好友
	 */
	searchExistenceFriendsRequst: function($http, rootUrl, keyword) {
		// var url = rootUrl + "/ContactModule!queryMyFriends.action?&userid="
		// + userid + "&keyword=" + encodeURI(keyword);
		var url = rootUrl + "/ContactModule!queryMyFriends.action?&userid=" +
			userid + "&keyword=" + keyword;
		console.log("url", url);
		htmlLoge(url);
		return url;
	},
	/***************************************************************************
	 * 班级讨论组——查询班级讨论组成员
	 */
	queryMyClassMemberList: function($http, rootUrl, userid, usercode) {
		var url = rootUrl +
			"/ContactModule!queryMyClassMemberList.action?&userid=" +
			userid + "&usercode=" + usercode;
		console.log("url", url);
		htmlLoge(url);
		return url;
	},
	/***************************************************************************
	 * 朋友信息
	 */
	queryTbuserInfoMap: function($http, rootUrl, userid, usercode, friendid) {
		var url = rootUrl + "/ContactModule!queryTbuserInfoMap.action?&userid=" +
			userid + "&usercode=" + usercode + "&userid2=" + friendid;
		console.log("url", url);
		htmlLoge(url);
		return url;
	},
	/***************************************************************************
	 * 创建我的群组
	 * 
	 * @param {Object}
	 *            $http
	 * @param {Object}
	 *            rootUrl
	 */
	createMyGroup: function($http, rootUrl, userid, usercode, groupname,
		grouptype, imageB2) {
		var url = rootUrl + "/ContactModule!createMyGroup.action?&userid=" +
			userid + "&usercode=" + usercode + "&groupname=" + groupname +
			"&grouptype=" + grouptype + "&imageB2=" + imageB2;
		console.log("url", url);
		htmlLoge(url);
		return url;
	},
	/***************************************************************************
	 * 删除我的群
	 */
	deleteMyGroup: function($http, rootUrl, userid, usercode, ugid) {
		var url = rootUrl + "/ContactModule!deleteMyGroup.action?&userid=" +
			userid + "&usercode=" + usercode + "&ugid=" + ugid;
		console.log("url", url);
		htmlLoge(url);
		return url;
	},
	/***************************************************************************
	 * 删除某群某成员(支持多删除)
	 */
	deleteMemberToMyGroup: function($http, rootUrl, userid, usercode, ugdid) {
		var url = rootUrl +
			"/ContactModule!deleteMemberToMyGroup.action?&userid=" +
			userid + "&usercode=" + usercode + "&ugdid=" + ugdid;
		console.log("url", url);
		htmlLoge(url);
		return url;
	},
	/***************************************************************************
	 * 退群
	 */
	deleteMemberMyGroup: function($http, rootUrl, userid, usercode, ugid) {
		var url = rootUrl +
			"/ContactModule!deleteMemberMyGroup.action?&userid=" + userid +
			"&usercode=" + usercode + "&ugid=" + ugid;
		console.log("url", url);
		htmlLoge(url);
		return url;
	},

	/***************************************************************************
	 * 查询群列表
	 */
	queryMyGroupList: function($http, rootUrl, userid, usercode) {
		var url = rootUrl + "/ContactModule!queryMyGroupList.action?&userid=" +
			userid + "&usercode=" + usercode;
		console.log("url", url);
		htmlLoge(url);
		return url;
	},
	/***************************************************************************
	 * 群聊——查询群成员
	 */
	queryMemberToMyGroup: function($http, rootUrl, userid, usercode, ugid) {
		var url = rootUrl +
			"/ContactModule!queryMemberToMyGroup.action?&userid=" +
			userid + "&usercode=" + usercode + "&ugid=" + ugid;
		console.log("url", url);
		htmlLoge(url);
		return url;
	},
	/***************************************************************************
	 * 群聊——根据群组id查询群组
	 */
	queryGroupMapById: function($http, rootUrl, userid, usercode, ugid) {
		var url = rootUrl + "/ContactModule!queryGroupMapById.action?&userid=" +
			userid + "&usercode=" + usercode + "&ugid=" + ugid;
		console.log("url", url);
		htmlLoge(url);
		return url;
	},

	/***************************************************************************
	 * 
	 * —添加申请好友记录
	 */
	addApplyRecord: function($http, rootUrl, userid, usercode, applyid,
		acceptid) {
		var url = rootUrl + "/ContactModule!addApplyRecord.action?&userid=" +
			userid + "&usercode=" + usercode + "&applyid=" + applyid +
			"&acceptid=" + acceptid;
		console.log("url", url);
		htmlLoge(url);
		return url;
	},
	/***************************************************************************
	 * 
	 * 查询好友申请记录
	 */
	queryApplyRecord: function($http, rootUrl, userid, usercode, acceptid) {
		var url = rootUrl + "/ContactModule!queryApplyRecord.action?&userid=" +
			userid + "&usercode=" + usercode + "&acceptid=" + acceptid;
		console.log("url", url);
		htmlLoge(url);
		return url;
	},
	/***************************************************************************
	 * 
	 * 邀请好友进群
	 */
	addMemberToMyGroup: function($http, rootUrl, userid, usercode, ugid,
		new_members, status) {
		var url = rootUrl + "/ContactModule!addMemberToMyGroup.action?&userid=" +
			userid + "&usercode=" + usercode + "&ugid=" + ugid +
			"&new_members=" + new_members + "&status=" + status;
		console.log("url", url);
		htmlLoge(url);
		return url;
	},

	/***************************************************************************
	 * 我的个人信息头像
	 */
	userHeadInfo: function($http, rootUrl, userid, usercode) {
		var url = rootUrl + "/OwnModule!headPortrait.action?&userid=" + userid +
			"&usercode=" + usercode;
		console.log("url", url);
		htmlLoge(url);
		return url;
	},
	/***************************************************************************
	 * 我的个人信息二维码
	 */
	qrCodeInfo: function($http, rootUrl, userid, usercode) {
		var url = rootUrl + "/OwnModule!QRCode.action?&userid=" + userid +
			"&usercode=" + usercode;
		console.log("url", url);
		htmlLoge(url);
		return url;
	},
	/***************************************************************************
	 * 查询群公告
	 */
	queryGroupAnnouncement: function($http, rootUrl, userid, usercode, ugid) {
		var url = rootUrl +
			"/ContactModule!queryGroupAnnouncement.action?&userid=" +
			userid + "&usercode=" + usercode + "&ugid=" + ugid;
		console.log("url", url);
		htmlLoge(url);
		return url;
	},
	/***************************************************************************
	 * 查询单个的群公告信息
	 */
	querySingleGroupInfo: function($http, rootUrl, userid, usercode, ugid,
		msgid) {
		var url = rootUrl +
			"/ContactModule!querySingleGroupInfo.action?&userid=" +
			userid + "&usercode=" + usercode + "&ugid=" + ugid +
			"&msgid=" + msgid;
		console.log("url", url);
		htmlLoge(url);
		return url;
	},

	/***************************************************************************
	 * 发送群公告
	 */
	sendGroupAnnouncement: function($http, rootUrl, userid, usercode, ugid,
		msgTitle, msgContent) {
		var url = rootUrl +
			"/ContactModule!sendGroupAnnouncement.action?&userid=" +
			userid + "&usercode=" + usercode + "&ugid=" + ugid +
			"&msgTitle=" + msgTitle + "&msgContent=" + msgContent;
		console.log("url", url);
		htmlLoge(url);
		return url;
	},
	/***************************************************************************
	 * 删除群公告
	 */
	deleteGroupAnnouncement: function($http, rootUrl, userid, usercode, msgid) {
		var url = rootUrl +
			"/ContactModule!deleteGroupAnnouncement.action?&userid=" +
			userid + "&usercode=" + usercode + "&msgid=" + msgid;
		console.log("url", url);
		htmlLoge(url);
		return url;
	},
	/***************************************************************************
	 * 修改群公告
	 */
	updateGroupAnnouncement: function($http, rootUrl, userid, usercode, msgid,
		msgTitle, msgContent) {

		var url = rootUrl +
			"/ContactModule!updateGroupAnnouncement.action?&userid=" +
			userid + "&usercode=" + usercode + "&msgid=" + msgid +
			"&msgTitle=" + msgTitle + "&msgContent=" + msgContent;
		console.log("url", url);
		htmlLoge(url);
		return url;
	},
	/***************************************************************************
	 * 修改群公告
	 */
	cssappUserInfo: function($http, rootUrl, userid, usercode, msgid) {

		var url = rootUrl +
			"/LoginAuth!personalInfo.action?&userid=" +
			userid + "&usercode=" + usercode;
		console.log("url", url);

		return url;
	},
	/***************************************************************************
	 * 高考登录
	 */
	gkAppLoging: function($http, rootUrl, mobile, userpwd) {

		var url = rootUrl +
			"/UserInquiry!loging.action?mobile=" +
			mobile + "&userpwd=" + userpwd;
		console.log("url", url);

		return url;
	},
	/***************************************************************************
	 * 高考登录
	 */
	gkAppRegister: function($http, rootUrl, username, mobile, userpsd) {

		var url = rootUrl +
			"/UserInquiry!gkRegister.action?username=" +
			username + "&mobile=" + mobile + "&userpsd=" + userpsd;
		console.log("url", url);

		return url;
	},

};

/*******************************************************************************
 * 获取链接中的id
 */
function getArgs(strName) {
	// var strHref = window.document.location.href;
	var strHref = window.document.location.search;
	var intPos = strHref.indexOf("?");
	var strRight = strHref.substr(intPos + 1);
	var arrTmp = strRight.split("&");
	for(var i = 0; i < arrTmp.length; i++) {
		var arrTemp = arrTmp[i].split("=");
		if(arrTemp[0].toUpperCase() == strName.toUpperCase())
			return arrTemp[1];
	}
	return "";
}
/*******************************************************************************
 * 
 * 保存用户信息
 * 
 * @param {Object}
 *            userinfo
 * 
 */
function saveUserInfoAtH5(userinfo) {
	if(userinfo != null || userinfo != undefined || userinfo != '') {
		var obj = userinfo.split(',');
		lmsapp.localStorageSetValue('userid', obj[0]);
		lmsapp.localStorageSetValue('usercode', obj[1]);
		lmsapp.localStorageSetValue('fileServer', obj[2]);
	}
}
/*******************************************************************************
 * ios请求原生函数
 * 
 * @param {Object}
 *            action
 * @param {Object}
 *            args
 * @param {Object}
 *            callBackSuccessFul
 */
function requstNative(action, args, callBackSuccessFul) {
	window.location.href = action + "://" + args;
	myInterval = setInterval(function() {
		if(requstTime == 0) {
			clearInterval(myInterval);
			callBackSuccessFul(callBackResult);
			requstTime = 20000;
		}
	}, 10);
};
/*******************************************************************************
 * ios 传值桥
 * 
 * @param {Object}
 *            Examts
 */
function jsBridge(Examts) {
	callBackResult = Examts;
	requstTime = 0;
	return callBackResult;
};

/*******************************************************************************
 * 更新 传值桥
 * 
 * @param {Object}
 *            JsonMsg
 */
function upDataHtmlBridge(JsonMsg) {
	callBackResult = JsonMsg;
	requstTime = 0;
}
/*******************************************************************************
 * 更新html页面信息
 * 
 * @param {Object}
 *            callBackSuccessFul
 */
function upDataContentForHtml(callBackSuccessFul) {
	myInterval = setInterval(function() {
		if(requstTime == 0) {
			callBackSuccessFul(callBackResult);
			requstTime = 200000;
		}
	}, 2000);
}
/*******************************************************************************
 * 关闭时间
 * 
 */
function clearTimer() {
	clearInterval(myInterval);

}
// ==========================================================================

/*******************************************************************************
 * android专有
 * 
 * @param {Object}
 *            callBackSuccessFul
 */
function android_messageJsonDataFormNative(callBackSuccessFul) {
	var result = window.injs.messageJsonDataFormNative();
	callBackSuccessFul(result);
};
/*******************************************************************************
 * ios专有
 */
function ios_messageJsonDataFormNative(callBackSuccessFul) {
	var action = "messageJsonDataFormNative";
	requstNative(action, null, callBackSuccessFul);
};

/*******************************************************************************
 * android消息详情
 * 
 * @param {Object}
 *            toCharUsername
 * @param {Object}
 *            callBackSuccessFul
 */
function android_messageDetailsJsonDataFormNative(toCharUsername, direction,
	callBackSuccessFul) {
	var result = window.injs.messageDetailsJsonDataFormNative(toCharUsername,
		direction);
	callBackSuccessFul(result);
}

/*******************************************************************************
 * ios 消息详情
 * 
 * @param {Object}
 *            toCharUsername
 * @param {Object}
 *            callBackSuccessFul
 */
function ios_messageDetailsJsonDataFormNative(toCharUsername, direction,
	callBackSuccessFul) {
	var action = "messageDetailsJsonDataFormNative";
	var args = toCharUsername + ";" + direction;
	requstNative(action, encodeURI(args), callBackSuccessFul);
}
/*******************************************************************************
 * android拍照专有
 * 
 * @param callBackSuccessFul
 */
function android_takePictureFormNative(callBackSuccessFul) {
	var result = window.injs.takePicture();
	callBackSuccessFul(result);
}
/*******************************************************************************
 * ios拍照专有
 * 
 * @param callBackSuccessFul
 */
function ios_takePictureFormNative(callBackSuccessFul) {
	var action = "takePicture";
	var args = "";
	requstNative(action, encodeURI(args), callBackSuccessFul);
}

/**
 * 
 * android 个人信息
 * 
 * @param {Object}
 *            callBackSuccessFul
 */

function android_personalInfoFormNative(callBackSuccessFul) {
	var result = window.injs.personalInfoFormNative();
	callBackSuccessFul(result);
}
/*******************************************************************************
 * 
 * ios 个人信息
 * 
 * @param {Object}
 *            callBackSuccessFul
 */
function ios_personalInfoFormNative(callBackSuccessFul) {
	var action = "personalInfoFormNative";
	requstNative(action, null, callBackSuccessFul);
}
/*******************************************************************************
 * android 我的个人信息头像
 * 
 * @param {Object}
 *            callBackSuccessFul
 */
function android_userHeadInfoFormNative(callBackSuccessFul) {
	var userHeadPath = window.injs.userHeadInfoFormNative();
	callBackSuccessFul(userHeadPath);
}
/*******************************************************************************
 * ios 我的个人信息头像
 * 
 * @param {Object}
 *            callBackSuccessFul
 */
function ios_userHeadInfoFormNative(callBackSuccessFul) {
	var action = "userHeadInfoFormNative";
	requstNative(action, null, callBackSuccessFul);
}
/*******************************************************************************
 * android 二维码
 * 
 * @param {Object}
 *            callBackSuccessFul
 */
function android_qrCodeInfoFormNative(callBackSuccessFul) {
	var qrCodePath = window.injs.qrCodeInfoFormNative();
	callBackSuccessFul(qrCodePath);
}
/*******************************************************************************
 * 
 * ios 二维码
 * 
 * @param {Object}
 *            callBackSuccessFul
 */
function ios_qrCodeInfoFormNative(callBackSuccessFul) {
	var action = "qrCodeInfoFormNative";
	requstNative(action, null, callBackSuccessFul);

}

/*******************************************************************************
 * android 我的关于系统
 * 
 * @param {Object}
 *            callBackSuccessFul
 */
function android_versionInfoFormNative(callBackSuccessFul) {
	var version = window.injs.versionInfoFormNative();
	callBackSuccessFul(version);
}
/*******************************************************************************
 * ios 我的关于系统
 * 
 * @param {Object}
 *            callBackSuccessFul
 */
function ios_versionInfoFormNative(callBackSuccessFul) {
	var action = "versionInfoFormNative";
	requstNative(action, null, callBackSuccessFul);
}