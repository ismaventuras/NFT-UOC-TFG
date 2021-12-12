
import { GetNftContract} from "./useContracts"

export const useTokenMetadata = () => {
    
    const contract = GetNftContract()
    
    const getData = async (tokenId) => {
        if(contract){
        try{
            const ipfsHash = await contract.methods.tokenURI(tokenId).call()
            const url = `https://${ipfsHash}.ipfs.dweb.link/metadata.json`
            const response = await fetch(url)
            const data = await response.json()
            const imageSrc = `https://ipfs.io/ipfs/${data.image.split('/')[2]}/${data.image.split('/')[3]}`
            
            return {data:data, url:imageSrc}
        }
        catch(err){console.log(err)}
        }
    }
    return { getData}
}

export const useTokenURI = () => {
    const contract = GetNftContract()

    const getTokenURI = async (tokenId) => {
        if(contract){
        try{
            const ipfsHash = await contract.methods.tokenURI(tokenId).call()
            const metadataURI = `https://${ipfsHash}.ipfs.dweb.link/metadata.json`       
            
            return metadataURI
        }
        catch(err){console.log(err)}
        }
    }
    return { getTokenURI}
}