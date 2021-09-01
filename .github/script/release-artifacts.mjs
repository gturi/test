import { execSync } from 'child_process';
import * as path from 'path';

// Default value `youtube-dl-aas` if no args provided via CLI.
const appName = process.argv[2] || 'youtube-dl-aas';

const startDir = process.cwd()

const serverDir = path.join(startDir, 'server')
process.chdir(serverDir);

// install server release requirements
console.log('installing server release requirements');
execSync('python3 -m pip install -r requirements.txt');

// create ${appName} executable in server/dist
const generateExecutableCmd = `pyinstaller src/main.py --onefile --name ${appName}`;
console.log(`creating ${appName} executable in server/dist`);
execSync(generateExecutableCmd);
