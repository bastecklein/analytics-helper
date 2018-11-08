(function (window) {

    window.AnalyticsHelper = analyticsHelper;

    function analyticsHelper(name, version, id) {

        this.appName = name;
        this.appVersion = version;
        this.analyticsId = id;

        this.uuid = getUUID(this.analyticsId);

        this.trackScreen = trackScreen;
        this.trackEvent = trackEvent;
        this.trackSale = trackSale;

        this.getTransationId = getTransationId;
    }

    function trackScreen(name) {
        trackScreenView(this.analyticsId,name,this.uuid,this.appName,this.appVersion);
    }

    function trackScreenView(id,screen,uuid,app,version) {
        var w = window.innerWidth;
        var h = window.innerHeight;

        var uploadString = "v=1" +
                            "&tid=" + id +
                            "&cid=" + uuid +
                            "&t=appview" +
                            "&an=" + app +
                            "&av=" + version +
                            "&cd=" + screen +
                            "&sr=" + w + "x" + h;

        sendAnalyticsData(uploadString);
    }

    function trackEvent(cat, act, lab) {
        trackEventItem(this.analyticsId, cat, act, lab, this.uuid, this.appName, this.appVersion);
    }

    function trackSale(itemName,sku,price,net) {
        var tid = getTransationId();

        trackCommerceTransaction(this.analyticsId, price, tid, this.uuid, this.appName, this.appVersion,net);
        trackCommerceItem(this.analyticsId, price, tid, itemName, sku, this.uuid, this.appName, this.appVersion);
    }

    function trackCommerceTransaction(id, price, transid, uuid, app, version,net) {
        var fullPrice = parseFloat(price);
        var pocketPrice = parseFloat(net);

        var uploadString = "v=1" +
                            "&tid=" + id +
                            "&cid=" + uuid +
                            "&t=transaction" +
                            "&an=" + app +
                            "&av=" + version +
                            "&ti=" +transid +
                            "&ta=Windows Store" +  
                            "&tr=" + pocketPrice +
                            "&ts=0.00" +
                            "&tt=0.00" +
                            "&cu=USD";

        sendAnalyticsData(uploadString);
    }

    function trackCommerceItem(id, price, transid, name, sku, uuid, app, version) {
        var uploadString = "v=1" +
                            "&tid=" + id +
                            "&cid=" + uuid +
                            "&t=transaction" +
                            "&an=" + app +
                            "&av=" + version +
                            "&ti=" + transid +
                            "&in=" + name +
                            "&ip=" + price +
                            "&iq=1" +
                            "&ic=" + sku +
                            "&iv=iap" +
                            "&cu=USD";

        sendAnalyticsData(uploadString);
    }

    function trackEventItem(id, cat, act, lab, uuid, app, version) {
        var uploadString = "v=1" +
                            "&tid=" + id +
                            "&cid=" + uuid +
                            "&t=event" +
                            "&an=" + app +
                            "&aiid=com.ape.webapps" +
                            "&ec=" + cat +
                            "&ea=" + act +
                            "&el=" + lab;

        sendAnalyticsData(uploadString);
    }

    function getTransationId() {
        var num = Math.floor(Math.random() * 20000) + 500;
        var tid = "T" + num;
        return tid;
    }

    function getUUID(analytics) {
        var guid = "0";

        if (localStorage[analytics + "analytics_guid"]) {
            guid = localStorage[analytics + "analytics_guid"];
        }

        if (guid == "0") {
            guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            localStorage[analytics + "analytics_guid"] = guid;
        }

        return guid;
    }

    function sendAnalyticsData(postBody) {

        if(!navigator.onLine) {
            return;
        }

        try {
            var xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function () {

                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    //Stat log successful
                }
            }

            xmlhttp.open("POST", "https://www.google-analytics.com/collect", true);
            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlhttp.send(postBody);
        } catch(err) {
            // oh well, its analytics

            console.log(err);
        }
    }

})(window);