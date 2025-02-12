import express from "express";
import cors from "cors";
import fs, { stat } from "fs";
import path from "path";
import mime from "mime";
import { createProxyMiddleware } from "http-proxy-middleware";
import https from "https";



const app = express();
app.use(cors());
let jsonUrl = "./config.jsonc";
let exampleJsonUrl = "./config.example.jsonc";
// 没有就创建
if (!fs.existsSync(jsonUrl)) {
    let buf = fs.readFileSync(exampleJsonUrl);
    fs.writeFileSync(jsonUrl, buf);
}

const jsonStr = fs.readFileSync(jsonUrl, "utf-8");
const configjson: JConfigType = eval(`(${jsonStr})`);
console.log(configjson);

if (import.meta.env.MODE == "development") {
    //  前面不能加*,会影响vue加载
    app.use(createProxyMiddleware({
        target: "http://localhost:5173",
        changeOrigin: true,
        ws: true, // 支持WebSocket（用于HMR）
    }))
}
else if (import.meta.env.MODE == "production") {
    app.use(express.static("./build_vue"))
}


app.listen(configjson.listen, () => {
    console.log(`监听启动:${configjson.listen}`);
});


// https监听
if (configjson.httpsListen && configjson.httpsCrtUrl && configjson.httpsKeyUrl) {
    try {
        let keydata = fs.readFileSync(configjson.httpsKeyUrl);
        let crtdata = fs.readFileSync(configjson.httpsCrtUrl);
        const https_app = express();
        https_app.use(
            "/",
            createProxyMiddleware({
                target: `http://127.0.0.1:${configjson.listen}`,
                changeOrigin: true
            })
        );
        // https_app.listen(configjson.httpsListen)
        // console.log(`ssl监听启动:${configjson.httpsListen}`)
        https
            .createServer(
                {
                    key: keydata,
                    cert: crtdata
                },
                https_app
            )
            .listen(configjson.httpsListen);
        console.log(`ssl监听启动:${configjson.httpsListen}`);
    } catch {
        console.log("https的证书或密钥存在问题!");
    }
}

export const viteNodeApp = app;
