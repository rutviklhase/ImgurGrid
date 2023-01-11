import axios from "axios";
import React from "react";
import "./Image.scss";


export default function Image(props){
    return(
       <div className="Image">
            <img src={props.image}/>
            {props.desc}
       </div> 
    )
}


// async function getGrid(){
//     try{
//         const response = await axios.get('https://api.imgur.com/3/gallery/hot/top/day/1?showViral=true&mature=true&album_previews=true', {headers: {"Authorization" : `Client-ID 9d8ac8174db155c` }});
//         console.log(response.data);
//         return response;
//     }
//     catch(error){
//         console.error(error);
//     }
// }

