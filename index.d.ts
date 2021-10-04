declare class mongoInstance {
    private mongoProcess;
    port: number;
    logPath: string;
    dbPath: string;
    /**For windows only */
    mongodExeLocation: string | undefined;
    constructor(port: number, logPath: string, dbPath: string, mongodExeLocation?: string);
    start(): void;
    debug(): void;
    stop(): void;
    getDbUri(dbName: string): string;
}
export { mongoInstance };
