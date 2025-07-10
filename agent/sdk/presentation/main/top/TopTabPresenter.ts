import Java from "frida-java-bridge";

let hook: (
    handler: (self: any, args: any[], orig: (...args: any[]) => any) => any
) => void;

Java.perform(() => {
    // public Unit invoke(PageableResponse<Release> pageableResponse)
    const TopTabPresenter = Java.use("com.swiftsoft.anixartd.presentation.main.top.TopTabPresenter$onTopTab$3");

    hook = function (
        handler: (self: any, args: any[], orig: (...args: any[]) => any) => any
    ) {
        const ov = TopTabPresenter.invoke.overloads.find((o: any) =>
        o.argumentTypes.length === 1
        )!;

        ov.implementation = function (...args: any[]) {
        const orig = ov.bind(this);
        return handler(this, args, orig);
        };
    };
});

export { hook };
