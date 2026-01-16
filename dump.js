function waitForJava(fn) {
    if (Java.available) {
        Java.perform(fn);
    } else {
        setTimeout(() => waitForJava(fn), 100);
    }
}

waitForJava(function () {
    console.log("[*] Java ready");

    const Amp = Java.use("com.cf.ampunpacker.AmpPackWrapper");
    const File = Java.use("java.io.File");
    const FileOutputStream = Java.use("java.io.FileOutputStream");

    const ByteArrayClass = Java.use("[B").class;

    Amp.loadEncryptedAmpFileData.overload(
        "android.content.Context",
        "java.lang.String"
    ).implementation = function (ctx, ampName) {
        console.log("[*] loadEncryptedAmpFileData:", ampName);

        const map = this.loadEncryptedAmpFileData(ctx, ampName);
        if (!map) return map;

        const it = map.keySet().iterator();
        while (it.hasNext()) {
            const keyObj = it.next();
            const key = keyObj.toString();
            const value = map.get(keyObj);

            if (!value) continue;

            const cls = value.getClass();
            console.log("  [+] key:", key, "class:", cls.getName());

            // 只处理 byte[]
            if (!ByteArrayClass.isAssignableFrom(cls)) {
                console.log("      [!] not byte[], skip");
                continue;
            }

            const outPath = "/data/data/com.cf.dubaji/" + ampName + "/" + key;
            console.log("      → dump:", outPath);

            try {
                const outFile = File.$new(outPath);
                const parent = outFile.getParentFile();
                if (parent && !parent.exists()) parent.mkdirs();

                const fos = FileOutputStream.$new(outFile);

                // ⭐ 核心修复：直接用 write(byte[])
                fos.write.overload("[B").call(fos, value);

                fos.flush();
                fos.close();
            } catch (e) {
                console.log("      [!] write failed:", e);
            }
        }

        return map;
    };

    // 防止 byte[] 被提前释放
    Amp.releaseByteArray.implementation = function () {
        console.log("[*] releaseByteArray blocked");
    };

    console.log("[*] hook installed (BYTE[] WRITE FIXED)");
});
