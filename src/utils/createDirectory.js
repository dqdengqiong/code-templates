"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
/**
 * 确保指定路径下是路由安全的
 * @param dirPath
 */
const createDirectory = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        const parentDir = path.dirname(dirPath);
        createDirectory(parentDir);
        fs.mkdirSync(dirPath);
    }
};
exports.default = createDirectory;
//# sourceMappingURL=createDirectory.js.map