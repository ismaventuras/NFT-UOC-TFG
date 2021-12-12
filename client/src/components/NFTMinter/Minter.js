//Custom
import { NotConnectedMetamask } from '../Utils/Connection'
//Context
import { MinterForm } from './MinterForm'


const Minter = () => {

    return (
        <>
            <div className='row'>
                <h2 className="display-2 text-center my-4">Minter</h2>
                <hr className="mb-4" />
            </div>
            <NotConnectedMetamask>
                <MinterForm />
            </NotConnectedMetamask>

        </>
    )
}
export default Minter