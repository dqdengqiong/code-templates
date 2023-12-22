/*
 * @Author: miya.deng
 * @Date: 2023-11-23 19:50:58
 * @Description:
 */
import * as vscode from "vscode";
import { getNonce, getTemplateList, getTemplatePath } from "../utils";
import { ITemplateCategoryInfo, ITemplateInfo } from "../types";

export class SidebarTemplateTreeListWebView
	implements vscode.WebviewViewProvider
{
	_view?: vscode.WebviewView;
	_doc?: vscode.TextDocument;
	constructor(private readonly content: vscode.ExtensionContext) {}

	public resolveWebviewView(webviewView: vscode.WebviewView) {
		this._view = webviewView;

		webviewView.webview.options = {
			// 在 webview 允许脚本
			enableScripts: true,
			localResourceRoots: [this.content.extensionUri],
		};

		// /const html = getWebViewContent(this.content, this.pathHtml);

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
			vscode.Uri.joinPath(this.content.extensionUri, "assets", "style.css")
		);

		// Use a nonce to 只允许特定脚本运行.
		const nonce = getNonce();
		const { templateCategorys } = getTemplatePath(this.content);
		//const list = getTemplateList(this.templatePath) || [];
		const treeList: ITemplateCategoryInfo[] = templateCategorys.map((item) => {
			return {
				...item,
				fileList: getTemplateList(item.path) || [],
			};
		});
		const templateCategoryTreeList = treeList?.map((categoryItem) => {
			const templateList =
				categoryItem.fileList?.map((item: ITemplateInfo) => {
					return `<div class="mb-2 title"><b>${item?.fileName}</b></div>
			<div class="mb-1">${item.configInfo?.name || ""}</div>
			<div class="mb-1">${item.configInfo?.description || ""}</div>
			<div class="mb-1">${item.readmeDetail || ""}</div>
			<div class="mb-4"><a href=${item.configInfo?.demoUrl}>${
						item.configInfo?.demoUrl ? "预览" : ""
					} </a></div>`;
				}) || [];

			return `<div>
			<div class="mb-2 title"><b>${categoryItem?.label} (${
				categoryItem?.description
			})</b></div>
			<div class="sub-list">${templateList?.join("")}</div>
			</div>`;
		});

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
	              </script>
	              </head>
	            <body>
	                <div id="root">${templateCategoryTreeList?.join("")}</div>
	                <script nonce="${nonce}" src="${scriptUri}"></script>
	            </body>
	  </html>`;
	}
}
