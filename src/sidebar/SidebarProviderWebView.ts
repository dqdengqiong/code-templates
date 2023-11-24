/*
 * @Author: miya.deng
 * @Date: 2023-11-23 19:50:58
 * @Description:
 */
import * as vscode from "vscode";
import {
	getNonce,
	getTemplateList,
	getTemplatePath,
	getWebViewContent,
} from "../utils";

export class SidebarProviderWebview implements vscode.WebviewViewProvider {
	_view?: vscode.WebviewView;
	_doc?: vscode.TextDocument;
	constructor(
		private readonly content: vscode.ExtensionContext,
		private readonly pathHtml: string
	) {}

	public resolveWebviewView(webviewView: vscode.WebviewView) {
		this._view = webviewView;

		webviewView.webview.options = {
			// 在 webview 允许脚本
			enableScripts: true,
			localResourceRoots: [this.content.extensionUri],
		};

		const html = getWebViewContent(this.content, this.pathHtml);

		//webviewView.webview.html = html;

		// 方法二
		webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
	}

	public revive(panel: vscode.WebviewView) {
		this._view = panel;
	}

	private _getHtmlForWebview(webview: vscode.Webview) {
		const scriptUri = webview.asWebviewUri(
			vscode.Uri.joinPath(
				this.content.extensionUri,
				"build",
				"static/js/main.js"
			)
		);
		const styleMainUri = webview.asWebviewUri(
			vscode.Uri.joinPath(this.content.extensionUri, "build", "main.css")
		);

		// Use a nonce to 只允许特定脚本运行.
		const nonce = getNonce();

		const { localTEMPLATEPath } = getTemplatePath(this.content);
		const path =
			"/Users/miya.deng/.vscode/extensions/gengjian1203.code-maker-2.1.1/tpl/code-template/templates";
		const list = getTemplateList(path);
		const templateItems = list.map((item: any) => {
			return `<div ></div><div>${item.fileName}</div><div>${item.readmeName}</div><div>${item.readmeDetail}</div></div>`;
		});
		console.log("templateItems", list);

		return `<!DOCTYPE html>
	      <html lang="en">
	      <head>
	      <meta charset="UTF-8">
	              <meta http-equiv="Content-Security-Policy" content="img-src https: data:; style-src 'unsafe-inline' ${
									webview.cspSource
								}; script-src 'nonce-${nonce}';">
	      <meta name="viewport" content="width=device-width, initial-scale=1.0">
	      <link href="${styleMainUri}" rel="stylesheet">
	              <script nonce="${nonce}">
	                const tsvscode = acquireVsCodeApi(); //内置函数，可以访问 VS Code API 对象
	                const apiBaseUrl = 'https://cnodejs.org/'
	              </script>
	              </head>
	            <body>
	                <div id="root">${templateItems.join("")}</div>
	                <script nonce="${nonce}" src="${scriptUri}"></script>
	            </body>
	  </html>`;
	}
}
