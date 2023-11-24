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
/**
 * 获取模板库相关路径
 */
const getTemplatePath = (context) => {
    const extensionPath = context.extensionPath; // vscode.extensions.getExtension("<publisher_name>.<extension_name>").extensionPath
    const vscodeConfig = vscode.workspace.getConfiguration();
    const gitTemplateUrl = String(vscodeConfig.get("code-maker.config.gitTemplateUrl"));
    const gitTemplatePath = vscodeConfig.get("code-maker.config.gitTemplatePath");
    const tplName = vscodeConfig.get("code-maker.config.localTemplatePath");
    const match = gitTemplateUrl.match(/\/([^\/]*)$/) || [];
    const repoName = (match[1] || "").replace(/.git/g, ""); // 模板代码仓库名称 用于判断是否已经存在该仓库
    const localTPLPath = `${context.extensionPath}/${tplName}`;
    const localREPOPath = `${context.extensionPath}/${tplName}/${repoName}`;
    const localTEMPLATEPath = `${context.extensionPath}/${tplName}/${repoName}/${gitTemplatePath}`;
    return {
        extensionPath, // 本插件在本地的 绝对路径
        gitTemplateUrl, // 远程模板仓库git的url 后缀名带.git
        gitTemplatePath, // 远程模板仓库的 模板代码的 相对路径
        repoName, // 远程目标仓库名称
        tplName, // 将代码仓库克隆到本地插件所在位置的 用来存放下载文件的 相对路径
        localTPLPath, // 将代码仓库克隆到本地插件所在位置的 用来存放下载文件的 绝对路径
        localREPOPath, // 将代码仓库克隆到本地插件所在位置的 用来存放下载文件的 模板仓库的 绝对路径
        localTEMPLATEPath, // 将代码仓库克隆到本地插件所在位置的 用来存放下载文件的 模板仓库的 模板代码位置的 绝对路径
    };
};
exports.default = getTemplatePath;
//# sourceMappingURL=getTemplatePath.js.map