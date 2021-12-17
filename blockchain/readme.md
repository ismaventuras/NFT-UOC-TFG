# ERC721 NFT & NFT MARKET

This part will take care of the deployment of the ERC721 NFT and the Market , the first part will be a deployment using ganache-cli and the second part will be a deployment on Mumbai, the testnet for [Polygon](https://polygon.technology/). Let's start installing the dependencies

0. Install the dependencies

```console
cd blockchain
npm run install
```

## First part - Development

Start a new blockchain using ganache-cli, it will generate new addresses filled with funds

- use the --db switch to save the state of the blockchain in a folder
- if you want to set your own accounts use the --acounts switch

```console
> ganache-cli --networkId 1337 --chainId 1337 --port 8545
```

Here's an example using 2 stored private keys, each one with 100 ether and saving the state of the blockchain on the .\db folder

```console
> ganache-cli --networkId 1337 --chainId 1337 --port 8545 --account '0x711d606ff77cd768799ba4b99153ecea438c97c1d9870ffe1b7256bbb3b5a163,100000000000000000000' --account '0xab47d42408b4e176f43eb83c08c6aa620c49a2892d095343f3360db23568428a,100000000000000000000' --db .\db\
```

Output should be something similar to this

```console

Ganache CLI v6.12.2 (ganache-core: 2.13.2)
Available Accounts
==================
(0) 0xDcb566D0db63d6609dddA1E16bc886ff68BA94Cf (100 ETH)
(1) 0xEf5a259C036bC7F95C2C5ec810B190DBd280cD26 (100 ETH)
...
Private Keys
==================
(0) 0xed7e424d662c2054188351bbd00586b3fc3cfc5787d00f98989105737d84e1ac
(1) 0x9e08a5f0e23f9164db2bb162aa369f6d74c5fd29bee891844f13692f4db642f8

HD Wallet
==================
Mnemonic:      imitate force sustain sunset tenant guilt room sauce donor extend atom ugly
Base HD Path:  m/44'/60'/0'/0/{account_index}

Gas Price
==================
20000000000

Gas Limit
==================
6721975

Call Gas Limit
==================
9007199254740991
```

2.  Set the proper config in truffle-config.js

On truffle-config.js add the directory where the contracts information will be stored for the frontend using the *contracts_build_directory* parameter , then add ganache-cli as a network to deploy with truffle

```javascript
module.exports{
//Under network add
...

contracts_build_directory: path.join(__dirname,"..", "client/src/contracts"),
networks:{
    development: {
        host: "127.0.0.1",
        port: 8545,     
        network_id: "*",     
    },
}
...
}
```

3. deploy the contracts

Now that truffle-config is properly setted up let's create the contracts in the blockchain using the migrate function of truffle, it will compile the contracts and do the transactions to create them on ganache-cli for you, it will also copy the contracts to the frontend folder.

```console
truffle migrate --network development
```

Congratulations!! You have installed a local blockchain and deployed a NFT market on it. Now it's time to see how things work on a '*real*' blockchain

Now NFT and Market contract have been deployed to the blockchain created by ganache.

### Production

```javascript
const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKey = fs.readFileSync(".secret").toString().trim();
var provider = new HDWalletProvider(privateKey, "https://rpc-mumbai.maticvigil.com")

networks:{
    ...
    mumbai: {
       provider: provider,
       network_id:80001,
       confirmations: 2,
       timeoutBlocks: 200,
       skipDryRun: true
     },
}
```

```console
truffle migrate --network mumbai
```
