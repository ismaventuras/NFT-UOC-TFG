import { Form, Image } from 'react-bootstrap'

const textInputStyles = 'col-lg-6 mb-3 mx-auto w-75'

export const DescriptionInput = ({form, changeValue}) => {

    return(
        <Form.Group controlId='formDescription' className={textInputStyles}>
            <Form.Control 
                as='textarea' 
                placeholder='NFT Description' 
                onChange={(e)=> changeValue("description",e.target.value)} 
                value={form.description} 
                required/>
        </Form.Group>
    )
}

export const TextInput = ({form, changeValue}) => {

    return(
        <Form.Group controlId='formName' className={textInputStyles} >
            <Form.Control 
                type='text' 
                placeholder='NFT Name' 
                onChange={(e)=> changeValue("name",e.target.value)} 
                value={form.name} 
                required/>
        </Form.Group>
    )
}

export const ImageInput = ({form, changeValue}) => {

    const imageStyles = {
        width: "250px",
        height: "auto",
    }

    const imageChange = (event) => {
        if (event.target.files && event.target.files.length > 0) { // check if there are any files
            let file = event.target.files[0] // get the first file
            if (file.type !== 'image/png') { // check file type
                alert('only accepting .png')
                event.target.value = null //cleanup the input
            }
            else {
                changeValue("image",file);
            }
        }
    };

    return (
        <>
        {form.image
            ? 
            <div className='mb-3 col-lg-6 mx-auto w-50 d-flex justify-content-center align-items-center'>
                <Image 
                    style={imageStyles}  
                    className='' 
                    src={URL.createObjectURL(form.image)} 
                    onClick={()=>changeValue("image","")} 
                    fluid />
            </div>
            :
            <Form.Group controlId='formFile' className={textInputStyles}>
                <Form.Control 
                    type='file' 
                    accept='image/png' 
                    onChange={imageChange} 
                    required />
            </Form.Group>
        }
        </>
    )
}
