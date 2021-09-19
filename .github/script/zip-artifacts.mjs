import { execSync } from 'child_process';
import * as path from 'path';

// Default value `youtube-dl-aas` if no args provided via CLI.
const appName = process.argv[2] || 'youtube-dl-aas';
const zipName = process.argv[3] || `${appName}.zip`;

const platform = process.platform;
let compressionCmd;
switch(platform){
  case 'linux':
    console.log('LINUX ls');
    console.log(execSync('ls -laR').toString('utf8'));
    console.log(execSync('pwd').toString('utf8'));
    compressionCmd = `tar -zcvf server/dist/${zipName} server/dist/${appName}`
    break;
  case 'win32':
    console.log('WIN ls');
    console.log(execSync('dir').toString('utf8'));
    compressionCmd = `tar.exe -a -c -f server/dist/${zipName} server/dist/${appName}`
    break;
  case 'darwin':
    console.log('MAC ls');
    console.log(execSync('ls -laR').toString('utf8'));
    console.log(execSync('pwd').toString('utf8'));
    compressionCmd = `zip server/dist/${zipName} server/dist/${appName}`
    break;
  default:
    throw new Error(`platform ${platform} not supported`);
}
console.log(`creating ${zipName} in server/dist`);
//execSync(compressionCmd);