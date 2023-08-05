import { ethers } from "hardhat";
require("dotenv").config();

async function main() {
  const [deployer] = await ethers.getSigners();
  const DigitalWallet = await ethers.getContractFactory("DigitalWallet");
  const contractAddress: string = process.env.CONTRACT_ADDRESS || "";// Replace with the actual contract address
  const digitalWallet = await DigitalWallet.attach(contractAddress);

  // Deposit funds into the wallet
  const depositAmount = ethers.utils.parseEther("1.0"); // 1 ETH
  await digitalWallet.deposit({ value: depositAmount });

  // Get the user balance
  const balance = await digitalWallet.getBalance();
  console.log("User balance:", ethers.utils.formatEther(balance));

  // Withdraw funds from the wallet
  const withdrawAmount = ethers.utils.parseEther("0.5"); // 0.5 ETH
  await digitalWallet.withdraw(withdrawAmount);

  // Get the updated balance after withdrawal
  const updatedBalance = await digitalWallet.getBalance();
  console.log("User balance after withdrawal:", ethers.utils.formatEther(updatedBalance));

  // Transfer funds to another wallet
  const recipient = "RECIPIENT_ADDRESS"; // Replace with the recipient's address
  const transferAmount = ethers.utils.parseEther("0.2"); // 0.2 ETH
  await digitalWallet.transfer(recipient, transferAmount);

  // Get the final balance after the transfer
  const finalBalance = await digitalWallet.getBalance();
  console.log("User balance after transfer:", ethers.utils.formatEther(finalBalance));
  console.log("Check your transaction on BBN Testnet:", `http://testnet.bharatblockchain.io/address/${contractAddress}`);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
