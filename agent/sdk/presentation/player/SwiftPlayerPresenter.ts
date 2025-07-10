import Java from "frida-java-bridge";

let hook: (
    handler: (self: any, args: any[], orig: (...args: any[]) => any) => any
) => void;

Java.perform(() => {
    // public Unit invoke(EpisodeTargetResponse episodeTargetResponse)
    const SwiftPlayerPresenter = Java.use("com.swiftsoft.anixartd.presentation.player.SwiftPlayerPresenter$onEpisode$5");

    hook = function (
        handler: (self: any, args: any[], orig: (...args: any[]) => any) => any
    ) {
        const ov = SwiftPlayerPresenter.invoke.overloads.find((o: any) =>
        o.argumentTypes.length === 1
        )!;

        ov.implementation = function (...args: any[]) {
        const orig = ov.bind(this);
        return handler(this, args, orig);
        };
    };
});

export { hook };
