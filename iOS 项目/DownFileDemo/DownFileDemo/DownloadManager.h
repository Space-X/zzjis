//
//  DownloadManager.h
//  DownFileDemo
//
//  Created by liyuanyou on 9/2/17.
//  Copyright © 2017年 liyuanyou. All rights reserved.
//
// 默认下载管理
#define MyDownloadManager [DownloadManager sharedDownloadManager]
// 设置最大并发数
#define DMaxDownloadCount 5

#import <Foundation/Foundation.h>
#import "DownCenter.h"
#import "DownLoadPathManager.h"


typedef enum{
    Finish,  // 任务添加完成
    Complete,  // 已经下载完成
    Loading ,// 正在下载中
    Normal//暂停
}DownloadBackType;

@interface DownloadManager : NSObject
@property (nonatomic ,strong) NSMutableArray *taskArray; // 所有的任务
@property (nonatomic, copy) void(^reloadData)(); // 回调刷新block

+ (DownloadManager *)sharedDownloadManager;

-( NSMutableArray *)getTaskArray;

// 需要自己管理下载对象时使用这个方法，这个对象不会加入下载中心。当然也支持断点续传。
- (DownCenter *)addTaskSaveName:(NSString *)name UrlStr:(NSString *)urlStr flag:(NSString *)flagStr;
// 回调参数为添加结果
- (void)addTaskSaveName:(NSString *)name urlStr:(NSString *)urlStr flag:(NSString *)flagStr duration:(NSString *)duration backType:(void(^)(DownloadBackType type))type;


-(void)callBackDownStateWithUrl:(NSString*)urlStr andBackType:(void(^)(DownloadBackType type))type;

// 任务是否已经下载完成
- (BOOL)completeFileWithUrl:(NSString *)urlStr;
// 文件是否已经存在于本地中
- (BOOL)exsitTaskWithUrl:(NSString *)urlStr;
// 删除任务同时删除文件。无论下载是否完成，有时候网速比较快，如果任务正在下载，取消会有0.5秒延迟。可在block中实现block的回调。
- (void)deleteTaskWithUrl:(NSString *)urlStr complete:(void(^)())complete;

// 返回已经完成的任务
- (NSMutableArray *)finishedTasks;
// 暂停一个任务
- (void)suspendTask:(DownCenter *)task;
// 开启任务 ，如果达到并发数，你希望提示用户，将代码写在block中
- (void)begainTasks:(DownCenter *)task arriveMax:(void(^)())max;


@end
