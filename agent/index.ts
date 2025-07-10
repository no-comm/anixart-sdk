import Java from "frida-java-bridge";
import { log, toast } from "./logger.js";
import * as HomeTabUiController from "./sdk/ui/controller/main/home/HomeTabUiController.js";
import * as ReleasePresenter from "./sdk/presentation/main/release/ReleasePresenter.js";
import * as ProfilePresenter from "./sdk/presentation/main/profile/ProfilePresenter.js";
import * as AuthPresenter from "./sdk/presentation/auth/AuthPresenter.js";

import "./mods/disableAd.js";

Java.perform(function () {
    toast("script loaded");

    HomeTabUiController.hook((self, args, orig) => {
        console.log(args[2].get(0).toString());
        args[7] = "✏️ My message";
        args[10] = "https://example.com";
        return orig(...args);
    });

    // release

    let ReleaseResponse = Java.use("com.swiftsoft.anixartd.network.response.release.ReleaseResponse");
    let Release = Java.use("com.swiftsoft.anixartd.database.entity.Release");
    ReleasePresenter.hook((self, args, orig) => {
        let releaseResponse = Java.cast(args[0], ReleaseResponse);
        let release = Java.cast(releaseResponse.getRelease(), Release);
        release.setTitleRu("🔥 My release");
        return orig(...args);
    });

    // profile

    const ArrayList = Java.use("java.util.ArrayList");
    const Role = Java.use("com.swiftsoft.anixartd.database.entity.Role");
    let rolesList = ArrayList.$new();
    let myRole = Role.$new();
    let Profile = Java.use("com.swiftsoft.anixartd.database.entity.Profile");
    let ProfileResponse = Java.use("com.swiftsoft.anixartd.network.response.ProfileResponse");

    myRole.setName("My role");
    myRole.setColor("18eded");
    myRole.setId(777);
    rolesList.add(myRole);

    ProfilePresenter.hook((self, args, orig) => {
        let profileResponse = Java.cast(args[0], ProfileResponse);
        let profile = Java.cast(profileResponse.getProfile(), Profile);
        if (profileResponse.isMyProfile()) profile.setRoles(rolesList);
        return orig(...args);
    })

});