angular.module('lmsApp.services', [])

.directive('compile', ['$compile', function ($compile) {
  return function(scope, element, attrs) {
      scope.$watch(
        function(scope) {
          return scope.$eval(attrs.compile);
        },
        function(value) {
          element.html(value);
          $compile(element.contents())(scope);
        }
      )};
}])
.factory('dateService', [function() {
	return {
		handleMessageDate: function(messages) {
			var i = 0,
				length = 0,
				messageDate = {},
				nowDate = {},
				weekArray = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
				diffWeekValue = 0;
			if(messages) {
				nowDate = this.getNowDate();
				length = messages.length;
				for(i = 0; i < length; i++) {
					messageDate = this.getMessageDate(messages[i]);
					if(!messageDate) {
						return null;
					}
					if(nowDate.year - messageDate.year > 0) {
						messages[i].lastMessage.time = messageDate.year + "";
						continue;
					}
					if(nowDate.month - messageDate.month >= 0 ||
						nowDate.day - messageDate.day > nowDate.week) {
						messages[i].lastMessage.time = messageDate.month +
							"月" + messageDate.day + "日";
						continue;
					}
					if(nowDate.day - messageDate.day <= nowDate.week &&
						nowDate.day - messageDate.day > 1) {
						diffWeekValue = nowDate.week - (nowDate.day - messageDate.day);
						messages[i].lastMessage.time = weekArray[diffWeekValue];
						continue;
					}
					if(nowDate.day - messageDate.day === 1) {
						messages[i].lastMessage.time = "昨天";
						continue;
					}
					if(nowDate.day - messageDate.day === 0) {
						messages[i].lastMessage.time = messageDate.hour + ":" + messageDate.minute;
						continue;
					}
				}
				// console.log(messages);
				// return messages;
			} else {
				console.log("messages is null");
				return null;
			}

		},
		getNowDate: function() {
			var nowDate = {};
			var date = new Date();
			nowDate.year = date.getFullYear();
			nowDate.month = date.getMonth();
			nowDate.day = date.getDate();
			nowDate.week = date.getDay();
			nowDate.hour = date.getHours();
			nowDate.minute = date.getMinutes();
			nowDate.second = date.getSeconds();
			return nowDate;
		},
		getMessageDate: function(message) {
			var messageDate = {};
			var messageTime = "";
			//2015-10-12 15:34:55
			var reg = /(^\d{4})-(\d{1,2})-(\d{1,2})\s(\d{1,2}):(\d{1,2}):(\d{1,2})/g;
			var result = new Array();
			if(message) {
				messageTime = message.lastMessage.originalTime;
				result = reg.exec(messageTime);
				if(!result) {
					console.log("result is null");
					return null;
				}
				messageDate.year = parseInt(result[1]);
				messageDate.month = parseInt(result[2]);
				messageDate.day = parseInt(result[3]);
				messageDate.hour = parseInt(result[4]);
				messageDate.minute = parseInt(result[5]);
				messageDate.second = parseInt(result[6]);
				// console.log(messageDate);
				return messageDate;
			} else {
				console.log("message is null");
				return null;
			}
		},
		//秒转换成时分秒
		formatSeconds : function(formatObj) { //{value:value,showMinute:showMinute,showHours:showHours,fromatsp:fromatsp}  
											//注：value：秒数，showMinute：是否以秒分显示，showHours：是否以秒分时显示，fromatsp：true->：分割 false:以时分秒分割
			var theTime = parseInt(formatObj.value);// 秒 
			var theTime1 = 0;// 分 
			var theTime2 = 0;// 小时 
			if(theTime > 60 && formatObj.showMinute) { 
				theTime1 = parseInt(theTime/60); 
				theTime = parseInt(theTime%60); 
				if(theTime1 > 60 && formatObj.showHours && formatObj.showMinute) { 
					theTime2 = parseInt(theTime1/60); 
					theTime1 = parseInt(theTime1%60); 
				} 
			} 
			var result;
			if(theTime < 10 && (theTime > 0 || theTime1 > 0)){
				result = "0"+parseInt(theTime)+(formatObj.formatsp?"":"秒"); 
			}else{
				result = ""+parseInt(theTime)+(formatObj.formatsp?"":"秒"); 
			}
			
			if(theTime1 > 0){
				if(theTime1 < 10){
					result = "0"+parseInt(theTime1)+(formatObj.formatsp?":":"分")+result; 
				}else{
					result = ""+parseInt(theTime1)+(formatObj.formatsp?":":"分")+result; 
				}
			}
			
			if(theTime2 > 0) { 
				if(theTime2 < 10){
					result = "0"+parseInt(theTime2)+(formatObj.formatsp?":":"小时")+result; 
				}else{
					result = ""+parseInt(theTime2)+(formatObj.formatsp?":":"小时")+result; 
				}
			
			} 
			return result; 
		},
		convertNumber:function(num) {
		    var ReturnValue = "";
		    var TB = "一二三四五六七八九十";
		    if (num < 100 && num > 0) {
		        if (num > 19) ReturnValue += TB.charAt(num / 10 - 1);
		        if (num >= 10) ReturnValue += "十";
		        if (num % 10 != 0) ReturnValue += TB.charAt(num % 10 - 1);
		    }
		    return ReturnValue;
		}
		
	};
}])

.factory("transFormFactory",function(){
	return {
		transForm : function(obj){
			var str = [];  
		    for(var p in obj){  
		      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
		    }  
		    return str.join("&");  
		}
	};
})

/***
 * 
 * localStorage数据管理
 * 
 * 
 * 
 * 
 * 
 */
.factory('localStorageService', [function() {
	return {
		//get获取数据
		get: function localStorageServiceGet(key, defaultValue) {
			var stored = localStorage.getItem(key);
			try {
				stored = angular.fromJson(stored);
			} catch(error) {
				stored = null;
			}
			if(defaultValue && stored === null) {
				stored = defaultValue;
			}
			return stored;
		},
		//更新，保持数据
		update: function localStorageServiceUpdate(key, value) {
			if(value) {
				localStorage.setItem(key, angular.toJson(value));
			}
		},
		//按照键值清理数据
		clear: function localStorageServiceClear(key) {
			localStorage.removeItem(key);
		},
		clearAll:function(){
			localStorage.clear();
		}
	};
}])

	/***
	 * 
	 * storage 数据管理
	 * 
	 */
	.factory('Storage', function() {
		return {
			set: function(key, data) {
				return window.localStorage.setItem(key, window.JSON.stringify(data));
			},
			get: function(key) {

				return window.JSON.parse(window.localStorage.getItem(key));
			},
			remove: function(key) {
				return window.localStorage.removeItem(key);
			}
		};
	})

.factory('listViewFactory', function($rootScope, $resource, ENV) {

	var ApiUrl = ENV.api,
		// 用来存储话题类别的数据结构，包含了下一页、是否有下一页等属性
		topics = {},
		catid = 20;

	var resource = $resource(ApiUrl, {}, {
		query: {
			method: 'get',
			params: {
				a: 'getPortalList',
				catid: '@catid',
				page: '@page'

			},
			timeout: 20000
		}
	});

	return {

		//获取第一页的数据
		getTopTopics: function() {

			var hasNextPage = true; //是否有下一页

			resource.query({
				catid: catid,
				page: 1
			}, function(r) {

				if(r.result.length < 20) { //来判断是否有下一页数据
					hasNextPage = false;
				}
				topics[catid] = {

						hasNextPage: hasNextPage,
						'nextPage': 2,
						'data': r.result
					}
					//在这里请求完成以后  通知controller

				$rootScope.$broadcast('PortalList.portalsUpdated');

			})
		},
		//返回我们保存的数据
		getArticles: function() {
			if(topics[catid] === undefined) {

				return false
			}

			//  console.log(topics[catid].data);

			return topics[catid].data;

		},
		getMoreTopics: function() {

			//为了解决一步加载的时候数据还没有加载完成  然后请求loadMore的时候  找不到数据
			if(topics[catid] === undefined) {
				return false;
			}

			//获取以前的数据
			var hasNextPage = topics[catid].hasNextPage;
			var nextPage = topics[catid].nextPage;
			var moreTopicsData = topics[catid].data;

			//console.log(moreTopicsData);

			resource.query({
				catid: catid,
				page: nextPage
			}, function(r) {

				nextPage++;

				if(r.result.length < 20) { //来判断是否有下一页数据
					hasNextPage = false;
				}
				moreTopicsData = moreTopicsData.concat(r.result);
				topics[catid] = {
					hasNextPage: hasNextPage,
					'nextPage': nextPage,
					'data': moreTopicsData
				}

				//在这里请求完成以后  通知controller

				$rootScope.$broadcast('PortalList.portalsUpdated');

			})
		},
		setArticleCateId: function(cate_id) { //点击分类加载数据

			catid = cate_id;
			this.getTopTopics();

		},
		hasNextPage: function() {
			if(topics[catid] === undefined) {
				return false;
			}
			return topics[catid].hasNextPage;
		}

	}

});








