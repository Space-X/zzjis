//
//  LearningDetailController.m
//  lesApp
//
//  Created by 邸超 on 2017/8/21.
//  Copyright © 2017年 Angel_Space. All rights reserved.
//

#import "LearningDetailController.h"
#import "TYTitlePageTabBar.h"

#import "StandarController.h"

@interface LearningDetailController ()
{

    UIButton *_backBtn;
    UIView *_videoScreen;
    
    BOOL _isNoHeaderView;
    
    
}
@end

@implementation LearningDetailController


- (void)viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:animated];
    [self.navigationController setNavigationBarHidden:NO animated:YES];
    
    [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleLightContent;
}
- (void)viewWillAppear:(BOOL)animated{
    [super viewWillAppear:animated];
    [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleDefault;

    [self.navigationController setNavigationBarHidden:YES animated:YES];
    
    
}

- (void)viewWillLayoutSubviews
{
    [super viewWillLayoutSubviews];
    if (_isNoHeaderView) {
        [self.slidePageScrollView scrollToPageIndex:1 animated:NO];
    }
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    
    [self defaultDataInit];
    [self setupSubviewsUI];
    [self setupSubviewsUI];
}


- (void)defaultDataInit
{
    
}
- (void)setupNavigationBarSubviews
{

}

- (void)back {
    
    [self.navigationController popViewControllerAnimated:YES];
}
- (void)setupSubviewsUI
{
    
    self.view.backgroundColor = [UIColor whiteColor];
    
    
    
    
    _videoScreen = [[UIView alloc]initWithFrame:CGRectMake(0, 20, SCREEN_WIDTH, 0.5*SCREEN_WIDTH)];
    _videoScreen.backgroundColor = [UIColor blueColor];
    [self.view addSubview:_videoScreen];
    
//    [_videoScreen mas_makeConstraints:^(MASConstraintMaker *make) {
//       
//        make.left.right.equalTo(self.view);
//        make.top.equalTo(self.view).offset(20);
//        make.height.equalTo(_videoScreen.mas_width).multipliedBy(0.58);
//    }];
//    
    
    _backBtn  = [[UIButton alloc] init];
    _backBtn.backgroundColor = [UIColor redColor];
    [_backBtn addTarget:self action:@selector(back) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:_backBtn];
    
    [_backBtn mas_makeConstraints:^(MASConstraintMaker *make) {
        
        make.top.equalTo(self.view).offset(35);
        make.left.equalTo(self.view).offset(15);
        make.width.equalTo(@40);
        make.height.equalTo(@40);
        
    }];
    
    
    
    self.viewControllers = @[
                             [self creatViewControllerPage:0 itemNum:2],
                             [self creatViewControllerPage:1 itemNum:2],
                             [self creatViewControllerPage:2 itemNum:2],
                             [self creatViewControllerPage:3 itemNum:2]
                             ];
    self.slidePageScrollView.pageTabBarStopOnTopHeight = _isNoHeaderView ? 0 : 20;
    self.slidePageScrollView.headerViewScrollEnable = _isNoHeaderView ? YES : YES;
    
    [self addHeaderView];
    [self addTabPageMenu];
    [self.slidePageScrollView reloadData];
}



- (void)addHeaderView
{
    UIImageView *imageView = [[UIImageView alloc]initWithFrame:CGRectMake(0, 0, CGRectGetWidth(self.slidePageScrollView.frame), 200)];
    imageView.image = [UIImage imageNamed:@"CYLoLi"];
    
    UIButton *label = [UIButton buttonWithType:UIButtonTypeSystem];
    label.frame = CGRectMake(10, 75, 100, 30);
    [label setTitleColor:[UIColor orangeColor] forState:UIControlStateNormal] ;
    [label setTitle:@"Button tap me!" forState:UIControlStateNormal];
    [imageView addSubview:label];
    UILabel *label1 = [[UILabel alloc]initWithFrame:CGRectMake(10, 105, 320, 30)];
    label1.textColor = [UIColor orangeColor];
    label1.text = @"pageTabBarStopOnTopHeight 20 ↓↓";
    [imageView addSubview:label1];
    
    UILabel *label2 = [[UILabel alloc]initWithFrame:CGRectMake(10, 135, 320, 30)];
    label2.textColor = [UIColor orangeColor];
    label2.text = @"pageTabBarIsStopOnTop YES ↓↓";
    [imageView addSubview:label2];
    
    self.slidePageScrollView.headerView = _isNoHeaderView ? nil : _videoScreen;
}
- (void)addTabPageMenu
{
    TYTitlePageTabBar *titlePageTabBar = [[TYTitlePageTabBar alloc]initWithTitleArray:@[@"目录",@"详情",@"评论",@"考试"]];
    titlePageTabBar.frame = CGRectMake(0, 0, CGRectGetWidth(self.slidePageScrollView.frame), _isNoHeaderView?50:40);
    titlePageTabBar.edgeInset = UIEdgeInsetsMake(_isNoHeaderView?20:0, 50, 0, 50);
    titlePageTabBar.titleSpacing = 10;
    titlePageTabBar.selectedTextColor = DCBlue;
    titlePageTabBar.backgroundColor = [UIColor whiteColor];
    self.slidePageScrollView.pageTabBar = titlePageTabBar;
}

- (UIViewController *)creatViewControllerPage:(NSInteger)page itemNum:(NSInteger)num
{
    
    switch (page) {
        case 0:
        {
            StandarController *vc =[StandarController new];
            vc.view.backgroundColor = [UIColor redColor];
            return vc;
        }
            break;
        case 1:
        {
            StandarController *vc =[StandarController new];
            vc.view.backgroundColor = [UIColor yellowColor];
            
            return vc;
        }
            
            break;
        case 2:
        {
            StandarController *vc =[StandarController new];
            vc.view.backgroundColor = [UIColor greenColor];
            return vc;
        }
            
            break;
        case 3:
        {
            StandarController *vc =[StandarController new];
            vc.view.backgroundColor = [UIColor greenColor];
            return vc;
        }
            
            break;
            
        default:
            
        {
            
            return [UIViewController new];
        }
            break;
    }
    
}


- (void)slidePageScrollView:(TYSlidePageScrollView *)slidePageScrollView pageTabBarScrollOffset:(CGFloat)offset state:(TYPageTabBarState)state
{
    switch (state) {
        case TYPageTabBarStateStopOnTop:
            
            NSLog(@"TYPageTabBarStateStopOnTop---顶部停靠监听");
            
            break;
        case TYPageTabBarStateStopOnButtom:
            NSLog(@"TYPageTabBarStateStopOnButtom---底部停靠监听");
            break;
        default:
            
            break;
    }
}

- (void)slidePageScrollView:(TYSlidePageScrollView *)slidePageScrollView horizenScrollToPageIndex:(NSInteger)index
{
    // 测试 reloadData 正常
    // searchViewController *VC = self.viewControllers[index];
    
    NSLog(@"aksbgdka----%ld",index);
    
}

- (void)clickedPageTabBarStopOnTop:(UIButton *)button
{
    button.selected = !button.isSelected;
    self.slidePageScrollView.pageTabBarIsStopOnTop = !button.isSelected;
}


@end
