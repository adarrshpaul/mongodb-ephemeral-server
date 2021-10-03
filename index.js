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
Object.defineProperty(exports, "__esModule", { value: true });
var process = __importStar(require("child_process"));
var mongoInstance = /** @class */ (function () {
    /***Private constructor so that no one can create an instance directly */
    function mongoInstance() {
    }
    ;
    mongoInstance.getInstance = function () {
        if (!mongoInstance.instance) {
            mongoInstance.instance = new mongoInstance();
        }
        return mongoInstance.instance;
    };
    mongoInstance.start = function () {
        var engine = 'ephemeralForTest';
        this.mongoProcess = process.spawn('mongod', ["--port=" + this.port, "--dbpath=" + this.dbPath, "--logpath=" + this.logPath, '--nojournal', "--storageEngine=" + engine, "--quiet"]);
        this.mongoProcess.on('error', function (err) {
            console.log('err: ', err);
            throw new TypeError(err);
        });
        this.mongoProcess.on('close', function (code) {
            if (code !== 0) {
                throw new TypeError('Refer the log file for more info !');
            }
        });
    };
    mongoInstance.debug = function () {
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
    mongoInstance.end = function () {
        this.mongoProcess.kill('SIGINT');
    };
    mongoInstance.getDbUri = function () {
        var url = "mongodb://localhost:" + this.port + "/";
        return url;
    };
    mongoInstance.port = 27022;
    mongoInstance.logPath = '/home/adarrsh/databases/mongodb/log/mongod.log';
    mongoInstance.dbPath = '/home/adarrsh/databases/mongodb/data';
    return mongoInstance;
}());
var dbUrl = mongoInstance.getDbUri();
console.log(dbUrl);
exports.default = mongoInstance;
