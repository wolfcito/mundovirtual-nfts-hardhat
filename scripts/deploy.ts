import { ethers } from 'hardhat'

const deploy = async () => {
  const [deployer] = await ethers.getSigners()
  const MundoVirtualPunk = await ethers.getContractFactory('MundoVirtualPunk')

  const maxSuply = 10_000

  console.log('Deploy contract with the account: ', deployer.address)

  const deployed = await MundoVirtualPunk.deploy(maxSuply)

  // Start deployment, returning a promise that resolves to a contract object
  console.log('Contract deployed to address:', deployed.address)
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
