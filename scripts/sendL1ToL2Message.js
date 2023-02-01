// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat')
require('dotenv').config()

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile')

  // We get the contract to deploy
  const l1BridgeAddress = '0xe87d317eb8dcc9afe24d9f63d6c760e52bc18a40'
  const L1Contract = await hre.ethers.getContractFactory('L1Contract')
  const l2ContractAddress = process.env.L2_CONTRACT
  const l1ContractAddress = process.env.L1_CONTRACT
  const greeting = process.env.GREETING
  const l1Contract = L1Contract.attach(l1ContractAddress)

  await l1Contract.deployed()

  const l2ContractAbi = require('../artifacts/contracts/L2Contract.sol/L2Contract.json').abi
  const iface = new hre.ethers.utils.Interface(l2ContractAbi)
  const calldata = iface.encodeFunctionData('setGreeting', [greeting])
  const to = l2ContractAddress
  const provider = new hre.ethers.providers.StaticJsonRpcProvider(hre.network.config.url)
  const minimumFeeMethodId = ethers.utils.id('minimumFee()').slice(0, 10)
  const callResult = await provider.call({to: l1BridgeAddress, data: minimumFeeMethodId })
  const fee = hre.ethers.BigNumber.from(callResult)
  const tx = await l1Contract.sendMessageToL2(to, calldata, fee, {
    value: fee,
  })
  console.log(`sent tx hash ${tx.hash}`)
  console.log(`https://goerli.etherscan.io/tx/${tx.hash}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
