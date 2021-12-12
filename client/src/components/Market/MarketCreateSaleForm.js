import { useState } from "react"
import { Form , Button, } from "react-bootstrap"
import { GetNftContract } from "../../hooks/useContracts"


import { SaleFormPrice , SaleFormSelect } from "./Inputs"

const initialState = {selectedToken:'',price:"0.1"}

export const CreateSaleForm = (props) => {

    const {
        setShow, setShowSecond,
        txState, setTxState,
        createSale, 
        approve,
        setError
    } = props
    
    
    const [form , setForm] = useState(initialState)
    const formReset = () => setForm(initialState)
    
    const nftContract = GetNftContract('metamask')
    const nftAddress = nftContract._address

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (event.currentTarget.checkValidity() === false) event.stopPropagation()
        try{
            setShowSecond(true)
            const {price, selectedToken} = form
            const tx_approve = await approve(selectedToken)
            setTxState({...txState,txApprove:tx_approve})
            const tx_sale = await createSale(price, selectedToken, nftAddress)
            setTxState({txApprove:tx_approve,txSale:tx_sale})
        }
        catch (error){
            setError(error)
        }
        formReset()
        setShow(false)
        
    }

    return (
        <>
            <Form onSubmit={handleSubmit} readOnly>
            <SaleFormSelect form={form} setForm={setForm} />
                <SaleFormPrice form={form} setForm={setForm}/>
                <Button variant="primary" type="submit">
                    Create
                </Button>
            </Form>
        </>
    )
}
