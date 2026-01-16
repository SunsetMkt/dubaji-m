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

            // 输出文件路径（你可自行改）
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

    // （可选）防止 native 提前释放导致崩溃
    Amp.releaseByteArray.implementation = function (arr) {
        console.log("[*] releaseByteArray bypass");
        // 不调用原函数
    };

    console.log("[*] hook installed");
});
