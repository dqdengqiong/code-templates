/*
 * @Author: miya.deng
 * @Date: 2023-12-07 11:43:31
 * @Description:
 */
export interface ITemplateDependenceConfig {
	components: string[];
}
export interface ITemplateConfgInfo {
	name?: string;
	demoUrl?: string;
	dependences?: ITemplateDependenceConfig;
	user?: string;
	description?: string;
}

export interface ITemplateInfo {
	fileName?: string;
	filePath?: string;
	configInfo?: ITemplateConfgInfo;
}
