"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __importStar(require("vscode"));
const fs = require("fs");
const path = require("path");
/**
 * 从某个HTML文件读取能被Webview加载的HTML内容
 * @param {*} context 上下文
 * @param {*} templatePath 相对于插件根目录的html文件相对路径 如：'./template/ViewTool/index.html'
 */
const getWebViewContent = (context, templatePath) => {
    const resourcePath = path.join(context.extensionPath, templatePath);
    const dirPath = path.dirname(resourcePath);
    let html = fs.readFileSync(resourcePath, "utf-8");
    // vscode不支持直接加载本地资源，需要替换成其专有路径格式，这里只是简单的将样式和JS的路径替换
    html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
        return ($1 +
            vscode.Uri.file(path.resolve(dirPath, $2))
                .with({ scheme: "vscode-resource" })
                .toString() +
            '"');
    });
    return html;
};
exports.default = getWebViewContent;
// /**
//  * 获取某个扩展文件相对于webview需要的一种特殊路径格式
//  * 形如：vscode-resource:/Users/toonces/projects/vscode-cat-coding/media/cat.gif
//  * @param context 上下文
//  * @param relativePath 扩展中某个文件相对于根目录的路径，如 images/test.jpg
//  */
// const getExtensionFileVscodeResource = (context, relativePath) => {
//   const diskPath = vscode.Uri.file(
//     path.join(context.extensionPath, relativePath)
//   );
//   return diskPath.with({ scheme: "vscode-resource" }).toString();
// };
//# sourceMappingURL=getWebViewContent.js.map