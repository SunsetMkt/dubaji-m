# dubaji-m
毒霸姬 Android 逆向

## 下载链接
https://www.bilibili.com/video/BV1e8411S7Aw/

https://dubaji-m.zhhainiao.com/

## APK内容tree
```
.
├── AndroidManifest.xml
├── assets
│   ├── animation
│   │   ├── eva_animation.png
│   │   ├── tab_icon_assistant_anim.png
│   │   ├── tab_icon_creator_anim.png
│   │   ├── tab_icon_dubaji_anim.png
│   │   └── tab_icon_mine_anim.png
│   ├── audio
│   │   ├── error.wav
│   │   └── welcome.wav
│   ├── close.png
│   ├── cn
│   ├── cucc
│   │   └── host_cucc.properties
│   ├── dexopt
│   │   ├── baseline.prof
│   │   └── baseline.profm
│   ├── dubaji_amp.zip
│   ├── dubaji_back.png
│   ├── icon_gear.png
│   ├── ijiami_VMP_pay.VData
│   ├── oaid.pem
│   ├── supplierconfig.json
│   └── version.ini
├── classes.dex
├── classes2.dex
├── DebugProbesKt.bin
├── javax
│   └── annotation
│       ├── CheckForNull.java
│       ├── CheckForSigned.java
│       ├── CheckReturnValue.java
│       ├── concurrent
│       │   ├── GuardedBy.java
│       │   ├── Immutable.java
│       │   ├── NotThreadSafe.java
│       │   └── ThreadSafe.java
│       ├── Detainted.java
│       ├── MatchesPattern.java
│       ├── meta
│       │   ├── Exclusive.java
│       │   ├── Exhaustive.java
│       │   ├── TypeQualifier.java
│       │   ├── TypeQualifierDefault.java
│       │   ├── TypeQualifierNickname.java
│       │   ├── TypeQualifierValidator.java
│       │   └── When.java
│       ├── Nonnegative.java
│       ├── Nonnull.java
│       ├── Nullable.java
│       ├── OverridingMethodsMustInvokeSuper.java
│       ├── ParametersAreNonnullByDefault.java
│       ├── PropertyKey.java
│       ├── RegEx.java
│       ├── Signed.java
│       ├── Syntax.java
│       ├── Tainted.java
│       ├── Untainted.java
│       ├── WillClose.java
│       ├── WillCloseWhenClosed.java
│       └── WillNotClose.java
├── kotlin
│   ├── annotation
│   │   └── annotation.kotlin_builtins
│   ├── collections
│   │   └── collections.kotlin_builtins
│   ├── coroutines
│   │   └── coroutines.kotlin_builtins
│   ├── internal
│   │   └── internal.kotlin_builtins
│   ├── kotlin.kotlin_builtins
│   ├── ranges
│   │   └── ranges.kotlin_builtins
│   └── reflect
│       └── reflect.kotlin_builtins
├── kotlin-tooling-metadata.json
├── lib
│   ├── arm64-v8a
│   │   ├── libampunpacker.so
│   │   ├── libCtaApiLib.so
│   │   ├── libijiami_VMP_pay.so
│   │   ├── libLive2DCubismCoreJNI.so
│   │   ├── liblog.so
│   │   ├── libmmkv.so
│   │   ├── libmsaoaidauth.so
│   │   ├── libmsaoaidsec.so
│   │   └── libsqlcipher.so
│   ├── armeabi
│   │   ├── libCtaApiLib.so
│   │   └── libijiami_VMP_pay.so
│   └── armeabi-v7a
│       ├── libampunpacker.so
│       ├── libCtaApiLib.so
│       ├── libijiami_VMP_pay.so
│       ├── libLive2DCubismCoreJNI.so
│       ├── liblog.so
│       ├── libmmkv.so
│       ├── libmsaoaidauth.so
│       ├── libmsaoaidsec.so
│       └── libsqlcipher.so
├── META-INF
│   └── ...
├── okhttp3
│   └── ...
├── res
│   └── ...
└── resources.arsc
```

## `dubaji_amp.zip`
`dubaji_amp.zip`是主要的需要被研究的文件。

## jadx-gui
值得注意的几个片段：

```java
package w2;

import android.util.Log;
import com.cf.ampunpacker.AmpPackWrapper;
import com.live2d.sdk.cubism.framework.CubismModelSettingJson;
import com.live2d.wrapper.live2Dhelper.LAppDefine;
import java.io.IOException;
import java.util.Map;

/* compiled from: LAppLive2DResource.java */
/* loaded from: classes.dex */
public final class a implements Runnable {

    /* renamed from: a  reason: collision with root package name */
    public final /* synthetic */ u2.a f5089a;

    /* renamed from: b  reason: collision with root package name */
    public final /* synthetic */ b f5090b;

    public a(b bVar, u2.a aVar) {
        this.f5090b = bVar;
        this.f5089a = aVar;
    }

    @Override // java.lang.Runnable
    public final void run() {
        LAppDefine.ModelDir modelDir;
        b bVar = this.f5090b;
        bVar.getClass();
        Log.d("live2d", "loadResource-start");
        String str = LAppDefine.ResourcePath.ROOT.getPath() + LAppDefine.ModelDir.values()[0].getDirName() + "/";
        bVar.e = str;
        try {
            Map<String, byte[]> loadEncryptedAmpFileData = AmpPackWrapper.getInstance().loadEncryptedAmpFileData(bVar.f5093c, "dubaji_amp.zip");
            if (loadEncryptedAmpFileData != null) {
                for (Map.Entry<String, byte[]> entry : loadEncryptedAmpFileData.entrySet()) {
                    bVar.f5091a.put(str + entry.getKey(), entry.getValue());
                }
            }
        } catch (IOException e) {
            Log.e("preloadEncryptedAmpFileData", e.getMessage());
        }
        byte[] a5 = bVar.a(bVar.e + (modelDir.getDirName() + ".model3.json"));
        if (a5 != null) {
            CubismModelSettingJson cubismModelSettingJson = new CubismModelSettingJson(a5);
            String modelFileName = cubismModelSettingJson.getModelFileName();
            if (!modelFileName.equals("")) {
                bVar.a(bVar.e + modelFileName);
            }
            if (cubismModelSettingJson.getExpressionCount() > 0) {
                int expressionCount = cubismModelSettingJson.getExpressionCount();
                for (int i4 = 0; i4 < expressionCount; i4++) {
                    bVar.a(bVar.e + cubismModelSettingJson.getExpressionFileName(i4));
                }
            }
            String physicsFileName = cubismModelSettingJson.getPhysicsFileName();
            if (!physicsFileName.equals("")) {
                bVar.a(bVar.e + physicsFileName);
            }
            String poseFileName = cubismModelSettingJson.getPoseFileName();
            if (!poseFileName.equals("")) {
                bVar.a(bVar.e + poseFileName);
            }
            String userDataFile = cubismModelSettingJson.getUserDataFile();
            if (!userDataFile.equals("")) {
                bVar.a(bVar.e + userDataFile);
            }
            bVar.f5094d = new c();
            for (int i5 = 0; i5 < cubismModelSettingJson.getMotionGroupCount(); i5++) {
                String motionGroupName = cubismModelSettingJson.getMotionGroupName(i5);
                int motionCount = cubismModelSettingJson.getMotionCount(motionGroupName);
                for (int i6 = 0; i6 < motionCount; i6++) {
                    String motionFileName = cubismModelSettingJson.getMotionFileName(motionGroupName, i6);
                    if (!motionFileName.equals("")) {
                        String d2 = androidx.appcompat.widget.a.d(new StringBuilder(), bVar.e, motionFileName);
                        bVar.f5092b.put(d2, bVar.f5094d.loadMotion(bVar.a(d2), null));
                    }
                }
            }
            Log.d("live2d", "loadResource-end");
        }
        u2.a aVar = this.f5089a;
        if (aVar != null) {
            aVar.onLive2dPreloadSuccess();
        }
    }
}
```

```java
package com.cf.ampunpacker;

import androidx.annotation.Keep;

/* loaded from: classes.dex */
public class AmpPackWrapper {

    /* loaded from: classes.dex */
    public static class a {

        /* renamed from: a  reason: collision with root package name */
        public static final AmpPackWrapper f1510a = new AmpPackWrapper();
    }

    public AmpPackWrapper() {
        System.loadLibrary("ampunpacker");
    }

    @Keep
    private native byte[] getAmpFileStream(byte[] bArr, int i4, String str);

    public static final AmpPackWrapper getInstance() {
        return a.f1510a;
    }

    @Keep
    private native String getZipKey();

    @Keep
    private native void releaseByteArray(byte[] bArr);

    /* JADX WARN: Removed duplicated region for block: B:27:0x003b A[RETURN] */
    /* JADX WARN: Removed duplicated region for block: B:28:0x003c  */
    /* JADX WARN: Removed duplicated region for block: B:48:0x005f A[EXC_TOP_SPLITTER, SYNTHETIC] */
    /*
        Code decompiled incorrectly, please refer to instructions dump.
        To view partially-correct code enable 'Show inconsistent code' option in preferences
    */
    public java.util.Map<java.lang.String, byte[]> loadEncryptedAmpFileData(android.content.Context r6, java.lang.String r7) throws java.io.IOException {
        /*
            r5 = this;
            r0 = 0
            if (r6 == 0) goto L68
            boolean r1 = android.text.TextUtils.isEmpty(r7)
            if (r1 == 0) goto La
            goto L68
        La:
            r1 = 0
            android.content.res.AssetManager r2 = r6.getAssets()     // Catch: java.lang.Throwable -> L2a java.io.IOException -> L2c
            java.io.InputStream r2 = r2.open(r7)     // Catch: java.lang.Throwable -> L2a java.io.IOException -> L2c
            int r3 = r2.available()     // Catch: java.lang.Throwable -> L25 java.io.IOException -> L28
            byte[] r4 = new byte[r3]     // Catch: java.lang.Throwable -> L25 java.io.IOException -> L28
            r2.read(r4, r1, r3)     // Catch: java.lang.Throwable -> L25 java.io.IOException -> L28
            r2.close()     // Catch: java.io.IOException -> L20
            goto L38
        L20:
            r1 = move-exception
            r1.printStackTrace()
            goto L38
        L25:
            r6 = move-exception
            r0 = r2
            goto L5d
        L28:
            r3 = move-exception
            goto L2e
        L2a:
            r6 = move-exception
            goto L5d
        L2c:
            r3 = move-exception
            r2 = r0
        L2e:
            r3.printStackTrace()     // Catch: java.lang.Throwable -> L25
            byte[] r4 = new byte[r1]     // Catch: java.lang.Throwable -> L25
            if (r2 == 0) goto L38
            r2.close()     // Catch: java.io.IOException -> L20
        L38:
            int r1 = r4.length
            if (r1 != 0) goto L3c
            return r0
        L3c:
            if (r7 == 0) goto L58
            java.lang.String r0 = r7.trim()
            int r0 = r0.length()
            if (r0 != 0) goto L49
            goto L58
        L49:
            java.lang.String r0 = "/"
            int r0 = r7.lastIndexOf(r0)
            if (r0 > 0) goto L52
            goto L58
        L52:
            int r0 = r0 + 1
            java.lang.String r7 = r7.substring(r0)
        L58:
            java.util.Map r6 = r5.loadEncryptedAmpFileData(r6, r4, r7)
            return r6
        L5d:
            if (r0 == 0) goto L67
            r0.close()     // Catch: java.io.IOException -> L63
            goto L67
        L63:
            r7 = move-exception
            r7.printStackTrace()
        L67:
            throw r6
        L68:
            return r0
        */
        throw new UnsupportedOperationException("Method not decompiled: com.cf.ampunpacker.AmpPackWrapper.loadEncryptedAmpFileData(android.content.Context, java.lang.String):java.util.Map");
    }

    /* JADX WARN: Code restructure failed: missing block: B:126:0x0299, code lost:
        throw new net.lingala.zip4j.exception.ZipException("corrupt AES extra data records");
     */
    /* JADX WARN: Code restructure failed: missing block: B:174:0x0349, code lost:
        throw new net.lingala.zip4j.exception.ZipException("AesExtraDataRecord not found or invalid for Aes encrypted entry");
     */
    /* JADX WARN: Code restructure failed: missing block: B:176:0x0352, code lost:
        if (r0.f5137l.equals(net.lingala.zip4j.model.enums.EncryptionMethod.ZIP_STANDARD) != false) goto L96;
     */
    /* JADX WARN: Removed duplicated region for block: B:112:0x0232  */
    /* JADX WARN: Removed duplicated region for block: B:129:0x029d  */
    /* JADX WARN: Removed duplicated region for block: B:137:0x02ba  */
    /* JADX WARN: Removed duplicated region for block: B:138:0x02bf  */
    /*
        Code decompiled incorrectly, please refer to instructions dump.
        To view partially-correct code enable 'Show inconsistent code' option in preferences
    */
    public java.util.Map<java.lang.String, byte[]> loadEncryptedAmpFileData(android.content.Context r18, byte[] r19, java.lang.String r20) throws java.io.IOException {
        /*
            Method dump skipped, instructions count: 1049
            To view this dump change 'Code comments level' option to 'DEBUG'
        */
        throw new UnsupportedOperationException("Method not decompiled: com.cf.ampunpacker.AmpPackWrapper.loadEncryptedAmpFileData(android.content.Context, byte[], java.lang.String):java.util.Map");
    }
}
```

检查`libampunpacker.so`

TODO
