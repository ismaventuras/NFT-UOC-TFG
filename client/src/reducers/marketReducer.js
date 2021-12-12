
const marketReducer = (state = [], action) => {
    switch(action.type){
        case "INIT":
            return action.data
        default:
            return state
    }
}

export const init = (items) => {
    return {
        type: "INIT",
        data:  items
    }
}

export default marketReducer