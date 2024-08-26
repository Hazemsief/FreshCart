import React , {useEffect, useState} from 'react'
import Style from './Box.module.css'

export default function Box() {


    const [counter, setCounter] = useState(0)  
        useEffect(() => {

          return () => {
              
          }
        }, [])

    return <>
    <h2>Box</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In ab nihil perspiciatis dicta accusamus distinctio!</p>
    </>
}
