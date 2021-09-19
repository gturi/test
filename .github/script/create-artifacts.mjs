import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// Default value `youtube-dl-aas` if no args provided via CLI.
const appName = process.argv[2] || 'youtube-dl-aas';

const main = process.argv[4] || 'main.py';

const requirementsList = process.argv[5] || 'requirements';

const startDir = process.cwd()
const webGuiDir = path.join(startDir, 'web-gui');
process.chdir(webGuiDir);

// install web gui dependencies
console.log('installing npm dependencies');
execSync('npm install');

// generate web gui static files
console.log('generating web gui static files');
execSync('npx ng build --baseHref="/home/"');

const serverDir = path.join(startDir, 'server')
process.chdir(serverDir);

// move ng build files inside server folder
const staticFilesDir = path.join(webGuiDir, 'dist', 'web-gui');
const serverStaticFilesDir = path.join(serverDir, 'resources');

const moveToServerDir = (fileName, serverSubdir) => {
    const webGuiFile = path.join(staticFilesDir, fileName);
    const serverDir = path.join(serverStaticFilesDir, serverSubdir);
    const serverFile = path.join(serverDir, fileName);
    console.log(`move ${webGuiFile} in ${serverFile}`);
    if (!fs.existsSync(serverDir)) {
        fs.mkdirSync(serverDir, { recursive: true });
    }
    fs.renameSync(webGuiFile, serverFile);
}

// move index.html to server/src/resources/templates
moveToServerDir('index.html', 'templates');

fs.readdirSync(staticFilesDir).forEach(fileName => {
    // move files to server/src/resources/home
    moveToServerDir(fileName, 'home');
});

// install server release requirements
console.log('installing server release requirements');
requirementsList.split(',').forEach(requirement => {
    execSync(`python -m pip install -r ${requirement}.txt`);
});

// create ${appName} executable in server/dist
const generateExecutableCmd = [
    `pyinstaller src/${main} --onefile --name ${appName}`,
    '--add-data "resources/templates:resources/templates"',
    '--add-data "resources/home:resources/home"',
].join(' ');
console.log(`creating ${appName} executable in server/dist`);
execSync(generateExecutableCmd);
