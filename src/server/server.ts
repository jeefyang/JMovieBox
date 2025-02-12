import express from "express";
import cors from "cors";
import fs, { stat } from "fs";
import path from "path";
import { createProxyMiddleware } from "http-proxy-middleware";



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

// 列表
app.post("/fileList", (req, res) => {
    const { path } = req.query
    console.log(path)
    res.send("hello")
})

// 测试用的
app.get("/test", (_req, res) => {
    res.send("hello world!")
})

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

export const viteNodeApp = app;
