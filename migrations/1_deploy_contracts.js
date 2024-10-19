const PasswordManager = artifacts.require("PasswordManager");

module.exports = function (deployer) {
  console.log("Starting deployment of PasswordManager...");
  deployer.deploy(PasswordManager).then(() => {
    console.log("Deployment successful!");
  }).catch(err => {
    console.error("Deployment failed:", err);
  });
};