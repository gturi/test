import { execSync } from 'child_process';
import * as path from 'path';

// Default value `youtube-dl-aas` if no args provided via CLI.
const appName = process.argv[2] || 'youtube-dl-aas';

const startDir = process.cwd()

const serverDir = path.join(startDir, 'server')
process.chdir(serverDir);

// install server release requirements
console.log('installing server release requirements');
execSync('python -m pip install -r requirements.txt');

// create ${appName} executable in server/dist
const generateExecutableCmd = `pyinstaller src/main.py --onefile --name ${appName}`;
console.log(`creating ${appName} executable in server/dist`);
execSync(generateExecutableCmd);


const zipName = process.argv[3] || `${appName}.zip`;
const platform = process.platform;
let compressionCmd;
switch(platform){
  case 'linux':
    console.log('LINUX ls');
    execSync('ls -laR');
    execSync('pwd');
    compressionCmd = `tar -zcvf server/dist/${zipName} server/dist/${appName}`
    break;
  case 'win32':
    console.log('WIN ls');
    execSync('dir');
    compressionCmd = `tar.exe -a -c -f server/dist/${zipName} server/dist/${appName}`
    break;
  case 'darwin':
    console.log('MAC ls');
    execSync('ls -laR');
    execSync('pwd');
    compressionCmd = `zip server/dist/${zipName} server/dist/${appName}`
    break;
  default:
    throw new Error(`platform ${platform} not supported`);
}
console.log(`creating ${zipName} in server/dist`);
//execSync(compressionCmd);
