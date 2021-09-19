import { execSync } from 'child_process';

// Default value `youtube-dl-aas` if no args provided via CLI.
const appName = process.argv[2] || 'youtube-dl-aas';
const zipName = process.argv[3] || `${appName}.zip`;

function getCmdOutput(cmd) {
  return execSync(cmd).toString('utf8').trim().replace(/(\r\n|\n|\r)/gm, '');
}

const platform = process.platform;
let compressionCmd;
let outDir;
switch(platform) {
  case 'linux':
    outDir = `${getCmdOutput('pwd')}/server/dist`;
    compressionCmd = `tar -zcvf ${outDir}/${zipName} --directory=${outDir} ${appName}`;
    break;
  case 'win32':
    outDir = `${getCmdOutput('cd')}\\server\\dist`;
    compressionCmd = `tar.exe -a -c -f ${outDir}\\${zipName} -C ${outDir} ${appName}`;
    break;
  case 'darwin':
    outDir = `${getCmdOutput('pwd')}/server/dist`;
    compressionCmd = `zip -j ${outDir}/${zipName} ${outDir}/${appName}`;
    break;
  default:
    throw new Error(`platform ${platform} not supported`);
}
console.log(`creating ${zipName} in server/dist`);
console.log(compressionCmd);
execSync(compressionCmd);
