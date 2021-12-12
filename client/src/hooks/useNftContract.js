
import { GetNftContract} from "./useContracts"

import { useState, useEffect } from "react"
import { useWeb3React } from "@web3-react/core"
import { useMarketContract } from "./useMarketContract"


export const useNftContract = () => {

    const context_metamask = useWeb3React('metamask')
    const {address:market_address} = useMarketContract()
    const {account, chainId} = context_metamask
    
    
    const contract_network = GetNftContract()
    const contract_metamask = GetNftContract('metamask')
    const address = contract_network._address
    
    const [name ,setName] = useState('')
    const [symbol ,setSymbol] = useState('')
    const [balance,setBalance] = useState()
    const [tokenList, setTokenList] = useState([])
    const [loadingApprove, setLoadingApprove] = useState(false)
    const [loadingMint, setLoadingMint] = useState(false)

    const mint = async (hash) =>{
        try{
            setLoadingMint(true)
            const result = await contract_metamask.methods.safeMint(account, hash).send({from:account})
            setLoadingMint(false)
            return result
        }
        catch(err){console.log(err)}
    }
    
    const approve = async (tokenId) => {
        try{
            setLoadingApprove(true)
            const result = await contract_metamask.methods
                .approve(market_address, tokenId)
                .send({from:account, chainId:chainId})
            setLoadingApprove(false)
            return result
        }
        catch(err){
            console.log(err)
            setLoadingApprove(false)
        }
    }

    const tokenURI = async (tokenId) => {
        try{
            const result = await contract_network.methods.tokenURI(tokenId).call()
            return result
        }
        catch(err){console.log(err)}
    }


    // get the name and symbol of the token
    useEffect(() => {
        const getData = async () => {
            const _name = await contract_network.methods.name().call()
            setName(_name)
            const _symbol = await contract_network.methods.symbol().call()
            setSymbol(_symbol)
        }
        getData()
    }, [contract_network.methods])

    // get the balance of the owner when account is loaded
    useEffect(() => {
        let interval
        const balanceOfOwner = async () => {
            const result = await contract_metamask.methods.balanceOf(account).call()
            setBalance(result)
        }
        if(context_metamask.active){
            balanceOfOwner()
            interval = setInterval(balanceOfOwner,5000)
        } 

        return () => clearInterval(interval)
    }, [account, context_metamask.active, contract_metamask.methods])
    
    // get the list of tokens the owner has 
    useEffect(() => {
        let isSubscribed = true
        const getTokens = async () => {
            try{
            let temp_list = []
            for(let i=0;i<balance;i++){
                const result = await contract_metamask.methods.tokenOfOwnerByIndex(account,i).call()
                if(isSubscribed) temp_list.push(result)                
            }
            if(isSubscribed && contract_metamask) setTokenList(temp_list)            
            }
            catch(error) {console.log(error)}
        }
        getTokens()
        return () => isSubscribed = false
        }, [account,balance])

    return {name, symbol, balance, tokenList , address , tokenURI , approve , loadingApprove}
}


const GetTokenApproval = (tokenId) => {
    const contract = GetNftContract()
    const [address, setAddress] = useState([])

    useEffect(() => {
        const getData = async () => {
            const result = await contract.methods.getApproved(tokenId).call()
            setAddress(result)
        }
        getData()
    }, [])

    return address
}

const GetTokenMetadata = (tokenId) => {
    const contract = GetNftContract()
    const [data, setData] = useState()
    useEffect(() => {

        let isSubscribed = true
        const getData = async () => {
            try {
                const result = await contract.methods.tokenURI(tokenId).call()
                if (isSubscribed) {
                    const data = await (await fetch(result)).json()
                    const ipfsHash = data.image.split('/')[2]
                    const ipfsImageName = data.image.split('/')[3]
                    const imgUrl = `https://${ipfsHash}.ipfs.dweb.link/${ipfsImageName}`
                    data.image = imgUrl
                    setData(data)
                }
            }
            catch (e) { console.log(e) }
        }
        getData()

        return () => {
            (isSubscribed = false)
            console.log('unmount GetTokenMetadata')

        }
    }, [tokenId])

    return data
}





export {
    
    GetTokenApproval,
    
    GetTokenMetadata,

}