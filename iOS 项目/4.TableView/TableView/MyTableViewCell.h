//
//  MyTableViewCell.h
//  TableView
//
//  Created by lyy on 16/6/4.
//  Copyright (c) 2016年 lyy. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Model.h"
#import "AppDelegate.h"

@protocol MyTableViewCellDelegate

-(void)OnCellBack:(int)curIndex;//1.1定义协议与方法

@end


@interface MyTableViewCell : UITableViewCell<UITableViewDataSource,UITableViewDelegate>

{
    UIView*cellView;
    UILabel*titleLable;
    UITableView*secondTable;
    float cellHeight;
    
    Model*mainModel;
    BOOL isClick;
    int curClickposition;
    AppDelegate*app;
}
-(void)setModel:(Model*)model andPostiont:(int)position :(int)curClickPosition;

@property (retain,nonatomic) id <MyTableViewCellDelegate> labClickDelegate;
@end
