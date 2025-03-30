declare class MongoInstance {
	private mongoProcess;
	port: number;
	logPath: string;
	dbPath: string;
	/** For Windows only */
	mongodExeLocation?: string;
	constructor(
		port: number,
		logPath: string,
		dbPath: string,
		mongodExeLocation?: string,
	);
	/**
	 * Starts the MongoDB process with the specified configuration.
	 *
	 * This method initializes and spawns a MongoDB process using the `mongod` command
	 * with the provided arguments and options. It sets up event listeners to handle
	 * errors and process termination.
	 *
	 * @throws {Error} If the MongoDB process encounters an error during startup or
	 * if it exits with a non-zero code.
	 */
	start(): void;
	/**
	 * Enables debugging for the MongoDB process by attaching listeners to its
	 * standard output, standard error, and lifecycle events.
	 *
	 * - Logs data from the process's standard output (`stdout`) to the console.
	 * - Logs data from the process's standard error (`stderr`) to the console.
	 * - Logs any errors emitted by the process.
	 * - Logs the exit code when the process closes.
	 *
	 * If the MongoDB process is not running, a warning is logged and no listeners are attached.
	 */
	debug(): void;
	/**
	 * Stops the MongoDB process if it is running.
	 *
	 * This method checks if the `mongoProcess` is active. If it is, the process is terminated
	 * using the "SIGKILL" signal, and the `mongoProcess` reference is set to `null`.
	 * If the process is not running, a warning message is logged to the console.
	 */
	stop(): void;
	/**
	 * Constructs and returns the MongoDB connection URI for a given database name.
	 *
	 * @param dbName - The name of the database to include in the URI.
	 * @returns The MongoDB connection URI in the format `mongodb://localhost:<port>/<dbName>`.
	 */
	getDbUri(dbName: string): string;
}
export { MongoInstance };
