import { NFTStorage } from 'nft.storage'
import { useState } from 'react'

export const useNFTStorage = () => {
    const client = new NFTStorage({token:process.env.REACT_APP_NFT_API})

    const [uploading, setUploading] = useState(false)

    const uploadToIpfs = async (data) => {
        try{
            setUploading(true)
            const result = await client.store(data)
            console.log(result)
            setUploading(false)
            return result.ipnft
        }
        catch(err){
            console.log(err)
            setUploading(false)
        }
    }

    return {uploadToIpfs , uploading}
        
}
