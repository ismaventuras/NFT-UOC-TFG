import { Modal , Spinner,Alert} from "react-bootstrap"

export const ModalUploading = (props) => {
    
    const {
        show,setShow,
        txState,setTxState,
        loadingApprove, isCreatingSale,
        error
     } = props
    const onHide = () => {
        setTxState({txApprove:'', txSale:''})
        setShow(false)
    }
    return(
        <Modal show={show} onHide={onHide} size="lg" backdrop="static" keyboard={false} centered>
            {!loadingApprove && !isCreatingSale &&
                <Modal.Header closeButton></Modal.Header>
            }
            <Modal.Body>
                {error ? <Alert variant="danger">{error}</Alert> : ""} 
                <div className="d-flex flex-column gap-2 justify-content-center align-items-center py-2 h-100 w-100">
                    {(loadingApprove || isCreatingSale) &&
                    <>
                        <Spinner animation="border" variant="info" className="mx-auto" /> 
                        {loadingApprove && <p className="text-break text-center my-auto">Awaiting the token approval...</p>}
                        {isCreatingSale && <p className="text-break text-center my-auto">Awaiting your sale to be created...</p>}
                    </>
                    }
                    {txState && txState.txApprove && <p className="text-break text-center my-auto">Approval tx : {txState.txApprove.transactionHash} </p>}
                    {txState && txState.txSale && <p className="text-break text-center my-auto">Sale Tx : {txState.txSale.transactionHash}</p>}
                </div>

            </Modal.Body>
        </Modal>
    )
}