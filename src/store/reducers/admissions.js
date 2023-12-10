const initialState={
    list: []
}
//this is a reducer
const admission =(state=initialState,action)=>{
    console.log('in reducer..')
    if(action.type === 'GET_LIST'){
        return {...state,list: action.payload  }
    }
    return state;
}
export default admission;