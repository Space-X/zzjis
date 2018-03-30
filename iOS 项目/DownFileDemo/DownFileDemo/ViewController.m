//
//  ViewController.m
//  DownFileDemo
//
//  Created by liyuanyou on 9/2/17.
//  Copyright © 2017年 liyuanyou. All rights reserved.
//

#import "ViewController.h"
#import "DownloadManager.h"
#import "DownLoadView.h"

@interface ViewController ()

@property (nonatomic,strong) NSArray *titleArr;
@property (nonatomic,strong) NSArray *urlArr;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    [self viewInit];
    [self dataInit];
}

-(void)viewInit{

    tabView=[[UITableView alloc]initWithFrame:CGRectMake(0, 64, self.view.bounds.size.width, self.view.bounds.size.height-64)];

    tabView.delegate=self;
    tabView.dataSource=self;
    
    
    [self.view addSubview:tabView];
    
    
    UIBarButtonItem *rightBarButton = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemFastForward target:self action:@selector(rightButtonAction)];
    self.navigationItem.rightBarButtonItem = rightBarButton;
      tabView.rowHeight = 60;
  
    
    
    
}
- (void)rightButtonAction{
    DownLoadView *rootVC = [[DownLoadView alloc] init];
    [self.navigationController pushViewController:rootVC animated:YES];
}


-(void)dataInit{
    self.urlArr = @[
                    @"http://192.168.1.66/WebFiles/1/LearnKJ/9e4649c3a7ac4505ba6f797cabc47845.mp4",
                    @"http://192.168.1.66/WebFiles/1/LearnKJ/e89c73ea8563431d857d3a8cfcff9fed/sco1/1.mp4",
                    @"http://192.168.1.66/WebFiles/1/LearnKJ/620fe5edc136423ea95d4b938ce9cdb9.mp4",
                    ];
    self.titleArr = @[@"视屏",@"李荣浩_不将就",@"张碧晨_年轮 "];
    

}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return self.urlArr.count;
}


- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    static NSString*cellID=@"cellid";
    UITableViewCell *cell = [tabView dequeueReusableCellWithIdentifier:cellID];
    
    if (!cell) {
            cell =[[UITableViewCell alloc]initWithStyle:UITableViewCellStyleDefault reuseIdentifier:cellID];
    }
    //判断下载状态
    [MyDownloadManager callBackDownStateWithUrl:self.urlArr[indexPath.row] andBackType:^(DownloadBackType type) {
        if (type == Normal) {
            NSLog(@"点击下载");
        }else if(type == Complete){
            NSLog(@"下载完成");
        }else if(type == Loading){
            NSLog(@"下载中");
        }else{
            NSLog(@"任务存在");
        }
    }];
    
    cell.textLabel.text = self.titleArr[indexPath.row];
    
    return cell;
}
- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath{
    [MyDownloadManager addTaskSaveName:self.titleArr[indexPath.row] urlStr:self.urlArr[indexPath.row] flag:@"标签" duration:@"接口" backType:^(DownloadBackType type) {
        if (type == Finish) {
            NSLog(@"添加成功");
        }else if(type == Complete){
                NSLog(@"下载完成");
        }else if(type == Loading){
            NSLog(@"下载中");
        }else{
            NSLog(@"任务存在");
        }
    }];
}



- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


@end
