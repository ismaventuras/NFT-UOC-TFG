import {
    //BrowserRouter as Router,
    HashRouter,
    Routes, Route,
} from "react-router-dom"

import { Container } from "react-bootstrap";

import Minter from "../components/NFTMinter/Minter";
import Home from "../components/Layout/Home";
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'

import Market from "../components/Market/Market";

import { useWeb3React } from "@web3-react/core";

import { Alert } from "react-bootstrap";

import { Loader } from "../components/Loader";
import { ConnectedToRPC } from "../components/Utils/Connection";

const AppRouter = () => {

    const contextMetamask = useWeb3React('metamask')
    const {error} = contextMetamask
    
    return (
        <HashRouter>
            <Header />
            {error && <Alert variant="warning">{error.message}</Alert>}
            <ConnectedToRPC RPC={process.env.REACT_APP_DEFAULT_RPC}>

                <Loader>
                    <Container>
                        <Routes>
                            <Route path="/" exact element={<Home/>}/>
                            <Route path="/market" exact element={<Market/>} />
                            <Route path="/minter" exact element={<Minter/>} />
                            
                            <Route path="*" element={<h2>Not Found</h2>} />           
                        </Routes>
                    </Container>
                </Loader>
            </ConnectedToRPC>

            <Footer/>
        </HashRouter>
    )
}

export {
    AppRouter
}