/*
 * @Author: miya.deng
 * @Date: 2023-11-23 18:50:32
 * @Description:
 */
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import sidebar from "./sidebar";
import commands from "./command";
import updateTemplateCode from "./utils/updateTemplateCode";
import getTemplatePath from "./utils/getTemplatePath";

// 初始化侧边栏
const initSidebar = async (context: vscode.ExtensionContext) => {
	const pathHtmlNpmManager = "./src/webview/template-list/index.html";
	const {
		localTemplate1Path,
		localTemplate2Path,
		localTemplate3Path,
		localTemplate4Path,
	} = getTemplatePath(context);

	const sidebarWebViewPage = new sidebar.SidebarTemplateTreeListWebView(
		context
	);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			"page-templates",
			sidebarWebViewPage
		)
	);

	// if (localTemplate1Path) {
	// 	const sidebarWebViewPage = new sidebar.SidebarTemplateListWebView(
	// 		context,
	// 		localTemplate1Path,
	// 		pathHtmlNpmManager
	// 	);

	// 	context.subscriptions.push(
	// 		vscode.window.registerWebviewViewProvider(
	// 			"page-templates",
	// 			sidebarWebViewPage
	// 		)
	// 	);
	// }

	// if (localTemplate2Path) {
	// 	const sidebarWebViewComponent = new sidebar.SidebarTemplateListWebView(
	// 		context,
	// 		localTemplate2Path,
	// 		pathHtmlNpmManager
	// 	);
	// 	context.subscriptions.push(
	// 		vscode.window.registerWebviewViewProvider(
	// 			"common-components",
	// 			sidebarWebViewComponent
	// 		)
	// 	);
	// }

	// if (localTemplate3Path) {
	// 	const sidebarWebViewUtil = new sidebar.SidebarTemplateListWebView(
	// 		context,
	// 		localTemplate3Path,
	// 		pathHtmlNpmManager
	// 	);
	// 	context.subscriptions.push(
	// 		vscode.window.registerWebviewViewProvider(
	// 			"common-utils",
	// 			sidebarWebViewUtil
	// 		)
	// 	);
	// }

	// if (localTemplate4Path) {
	// 	const sidebarWebViewUtil = new sidebar.SidebarTemplateListWebView(
	// 		context,
	// 		localTemplate4Path,
	// 		pathHtmlNpmManager
	// 	);
	// 	context.subscriptions.push(
	// 		vscode.window.registerWebviewViewProvider(
	// 			"common-utils",
	// 			sidebarWebViewUtil
	// 		)
	// 	);
	// }

	console.log("initSidebar done.");
};
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log(
		'Congratulations, your extension "code-templates" is now active2!'
	);

	// 注册命令

	for (let key in commands) {
		context.subscriptions.push(commands[key](context));
	}

	updateTemplateCode(context);

	// 初始化侧边栏
	initSidebar(context);
}

// This method is called when your extension is deactivated
export function deactivate() {}
