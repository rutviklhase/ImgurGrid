import "./Grid.scss"
import React, { useEffect } from "react"
import axios from "axios"
import { useState } from "react";

export default function Grid(){
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        const loadPost = async () => {
            setLoading(true);
            const response = await axios.get('https://api.imgur.com/3/gallery/hot/top/day/1?showViral=true&mature=true&album_previews=true', {headers: {"Authorization" : `Client-ID 9d8ac8174db155c` }});
            var result = [];
            for (var i in response)
            {
                // result.push(response[i].data[1].images[0].link);
                // console.log(response[i].data[1].images[0].link);
                for(var j in response[i].data)
                {
                    // console.log(response[i].data[j].images[0]);
                    for(var k in response[i].data[j].images)
                    {
                      console.log(response[i].data[j].images[k].link)
                     result.push(response[i].data[j].images[k].link);
                    }
                }
                
            }
            console.log(result);
            setPosts(result);
            setLoading(false);
        }
        loadPost();
    },[]);

    return (

        <div className="Grid">
            {
            loading ? (<h1>Loading...</h1>):(posts.map((item) => <img src={item} className="Image"></img>))
            }
        </div>
        
    );
}

// async function getGrid(){
//     try{
//         const response = await axios.get('https://api.imgur.com/3/gallery/hot/top/day/1?showViral=true&mature=true&album_previews=true', {headers: {"Authorization" : `Client-ID 9d8ac8174db155c` }});
//         var result = [];
//         // console.log(result);
//         for (var i in response)
//         {
//             result.push([i,response[i]]);
//         }
//         return result;

//     }
//     catch(error){
//         console.error(error);
//     }
// }

// async function getImageObj(){
//     const data = await getGrid();

//     return data[0][1].data[0].images[0].type.value;
    
// }

// function printData(){
//    const imgobj =  getImageObj();
//    return imgobj;
// }


