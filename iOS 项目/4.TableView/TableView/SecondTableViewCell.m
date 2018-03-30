//
//  SecondTableViewCell.m
//  TableView
//
//  Created by lyy on 16/6/4.
//  Copyright (c) 2016年 lyy. All rights reserved.
//

#import "SecondTableViewCell.h"

@implementation SecondTableViewCell

- (void)awakeFromNib {
    // Initialization code
}

-(id)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier{
    self=[super initWithStyle:style reuseIdentifier:reuseIdentifier];
    if (self) {
        cellHeight=0;
        [self addSubview:[self createView]];
    }
    return self;
}

-(UIView*)createView{
    UIView*cellView=[[UIView alloc]initWithFrame:self.bounds];
    imgView=[[UIImageView alloc]initWithFrame:CGRectMake(0, 0, 120, 100)];
    imgView.image=[UIImage imageNamed:@"img.png"];
    [cellView addSubview:imgView];
    
    titleLable=[[UILabel alloc]initWithFrame:CGRectMake(imgView.frame.size.width+imgView.frame.origin.x, imgView.frame.size.height/2-20, self.frame.size.width, 40)];
  
    [cellView addSubview:titleLable];

   
    return cellView;
    
}

-(void)setModel:(Model *)model{
    titleLable.text=model.tilte;
    cellHeight=imgView.frame.size.height;
    [self setCellHeight];
    
}
-(void)setCellHeight{
    CGRect frame=self.frame;
    frame.size.height=cellHeight;
    self.frame=frame;
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

@end
