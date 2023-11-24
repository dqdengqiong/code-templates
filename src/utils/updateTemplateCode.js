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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __importStar(require("vscode"));
const createDirectory_1 = __importDefault(require("./createDirectory"));
const getTemplatePath_1 = __importDefault(require("./getTemplatePath"));
const GitManager_1 = __importDefault(require("../utilsManager/GitManager"));
const fs = require("fs");
/**
 * 更新本地的模板代码
 */
const updateTemplateCode = async (context) => {
    const { extensionPath, gitTemplateUrl, gitTemplatePath, repoName, tplName, localTPLPath, localREPOPath, } = (0, getTemplatePath_1.default)(context);
    // 如果没有模板目录则创建一个
    try {
        (0, createDirectory_1.default)(localTPLPath);
    }
    catch (e) {
        vscode.window.showInformationMessage(`模板仓库目录创建失败${JSON.stringify(e)}`);
    }
    // 判断是否存在模板，如果存在就pull，如果不存在就clone
    if (fs.existsSync(localREPOPath)) {
        const optionsGitPull = {
            path: localTPLPath,
        };
        const resGitPull = await GitManager_1.default.pull(optionsGitPull);
        const { res, msg } = resGitPull;
        if (res) {
            vscode.window.showInformationMessage(`模板仓库克隆成功`);
        }
        else {
            vscode.window.showErrorMessage(msg);
        }
    }
    else {
        const optionsGitClone = {
            path: localTPLPath,
            url: gitTemplateUrl,
        };
        const resGitClone = await GitManager_1.default.clone(optionsGitClone);
        const { res, msg } = resGitClone;
        if (res) {
            vscode.window.showInformationMessage(`模板仓库克隆成功`);
        }
        else {
            vscode.window.showErrorMessage(msg);
        }
    }
};
exports.default = updateTemplateCode;
//# sourceMappingURL=updateTemplateCode.js.map