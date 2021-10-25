import React, { useEffect, useState } from 'react'
import Layout from './components/Layout'
import moment from 'moment';
import { DatePicker, Space, InputNumber, Button, Table} from 'antd';
import _ from 'lodash';


import { doc, addDoc, collection, firestore, setDoc, updateDoc } from "../configs/firebase";

import usegetData from "../configs/firestore" 

const Main = () => {
    const [ getData, data, setData ] = usegetData()

    const [ value, setValue ] = useState({
        period: null,
        time: null,
        units: null
    })

    let setTime = (timeInput) => {
        return moment(timeInput).format('YYYY-MM-DDTHH:mm:ss.SSSZ')
    }

    let time ,date, month,year, hour, period, combine
  

    const columns = [
        {
          title: 'time',
          dataIndex: 'time',
          key: 'time',
         
        },
        {
            title: 'period',
            dataIndex: 'period',
            key: 'period',
        },
        {
          title: 'units',
          dataIndex: 'units',
          key: 'units',
        },

    ]
    
    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        console.log(value);
    }, [value])

    console.log('got data', data)

    function onChange(dateString) {
        // console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        console.log('setTime(dateString)', setTime(dateString))

        time = setTime(dateString)

         date = moment(time).format("DD"); 
         month = moment(time).format("MM"); 
         year = moment(time).format("YYYY"); 
         hour = moment(time).format("HH"); 

        if(hour){
            if(["12", "13", "14", "15", "16", "17", ].includes(hour)){
                period = '12_18'
            } else {
                period = '18_12'
            }
        }

        combine = `${date}_${month}_${year}_${period}`
        console.log('combine', combine)

        setValue({
            ...value,
            time: time,
            period: combine
        })
      }
      
      function onOk(value, dateString) {
        // console.log('onOk: ', value);
        // console.log('Formatted Selected Time: ', dateString);

      }
    
  
    const addUnitsHandler = async () => {
        try {
            const docRef = await addDoc(collection(firestore, "electricity_units", "10_25_2021_18_12"), value);
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    const setUnitsHandler = async () => {

       

        try {
            const docRef = await setDoc(doc(firestore, "electricity_units", value.period), value);
              console.log("Document written with ID: ", docRef);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    
    const submitHandler = (e) => {
        e.preventDefault()
        console.log("submit");
        // setValue({
        //     ...value,
        //     time: time
        // })

        // if(!_.isNil(time) && !_.isNil(value.time)){
            setUnitsHandler()
            getData()
        // }
        
       

        // setValue({})

        //creat object to ready to push


    }



    return (
        <div>
            <Layout>
                <form className='text-center' onSubmit={submitHandler}>
                <DatePicker showTime onChange={onChange} onOk={onOk} style={{marginBottom: "10%"}}/>

                    {/* <label>net</label><br/> */} <br/>
                    <InputNumber
                        style={{height: "50px"}}
                     
                        defaultValue={0}  
                        step="0.01"
                        // value={value.units}
                        required
                        onChange={(values)=>{ setValue({...value, units: parseFloat(values)})}}
                    />
                    <br/>
                    <Button type="primary" onClick={submitHandler}>Add</Button>
                </form><hr/>

                {/* {data?.map((item)=>{
                    return (
                        <div key ={item.time} className='text-center'>
                            <p>{`time: ${item.time}`}</p>
                            <p>{`units: ${item.units}`}</p>
                            <hr/>
                            
                        </div>
                    )
                })} */}

                <Table columns={columns} dataSource={data} />

                
                
            </Layout>
            
        </div>
    )
}

export default Main
