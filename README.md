# anixart-sdk

Unofficial sdk using frida

### How to compile & load

```sh
$ git clone https://github.com/no-comm/anixart-sdk.git
$ cd anixart-sdk/
$ npm install
```

Next, you need to implement this in the application. Let's say by running through frida-server

```sh
$ frida -U -f com.swiftsoft.anixartd -l _agent.js
```

You can also use frida-gadget to embed in the apk. Let's say through an [objection](https://github.com/sensepost/objection)