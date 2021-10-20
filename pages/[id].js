import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import Layout from './components/Layout'

export default function Id() {

    const router = useRouter()

    // const { push, reload } = useRouter()

    const {id} = router.query

    const [state, setstate] = useState([])

    let arrPage =  []


    const addArr = () => {
        console.log('wow');
        for(let i = 0; i<100; i++){
            setstate((prev)=>{
                return [...prev, i]
            })
        }
    }
        
    useEffect(() => {
        // console.log('state2', state)
      }, [state])

    const _page = () => {
        let content = [];
        
        for (let item of state) {
          content.push(
            <>
                <Link key={item} href={`/${item}`}>
                    <a>{item}</a>
                </Link>
                <br/>
            </>
            );
        }

        console.log('content', content)
        return content;
    }

    setTimeout(() => {
        console.log('Hello, World!')
      }, 3000);

    return (
        <div>
          <Layout>
            <div style={{textAlign: "center", margin: '20%', fontSize: '200%'}}>
                    {id} <br/><br/><br/>

                    {/* {arrPage.length>0 && _page()} */}
                        {_page()}

                    <button onClick={()=>addArr()}>wow</button>

                </div>
            </Layout>
        </div>
    )
}
