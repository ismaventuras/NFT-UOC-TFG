import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useState } from 'react'
import { Offcanvas } from 'react-bootstrap'

import { useNFTContractService } from '../../services/injectedUserService'

import { useTokenURI} from '../../hooks/useTokenMetadata'


const SingleNFTInfo = ({tokenId}) => {
    const {getTokenURI} = useTokenURI()

    const [metadata, setMetadata] = useState('')
    
    
    useEffect(()=>{
        const call = async () =>{
            const metadatauri = await getTokenURI(tokenId)
            setMetadata(metadatauri)
        }
        call()
    },[])

    return(
        <>
            <p className='text-break'>
                {metadata &&  <a href={metadata} target="_blank" rel='noreferrer'>#{tokenId}</a>}
            </p>
        </>
    )
}

const YourNFT = () => {
    const {ownerBalance} = useNFTContractService()

    const [tokenIdList, setTokenIdList] = useState([])

    useEffect(()=>{
        ownerBalance().then(result => setTokenIdList(result)).catch(console.log)
    },[])


    return(
        <>
            <div className='text-center'>
                    <p className="display-5">Your NFT</p>
                    {tokenIdList && tokenIdList.length > 0 
                    ?
                    <div className='d-flex flex-row flex-wrap justify-content-center gap-3'>
                        {tokenIdList.map(tokenId => <SingleNFTInfo tokenId={tokenId} key={tokenId}/>) }
                    </div>
                    : <p className='fs-4'>You have no NFT</p>}
            </div>
        </>
    )
}

const AccountInfo = () => {
    const {account, chainId} = useWeb3React('metamask')

    return(
        <>
            <div className='text-center'>
                    <p className='display-5'>Account</p>
                    <p className='text-break'>Account: <abbr title={account}>{account.substring(0, 6)}...{account.substring(account.length - 4)} </abbr></p>
                    <p className='text-break'>Chain: {chainId}</p>
                    
            </div>
        </>
    )
}

export const OffCanvasInfo = ({show, setShow}) => {

    const onHide = () => {
        setShow(false)
    }

    return(
        <>
            <Offcanvas show={show} onHide={onHide} placement="end" className="">
                <Offcanvas.Header closeButton>
                    <p className='display-4 text-center'>Account info</p>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <AccountInfo/>
                    <YourNFT/>

                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
