import { execSync } from 'child_process';
import * as path from 'path';

// Default value `youtube-dl-aas` if no args provided via CLI.
const appName = process.argv[2] || 'youtube-dl-aas';
const zipName = process.argv[3] || `${appName}.zip`;

const platform = process.platform;
let compressionCmd;
let cwd;
let outDir;
switch(platform) {
  case 'linux':
    console.log('LINUX ls');
    console.log(execSync('ls -laR').toString('utf8'));
    cwd = `${execSync('pwd').toString('utf8')}`.trim().replace(/(\r\n|\n|\r)/gm, "");
    outDir = `${cwd}/server/dist`;
    compressionCmd = `tar -zcvf ${outDir}/${zipName} ${outDir}/${appName}`;
    break;
  case 'win32':
    console.log('WIN ls');
    console.log(execSync('cd').toString('utf8'));
    console.log(execSync('cd').toString('utf8'));
    cwd = `${execSync('cd').toString('utf8')}`.trim().replace(/(\r\n|\n|\r)/gm, "");
    outDir = `${cwd}\\server\\dist`;
    console.log(outDir);
    compressionCmd = `tar.exe -a -c -f ${outDir}\\${zipName} ${outDir}\\${appName}`;
    break;
  case 'darwin':
    console.log('MAC ls');
    console.log(execSync('ls -laR').toString('utf8'));
    cwd = `${execSync('pwd').toString('utf8')}`.trim().replace(/(\r\n|\n|\r)/gm, "");
    outDir = `${cwd}/server/dist`;
    compressionCmd = `zip ${outDir}/${zipName} ${outDir}/${appName}`;
    break;
  default:
    throw new Error(`platform ${platform} not supported`);
}
console.log(`creating ${zipName} in server/dist`);
console.log(compressionCmd);
execSync(compressionCmd);