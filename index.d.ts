declare class mongoInstance {
    private static port;
    private static logPath;
    private static dbPath;
    private static instance;
    /***Private constructor so that no one can create an instance directly */
    private constructor();
    private static mongoProcess;
    static getInstance(): mongoInstance;
    static start(): void;
    static debug(): void;
    static end(): void;
    static getDbUri(): string;
}
export default mongoInstance;
