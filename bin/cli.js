#!/usr/bin/env node

const { execSync } = require("child_process");

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getGitCloneCmd = (repoName) => {
  return `git clone --depth 1 https://github.com/Yousef-Baytam/maxiphy-lp-template-test.git ${repoName}`;
};

const getPackagesInstallationCmd = (repoName) => {
  return `cd ${repoName} && npm i`;
};

const runCmd = (cmd) => {
  try {
    execSync(`${cmd}`, { stdio: "inherit" });
  } catch (err) {
    console.error(`Failed to excute ${cmd}`, err);
  }
};

const getUserInput = (question) => {
  return new Promise((res, rej) => {
    rl.question(`${question}... `, (ans) => {
      rl.close();
      res(ans);
    });
  });
};

const main = async () => {
  const repoName = await getUserInput("What is your project named?");

  const clone = runCmd(getGitCloneCmd(repoName));
  if (!clone) process.exit(-1);

  const installCmd = runCmd(getPackagesInstallationCmd(repoName));
  if (!installCmd) process.exit(-1);

  console.log(
    "Your project setup is complete! to start the app, run: \n",
    `cd ${repoName} && npm run dev`
  );
};

main();
