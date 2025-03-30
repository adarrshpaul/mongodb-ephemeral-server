import { type ChildProcess, spawn } from 'node:child_process';
import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	vi,
	vitest,
} from 'vitest';
import { MongoInstance } from '../index';

vi.mock('child_process', () => ({
	spawn: vi.fn(),
}));

describe('MongoInstance', () => {
	let mongoInstance: MongoInstance;
	const port = 27017;
	const logPath = '/path/to/log';
	const dbPath = '/path/to/db';
	const mongodExeLocation = 'C:\\path\\to\\mongod';

	beforeEach(() => {
		mongoInstance = new MongoInstance(port, logPath, dbPath, mongodExeLocation);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should initialize with correct properties', () => {
		expect(mongoInstance.port).toBe(port);
		expect(mongoInstance.logPath).toBe(logPath);
		expect(mongoInstance.dbPath).toBe(dbPath);
		expect(mongoInstance.mongodExeLocation).toBe(mongodExeLocation);
	});

	it('should log a warning if debug is called when the process is not running', () => {
		const consoleWarnSpy = vi
			.spyOn(console, 'warn')
			.mockImplementation(() => {});

		mongoInstance.debug();

		expect(consoleWarnSpy).toHaveBeenCalledWith(
			'MongoDB process is not running.',
		);
	});

	it('should log a warning if stop is called when the process is not running', () => {
		const consoleWarnSpy = vi
			.spyOn(console, 'warn')
			.mockImplementation(() => {});

		mongoInstance.stop();

		expect(consoleWarnSpy).toHaveBeenCalledWith(
			'MongoDB process is not running.',
		);
	});

	it('should return the correct MongoDB URI', () => {
		const dbName = 'testdb';
		const uri = mongoInstance.getDbUri(dbName);

		expect(uri).toBe(`mongodb://localhost:${port}/${dbName}`);
	});
});
