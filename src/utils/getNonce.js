"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//  生成特定随机数
const getNonce = () => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
exports.default = getNonce;
//# sourceMappingURL=getNonce.js.map