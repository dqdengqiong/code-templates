/*
 * @Author: miya.deng
 * @Date: 2023-12-03 17:20:06
 * @Description:
 */
import { ITemplateConfgInfo, ITemplateInfo } from "../types";

const fs = require("fs");
const path = require("path");

/**
 * 获取模板库的模板列表信息
 */
const getTemplateList = (pathTemplate: string): ITemplateInfo[] => {
	const result: any = [];
	const files = fs.readdirSync(pathTemplate);

	files?.forEach((fileName: string) => {
		const filePath = path.join(pathTemplate, fileName);
		const stats = fs.statSync(filePath);
		if (stats.isDirectory()) {
			const readmePath = `${filePath}/README.md`;
			const configPath = `${filePath}/config.json`;
			let readmeName = "";
			let readmeDetail = "";
			let configInfo = {
				dependences: ["../components/PageConfig"],
				demoUrl: "https://www.baidu.com/",
			} as ITemplateConfgInfo;
			if (fs.existsSync(readmePath)) {
				const data = fs.readFileSync(readmePath, "utf-8");
				const arrDataList = (readmeName = data.split("\n"))
					.map((item: any) => {
						return item.trim();
					})
					.filter((item: any) => {
						return item;
					});
				readmeName = arrDataList[0].trim().replace(/[#\s]+/g, "");
				readmeDetail = arrDataList[1].trim().replace(/[#\s]+/g, "");
			}

			if (fs.existsSync(configPath)) {
				const data = fs.readFileSync(configPath, "utf-8");
				configInfo = JSON.parse(data);
			}

			result.push({
				fileName,
				filePath,
				readmeName,
				readmeDetail,
				configInfo,
			});
		}
	});

	return result;
};

export default getTemplateList;
