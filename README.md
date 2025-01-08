# analytics-helper

**Depreciated Repo**
Google doesn't even support Universal Analytics properties anymore, so this repo is dead.  Leaving it up for posterity.

Javascript library for logging Google Analytics application view stats in a Javascript based application.

This is a small JavaScript library I created to log web application stats to Google Analytics.  It is small, lightweight, and gets the job done.  I use it in all Ape Apps JS based applications that are on the Web, NodeJS/Electron, or in a packaged Windows 10 Javascript application.

Usage is simple.  First add the reference to analyticshelper.js to your page.  Then just create a new AnalyticsHelper object and do your tracking.

```javascript
var appName = "My Cool App";
var appVersion = "1.0.0";
var analyticsId = "UA-1234567890";

var ah = new AnalyticsHelper(appName,appVersion,analyticsId);

// track a screen view
var screenName = "Main Page";
ah.trackScreen(screenName);

// track an event
var category = "Videos";
var action = "play";
var label = "Epic Cat Song";
ah.trackEvent(category, action, label);

// track the sale of an item, if you have commerce enabled on your tracker
var item = "Fuzzy Slippers";
var sku = "item-slippers-x233";
var basePrice = "8.99";
var netPrice "7.89"; // after taxes/fees whatnot
ah.trackSale(item,sku,basePrice,netPrice);
```