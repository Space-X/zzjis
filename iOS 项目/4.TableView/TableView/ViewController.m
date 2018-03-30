//
//  ViewController.m
//  TableView
//
//  Created by lyy on 16/6/4.
//  Copyright (c) 2016年 lyy. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()
{
    AppDelegate *app;

}
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.

    
    [self viewInit];
    [self dataInit];


}


-(void)viewInit{
  
    mTableView=[[UITableView alloc]initWithFrame:CGRectMake(0, 22, self.view.frame.size.width, self.view.frame.size.height-22) style:UITableViewStylePlain];
    mTableView.dataSource=self;
    mTableView.delegate=self;
    [self.view addSubview:mTableView];
    mTableView.tableFooterView=[[UIView alloc]init];
    mTableView.backgroundColor = [UIColor redColor];
    
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(labelTouchUpInside:) name:@"labelTouchUpInside" object:nil];
 //接收手势识别器 发出的通知
}

-(void)dataInit{
    
    data=[[NSMutableArray alloc]initWithCapacity:0];
    
    app= (AppDelegate*)[[UIApplication sharedApplication]delegate];
    app.curClickCell=-1;
    app.ndict=[[NSMutableDictionary alloc]init];
    
    NSArray*arr=[NSArray arrayWithObjects:@"zhy", @"tky",@"gjdw",nil];
    for (int i=0; i<3; i++) {
        Model*model=[[Model alloc]init];
        [model setTilte:arr[i]];
        [data addObject:model];
    }
   
    [mTableView reloadData];
}

-(void)labelTouchUpInside:(NSNotification*)df{

   app.curClickCell=(int)[df.userInfo[@"key"] integerValue];
    
    [mTableView reloadData];
}

-(void)OnCellBack:(int)curIndex{//1.1定义协议与方法
//    curClickCell=curIndex
//    
//    [mTableView reloadData];

}



-(NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section{
    
    return data.count;
}


-(UITableViewCell*)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
    
    static NSString*ID=@"cellId";
    Model*model=data[indexPath.row];
    
    MyTableViewCell*myCell=[tableView dequeueReusableCellWithIdentifier:ID];
    if (!myCell) {
        myCell=[[MyTableViewCell alloc]initWithStyle:UITableViewCellStyleDefault reuseIdentifier:ID];
    }

    [myCell setModel:model andPostiont:(int)indexPath.row :app.curClickCell];

    return myCell;
}

-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath{

    [mTableView reloadData];
}

-(CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath{

    UITableViewCell *cell = [self tableView:tableView cellForRowAtIndexPath:indexPath];
    return cell.frame.size.height;
   
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}




@end







