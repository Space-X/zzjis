var TextApp = angular.module('TextApp', ['ionic', 'ui.router', 'lmsApp.services']);

TextApp.config(function($ionicConfigProvider) {
	$ionicConfigProvider.views.swipeBackEnabled(true);
	$ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon(
		'ion-ios-arrow-thin-left');
	$ionicConfigProvider.platform.android.backButton.previousTitleText('')
		.icon('ion-android-arrow-back');
	$ionicConfigProvider.platform.ios.views.transition('ios');
	$ionicConfigProvider.platform.android.views.transition('android');
});

// 路由设置
TextApp.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state("textView", { // 底部导航
		url: "/textView",
		templateUrl: 'htmls/textWelcome.html',
		controller: 'textViewCtrl',
	})

	.state("textView1", { // 底部导航
		url: "/textView1",
		templateUrl: 'htmls/textWelcome2.html',
		controller: 'textViewCtrl1',
	});

	$urlRouterProvider.otherwise("/textView");

});

/***
 * 
 * 志愿结果页面
 */
TextApp.controller('textViewCtrl', function($scope, $state, $window, $ionicPopup) {
	//	$scope.back_history = function() {
	//		$window.history.back();
	//	}
	$scope.arr = "lyyy";
	$scope.start = function(a) {

		alert(90)
		$state.go("textView1", {

		});

	}

});

/***
 * 
 * 志愿结果页面
 */
TextApp.controller('textViewCtrl1', function($scope, $state, $window, $ionicPopup, localStorageService) {

	$scope.back_start = function(a) {
		$window.history.back();

	}
	localStorageService.update('lyy', "fdsfsf55555555555sfsfsf");
	$scope.arr = localStorageService.get('lyy', '90');

});