import { useWeb3React } from "@web3-react/core"
import { useState } from "react"
import { GetNftContract } from "../hooks/useContracts"
import { useMarketContract } from "../hooks/useMarketContract"


export const useNFTContractService = () => {
    const contract_metamask = GetNftContract('metamask')
    const {address:market_address} = useMarketContract()
    const {account, chainId} = useWeb3React('metamask')

    const [loadingApprove, setLoadingApprove] = useState(false)
    const [loadingMint, setLoadingMint] = useState(false)
    const [error, setError] = useState('')
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

    const mint = async (hash) =>{
        setError('')
        try{
            setLoadingMint(true)
            const result = await contract_metamask.methods
                .safeMint(account, hash)
                .send({from:account , chainId:chainId})
            setLoadingMint(false)
            return result
        }
        catch(err){
            console.log(err)
            setError(err.message)
            setLoadingMint(false)
        }
    }

    const ownerBalance = async () => {
        setError('')
        try{
            const balance = await contract_metamask.methods
                .balanceOf(account)
                .call()
            let tokensList = []
            for(let i=0;i<balance;i++){
                const tokenId = await contract_metamask.methods
                    .tokenOfOwnerByIndex(account, i)
                    .call()
                tokensList.push(tokenId)
            }
            return tokensList

        }
        catch(err){
            console.log(err)
            setError(err.message)
        }
    }


    return {loadingApprove , approve ,loadingMint, mint, ownerBalance , error , setError}

}