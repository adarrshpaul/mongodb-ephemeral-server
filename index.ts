import * as process from "child_process";

class mongoInstance {
    private static port: number = 27022;
    private static logPath: string = '/home/adarrsh/databases/mongodb/log/mongod.log';
    private static dbPath: string = '/home/adarrsh/databases/mongodb/data';

    private static instance: mongoInstance;
    /***Private constructor so that no one can create an instance directly */
    private constructor() { };

    private static mongoProcess: any;

    public static getInstance(): mongoInstance {
        if (!mongoInstance.instance) {
            mongoInstance.instance = new mongoInstance();
        }
        return mongoInstance.instance;
    }

    public static start() {
        let engine = 'ephemeralForTest';
        this.mongoProcess = process.spawn('mongod', [`--port=${this.port}`, `--dbpath=${this.dbPath}`, `--logpath=${this.logPath}`, '--nojournal', `--storageEngine=${engine}`, `--quiet`]);
        this.mongoProcess.on('error', function (err: any) {
            console.log('err: ',err);
            throw new TypeError(err);
        });

        this.mongoProcess.on('close', function (code: any) {
            if(code !== 0){
                throw new TypeError('Refer the log file for more info !')
            }
        });
    }

    public static debug() {
        this.mongoProcess.stdout.on('data', function (data: any) {
            console.log('stdout: ' + data);
        });
        this.mongoProcess.stderr.on('data', function (data: any) {
            console.log('stderr: ' + data);
        });

        this.mongoProcess.on('error', function (err: any) {
            console.log('err: ',err);
        });

        this.mongoProcess.on('close', function (code: any) {
            console.log('the testing-mongo exited with code ' + code);
        });
    }

    public static end() {
        this.mongoProcess.kill('SIGINT');
    }
}

module.exports = {mongoInstance}


