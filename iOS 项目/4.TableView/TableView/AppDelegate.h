//
//  AppDelegate.h
//  TableView
//
//  Created by lyy on 16/6/4.
//  Copyright (c) 2016年 lyy. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <CoreData/CoreData.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate>

    @property (strong, nonatomic) UIWindow *window;

    @property (readonly, strong, nonatomic) NSManagedObjectContext *managedObjectContext;
    @property (readonly, strong, nonatomic) NSManagedObjectModel *managedObjectModel;
    @property (readonly, strong, nonatomic) NSPersistentStoreCoordinator *persistentStoreCoordinator;

- (void)saveContext;
- (NSURL *)applicationDocumentsDirectory;


    @property (nonatomic,assign) int curClickCell;

    @property (nonatomic,strong) NSMutableDictionary*ndict;

@end

