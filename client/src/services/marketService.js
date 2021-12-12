import { GetMarketContract } from "../hooks/useContracts"
import { useEffect, useState } from "react"


const useMarketService = () => {
    const market_contract = GetMarketContract()
    const [address, setAddress] = useState()
    
    useEffect(() => {
        if(market_contract) setAddress(market_contract._address)
        return () => {
            
        }
    }, [market_contract])

    const getAll = async () => {
        let items = []
        try{
            const totalSales = await market_contract.methods.getTotalSales().call()
            for (let i = 0; i < totalSales; i++) {
                const sale = await market_contract.methods.sales(i).call()
                sale.saleId = i
                if(sale.active) items.push(sale)
            }   
            return items
        }
        catch(err){console.log(err)}
    }
    
    return {getAll , address , market_contract}
}

export default useMarketService