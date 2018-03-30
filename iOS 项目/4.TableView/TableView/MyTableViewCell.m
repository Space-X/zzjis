//
//  MyTableViewCell.m
//  TableView
//
//  Created by lyy on 16/6/4.
//  Copyright (c) 2016年 lyy. All rights reserved.
//

#import "MyTableViewCell.h"
#import "SecondTableViewCell.h"
#import "ViewController.h"

@implementation MyTableViewCell

- (void)awakeFromNib {
    // Initialization code
}
-(id)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier{
    
    self=[super initWithStyle:style reuseIdentifier:reuseIdentifier];
    if (self) {
    cellHeight=44;
    app=[[UIApplication sharedApplication]delegate];
    [self addSubview:[self createView]];
    }
    return self;
}

-(UIView*)createView{
    
    cellView=[[UIView alloc]initWithFrame:self.bounds];
    titleLable=[[UILabel alloc]initWithFrame:CGRectMake(0, 0, self.frame.size.width, 40)];
    titleLable.backgroundColor=[UIColor blueColor];
    titleLable.textColor=[UIColor whiteColor]
    ;
    titleLable.userInteractionEnabled=YES;
    UITapGestureRecognizer *labelTapGestureRecognizer = [[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(labelTouchUpInside:)];
    [titleLable addGestureRecognizer:labelTapGestureRecognizer];
    [cellView addSubview:titleLable];
    
    
    
    secondTable=[[UITableView alloc]initWithFrame:CGRectMake(0, titleLable.frame.size.height+titleLable.frame.origin.y, self.frame.size.width, 0) style:UITableViewStylePlain];
    secondTable.scrollEnabled=NO;
    secondTable.delegate=self;
    secondTable.dataSource=self;
    [secondTable reloadData];
    return cellView;

}
/**lab的点击事件*/
-(void) labelTouchUpInside:(UITapGestureRecognizer *)recognizer{
    
    NSLog(@"%@",recognizer);
    UILabel *label=(UILabel*)recognizer.view;
    int index=(int)label.tag;
    NSString*key=[NSString stringWithFormat:@"%d",index];
    
    if ([self keyIsExit:[NSString stringWithFormat:@"%d",index]] == 0) {
            [app.ndict setValue:[NSString stringWithFormat:@"%d",1] forKey:key];
    }else{
            [app.ndict setValue:[NSString stringWithFormat:@"%d",0] forKey:key];
    }
    
    NSDictionary *dict =[[NSDictionary alloc] initWithObjectsAndKeys:[NSString stringWithFormat:@"%d",index],@"key", nil];
    
    //创建通知
    NSNotification *notification =[NSNotification notificationWithName:@"labelTouchUpInside" object:nil userInfo:dict];
    //通过通知中心发送通知
    [[NSNotificationCenter defaultCenter] postNotification:notification];
    
      // [self.labClickDelegate OnCellBack:curClickCell];
}

-(int)keyIsExit:(NSString*)tempKey{
    
    int ischche=0;
    
    for (NSString*key in app.ndict) {
        if ([tempKey isEqualToString:key]) {
             ischche=(int)[[app.ndict objectForKey:key] integerValue];
            return ischche;
        }
    }
    return 0;

}

-(void)setModel:(Model*)model andPostiont:(int)position :(int)curClickPosition{
    
    mainModel=model;
    curClickposition=position;
    titleLable.text=model.tilte;
    titleLable.tag=position;
    cellHeight=titleLable.frame.size.height+secondTable.frame.size.height;
   
    
    if ([self keyIsExit:[NSString stringWithFormat:@"%d",position]]==0) {
         secondTable.hidden=NO;
         cellHeight=titleLable.frame.size.height+secondTable.frame.size.height;
    }else{
        secondTable.hidden=YES;
        [self setScondTableViewFrame:0];
         cellHeight=titleLable.frame.size.height+secondTable.frame.size.height;
     
    }
    
    [self setCellHeight:cellHeight];
    
    [cellView addSubview:secondTable];

}

/***设置cell的高度**/
-(void)setCellHeight:(CGFloat)cellheight{
    
        CGRect frame=self.frame;
        frame.size.height=cellheight;
        self.frame=frame;
}

-(NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section{
    return 4;
}

-(UITableViewCell*)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
    static NSString*ID=@"cellId";
   
    SecondTableViewCell*myCell=[tableView dequeueReusableCellWithIdentifier:ID];
    if (!myCell) {
        myCell=[[SecondTableViewCell alloc]initWithStyle:UITableViewCellStyleDefault reuseIdentifier:ID];
    }
    
    [myCell setModel:mainModel];
    return myCell;
}

-(CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath{
    
        UITableViewCell *cell = [self tableView:tableView cellForRowAtIndexPath:indexPath];
        CGFloat height=cell.frame.size.height;
        [self setScondTableViewFrame:height*4];
        return height;
    
}

/**重新计算第二个tableView的高度**/
-(void)setScondTableViewFrame:(CGFloat)height{
    
    CGRect f=secondTable.frame;
    f.size.height=height;
    secondTable.frame=f;
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

@end
