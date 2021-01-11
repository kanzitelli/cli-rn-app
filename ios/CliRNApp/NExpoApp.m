//
//  NExpoApp.m
//  nexpoapp
//
//  Created by Batyr Kanzitdinov on 03.01.2021.
//

#import "AppDelegate.h"
#import "NExpoApp.h"

@implementation NExpoApp

// https://developer.apple.com/forums/thread/63946
-(void)sendEvent:(UIEvent *)event
{
  if(event && (event.subtype == UIEventSubtypeMotionShake)) {
    NSString *bundleUrl = [[NSUserDefaults standardUserDefaults] stringForKey:@"bundle_url"];
    NSString *appMode = [[NSUserDefaults standardUserDefaults] stringForKey:@"app_mode"];
    
    // we send shake event for app reload only when there is bundle_url and app_mode is DEV
    if (bundleUrl != nil && appMode != nil && [appMode isEqual: @"DEV"]) {
      AppDelegate *objAppDelegate = (AppDelegate *)[UIApplication sharedApplication].delegate;
      [objAppDelegate reloadApp];
    }
    [super sendEvent:event];
  } else {
    [super sendEvent:event];
  }
}

@end
