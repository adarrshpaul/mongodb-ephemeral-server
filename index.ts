import * as process from "child_process";

import os from 'os';

class mongoInstance {
    private mongoProcess: any;
    public port: number;
    public logPath: string;
    public dbPath: string;
    /**For windows only */
    public mongodExeLocation: string | undefined;

    public constructor(port: number, logPath: string, dbPath: string, mongodExeLocation?: string) {
        this.port = port;
        this.logPath = logPath;
        this.dbPath = dbPath;
        this.mongodExeLocation = mongodExeLocation;
    };

    public start(): void {
        let engine = 'ephemeralForTest';
        if (os.platform() === 'win32') {
            this.mongoProcess = process.spawn('mongod', [`--port=${this.port}`, `--dbpath=${this.dbPath}`, `--logpath=${this.logPath}`, '--nojournal', `--storageEngine=${engine}`, `--quiet`], { cwd: this.mongodExeLocation });
        } else {
            this.mongoProcess = process.spawn('mongod', [`--port=${this.port}`, `--dbpath=${this.dbPath}`, `--logpath=${this.logPath}`, '--nojournal', `--storageEngine=${engine}`, `--quiet`]);
        }

        this.mongoProcess.on('error', function (err: any) {
            console.log('err: ', err);
            throw new TypeError(err);
        });

        this.mongoProcess.on('close', function (code: any) {
            if (!(code === null || code === 0)) {
                throw new TypeError('Refer the log file for more info !' + code)
            }
        });
    }

    public debug(): void {
        this.mongoProcess.stdout.on('data', function (data: any) {
            console.log('stdout: ' + data);
        });
        this.mongoProcess.stderr.on('data', function (data: any) {
            console.log('stderr: ' + data);
        });

        this.mongoProcess.on('error', function (err: any) {
            console.log('err: ', err);
        });

        this.mongoProcess.on('close', function (code: any) {
            console.log('the testing-mongo exited with code ' + code);
        });
    }

    public stop(): void {
        this.mongoProcess.kill('SIGKILL');
    }

    public getDbUri(dbName: string): string {
        let url = `mongodb://localhost:${this.port}/${dbName}`;
        return url;
    }
}


export { mongoInstance }


