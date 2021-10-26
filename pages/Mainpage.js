import React, { useEffect, useState } from 'react'
import Layout from './components/Layout'
import moment from 'moment';
import { DatePicker, Space, InputNumber, Button, Table, Input} from 'antd';
import _ from 'lodash';

import DateTimePicker from '@material-ui/lab/DateTimePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';

import { doc, addDoc, collection, firestore, setDoc, updateDoc } from "../configs/firebase";

import usegetData from "../configs/firestore" 

const Main = () => {
    const [ getData, data, setData ] = usegetData()

    const [ valueData, setValueData ] = useState({
        period: null,
        time: null,
        units: null
    })

    let setTime = (timeInput) => {
        return moment(timeInput).format('YYYY-MM-DDTHH:mm:ss.SSSZ')
    }

    let time ,date, month,year, hour, period, combine

    const [value, setValue] = React.useState(new Date());

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const handleChange = (newValue) => {
        console.log('newValue', newValue)

        time = setTime(newValue)
        
        console.log('time', time)

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

        setValueData({
            ...valueData,
            time: time,
            period: combine
        })


        setValue(newValue);
    };
  

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
        console.log(valueData);
    }, [valueData])

    console.log('got data', data)

    function onChange(dateString) {
        // console.log('Selected Time: ', valueData);
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

        setValueData({
            ...valueData,
            time: time,
            period: combine
        })
      }
      
      function onOk(valueData, dateString) {
        // console.log('onOk: ', valueData);
        // console.log('Formatted Selected Time: ', dateString);

      }
    
  
    const addUnitsHandler = async () => {
        try {
            const docRef = await addDoc(collection(firestore, "electricity_units", "10_25_2021_18_12"), valueData);
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    const setUnitsHandler = async () => {

       

        try {
            const docRef = await setDoc(doc(firestore, "electricity_units", valueData.period), valueData);
              console.log("Document written with ID: ", docRef);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    
    const submitHandler = (e) => {
        e.preventDefault()
        console.log("submit");
        console.log('valueData', valueData)

        if(_.isNil(valueData.period) || _.isNil(valueData.time) || _.isNil(valueData.units) ){
            setOpen(true);

        }else{
             // if(!_.isNil(time) && !_.isNil(valueData.time)){
                setUnitsHandler()
                getData()
    
                setValueData({
                    period: null,
                    time: null,
                    units: ""
                })
            // }
            // setValueData({})
            //creat object to ready to push
        }

       
    }



    return (
        <div>
            <Layout>
                <form className='text-center' onSubmit={submitHandler}>
                {/* <DatePicker showTime onChange={onChange} onOk={onOk} />  */}
                 <br/> <br/>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            label="Date&Time picker"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                            />
                    </LocalizationProvider>

                    {/* <label>net</label><br/> */} <br/><br/>
                    <TextField 
                        
                        // defaultValueData={0}  
                        // step="0.01"
                        value={valueData.units}
                        required
                        onChange={({ target: { value } })=>{ setValueData({...valueData, units: value})}}
                        id="outlined-basic" label="Units" variant="outlined" />

                    {/* <Input
                        style={{width: "20%"}}
                     
                        // defaultValueData={0}  
                        // step="0.01"
                        value={valueData.units}
                        required
                        onChange={({ target: { value } })=>{ setValueData({...valueData, units: value})}}
                    /> */}
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
            
            <Snackbar
            open={open}
            autoHideDuration={1000}
            onClose={handleClose}
            message="Fill all"
            // action={action}
          />

        </div>
    )
}

export default Main
