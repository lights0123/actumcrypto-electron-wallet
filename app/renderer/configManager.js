import nconf from 'nconf';
import { join } from 'path';
import { remote } from 'electron';
import { promisify } from 'bluebird';
import { accessSync, readdirSync, statSync } from 'fs';

const { app } = remote;

let multichainPath;
let blockchainName;

let isWindows = false;
if (process.platform === 'win32') isWindows = true;
if (isWindows) {
	multichainPath = join(process.env.APPDATA, 'MultiChain');
} else {
	multichainPath = join(process.env.HOME, '.multichain');
}

let multichainData;

export function init(blockchain) {
	multichainData = new nconf.Provider({
		stores: [
			{
				name: 'userConfig',
				type: 'file',
				file: join(app.getPath('userData'), `${app.getName()}.conf`),
				format: nconf.formats.ini,
			},
		],
	});
	if (blockchain) multichainData.set('blockchain', blockchain);
	blockchainName = multichainData.get('blockchain');
	if (blockchainName) {
		try {
			accessSync(join(multichainPath, blockchainName));
		} catch (e) {
			blockchainName = undefined;
			return false;
		}
	} else {
		blockchainName = undefined;
		return false;
	}

	multichainData.file({
		name: 'multichainParams',
		type: 'file',
		file: join(multichainPath, blockchainName, 'params.dat'),
		format: nconf.formats.ini,
	});
	multichainData.file({
		name: 'multichain',
		type: 'file',
		file: join(multichainPath, blockchainName, 'multichain.conf'),
		format: nconf.formats.ini,
	});
	return true;
}

export function getAvailableBlockchains() {
	return readdirSync(multichainPath).filter(f => f !== '.cli_history' && statSync(join(multichainPath, f)).isDirectory());
}

export function getParameter(parameter) {
	return multichainData.get(parameter);
}

export function setParameter(parameter, value) {
	return multichainData.set(parameter, value);
}

export function getConnectionParameters() {
	return {
		host: 'localhost',
		port: multichainData.get('default-rpc-port'),
		user: multichainData.get('rpcuser'),
		pass: multichainData.get('rpcpassword'),
	};
}

export async function saveConfig() {
	await Promise.all(multichainData.stores.map(async (store) => {
		if (store.name === 'userConfig') {
			await promisify(store.save)();
		}
	}));
}
