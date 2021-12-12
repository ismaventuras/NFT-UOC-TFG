import { useEffect, useState } from "react"
import { Form, FloatingLabel, Button } from "react-bootstrap"
import { useNFTContractService } from "../../services/injectedUserService"


export const SaleFormSubmit = () => {
    return (
        <Button
            variant="primary"
            type="submit"
        >
            Create
        </Button>
    )
}

export const SaleFormPrice = ({ form, setForm }) => {
    return (
        <FloatingLabel className='mb-3' label='Price'>
            <Form.Control
                type='number'
                name='price' placeholder='0.00'
                min='0.1' step='0.1'
                onChange={(event) => setForm({ ...form, price: event.target.value })}
                value={form.price}
                required />
        </FloatingLabel>
    )
}


export const SaleFormSelect = ({ form, setForm }) => {
    
    const {ownerBalance} = useNFTContractService()

    const [tokenList, setTokenList] = useState([])

    useEffect(() => {
        let isSubscribed = true
        if(isSubscribed){
        ownerBalance()
            .then(result => setTokenList(result))
            .catch(err => console.log(err))
        }
        return ()=> isSubscribed=false
    }, [ownerBalance])


    return (
        <FloatingLabel className='mb-3' label='Pick one of your NFT'>
            {tokenList
                ?
                <Form.Select
                    name='currentOption'
                    onChange={(event) => setForm({ ...form, selectedToken: event.target.value })}
                    required
                >
                    <option key={-1} value="">{tokenList && tokenList.length === 0 ? 'Loading your nft...' : ''}</option>
                    {tokenList.map(tokenId =>
                        <option key={tokenId} value={tokenId}>
                            {tokenId}
                        </option>
                    )}
                </Form.Select>
                : <p>You currently have no NFT </p>
            }
        </FloatingLabel>
    )
}