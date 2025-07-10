import Java from "frida-java-bridge";

let hook: (
    handler: (self: any, args: any[], orig: (...args: any[]) => any) => any
) => void;

Java.perform(() => {
    // public Unit invoke(PageableResponse<Release> pageableResponse)
    const WatchingPresenter = Java.use("com.swiftsoft.anixartd.presentation.main.watching.WatchingPresenter$onWatching$3");

    hook = function (
        handler: (self: any, args: any[], orig: (...args: any[]) => any) => any
    ) {
        const ov = WatchingPresenter.invoke.overloads.find((o: any) =>
        o.argumentTypes.length === 1
        )!;

        ov.implementation = function (...args: any[]) {
        const orig = ov.bind(this);
        return handler(this, args, orig);
        };
    };
});

export { hook };
