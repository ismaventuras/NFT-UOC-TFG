import { useState} from 'react'
import { TextInput, ImageInput, DescriptionInput } from './Inputs'
import { Form, Col, Spinner, Button } from 'react-bootstrap'
import { ModalUploading } from './ModalUploading'
import { useNFTStorage } from '../../hooks/useNFTStorage'
import { useWeb3React } from '@web3-react/core'
import { useNFTContractService } from '../../services/injectedUserService'



const ButtonSpinner = () => {
    return <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
}

const initialState = {name:'',description:'', image:''}

export const MinterForm = () => {
    const {account} = useWeb3React('metamask')

    const {uploadToIpfs , uploading} = useNFTStorage()
    const {mint, loadingMint , error, setError} = useNFTContractService()

    const [form,setForm] = useState({name:'',description:'', image:''})
    const changeValue = (key, value) => setForm({...form, [key]:value})

    const [txHash, setTxHash] = useState('')

    const onSubmit =  async (event) => {
        event.preventDefault()

        if (event.currentTarget.checkValidity() === false) event.stopPropagation()
        try{
            const hash = await uploadToIpfs({
                name:form.name,
                description:form.description,
                image: form.image,
                creator: account
            })
            const txMint = await mint(hash)
            setTxHash(txMint)
        }
        catch(err){
            console.log(err)
        }
        
    }

    const reset = () => {
        setForm(initialState)
        setError('')
        setTxHash('')
    }



    return (
        <>
            <Form onSubmit={onSubmit} className='my-4 h-100 p-3'>
                <ImageInput form={form} changeValue={changeValue}/>
                <TextInput form={form} changeValue={changeValue}/>
                <DescriptionInput form={form} changeValue={changeValue}/>
                <Col lg={12} className='mx-auto mb-3 w-75 d-flex flex-row-reverse'>
                    <Button 
                        className='' 
                        type='submit'>
                        {!uploading && !loadingMint ? 'Mint' : <ButtonSpinner />}
                    </Button>
                </Col>
            </Form>
            <ModalUploading error={error} txHash={txHash && txHash.transactionHash} loadingMint={loadingMint} uploading={uploading} reset={reset}/>
        </>
    )
}
