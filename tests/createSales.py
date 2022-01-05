########################
#     DEPENDENCIES     #
########################
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


nft_contract = w3.eth.contract(address=ismatoken['networks']["1337"]['address'], abi=ismatoken["abi"])
market_contract = w3.eth.contract(address=market['networks']["1337"]['address'], abi=market["abi"])

total_minted = nft_contract.functions.totalSupply().call()
print('total minted')
def approveToken(tokenId , nftContract):
    nonce = w3.eth.get_transaction_count(Config.account)
    tokenId_approval = nft_contract.functions.getApproved(tokenId).call()
    print(f'token {tokenId} approval: {tokenId_approval}')
    tx = nftContract.functions.approve(market['networks']["1337"]['address'],tokenId).buildTransaction({
        'nonce':nonce,
        'from':Config.account,
        'gasPrice': 20000000000,
    })
    signed_tx = w3.eth.account.sign_transaction(tx, Config.private_key)
    returned_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    print(f'tx:{w3.toHex(returned_hash)}')
    tokenId_approval = nft_contract.functions.getApproved(tokenId).call()
    print(f'token {tokenId} approval: {tokenId_approval}')

def createSale(tokenId, price, nftContract):
    nonce = w3.eth.get_transaction_count(Config.account)
    tx = market_contract.functions.createSale(price,tokenId, nftContract).buildTransaction({
        'nonce':nonce,
        'from':Config.account,
        'gasPrice': 20000000000,
    })
    signed_tx = w3.eth.account.sign_transaction(tx, Config.private_key)
    returned_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    print(f'tx:{w3.toHex(returned_hash)}')

for i in range(0,total_minted):
    approveToken(i,nft_contract)

for i in range(0,total_minted):
    createSale( i, 1*10**18, ismatoken['networks']["1337"]['address'])

