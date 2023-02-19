// deploy/00_deploy_streamer.js

const { ethers } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("Streamer", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    log: true,
  });

  const streamer = await ethers.getContract("Streamer", deployer);

  console.log("\n 🤹  Sending ownership to frontend address...\n");
 
  const ownerTx = await streamer.transferOwnership("0x657dD02b4EAE6Bf276747bd3B9E54aB034D9F97f")

  console.log("\n       confirming...\n");
  const ownershipResult = await ownerTx.wait();
  if (ownershipResult) {
    console.log("       ✅ ownership transferred successfully!\n");
  }
};

module.exports.tags = ["Streamer"];
