
import { ButtonCreateSale } from "./MarketCreateSale"
import { MarketItems } from "./MarketItems"


const Market = () => {


    return (
        <>
            <div className='row'>
                <div className='col'>
                    <h2 className="display-2 text-center mb-4">Market</h2>
                </div>
                <hr className="mb-4 " />
            </div>

            <>
                <ButtonCreateSale />
                <MarketItems />
            </>
        </>
    )
}
export default Market