//
//  ViewController.h
//  TableView
//
//  Created by lyy on 16/6/4.
//  Copyright (c) 2016年 lyy. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Model.h"
#import "MyTableViewCell.h"
#import "AppDelegate.h"



@interface ViewController : UIViewController<UITableViewDelegate,UITableViewDataSource,MyTableViewCellDelegate>
{

    UITableView*mTableView;
    NSMutableArray*data;
 
    
    
}

@end

