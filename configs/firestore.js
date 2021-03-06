import React, {useState} from "react";
import { firestore, collection, getDocs, query, orderBy } from "./firebase";

const usegetData = () => {

    const [ data, setData ] = useState([])

    async function getData() {
        const collectionFirestore = query(collection(firestore, 'electricity_units'),orderBy("time", "desc"));
            // console.log('collectionFirestore', collectionFirestore)
        const docsFirestore = await getDocs(collectionFirestore);
            // console.log('docsFirestore', docsFirestore)
        const docFirestore = docsFirestore.docs.map(doc => doc.data());
            // console.log('docFirestore', docFirestore)

        if(docFirestore){
            setData(docFirestore)
        }
    }

    return [ getData, data, setData ]
     
}

export default usegetData 