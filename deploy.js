const {program} = require('commander');
const fs = require('fs');
const packageJson = require('./package.json');
const {execSync} = require('child_process')

function deploy(version) {
    console.log(`Deploying version ${version}`);

    if (version.split('.').length !== 3) {
        console.log('Invalid version');
        process.exit(1);
    }

    packageJson.version = version;
    fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));

    execSync('git stash');
    execSync('git pull');
    execSync('git stash pop');
    execSync('npm run build');
    execSync('npm run lint');
    execSync('git add .');
    execSync(`git commit -m "Release ${version}"`);
    execSync(`git push`);
    execSync(`git tag ${version}`);
    execSync(`git push --tags`);
}

program
    .name('Deploy')
    .description('CLI to deploy a new version')
    .argument('<version>', 'Version to deploy')
    .action(deploy);

program.parse();

