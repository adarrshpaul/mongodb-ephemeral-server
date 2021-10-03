import * as process from "child_process";
class mongoInstance  {
    public port: number;
    public logPath: string;
    public dbPath: string;

    public constructor(port:number, logPath: string, dbPath: string) {
        this.port = port;
        this.logPath = logPath;
        this.dbPath = dbPath;
    };

    private mongoProcess: any;

    public start(): void {
        let engine = 'ephemeralForTest';
        this.mongoProcess = process.spawn('mongod', [`--port=${this.port}`, `--dbpath=${this.dbPath}`, `--logpath=${this.logPath}`, '--nojournal', `--storageEngine=${engine}`, `--quiet`]);

        this.mongoProcess.on('error', function (err: any) {
            console.log('err: ', err);
            throw new TypeError(err);
        });

        this.mongoProcess.on('close', function (code: any) {
            if (code !== 0) {
                throw new TypeError('Refer the log file for more info !' + code)
            }
        });
    }

    public debug():void {
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

    public stop():void {
        this.mongoProcess.kill('SIGINT');
    }

    public getDbUri(dbName: string): string {
        let url = `mongodb://localhost:${this.port}/${dbName}`;
        return url;
    }
}


export { mongoInstance }


