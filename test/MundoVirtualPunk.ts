const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('MundoVirtualPunk Contract', function () {
  const setup = async ({ maxSupply = 10_000 }) => {
    const [owner] = await ethers.getSigners()
    const MundoVirtualPunk = await ethers.getContractFactory('MundoVirtualPunk')
    const deployed = await MundoVirtualPunk.deploy(maxSupply)

    return { owner, deployed }
  }

  describe('Deployment correctly', () => {
    it('Sets max supply to passed param', async () => {
      const maxSupply = 4_000

      const { deployed } = await setup({ maxSupply })
      const returnedMaxSupply = await deployed.maxSuply()

      expect(maxSupply).to.equal(returnedMaxSupply)
    })
  })
})
