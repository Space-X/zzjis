var volunteerApp = angular.module('volunteerApp', ['ionic', 'ui.router', 'lmsApp.services', 'lmsApp.config']);
var remberme = '0';

volunteerApp.config(function($ionicConfigProvider) {
	$ionicConfigProvider.views.swipeBackEnabled(true);
	$ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon(
		'ion-ios-arrow-thin-left');
	$ionicConfigProvider.platform.android.backButton.previousTitleText('')
		.icon('ion-android-arrow-back');
	$ionicConfigProvider.platform.ios.views.transition('ios');
	$ionicConfigProvider.platform.android.views.transition('android');
});
// 路由设置
volunteerApp.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state("volunteer", { // 底部导航
			url: "/volunteer",
			templateUrl: 'htmls/volunteer/volunteer.html',
			controller: 'volunteerCtrl',
		})
		.state("volunteerContnet", { // 底部导航
			url: "/volunteerContnet",
			templateUrl: 'htmls/volunteer/volunteerContnet.html',
			controller: 'volunteerContnetCtrl',
		}).state("volunteerResult", { // 底部导航
			url: "/volunteerResult",
			templateUrl: 'htmls/volunteer/volunteerResult.html',
			controller: 'volunteerResultCtrl',
		}).state("gkLoging", { // 底部导航
			url: "/gkLoging",
			templateUrl: 'htmls/volunteer/gkLoging.html',
			controller: 'gkLogingCtrl',
		}).state("registerView", { // 底部导航
			url: "/registerView",
			templateUrl: 'htmls/volunteer/register_view.html',
			controller: 'registerViewCtrl',
		});

	$urlRouterProvider.otherwise("/volunteer");
	navigatorUserAgent();
});
/****
 * 志愿控制
 */
volunteerApp.controller('volunteerCtrl', function($scope, $state, $timeout, $ionicPopup, $ionicLoading,
		localStorageService) {
		$scope.loaging_btn = function() {
			$state.go("gkLoging", {});
		}

		$scope.register_btn = function() {
			$state.go("registerView", {});
		}
		$scope.outLoaging_btn = function() {
			lmsapp.localStorageSetValue('isLoging', 0);
			lmsapp.showToast($ionicLoading, '注销成！');
			$timeout(function() {
				lmsapp.hideLoadingPro($ionicLoading); // 3秒后关闭弹窗

			}, 1000);

		}
		$scope.nextAction = function() {
			var isloging = lmsapp.localStorageGetValue('isLoging');
//			if(isloging == 1) {
		$state.go("volunteerContnet", {});
//			} else {

			//	lmsapp.alertPopup($ionicPopup, '提示', '请您先登录！');
			//}

		}

	})
	/***
	 * 志愿填写页面
	 */
volunteerApp.controller('volunteerContnetCtrl', function($scope, $state, $window, $ionicPopup,
		localStorageService) {
		$scope.back_history = function() {
			$window.history.back();
		}
		$scope.wlk_selectValue = "文科";
		$scope.isgjzx_selectValue = "否";
		$scope.isdfzx_selectValue = "否";
		$scope.ssmz_selectValue = "否";
		$scope.money_selectValue = "100";

		$scope.sure_btn = function(score, wlk_selectValue, isgjzx_selectValue, isdfzx_selectValue, ssmz_selectValue, money_selectValue) {

			if(score == undefined) {
				lmsapp.alertPopup($ionicPopup, '提示', '请输入高考分数！');

			} else {
				lmsapp.confirmPopup($scope, $ionicPopup, '提示', '您的信息是否填写正确,确定查询吗？',
					function callBack(res) {

						if(res) {
							console.log('You are sure');

						} else {
							console.log('You are not sure');
							$state.go("volunteerResult", {});
						}

					});
			}

		}
	})
	/***
	 * 
	 * 志愿结果页面
	 */
volunteerApp.controller('volunteerResultCtrl', function($scope, $state, $window, $ionicPopup,
	localStorageService) {
	$scope.back_history = function() {
		$window.history.back();
	}

})

volunteerApp.controller('gkLogingCtrl', function($scope, $state, $http, $window, $timeout,
	$ionicPopup, $ionicLoading, ENV, localStorageService) {

	if(appStyle == 0) {
		$scope.isshowRemmber = true;
	} else {
		$scope.isshowRemmber = false;
	}
	// 记住密码,用户名编辑，密码编辑
	var checkboxView = document.getElementById('checkbox');
	checkboxView.blur();
	angular.element(document).ready(function() {
		var userName = localStorageService.get('username', '');
		var userPaw = localStorageService.get('userpaw', '');
		if(userName != null && userPaw != null) {
			$scope.username = userName;
			$scope.userpaw = userPaw;
			checkboxView.checked = true;
			checkboxImg.src = 'imgs/icon_yuangetno.png';

		}
	});
	$scope.back_history = function() {
		$window.history.back();

	};

	$scope.startloading_btn = function(username, userpaw) {
		loading(username, userpaw);
	};
	$scope.todoSomething = function($event) {
		if($event.keyCode == 13) { //回车

			loading(username, userpaw);
		}
	}

	$scope.checkbox_input = function() {
			checkboxMethod();
		}
		// 注册
	$scope.register_btn = function() {
			$state.go("registerView", {});
		}
		/* 登录* */
	function loading(username, userpaw) {
		if(username == undefined) {
			lmsapp.alertPopup($ionicPopup, '提示', '请输入电话号码！');

		} else if(userpaw == undefined) {

			lmsapp.alertPopup($ionicPopup, '提示', '请输入密码！');
		} else {
			lmsapp.showLoadingPro($ionicLoading);
			var url = lmsapp.gkAppLoging($http, ENV.rootUrl,
				username, userpaw);
			$http.get(url).success(function(response) {
				lmsapp.hideLoadingPro($ionicLoading);

				var user = response.user;
				var userid = user.ID;
				var username = user.USERNAME;
				var mobile = user.MOBILE;

				lmsapp.localStorageSetValue('userid', userid);
				lmsapp.localStorageSetValue('username', username);
				lmsapp.localStorageSetValue('mobile', mobile);
				lmsapp.localStorageSetValue('isLoging', 1);
				lmsapp.showToast($ionicLoading, '登录成功！');
				$timeout(function() {
					lmsapp.hideLoadingPro($ionicLoading); // 3秒后关闭弹窗
					$window.history.back();
				}, 1000);

			}).error(function(e) {
				lmsapp.hideLoadingPro($ionicLoading);
				lmsapp.showToast($ionicLoading, '登录失败！');
				$timeout(function() {
					lmsapp.hideLoadingPro($ionicLoading); // 3秒后关闭弹窗
					$state.go("gkLoging", {});
				}, 1000);
			});
			if(remberme == 1) {
				localStorageService.update('username', username);
				localStorageService.update('userpaw', userpaw);
			}

		}
	}
	/** 记住密码* */
	function checkboxMethod() {
		var checkboxImg = document.getElementById('checkboxImg');
		if(checkboxView.checked == false) {
			remberme = '0';
			checkboxImg.src = 'imgs/icon_yuangetyes.png';
			localStorageService.clear('username');
			localStorageService.clear('userpaw');
		} else {
			remberme = '1';
			checkboxImg.src = 'imgs/icon_yuangetno.png';
		}
	}

});

volunteerApp.controller('registerViewCtrl', function($scope, $state, $http, $window, $ionicLoading, $ionicPopup, $timeout, ENV) {
	$scope.back_load = function() {
		$window.history.back();
		// $state.go("/gkLoging", {});
	}
	$scope.onSwipeRight = function() {
		// alert(0);
		$state.go("gkLoging", {});

	}
	$scope.register_btn = function(username, usermobile, userpaw, againUserpaw) {
		if(username == undefined) {
			lmsapp.alertPopup($ionicPopup, '提示', '请输入用户名！');
		} else if(usermobile == undefined) {

			lmsapp.alertPopup($ionicPopup, '提示', '请输入电话号码！');
		} else if(userpaw == undefined) {

			lmsapp.alertPopup($ionicPopup, '提示', '请输入密码！');
		} else if(againUserpaw == undefined) {

			lmsapp.alertPopup($ionicPopup, '提示', '请再次输入密码！');
		} else {

			lmsapp.showLoadingPro($ionicLoading);
			var url = lmsapp.gkAppRegister($http, ENV.rootUrl,
				username, usermobile, userpaw);
			$http.get(url).success(function(response) {
				lmsapp.hideLoadingPro($ionicLoading);

				var result = response.result;
				var state = response.state;
				if(state == 1) {
					lmsapp.showToast($ionicLoading, '注册成功！');
					$window.history.back();
				} else {
					lmsapp.showToast($ionicLoading, result);
				}

				$timeout(function() {
					lmsapp.hideLoadingPro($ionicLoading); // 3秒后关闭弹窗

				}, 1000);

			}).error(function(e) {
				lmsapp.hideLoadingPro($ionicLoading);
				lmsapp.showToast($ionicLoading, '注册失败！');
				$timeout(function() {
					lmsapp.hideLoadingPro($ionicLoading); // 3秒后关闭弹窗
					$window.history.back();
				}, 1000);
			});

		}
	}

});