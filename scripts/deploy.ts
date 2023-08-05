import { ethers } from "hardhat";
require("dotenv").config(); // Import dotenv and call config() to load the environment variables

async function main() {
  const [deployer] = await ethers.getSigners();
  const DigitalWallet = await ethers.getContractFactory("DigitalWallet");
  const digitalWallet = await DigitalWallet.deploy();

  await digitalWallet.deployed();

  console.log("DigitalWallet deployed to:", digitalWallet.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
