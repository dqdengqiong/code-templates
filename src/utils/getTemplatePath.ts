/*
 * @Author: miya.deng
 * @Date: 2023-12-03 17:20:06
 * @Description:
 */
import * as vscode from "vscode";
import { QuickPickItem } from "vscode";

/**
 * 获取模板库相关路径
 */
const getTemplatePath = (context: vscode.ExtensionContext) => {
	const extensionPath = context.extensionPath; // vscode.extensions.getExtension("<publisher_name>.<extension_name>").extensionPath
	const vscodeConfig = vscode.workspace.getConfiguration();
	const gitTemplateUrl = String(
		vscodeConfig.get("code-templates.config.gitTemplateUrl")
	);

	// 模版目录的相对路径及其描述
	const template1GitRelativePath: string =
		vscodeConfig.get("code-templates.config.template1GitRelativePath") || "";
	const template2GitRelativePath: string =
		vscodeConfig.get("code-templates.config.template2GitRelativePath") || "";
	const template3GitRelativePath: string =
		vscodeConfig.get("code-templates.config.template3GitRelativePath") || "";
	const template4GitRelativePath: string =
		vscodeConfig.get("code-templates.config.template4GitRelativePath") || "";
	const template1Description: string =
		vscodeConfig.get("code-templates.config.template1Description") || "";
	const template2Description: string =
		vscodeConfig.get("code-templates.config.template2Description") || "";
	const template3Description: string =
		vscodeConfig.get("code-templates.config.template3Description") || "";
	const template4Description: string =
		vscodeConfig.get("code-templates.config.template4Description") || "";

	const tplName = vscodeConfig.get("code-templates.config.localTemplatePath");

	const match = gitTemplateUrl.match(/\/([^\/]*)$/) || [];
	const repoName = (match[1] || "").replace(/.git/g, ""); // 模板代码仓库名称 用于判断是否已经存在该仓库
	const localTPLPath = `${context.extensionPath}/${tplName}`;
	const localREPOPath = `${context.extensionPath}/${tplName}/${repoName}`;

	const localTemplate1Path: string = template2GitRelativePath
		? `${context.extensionPath}/${tplName}/${repoName}/${template1GitRelativePath}`
		: "";
	const localTemplate2Path: string = template2GitRelativePath
		? `${context.extensionPath}/${tplName}/${repoName}/${template2GitRelativePath}`
		: "";
	const localTemplate3Path: string = template3GitRelativePath
		? `${context.extensionPath}/${tplName}/${repoName}/${template3GitRelativePath}`
		: "";
	const localTemplate4Path: string = template4GitRelativePath
		? `${context.extensionPath}/${tplName}/${repoName}/${template4GitRelativePath}`
		: "";

	// 模版分类list
	const templateCategorys = [
		{
			label: localTemplate1Path.match(/\/([^\/]*)$/)?.[1] || "",
			description: template1Description,
			path: localTemplate1Path,
		},
		{
			label: localTemplate2Path.match(/\/([^\/]*)$/)?.[1] || "",
			description: template2Description,
			path: localTemplate2Path,
		},
		{
			label: localTemplate3Path.match(/\/([^\/]*)$/)?.[1] || "",
			description: template3Description,
			path: localTemplate3Path,
		},
		{
			label: localTemplate4Path.match(/\/([^\/]*)$/)?.[1] || "",
			description: template4Description,
			path: localTemplate4Path,
		},
	];

	return {
		extensionPath, // 本插件在本地的 绝对路径
		gitTemplateUrl, // 远程模板仓库git的url 后缀名带.git
		//gitTemplatePath, // 远程模板仓库的 模板代码的 相对路径
		repoName, // 远程目标仓库名称
		tplName, // 将代码仓库克隆到本地插件所在位置的 用来存放下载文件的 相对路径
		localTPLPath, // 将代码仓库克隆到本地插件所在位置的 用来存放下载文件的 绝对路径
		localREPOPath, // 将代码仓库克隆到本地插件所在位置的 用来存放下载文件的 模板仓库的 绝对路径
		localTemplate1Path, // 将代码仓库克隆到本地插件所在位置的 用来存放下载文件的 模板仓库的 模板代码1 位置的 绝对路径
		localTemplate2Path, // 将代码仓库克隆到本地插件所在位置的 用来存放下载文件的 模板仓库的 模板代码2 位置的 绝对路径
		localTemplate3Path, // 将代码仓库克隆到本地插件所在位置的 用来存放下载文件的 模板仓库的 模板代码3 位置的 绝对路径
		localTemplate4Path, //将代码仓库克隆到本地插件所在位置的 用来存放下载文件的 模板仓库的 模板代码4 位置的 绝对路径
		templateCategorys, // 模版分类list
	};
};

export default getTemplatePath;
