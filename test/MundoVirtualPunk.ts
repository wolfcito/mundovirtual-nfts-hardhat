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

  describe('Minting testing set', () => {
    it('Mints a new Token and assigns it to owner', async () => {
      const { owner, deployed } = await setup({})

      await deployed.mint()

      const ownerOfMinted = await deployed.ownerOf(0)

      expect(ownerOfMinted).to.equal(owner.address)
    })

    it('Has a minting limits', async () => {
      const maxSupply = 2
      const { deployed } = await setup({ maxSupply })

      await deployed.mint()
      await deployed.mint()

      await expect(deployed.mint()).to.be.revertedWith('No Virtualitos left')
    })
  })
})
