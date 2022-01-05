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


ismatoken_contract = w3.eth.contract(address=ismatoken['networks']["1337"]['address'], abi=ismatoken["abi"])

def mintNft(tokenUri, address=Config.account):
    nonce = w3.eth.get_transaction_count(Config.account)
    tx = ismatoken_contract.functions.safeMint(address, tokenUri).buildTransaction({
        'nonce':nonce,
        'from':Config.account,
        'gasPrice': 20000000000,
    })
    signed_tx = w3.eth.account.sign_transaction(tx, Config.private_key)
    returned_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    print(f'tx:{w3.toHex(returned_hash)}')

mintNft('https://bafyreigceoodlfracsxbzxbx7dcpkuacw7gmjteu2skhyjb56hbgp65wuq.ipfs.dweb.link/metadata.json')
