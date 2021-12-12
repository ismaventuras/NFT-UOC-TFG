import { useWeb3React } from "@web3-react/core"
import { Button, ListGroup } from "react-bootstrap"
import { switchNetwork } from "../../hooks/useWeb3"
import {Link} from 'react-router-dom'


const Home = () => {
    const { active } = useWeb3React('metamask')
    const { connector, chainId: chainNetwork } = useWeb3React()

    const addNetwork = async () => {
        await switchNetwork(chainNetwork, connector.providers[chainNetwork].url, active)
    }
    return (
        <>
            <div className="container-fluid py-3 text-center">
                <h1 className="display-5 fw-bold">Welcome to the NFT market</h1>
                <p className="fs-4 my-auto border-bottom border-2 w-100">This site only works using Metamask, please install it if you want to create new NFT and sell them </p>
                
                <div className="d-flex flex-column justify-content-center gap-3 w-100 align-items-center">
                    <div className="col-lg-6 border-bottom border-top border-2 w-100 py-4">
                        <p className="fs-2">Network details: </p>
                        <ListGroup>
                            <ListGroup><p>Chaind: {process.env.REACT_APP_DEFAULT_CHAIN_ID}</p></ListGroup>
                            <ListGroup><p>RPC URL: {process.env.REACT_APP_DEFAULT_RPC}</p></ListGroup>
                        </ListGroup>
                        <div className="d-flex justify-content-center">
                                <Button variant="primary" onClick={addNetwork}>Add to metamask</Button>
                            {!window.ethereum &&
                                <Button variant="outline-primary">
                                    <a style={{ color: 'inherit', textDecoration: 'none' }} href='https://metamask.io/' target='_blank' rel='noreferrer'>
                                        Install Metamask
                                    </a>
                                </Button>
                            }
                        </div>
                    </div>
        
                    <div className="col-lg-6 border-bottom border-2 w-100 py-4">
                        <p className="fs-2">Links</p>
                        <Link to="/minter"><p>Minter</p></Link>
                        <Link to="/market"><p>Market</p></Link>
                    
                        
                    </div>
                </div>
                




            </div>

        </>
    )
}
export default Home
