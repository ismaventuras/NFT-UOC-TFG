import React, { useEffect, useState } from "react"
import { Card, Button , Spinner } from "react-bootstrap"
import { useWeb3React } from "@web3-react/core"

import { NFTModalView } from "./MarketViewModal"

import { useTokenMetadata } from "../../hooks/useTokenMetadata"


const MemoImage = React.memo(function Image({src}){
    return <Card.Img variant="top" src={src}/>
})


export const MarketItem = ({ item }) => {

    const [tokenData, setTokenData] = useState('')
    const [imageUrl , setImageUrl] = useState('')
    const {getData} = useTokenMetadata()

    const {library} = useWeb3React()
    const [show, setShow] = useState(false)
    const closeModal = () => setShow(false)

    const etherPrice = library.utils.fromWei(item.price, 'ether')
    
    useEffect(()=>{
        const call = async () =>{
            try{
                const {data,url} = await getData(item.tokenId)
                setTokenData(data)
                setImageUrl(url)
            }
            catch(error){console.log(error)}
        }
        call()
           // eslint-disable-next-line 
    },[])

    return (
        <>
            <Card>
                {imageUrl ? <MemoImage src={imageUrl}/> : <Spinner animation='border' />}
                <Card.Body className='text-center'>
                    <Card.Title>
                    {tokenData ? <>{tokenData.name} - #{item.tokenId}</> : <Spinner className='' animation="border" variant="danger" /> }
                    </Card.Title>
                    <Card.Text >
                    <>{etherPrice && <>{etherPrice}</>}  </>
                    </Card.Text>
                    {tokenData && 
                        <Button 
                            className='w-100' 
                            variant="primary"
                            onClick={()=>setShow(true)}
                            >
                            View
                        </Button>}
                </Card.Body>
            </Card>
            <NFTModalView show={show} closeModal={closeModal} item={item} tokenData={tokenData} imageUrl={imageUrl}/>
        </>
    )
}