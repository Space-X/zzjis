angular.module('lmsApp.controllers', [])

/**
 * 注意控制器中用到的服务必须要在服务中声明注册
 * 
 */

.controller('messageCtrl', function($scope, $state, localStorageService) {
	$scope.messages = messages;
	localStorageService.update('examid', '123456');
	var stored = localStorageService.get('examid', '1');
})

.controller('examCtrl', function($scope, $state) {
	$scope.onSwipeRight = function() {

	};
})

.controller('findCtrl', function($scope, $state) {
	$scope.onSwipeRight = function() {

	};
}).controller('settingCtrl', function($scope, $state) {
	$scope.onSwipeRight = function() {

	};
	// 打开相机
	$scope.openCamera = function() {
		openCameraAlbum(0, 1000, function successCallback(result) {
			$scope.imgpath = result;
		});
	};
	// 打开相册
	$scope.openAlbum = function() {
		openCameraAlbum(1, 1000, function successCallback(result) {
			$scope.imgpath = result;
		});
	};
	$scope.messageDetail = function() {
		$state.go("messageDetail", {
			"messageId" : '0'
		});
		// $ionicNativeTransitions.stateGo('messageDetail', {}, {
		// "type": "slide",
		// "direction": "up", // 'left|right|up|down', default 'left' (which is
		// like 'next')
		// "duration": 1000 // in milliseconds (ms), default 400
		// });
	};
	$scope.muiTableBar = function() {
		$state.go("muiTableBar", {});
	};
	$scope.listViewBtn = function() {
		$state.go("refushlistView", {});
	};
	$scope.testViewBtn = function() {

		loadView();

	};

	$scope.deviceBtn = function() {

		deviceInfo();
	};
})

.controller('messageDetailCtrl', function($scope, $state) {

	$scope.muibtn = function() {
//		alert("alert");
	};

})

.controller('muiTableBarCtrl', function($scope, $state) {

})

.controller(
		'listViewCtrl',
		function($scope, $state, $ionicNativeTransitions, listViewFactory, ENV,
				$timeout) {
			$scope.onSwipeRight = function() {

				$state.go("tab.setting");

				// $ionicNativeTransitions.stateGo('tab.setting', {}, {}, {
				// "type" : "slide",
				// "direction" : "left", // 'left|right|up|down', default 'left'
				// // (which is like 'next')
				// "duration" : 250, // in milliseconds (ms), default 400
				// });

			}
			$scope.name = 'listViewCtrl';
			$scope.ENV = ENV;
			$scope.showloading = true;
			// 获取服务器数据保存
			listViewFactory.getTopTopics();
			// 接收到刚才传过来的通知
			$scope.$on('PortalList.portalsUpdated', function() {
				$scope.portalListData = listViewFactory.getArticles();

				// var timer = $timeout( function() {
				// $scope.$broadcast('scroll.infiniteScrollComplete');
				// }, 2000 );

				$scope.$broadcast('scroll.infiniteScrollComplete');
				$scope.showloading = false;

				// 停止广播ion-refresher
			});

			// 下拉更新
			$scope.doRefresh = function() {
				listViewFactory.getTopTopics();
				$scope.$broadcast('scroll.refreshComplete');
			}

			// 上拉更新
			$scope.loadMore = function() {

				console.log('加载更多数据');
				listViewFactory.getMoreTopics();

			}

			$scope.hasNextPage = function() {
				// console.log(PortalsFactory.hasNextPage());
				return listViewFactory.hasNextPage();
			};

			$scope.changeTab = function(cateid, index) {
				var a = document.getElementById('sub_header_list')
						.getElementsByTagName('a');
				for (var i = 0; i < 8; i++) {
					a[i].className = "button button-clear ";
				}
				a[index].className = "button button-clear sub_button_select";
				// 数据请求
				listViewFactory.setArticleCateId(cateid);

			}

		})
