//
//  SecondTableViewCell.h
//  TableView
//
//  Created by lyy on 16/6/4.
//  Copyright (c) 2016年 lyy. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Model.h"

@interface SecondTableViewCell : UITableViewCell

{
    UIImageView*imgView;
    UILabel*titleLable;
    
    float cellHeight;
    
}
-(void)setModel:(Model*)model;
@end