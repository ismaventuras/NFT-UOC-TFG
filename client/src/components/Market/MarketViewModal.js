import { useWeb3React } from "@web3-react/core"
import { Button, Modal, ListGroup, Col, Row , Image,  } from "react-bootstrap"

import { useMarketContract } from "../../hooks/useMarketContract"


const InfoList = ({ item, tokenData }) => {

    return (
        <ListGroup className=''>
            <ListGroup.Item className="d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">Name</div>
                    <p className="text-break my-auto">{tokenData.name ? tokenData.name : 'Loading...'}</p>
                </div>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">Description</div>
                    <p className="text-break">{tokenData.description ? tokenData.description : 'Loading...'}</p>
                </div>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">Creator</div>
                    <p className='text-break'>{tokenData.creator ? tokenData.creator : 'Loading...'}</p>
                </div>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">Contract Address</div>
                    <p className='text-break'>{item.nftAddress}</p>
                </div>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">Token Id</div>
                    <p className='text-break'>{item.tokenId}</p>
                </div>
            </ListGroup.Item>
        </ListGroup>
    )

}

export const NFTModalView = ({ show, closeModal, item, tokenData ,imageUrl}) => {

    const contextMetamask = useWeb3React('metamask')
    const {library} = useWeb3React()
    const {buyItem } = useMarketContract()
    
    const handleBuy = async () => {
            buyItem(item.saleId,item.price)
    }

    return (
        <Modal
            show={show}
            onHide={closeModal}
            fullscreen={true}
        >
            <Modal.Header closeButton className="bg-dark text-white">
                <span className="text-break">Sale #{item.saleId}</span>
            </Modal.Header>
            <Modal.Body className="">
                <Row className="align-items-center h-100 g-3">
                    <Col lg={6} className="text-center">
                        <Image src={imageUrl} className="" fluid/>
                    </Col>
  
                    <Col lg={6} className=''>
                        <InfoList item={item} tokenData={tokenData} />
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer className="bg-dark text-white">
                <div>
                    {library && item.price && library.utils.fromWei(item.price,'ether')} ether
                </div>
                <Button variant="secondary" disabled={!contextMetamask.active} onClick={handleBuy}>
                    {!contextMetamask.active ? "Connect your wallet to buy this asset" : "Buy"} 
                </Button>
            </Modal.Footer>

        </Modal>
    )
}


