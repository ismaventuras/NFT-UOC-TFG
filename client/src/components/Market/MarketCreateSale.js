import { useState } from "react"
//web3
import { useWeb3React } from "@web3-react/core"
//bootstrap
import { Button, Col } from "react-bootstrap"
//Custom

import { ModalCreateSale } from "./ModalCreateSale"
import { useMarketContract } from "../../hooks/useMarketContract"
import { useNFTContractService } from "../../services/injectedUserService"
import { ModalUploading } from "./ModalUploading"

export const ButtonCreateSale = () => {
    const context = useWeb3React('metamask')
    const {createSale , isCreatingSale} = useMarketContract()
    const {approve , loadingApprove, error , setError} = useNFTContractService()

    const [txState, setTxState] = useState({txApprove:'', txSale:''}) 
    const [show, setShow] = useState(false)
    const [showSecond, setShowSecond] = useState(false)

    return (
        <>
            {context.active &&
                <>
                    <Col className='ms-3'>
                        <Button onClick={()=>setShow(true)}>Create a sale</Button>
                    </Col>
                    <ModalCreateSale 
                        show={show} 
                        setShow={setShow} 
                        showSecond={showSecond}
                        setShowSecond={setShowSecond}
                        headerText={'Create a Sale'} 
                        txState={txState} 
                        setTxState={setTxState}
                        createSale={createSale}                     
                        isCreatingSale={isCreatingSale}
                        approve={approve}
                        loadingApprove={loadingApprove}
                        setError={setError}
                    />
                    <ModalUploading 
                        show={showSecond}
                        setShow={setShowSecond}
                        txState={txState}
                        setTxState={setTxState}
                        isCreatingSale={isCreatingSale}
                        loadingApprove={loadingApprove}
                        error={error}
                    />
                        
                </>
            }
        </>
    )
}