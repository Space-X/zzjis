//
//  DownLoadPathManager.h
//  DownFileDemo
//
//  Created by liyuanyou on 9/2/17.
//  Copyright © 2017年 liyuanyou. All rights reserved.
//

#import <Foundation/Foundation.h>
#define DownloadPath [DownLoadPathManager sharedDownloadPathManager]
#define MB (1024*1024.0)
// 下载模块分三个地方，第一个负责管理文件的存储位置。
// 第二个负责实现文件的下载，包括断点下载。
// 第三个负责掌控第二个模块的灵活使用。

@interface DownLoadPathManager : NSObject

// 此处是第一个模块
@property (nonatomic, strong) NSString *alreadyDownloadPath; // 已经下载下来的数据存放的位置。
@property (nonatomic, retain) NSString *downloadedPlistPath; // 正在下载进度信息保存的路径
@property (nonatomic, retain) NSString *tempStr; // 临时文件路径


// 使用单例获取对象。
+(DownLoadPathManager *)sharedDownloadPathManager;

// 判断正在下载的plist文件中是否存在该下载。
- (BOOL)existTaskWithUrl:(NSString *)str;

@end
