import express from "express";
import cors from "cors";
import fs, { stat } from "fs";
import path from "path";
import { createProxyMiddleware } from "http-proxy-middleware";
import { Apis } from "@/apis/Apis";
import * as bodyParser from "body-parser"

const app = express();
app.use(cors());
app.use(bodyParser.default.json())
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

// // 测试用的
Apis.test.use(app, (req, res, data) => {
    return {
        status: 200,
        text: `${data.a} ${data.b}`
    }
},
    (req, res, data) => {
        res.send(data)
    }
)

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

app.use((err: any, req: any, res: any, next: any) => {
    res.status(500).json({ message: err.message })
})

app.listen(configjson.listen, () => {
    console.log(`监听启动:${configjson.listen}`);
});

export const viteNodeApp = app;
