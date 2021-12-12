import { Spinner } from "react-bootstrap"


export const LoadingApp = ({err}) => {
    return(
        <div className="h-100 d-flex justify-content-center align-items-center flex-column">
            <Spinner animation='border' className='mb-3'/>
            <p>{err ? `${err} - Trying again in 20 seconds...` : 'Loading data from blockchain'}</p>
        </div>
    )}
