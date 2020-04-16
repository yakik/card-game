
let state={isManager:false}

export function isManager (){
    return state.isManager
}

export function setIsManager (is){
    state.isManager = is
}