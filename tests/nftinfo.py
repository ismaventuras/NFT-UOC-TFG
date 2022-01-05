from web3 import Web3
import json
from os import path
########################
#      Config          #
########################
from config import Config
from contracts import counter, ismatoken, market
########################
#      Connecting      #
########################
print(f'Connecting to {Config.providers["local"]}')
w3 = Web3(Web3.HTTPProvider(Config.providers['local']))
print(f'using {Config.account} and {Config.private_key[1:3]}.. pk ')

################################
#      NFT/Collections         #
################################
# print('#ismatoken contract')
nft_contract = w3.eth.contract(address=ismatoken['networks']["1337"]['address'], abi=ismatoken["abi"])
def contract_info():
    name = nft_contract.functions.name().call()
    symbol = nft_contract.functions.symbol().call()
    total_minted = nft_contract.functions.totalSupply().call()
    owner = nft_contract.functions.owner().call()
    print('#info')
    print(f'owner: {owner}')
    print(f'name: {name}')
    print(f'symbol: {symbol}')
    print(f'Total Minted: {total_minted}')

contract_info()