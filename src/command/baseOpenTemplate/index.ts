/*
 * @Author: miya.deng
 * @Date: 2023-12-03 17:35:46
 * @Description:
 */
import * as vscode from "vscode";
import { getTemplatePath } from "../../utils";

export default (context: vscode.ExtensionContext) => {
	return vscode.commands.registerCommand(
		"code-templates.base.OpenTemplate",
		(res) => {
			// The code you place here will be executed every time your command is executed
			const { localTPLPath } = getTemplatePath(context);

			const uri = vscode.Uri.file(localTPLPath);
			vscode.commands.executeCommand("vscode.openFolder", uri, true);
		}
	);
};
