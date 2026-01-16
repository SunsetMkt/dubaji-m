# dubaji-m

毒霸姬 Android 版本的 Live2D Zip 提取，已解密

## APK 下载链接

https://www.dubaji.com/

## Frida

```js
function waitForJava(fn) {
    if (Java.available) {
        Java.perform(fn);
    } else {
        setTimeout(() => waitForJava(fn), 100);
    }
}

waitForJava(function () {
    console.log("[*] Java ready");

    var Amp = Java.use("com.cf.ampunpacker.AmpPackWrapper");
    var File = Java.use("java.io.File");
    var FileOutputStream = Java.use("java.io.FileOutputStream");

    Amp.getAmpFileStream.implementation = function (data, index, name) {
        console.log("[*] getAmpFileStream");
        console.log("    name =", name);
        console.log("    index =", index);
        console.log("    in.size =", data.length);

        var ret = this.getAmpFileStream(data, index, name);

        if (ret) {
            console.log("    out.size =", ret.length);

            var outPath = "/data/local/tmp/" + name;
            var outFile = File.$new(outPath);

            var fos = FileOutputStream.$new(outFile);
            fos.write(ret);
            fos.flush();
            fos.close();

            console.log("[+] dumped to", outPath);
        }

        return ret;
    };

    Amp.releaseByteArray.implementation = function (arr) {
        console.log("[*] releaseByteArray bypass");
    };

    console.log("[*] hook installed");
});
```
