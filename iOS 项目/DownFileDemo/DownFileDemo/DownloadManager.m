//
//  DownloadManager.m
//  DownFileDemo
//
//  Created by liyuanyou on 9/2/17.
//  Copyright © 2017年 liyuanyou. All rights reserved.
//

#import "DownloadManager.h"

@implementation DownloadManager


+ (DownloadManager *)sharedDownloadManager{
    static DownloadManager *manager = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        manager = [[DownloadManager alloc] init];
        [[NSNotificationCenter defaultCenter] addObserver:manager selector:@selector(destructionTask:) name:@"finished" object:nil];
        // 返回未完成的任务
        [manager unfinishedTasks];
        NSLog(@"----------ffdsfdsfsdfds---");
        
    });
    return manager;
}


// 返回未完成的任务
- (NSMutableArray *)unfinishedTasks{
    NSMutableDictionary *plist = [NSMutableDictionary dictionaryWithContentsOfFile:DownloadPath.downloadedPlistPath];
    for (NSString *url in [plist allKeys]) {
        NSDictionary *temp = [plist objectForKey:url];
        
        NSString *saveName = [temp objectForKey:@"saveName"];
        NSString *flagStr = [temp objectForKey:@"flagStr"];
        NSString *duration = [temp objectForKey:@"duration"];
        NSString *state = [temp objectForKey:@"state"];
        if (![self exsitUrlInSelfTaskArr:url] && ([state isEqualToString:@"loading"] || [state isEqualToString:@"waiting"])) {
            DownCenter *task = [[DownCenter alloc] initWithUrl:url flag:flagStr];
            task.saveName = saveName;
            // 此时可以将上次退出前没下载完毕的任务重新添加至下载，添加至下载数组
            task.saveName = saveName;
            task.flagStr = flagStr;
            task.duration = duration;
            [self.taskArray addObject:task];
        }
    }
    return self.taskArray;
}

-( NSMutableArray *)getTaskArray{
       return  self.taskArray;

}
- (DownCenter *)addTaskSaveName:(NSString *)name UrlStr:(NSString *)urlStr flag:(NSString *)flagStr{
    // 先查询当前是否已经下载完成
    if (![self completeFileWithUrl:urlStr]) {
        DownCenter *download = [[DownCenter alloc] initWithUrl:urlStr flag:flagStr];
        download.saveName = name;
        return download;
    }
    return nil;
}


// 是给外部添加使用的
- (void)addTaskSaveName:(NSString *)name urlStr:(NSString *)urlStr flag:(NSString *)flagStr duration:(NSString *)duration backType:(void (^)(DownloadBackType))type{
    // 判定是否之前下载过。
    if ([self exsitTaskWithUrl:urlStr]) {
        type(Complete);
        return;
    }
    // 判断是否已经存在于下载列表中。
    if ([self exsitWaitingWithUrl:urlStr]) {
        type(Loading);
    }else{ // 如果都不存在，则添加任务成功。
        type(Finish);
        DownCenter *download = [[DownCenter alloc] initWithUrl:urlStr flag:flagStr];
        download.duration = duration;
        download.showName = name;
        [self addTaskForWaitingPlist:download];
        
        if(_taskArray==nil){//第一次初始化数据
            _taskArray = [[NSMutableArray alloc] init];
        }
        
        [self.taskArray addObject:download];
        
        NSLog(@"我添加的数量%ld",self.taskArray.count);
        if ([self downloadingTaskCount] < DMaxDownloadCount) {
            [download start];
        }else{
            // 等待下载
        }
    }
}
//返回状态信息
-(void)callBackDownStateWithUrl:(NSString*)urlStr andBackType:(void(^)(DownloadBackType type))type{
    //下载完成
    if ([self exsitTaskWithUrl:urlStr]) {
        //下载完成的状态
        type(Complete);
        return;
    }
    if ([self exsitWaitingWithUrl:urlStr]) {
        //下载中状态
        type(Loading);
    }else{
        //正常状态
        type(Normal);
    }
}

// 下载列表数组的懒加载
- (NSMutableArray *)taskArr{
    if (_taskArray==nil) {
        _taskArray = [[NSMutableArray alloc] init];
    }
    return _taskArray;
}

// 完成从下载的数据库plist 中的数据删除
- (void)deleteTaskForWaitingWithUrl:(NSString *)urlStr{
    NSMutableDictionary *plist = [NSMutableDictionary dictionaryWithContentsOfFile:DownloadPath.downloadedPlistPath];
    [plist removeObjectForKey:urlStr];
    [plist writeToFile:DownloadPath.downloadedPlistPath atomically:YES];
}

// 已经下载完成，是否
- (BOOL)completeFileWithUrl:(NSString *)urlStr{
    NSMutableDictionary *plist = [NSMutableDictionary dictionaryWithContentsOfFile:DownloadPath.downloadedPlistPath];
    NSMutableDictionary *fileDic = [plist objectForKey:urlStr];
    if (!fileDic) {
        return NO;
    }
    if ([[fileDic objectForKey:@"state"] isEqualToString:@"complete"]) {
        return YES;
    }
    return NO;
}

// 删除任务
- (void)deleteTaskWithUrl:(NSString *)urlStr complete:(void (^)())complete{
    int a = 0;
    DownCenter *download = [self findTaskWithUrl:urlStr];
    if (download) {
        [download cancel];
        a = 0.6;
    }
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(a * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        NSMutableDictionary *plist = [NSMutableDictionary dictionaryWithContentsOfFile:DownloadPath.downloadedPlistPath];
        NSMutableDictionary *fileDic = plist[urlStr];
        NSString *path;
        if ([self completeFileWithUrl:urlStr]) {
            // 如果已经下载完成，则在已下载的地址里删除。
            path = [fileDic objectForKey:@"savePath"];
        }else if (fileDic){
            // 如果任务存在，但是尚未下载完成，则在临时文件夹内删除。
            path = [DownloadPath.tempStr stringByAppendingString:[fileDic objectForKey:@"tempName"]];
        }
        [plist removeObjectForKey:urlStr];
        [plist writeToFile:DownloadPath.downloadedPlistPath atomically:YES];
        [[NSFileManager defaultManager] removeItemAtPath:path error:nil];
        // 从下载任务数组中移除
        [self.taskArr removeObject:download];
        [plist removeObjectForKey:urlStr];
        [plist writeToFile:DownloadPath.downloadedPlistPath atomically:YES];
        complete();
    });
    
}
// 根据urlStr获取下载的download对象
- (DownCenter *)findTaskWithUrl:(NSString *)urlStr{
    DownCenter *download = nil;
    for (DownCenter *task in self.taskArr) {
        if ([task.urlString isEqualToString:urlStr]) {
            download = task;
        }
    }
    return download;
}

- (BOOL)exsitTaskWithUrl:(NSString *)urlStr{
    // 先获取下载列表
    BOOL i = NO;
    NSMutableDictionary *plist = [NSMutableDictionary dictionaryWithContentsOfFile:DownloadPath.downloadedPlistPath];
    NSMutableDictionary *tempDic = [plist objectForKey:urlStr];
    if (tempDic) {
        // 获取下载地址内的文件。查看是否有存在
        NSArray *array = [[NSFileManager defaultManager] subpathsAtPath:DownloadPath.alreadyDownloadPath];
        for (NSString *pathStr in array) {
            if ([pathStr isEqualToString:tempDic[@"fileName"]]) {
                i = YES;
            }
        }
    }
    return i;
}
// 是否存在于正在下载的列表
- (BOOL)exsitWaitingWithUrl:(NSString *)urlStr{
    NSMutableDictionary *plist = [NSMutableDictionary dictionaryWithContentsOfFile:DownloadPath.downloadedPlistPath];
    NSMutableDictionary *fileDic = [plist objectForKey:urlStr];
    if (fileDic) {
        return YES;
    }
    return NO;
}

// 将下载信息全部写入等待下载的数据库中
- (void)addTaskForWaitingPlist:(DownCenter *)task{
    NSMutableDictionary *plist = [NSMutableDictionary dictionaryWithContentsOfFile:DownloadPath.downloadedPlistPath];
    NSMutableDictionary *temp = [plist objectForKey:task.urlString];
    if (!temp) {
        temp = [NSMutableDictionary dictionary];
        [temp setObject:task.saveName forKey:@"saveName"];
        [temp setObject:task.flagStr forKey:@"flagStr"];
        [temp setObject:task.showName forKey:@"showName"];
        [temp setObject:task.duration forKey:@"duration"];
        [plist setObject:temp forKey:task.urlString];
        [plist writeToFile:DownloadPath.downloadedPlistPath atomically:YES];
    }
}



// 判断当前的taskArr中是否存在该任务
- (BOOL)exsitUrlInSelfTaskArr:(NSString *)url{
    BOOL exist = NO;
    for (DownCenter *temp in self.taskArr) {
        if ([temp.urlString isEqualToString:url]) {
            exist = YES;
        }
    }
    return exist;
}
// 返回已经完成的任务
- (NSMutableArray *)finishedTasks{
    NSMutableArray *arr = [NSMutableArray array];
    NSMutableDictionary *plist = [NSMutableDictionary dictionaryWithContentsOfFile:DownloadPath.downloadedPlistPath];
    NSArray *keys = [plist allKeys];
    for (NSString *temp in keys) {
        NSDictionary *tempDic = plist[temp];
        if ([tempDic[@"state"] isEqualToString:@"complete"]) {
            [arr addObject:tempDic];
        }
    }
    return arr;
}
// 收到消息后，释放下载对象。
- (void)destructionTask:(NSNotification *)message{
    DownCenter *task = message.object;
    [self.taskArr removeObject:task];
    // 开始下一个
    for (DownCenter *temp in self.taskArr) {
        if (temp.isDownloading == NO) {
            [temp start];
            break;
        }
    }
    // 删除数据库
    // 刷新回调
    if (self.reloadData) {
        self.reloadData();
    }
}
// 查看正在下载的任务数量
- (NSInteger)downloadingTaskCount{
    NSInteger max = 0;
    for (DownCenter *temp in self.taskArray) {
        if (temp.isDownloading) {
            max += 1;
        }
    }
    return max;
}

// 暂停任务
- (void)suspendTask:(DownCenter *)task{
    [task suspended];
    task.isDownloading = NO;
}

- (void)begainTasks:(DownCenter *)task arriveMax:(void (^)())max{
    if ([self downloadingTaskCount] < DMaxDownloadCount) {
        [task start];
    }else{
        max();
    }
}


@end
