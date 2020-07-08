import { UPDATE_IMAGES } from './actions'

export const reducer = (state={} , action) => {
    // initialState
    let newState={}
    switch (action.type) {

        case UPDATE_IMAGES:
            console.log("updating")
            newState = {
                ...state,
                AllImage: [
                    ...action.payload 
                ]
            }
            return newState
        
        default:
        return state
    }
}


