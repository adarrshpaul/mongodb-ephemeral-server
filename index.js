import { spawn } from 'child_process';
import os from 'os';
class MongoInstance {
	constructor(port, logPath, dbPath, mongodExeLocation) {
		this.mongoProcess = null;
		this.port = port;
		this.logPath = logPath;
		this.dbPath = dbPath;
		this.mongodExeLocation = mongodExeLocation;
	}
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
	start() {
		const engine = 'ephemeralForTest';
		const args = [
			`--port=${this.port}`,
			`--dbpath=${this.dbPath}`,
			`--logpath=${this.logPath}`,
			'--nojournal',
			`--storageEngine=${engine}`,
			'--quiet',
		];
		const options =
			os.platform() === 'win32' && this.mongodExeLocation
				? { cwd: this.mongodExeLocation }
				: undefined;
		this.mongoProcess = spawn('mongod', args, options);
		this.mongoProcess.on('error', (err) => {
			console.error('Error starting MongoDB process:', err);
			throw new Error(`MongoDB process error: ${err.message}`);
		});
		this.mongoProcess.on('close', (code) => {
			if (code !== 0 && code !== null) {
				throw new Error(
					`MongoDB process exited with code ${code}. Refer to the log file for more info.`,
				);
			}
		});
	}
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
	debug() {
		var _a, _b;
		if (!this.mongoProcess) {
			console.warn('MongoDB process is not running.');
			return;
		}
		(_a = this.mongoProcess.stdout) === null || _a === void 0
			? void 0
			: _a.on('data', (data) => {
					console.log('stdout:', data.toString());
				});
		(_b = this.mongoProcess.stderr) === null || _b === void 0
			? void 0
			: _b.on('data', (data) => {
					console.error('stderr:', data.toString());
				});
		this.mongoProcess.on('error', (err) => {
			console.error('MongoDB process error:', err);
		});
		this.mongoProcess.on('close', (code) => {
			console.log(`MongoDB process exited with code ${code}`);
		});
	}
	/**
	 * Stops the MongoDB process if it is running.
	 *
	 * This method checks if the `mongoProcess` is active. If it is, the process is terminated
	 * using the "SIGKILL" signal, and the `mongoProcess` reference is set to `null`.
	 * If the process is not running, a warning message is logged to the console.
	 */
	stop() {
		if (this.mongoProcess) {
			this.mongoProcess.kill('SIGKILL');
			this.mongoProcess = null;
		} else {
			console.warn('MongoDB process is not running.');
		}
	}
	/**
	 * Constructs and returns the MongoDB connection URI for a given database name.
	 *
	 * @param dbName - The name of the database to include in the URI.
	 * @returns The MongoDB connection URI in the format `mongodb://localhost:<port>/<dbName>`.
	 */
	getDbUri(dbName) {
		return `mongodb://localhost:${this.port}/${dbName}`;
	}
}
export { MongoInstance };
