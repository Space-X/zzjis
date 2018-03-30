//
//  ViewController.m
//  SELFPLAYER
//
//  Created by 邸超 on 2018/3/14.
//  Copyright © 2018年 Space-X. All rights reserved.
//

#import "ViewController.h"
#import "ZFPlayer.h"
@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    
//    ZFPlayerView *player = [[ZFPlayerView alloc] initWithFrame:CGRectMake(0, 100, [UIScreen mainScreen].bounds.size.width, 200)];
////    player.backgroundColor = [UIColor yellowColor];
//    [self.view addSubview:player];
    
    self.view.backgroundColor = [UIColor whiteColor];
    
    UIWebView *web = [[UIWebView alloc] initWithFrame:self.view.bounds];
    [self.view addSubview:web];
    
    [web loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:@"about.html"]]];
    
    
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


@end
