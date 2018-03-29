angular.module('lmsApp.routes', [])
	// 路由设置
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider.state("tab", { // 底部导航
			url: "/tab",
			nativeTransitions: null,
			abstract: true,
			templateUrl: "templates/tabs.html",
		}).state('tab.message', { // 消息页面
			url: '/message',
			nativeTransitions: null,
			views: {
				'tab-message': {
					templateUrl: 'templates/tab-message.html',
					controller: "messageCtrl"
				}
			}
		})
		.state('tab.exam', { //
			url: '/exam',
			nativeTransitions: null,
			views: {
				'tab-exam': {
					templateUrl: 'templates/tab-exam.html',
					controller: "examCtrl"
				}
			}
		}).state('tab.find', {
			url: '/find',
			nativeTransitions: null,

			views: {
				'tab-find': {
					templateUrl: 'templates/tab-find.html',
					controller: "findCtrl"
				}
			},
		}).state('tab.setting', {
			url: '/setting',

			nativeTransitions: null,

			views: {
				'tab-setting': {
					templateUrl: 'templates/tab-setting.html',
					controller: "settingCtrl"
				}
			}
		})



		.state('messageDetail', {
			url: '/messageDetail',
			nativeTransitions: null,
			templateUrl: "templates/tab-mui.html",
			controller: "messageDetailCtrl"
		})
		
	

		.state('muiTableBar', {
			url: '/muiTableBar',
			nativeTransitions: null,
			templateUrl: "templates/muiTableBar.html",
			controller: "muiTableBarCtrl"
		})


		.state('refushlistView', {
			url: '/refushlistView',

			templateUrl: "templates/refushlistView.html",
			controller: "listViewCtrl"
		});

		$urlRouterProvider.otherwise("/tab/message");
	});