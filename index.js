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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var process = __importStar(require("child_process"));
var os_1 = __importDefault(require("os"));
var mongoInstance = /** @class */ (function () {
    function mongoInstance(port, logPath, dbPath, mongodExeLocation) {
        this.port = port;
        this.logPath = logPath;
        this.dbPath = dbPath;
        this.mongodExeLocation = mongodExeLocation;
    }
    ;
    mongoInstance.prototype.start = function () {
        var engine = 'ephemeralForTest';
        if (os_1.default.platform() === 'win32') {
            this.mongoProcess = process.spawn('mongod', ["--port=" + this.port, "--dbpath=" + this.dbPath, "--logpath=" + this.logPath, '--nojournal', "--storageEngine=" + engine, "--quiet"], { cwd: this.mongodExeLocation });
        }
        else {
            this.mongoProcess = process.spawn('mongod', ["--port=" + this.port, "--dbpath=" + this.dbPath, "--logpath=" + this.logPath, '--nojournal', "--storageEngine=" + engine, "--quiet"]);
        }
        this.mongoProcess.on('error', function (err) {
            console.log('err: ', err);
            throw new TypeError(err);
        });
        this.mongoProcess.on('close', function (code) {
            if (code !== 0) {
                throw new TypeError('Refer the log file for more info !' + code);
            }
        });
    };
    mongoInstance.prototype.debug = function () {
        this.mongoProcess.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        });
        this.mongoProcess.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
        });
        this.mongoProcess.on('error', function (err) {
            console.log('err: ', err);
        });
        this.mongoProcess.on('close', function (code) {
            console.log('the testing-mongo exited with code ' + code);
        });
    };
    mongoInstance.prototype.stop = function () {
        this.mongoProcess.kill('SIGINT');
    };
    mongoInstance.prototype.getDbUri = function (dbName) {
        var url = "mongodb://localhost:" + this.port + "/" + dbName;
        return url;
    };
    return mongoInstance;
}());
module.exports = {
    mongoInstance: mongoInstance
};
