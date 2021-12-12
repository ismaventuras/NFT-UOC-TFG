# steps

## Development

0. ?

```console
cd blockchain
npm run install
```

Start a new blockchain using ganache-cli
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

```javascript
//Under network add
networks:{
    development: {
        host: "127.0.0.1",     // Localhost (default: none)
        port: 8545,            // Standard Ethereum port (default: none)
        network_id: "*",       // Any network (default: none)
    },
}
```

3. deploy the contracts

```console
truffle migrate --network development
```

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
