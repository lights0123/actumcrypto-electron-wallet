import nconf from 'nconf';
import { join } from 'path';
import { remote } from 'electron';
import { promisify } from 'bluebird';

const { app } = remote;

let multichainPath;
let blockchainName = 'testacm';

let isWindows = false;
if (process.platform === 'win32') isWindows = true;
if (isWindows) {
	multichainPath = join(process.env.APPDATA, 'MultiChain/testacm/multichain.conf');
} else {
	multichainPath = join(process.env.HOME, '.multichain');
}

let multichainData;

export function init(blockchainNameIn) {
	blockchainName = blockchainNameIn;
	multichainData = new nconf.Provider({
		stores: [
			{
				name: 'multichainParams',
				type: 'file',
				file: join(multichainPath, blockchainName, 'params.dat'),
				format: nconf.formats.ini,
			},
			{
				name: 'multichain',
				type: 'file',
				file: join(multichainPath, blockchainName, 'multichain.conf'),
				format: nconf.formats.ini,
			},
			{
				name: 'userConfig',
				type: 'file',
				file: join(app.getPath('userData'), `${app.getName()}.conf`),
				format: nconf.formats.ini,
			},
		],
	});
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
