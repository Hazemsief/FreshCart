import React , {useEffect, useState} from 'react'
import Style from './Orders.module.css'

export default function Orders() {


    const [counter, setCounter] = useState(0)  
        useEffect(() => {

          return () => {
              
          }
        }, [])

    return <>
    <h2>Orders</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In ab nihil perspiciatis dicta accusamus distinctio!</p>
    </>
}
