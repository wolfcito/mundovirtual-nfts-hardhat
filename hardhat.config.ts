import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import * as dotenv from 'dotenv'
dotenv.config()

//No hacer commit de esta info por ahora
const ALCHEMY_API_KEY: any = process.env.ALCHEMY_API_KEY

const GOERLI_PRIVATE_KEY: any = process.env.GOERLI_PRIVATE_KEY

const ACOUNT_RINKEBY: any = process.env.ACOUNT_RINKEBY

const config: HardhatUserConfig = {
  solidity: '0.8.9',
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [ACOUNT_RINKEBY],
    },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY],
    },
  },
}

export default config
