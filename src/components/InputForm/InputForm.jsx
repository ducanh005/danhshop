import {WrapperInputStyle} from './style'
import { useState } from 'react'

const InputForm =(props)=>{
    const [valueInput,setValueInput] = useState('')
    const {placeholder = 'Nhập text' ,...rests}= props
    return(
        
        <WrapperInputStyle placeholder={placeholder} valueInput={valueInput} {...rests} />
    )

}

export default InputForm ;