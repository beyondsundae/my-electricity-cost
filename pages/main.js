import React, { useEffect } from 'react'
import Layout from './components/Layout'

// import firestore from '../configs/firebase'
// console.log('firestore', firestore.firestore())

import usegetData from "../configs/firestore" 

const Main = () => {
    const [ getData, data, setData ] = usegetData()
    
    useEffect(() => {
        getData()
    }, [])

    console.log('data', data)

    // const electricity_unitsRef = firestore.collection('electricity_units')

    // electricity_unitsRef.get().then((snapshot) => {
    //     console.log('snapshot', snapshot)

    // })

    return (
        <div>
            <Layout>
                {data?.map((item)=>{
                    return (
                        <div key ={item.time} className='text-center'>
                            <p>{`time: ${item.time}`}</p>
                            <p>{`units: ${item.units}`}</p>
                            <hr/>
                        </div>
                    )
                })}
                
            </Layout>
            
        </div>
    )
}

export default Main
