import Java from "frida-java-bridge";
import { log } from "../logger.js";


Java.perform(function () {
    log("[+] Disabling ads");
    let KodikAdActivity = Java.use("com.swiftsoft.anixartd.ui.activity.kodik.KodikAdActivity");
    KodikAdActivity["onCreate"].implementation = function (bundle: any) {
        // console.log(`KodikAdActivity.onCreate is called: bundle=${bundle}`);
        this["onCreate"](bundle);
        this.advertEnded();
    };

    let OnAdVisible = Java.use("com.swiftsoft.anixartd.utils.OnAdVisible");
    OnAdVisible["$init"].implementation = function (z: any) {
        // console.log(`OnAdVisible.$init is called: z=${z}`);
        this["$init"](false);
    };

    let InterstitialAd = Java.use("com.yandex.mobile.ads.interstitial.InterstitialAd");
    InterstitialAd["loadAd"].implementation = function (adRequest: any) {};
});
