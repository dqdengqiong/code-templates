/*
 * @Author: miya.deng
 * @Date: 2023-12-03 17:20:06
 * @Description:
 */
import * as vscode from "vscode";

/**
 * 获取模板库相关路径
 */
const getTemplatePath = (context: vscode.ExtensionContext) => {
	const extensionPath = context.extensionPath; // vscode.extensions.getExtension("<publisher_name>.<extension_name>").extensionPath
	const vscodeConfig = vscode.workspace.getConfiguration();
	const gitTemplateUrl = String(
		vscodeConfig.get("code-templates.config.gitTemplateUrl")
	);
	const gitUtilsPath = vscodeConfig.get("code-templates.config.gitUtilsPath"); // Utils的相对路径
	const pageTemplatePathName = vscodeConfig.get(
		"code-templates.config.gitPageTemplatePath"
	); // 页面模版的相对路径
	const gitComponentsPath = vscodeConfig.get(
		"code-templates.config.gitComponentsPath"
	);
	const tplName = vscodeConfig.get("code-templates.config.localTemplatePath");

	const match = gitTemplateUrl.match(/\/([^\/]*)$/) || [];
	const repoName = (match[1] || "").replace(/.git/g, ""); // 模板代码仓库名称 用于判断是否已经存在该仓库
	const localTPLPath = `${context.extensionPath}/${tplName}`;
	const localREPOPath = `${context.extensionPath}/${tplName}/${repoName}`;
	const localUtilsPath = `${context.extensionPath}/${tplName}/${repoName}/${gitUtilsPath}`;
	const localPageTemplatePath = `${context.extensionPath}/${tplName}/${repoName}/${pageTemplatePathName}`;
	const localComponentsPath = `${context.extensionPath}/${tplName}/${repoName}/${gitComponentsPath}`;

	return {
		extensionPath, // 本插件在本地的 绝对路径
		gitTemplateUrl, // 远程模板仓库git的url 后缀名带.git
		//gitTemplatePath, // 远程模板仓库的 模板代码的 相对路径
		repoName, // 远程目标仓库名称
		tplName, // 将代码仓库克隆到本地插件所在位置的 用来存放下载文件的 相对路径
		localTPLPath, // 将代码仓库克隆到本地插件所在位置的 用来存放下载文件的 绝对路径
		localREPOPath, // 将代码仓库克隆到本地插件所在位置的 用来存放下载文件的 模板仓库的 绝对路径
		localUtilsPath, // 将代码仓库克隆到本地插件所在位置的 用来存放下载文件的 模板仓库的 Utils位置的 绝对路径
		localPageTemplatePath, // 将代码仓库克隆到本地插件所在位置的 用来存放下载文件的 模板仓库的 页面模板代码位置的 绝对路径
		localComponentsPath, // 将代码仓库克隆到本地插件所在位置的 用来存放下载文件的 模板仓库的 组件代码位置的 绝对路径
	};
};

export default getTemplatePath;
