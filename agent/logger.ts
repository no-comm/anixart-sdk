import Java from "frida-java-bridge";

const Log = Java.use("android.util.Log");
const Toast = Java.use("android.widget.Toast");

export function log(message: string): void {
    Log.i("AnixartSdk", message);
}

export function toast(message: string): void {
    setTimeout(function () {
        Java.perform(function () {
            
            var ActivityThread = Java.use("android.app.ActivityThread");
    
            // Пытаемся получить контекст
            try {
                var context = ActivityThread.currentApplication();
                if (context === null) {
                    context = ActivityThread.currentActivity();
                }
    
                if (context !== null) {
                    Java.scheduleOnMainThread(function() {
                        Toast.makeText(
                            context,
                            Java.use("java.lang.String").$new(message),
                            Toast.LENGTH_SHORT.value
                        ).show();
                        log("[+] Toast shown successfully!");
                    });
                } else {
                    log("[-] Could not get valid context!");
                }
            } catch (e: any) {
                log("[-] Error:" + e.message);
            }
        });
    }, 250);
    
}

