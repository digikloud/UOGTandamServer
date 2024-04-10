"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
const querystring_1 = __importDefault(require("querystring"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true, limit: '1mb' }));
app.use(body_parser_1.default.json({ limit: '1mb' }));
// set path for static content
const staticPath = path_1.default.normalize(`${__dirname}/../app`);
app.use(express_1.default.static(staticPath));
// API endpoints
app.post('/api/auth/token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield createToken();
    res.status(200).json(token);
}));
function createToken() {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            'grant_type': 'client_credentials',
            'scope': 'data:read viewables:read'
        };
        const response = yield axios_1.default.post(`https://developer.api.autodesk.com/authentication/v2/token`, querystring_1.default.stringify(options), {
            auth: {
                username: process.env.APS_KEY,
                password: process.env.APS_SECRET,
            }
        });
        return response.data;
    });
}
// start listening
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.debug(`server is listening on port: ${port}`);
});
//# sourceMappingURL=server.js.map