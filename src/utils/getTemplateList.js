"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
/**
 * 获取模板库的模板列表信息
 */
const getTemplateList = (pathTemplate) => {
    const result = [];
    const files = fs.readdirSync(pathTemplate);
    files.forEach((fileName) => {
        const filePath = path.join(pathTemplate, fileName);
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            const readmePath = `${filePath}/README.md`;
            let readmeName = "";
            let readmeDetail = "";
            if (fs.existsSync(readmePath)) {
                const data = fs.readFileSync(readmePath, "utf-8");
                const arrDataList = (readmeName = data.split("\n"))
                    .map((item) => {
                    return item.trim();
                })
                    .filter((item) => {
                    return item;
                });
                readmeName = arrDataList[0].trim().replace(/[#\s]+/g, "");
                readmeDetail = arrDataList[1].trim().replace(/[#\s]+/g, "");
            }
            result.push({
                fileName,
                filePath,
                readmeName,
                readmeDetail,
            });
        }
    });
    return result;
};
exports.default = getTemplateList;
//# sourceMappingURL=getTemplateList.js.map