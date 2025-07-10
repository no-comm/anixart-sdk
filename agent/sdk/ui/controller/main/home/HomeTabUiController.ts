import Java from "frida-java-bridge";

let hook: (
    handler: (self: any, args: any[], orig: (...args: any[]) => any) => any
) => void;

Java.perform(() => {
    const HomeTab = Java.use("com.swiftsoft.anixartd.ui.controller.main.home.HomeTabUiController");

    hook = function (
        handler: (self: any, args: any[], orig: (...args: any[]) => any) => any
    ) {
        const ov = HomeTab.buildModels.overloads.find((o: any) =>
        o.argumentTypes.length === 12
        )!;

        ov.implementation = function (...args: any[]) {
        const orig = ov.bind(this);
        return handler(this, args, orig);
        };
    };
});

export { hook };
