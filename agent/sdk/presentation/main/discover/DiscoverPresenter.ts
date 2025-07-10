import Java from "frida-java-bridge";

let hook: (
    handler: (self: any, args: any[], orig: (...args: any[]) => any) => any
) => void;

Java.perform(() => {
    // public Unit invoke(Sixtuple<? extends PageableResponse<Release>, ? extends PageableResponse<Interesting>, ? extends PageableResponse<Release>, ? extends PageableResponse<Release>, ? extends PageableResponse<Collection>, ? extends PageableResponse<ReleaseComment>> sixtuple)
    const DiscoverPresenter = Java.use("com.swiftsoft.anixartd.presentation.main.discover.DiscoverPresenter$onDiscover$4");

    hook = function (
        handler: (self: any, args: any[], orig: (...args: any[]) => any) => any
    ) {
        const ov = DiscoverPresenter.invoke.overloads.find((o: any) =>
        o.argumentTypes.length === 1
        )!;

        ov.implementation = function (...args: any[]) {
        const orig = ov.bind(this);
        return handler(this, args, orig);
        };
    };
});

export { hook };
