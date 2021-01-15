"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.isDev = exports.AFXInterop = void 0;
/* eslint-disable no-console */
var server_1 = __importDefault(require("./server"));
var directories = __importStar(require("./init/directories"));
var child_process_1 = require("child_process");
var args_1 = __importDefault(require("./init/args"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var electron_1 = require("electron");
var renderer_1 = require("./renderer");
exports.AFXInterop = {
    process: null
};
exports.isDev = process.env.DEV === 'true';
function mainProcess(server, forceDev, gui) {
    if (forceDev === void 0) { forceDev = false; }
    if (gui === void 0) { gui = true; }
    return __awaiter(this, void 0, void 0, function () {
        var cookieFile, cookie, cookies, _i, cookies_1, cookie_1, e_1, RMTPServer, renderer, closeManager, args;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cookieFile = path_1["default"].join(electron_1.app.getPath('userData'), 'databases', 'cookie');
                    cookie = fs_1["default"].readFileSync(cookieFile, 'utf8');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    cookies = JSON.parse(cookie);
                    if (!Array.isArray(cookies)) return [3 /*break*/, 5];
                    _i = 0, cookies_1 = cookies;
                    _a.label = 2;
                case 2:
                    if (!(_i < cookies_1.length)) return [3 /*break*/, 5];
                    cookie_1 = cookies_1[_i];
                    cookie_1.url = 'https://hmapi.lexogrine.com/';
                    return [4 /*yield*/, electron_1.session.defaultSession.cookies.set(cookie_1)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 7];
                case 6:
                    e_1 = _a.sent();
                    return [3 /*break*/, 7];
                case 7:
                    electron_1.app.on('window-all-closed', electron_1.app.quit);
                    electron_1.app.on('before-quit', function () { return __awaiter(_this, void 0, void 0, function () {
                        var cookies;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, electron_1.session.defaultSession.cookies.get({ url: 'https://hmapi.lexogrine.com/' })];
                                case 1:
                                    cookies = _a.sent();
                                    fs_1["default"].writeFileSync(cookieFile, JSON.stringify(cookies), 'utf8');
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    RMTPServer = child_process_1.fork(require.resolve('./RMTPServer.js'));
                    renderer = null;
                    closeManager = function () {
                        if (server) {
                            server.close();
                        }
                        if (exports.AFXInterop.process) {
                            exports.AFXInterop.process.kill();
                        }
                        if (RMTPServer) {
                            RMTPServer.kill();
                        }
                        electron_1.app.quit();
                    };
                    electron_1.app.on('quit', function () {
                        if (renderer)
                            renderer.kill();
                        closeManager();
                    });
                    if (!gui)
                        return [2 /*return*/];
                    args = ['./', '--renderer'];
                    if (forceDev)
                        args.push('--dev');
                    renderer = child_process_1.spawn(process.execPath, args, {
                        stdio: forceDev ? ['pipe', 'pipe', 'pipe', 'ipc'] : ['ignore', 'ignore', 'ignore', 'ipc']
                    });
                    electron_1.app.on('second-instance', function () {
                        if (renderer.send) {
                            renderer.send('refocus');
                        }
                    });
                    if (forceDev)
                        renderer.stdout.on('data', function (data) { return console.log(data.toString()); });
                    renderer.on('exit', closeManager);
                    renderer.on('close', closeManager);
                    return [2 /*return*/];
            }
        });
    });
}
function startManager() {
    return __awaiter(this, void 0, void 0, function () {
        var server, argv;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    electron_1.app.setAppUserModelId('com.lexogrine.hudmanager');
                    if (process.argv.includes('--renderer')) {
                        renderer_1.createMainWindow(process.argv.includes('--dev'));
                        return [2 /*return*/];
                    }
                    directories.checkDirectories();
                    return [4 /*yield*/, server_1["default"]()];
                case 1:
                    server = _a.sent();
                    argv = args_1["default"](process.argv);
                    mainProcess(server, argv.dev, !argv.noGUI);
                    return [2 /*return*/];
            }
        });
    });
}
var lock = electron_1.app.requestSingleInstanceLock();
if (!lock && !process.argv.includes('--renderer')) {
    electron_1.app.quit();
}
else {
    electron_1.app.on('ready', startManager);
}
