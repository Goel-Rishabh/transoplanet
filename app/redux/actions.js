// define type
export const UPDATE_IMAGES = 'UPDATE_IMAGES'
export const UPDATE_DETAILS = 'UPDATE_IMAGES'
export const UPDATE_SELECTED = 'UPDATE_IMAGES'
//define actions

export const updateImage = payload =>({
    type:UPDATE_IMAGES,
    payload:payload
})

export const updateDetails = payload =>({
    type:UPDATE_DETAILS,
    payload:payload
})

export const updateSelected = payload =>({
    type:UPDATE_SELECTED,
    payload:payload
})


