import axios from "axios"

export const getAdmissions=()=>(dispatch)=>{
    axios.get('http://localhost:8082/admission/all')
    .then(response=>{
        //give the response to the reducer
        dispatch({
            type:'GET_LIST',
            payload:response.data
        })
        // return{
        //     type:'GET_LIST',
        //     payload: response.data
        // }
    })
}