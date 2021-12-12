# steps

## back

### start blockchain

ganache-cli --networkId 1337 --chainId 1337 --port 8545 --account '0x711d606ff77cd768799ba4b99153ecea438c97c1d9870ffe1b7256bbb3b5a163,100000000000000000000' --account '0xab47d42408b4e176f43eb83c08c6aa620c49a2892d095343f3360db23568428a,100000000000000000000' --db .\db\

### development

truffle migrate --network development

### production

truffle migrate --network mumbai

## client

### development
