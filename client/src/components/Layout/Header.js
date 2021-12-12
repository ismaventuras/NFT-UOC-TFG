import { useWeb3React } from '@web3-react/core'
import React, { useContext, useState } from 'react'
import { Nav, Navbar, Container, Button } from 'react-bootstrap'
import { injected } from '../../connectors'
import { Link } from 'react-router-dom'
import { switchNetwork } from '../../hooks/useWeb3'
import { ConnectionContext } from '../../context/ConnectionContext'
import { OffCanvasInfo } from '../UserInfo/OffcanvasInfo'

const ConnectButton = ({show,setShow}) => {
    const { active, activate} = useWeb3React('metamask')
    const { connector, chainId:chainNetwork} = useWeb3React()
    const {connected} = useContext(ConnectionContext)
    const [connecting, setConnecting] = useState(false)
    
    const handleClick = async () => {
        try{
            setConnecting(true)
            await activate(injected)
            await switchNetwork(chainNetwork, connector.providers[chainNetwork].url, active)
            setConnecting(false)
        }catch(err){
            console.log(err)
            setConnecting(false)
        }
    }

    const connectedClick = () => setShow(true)
     
    return (
        <>
            <Button
                variant={active ? "outline-success" : "outline-warning"}
                onClick={active ? connectedClick : handleClick}
                disabled={!connected}
            >
                {connecting ? 'Loading' : active ? <><span>Connected</span>  </> : 'Connect'}
            </Button>
        </>
    )
}

const Header = () => {
    const [show,setShow] = useState(false)
    const {active} = useWeb3React('metamask')
    const {connected} = useContext(ConnectionContext)
    return (
        <>
        <header className='mb-4'>
            <Navbar bg='dark' variant='dark' expand='lg' >
                <Container>
                    <Navbar.Brand as={Link} to='/' href='/'>Mercat</Navbar.Brand>
                    <Navbar.Toggle aria-controls="header-navigation-navbar" />
                    <Navbar.Collapse className='justify-content-end' id='header-navigation-navbar'>
                        <Nav className='text-center'>
                            <Nav.Link as={Link} to='/minter' href="/minter" className='my-auto'> Minter </Nav.Link>
                            <Nav.Link as={Link} to='/market' href="/market" className='my-auto'> Market </Nav.Link>
                            <Navbar.Text>
                                <ConnectButton show={show}  setShow={setShow}/>
                            </Navbar.Text>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
        {connected && active && <OffCanvasInfo show={show} setShow={setShow}/>} 
        </>
    )
}
export default Header