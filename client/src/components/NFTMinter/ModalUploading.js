import {  useEffect, useState } from 'react'
import { Modal , Spinner , Alert} from 'react-bootstrap'

export const ModalUploading = ({txHash, error, loadingMint, uploading, reset}) => {
    
    const [show, setShow] = useState(false)

    const handleClose = () => {
        setShow(false);
        reset()
    }

    useEffect(() => {
        
        if (uploading || loadingMint) setShow(true)

    }, [uploading, loadingMint])

    return (
        <Modal show={show} onHide={handleClose} size="lg" backdrop="static" keyboard={false} centered>
            {!uploading && !loadingMint &&
            <Modal.Header closeButton={!uploading && !loadingMint}>
            </Modal.Header>
            }
                <Modal.Body>
                    <div className='d-flex flex-column gap-2 justify-content-center align-items-center py-2 h-100 w-100'>                       
                        {error ? <Alert variant='danger'>{error}</Alert> : ''} 
                        {uploading || loadingMint 
                            ? 
                            <>
                            <Spinner animation="border" variant='info' className='mx-auto' /> 
                            {uploading ? <p className='text-break text-center my-auto'>Uploading your data to IPFS...</p> : ''}
                            {loadingMint ? <p className='text-break text-center my-auto'>Awaiting your transaction to be mined...</p> : ''}

                            </>
                            : <p className='text-break text-center my-auto'> {!error ? `NFT Minted! tx hash: ${txHash}` : ''}</p>
                        }
                    </div>
            </Modal.Body>
        </Modal>
    )
}