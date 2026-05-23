"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use("/api", routes_1.default);
const clientBuildPath = path_1.default.resolve(__dirname, "..", "client", "build");
app.use(express_1.default.static(clientBuildPath));
app.get("*", (_req, res) => {
    res.sendFile(path_1.default.join(clientBuildPath, "index.html"));
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map