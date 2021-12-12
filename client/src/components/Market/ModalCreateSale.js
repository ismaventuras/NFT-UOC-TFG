//bootstrap
import {  Modal } from "react-bootstrap"
//Custom
import {CreateSaleForm} from "./MarketCreateSaleForm"


export const ModalCreateSale = (props)=>{
    //const {show , onHide , headerText, txState , setTxState} = props
    const {
        headerText,
        show, setShow,
        txState, setTxState,
        showSecond, setShowSecond,
        createSale, isCreatingSale,
        approve, loadingApprove,
        setError
    } = props

    return (
        <>
            <Modal show={show} onHide={()=> setShow(false)} centered>
            <Modal.Header closeButton>{headerText}</Modal.Header>
                <Modal.Body>
                    <CreateSaleForm 
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
                </Modal.Body>
            </Modal>
        </>

    )
}