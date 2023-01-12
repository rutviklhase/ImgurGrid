import "./Grid.scss"
import React, { useEffect } from "react"
import axios from "axios"
import { useState } from "react";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea"; 
import { color, maxHeight } from "@mui/system";
import { blue } from "@mui/material/colors";
import close from "../../assets/close.png"


export default function Grid(){
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [section, setSection] = useState("hot");
    const [page, setPage] = useState("1");
    const [showViral, setShowViral] = useState("false");

    useEffect(()=>{
        const loadPost = async () => {
            setLoading(true);
            const response = await axios.get(`https://api.imgur.com/3/gallery/${section}/top/day/${page}?showViral=${showViral}&mature=true&album_previews=true`, {headers: {"Authorization" : `Client-ID 9d8ac8174db155c` }});
            var result = [];
            for (var i in response)
            {
                for(var j in response[i].data)
                {
                    for(var k in response[i].data[j].images)
                    {
                      console.log(response[i].data[j])
                     result.push(response[i].data[j]);
                    }
                }
                
            }
            // console.log(result);
            setPosts(result);
            setLoading(false);
        }
        loadPost();
    },[section, page, showViral]);
    const [model, setModel] = useState(false);
    const [tempImgSrc, setTempImgSrc] = useState('');
    const [tempDesc, setTempDesc] = useState('');
    const [tempUps, setTempUps] = useState(1);
    const [tempDowns, setTempDowns] = useState(1);
    const [tempScore, setTempScore] = useState('1');


    const getImg = (imgSrc, desc, ups, downs, score) => {
        setTempImgSrc(imgSrc);
        setTempDesc(desc);
        setTempUps(ups);
        setTempDowns(downs);
        setModel(true);
        setTempScore(true);
    }




    return (
        <>
        <div className="selections">
            <div className="Section"> 
            Section : <button onClick={()=>{setSection("hot")}}>Hot</button> <button onClick={()=>setSection("top")}>Top</button> <button onClick={()=>setSection("user")}>User</button>
            </div>
            Viral: <button onClick={()=>{setShowViral("true")}}> Enabled </button> <button onClick={()=>{setShowViral("false")}} > Disabled </button>
            <div>Page: <button onClick={()=>{setPage(page-1)}}> - </button>{page} <button onClick={()=>{setPage(page+1)}}> + </button> </div>
        </div>
        <div className={model?"model open":"model"}>
            <img src={tempImgSrc}/>
            <div className="info">
                <div className="desc">UpVotes : {tempUps}</div>
                <div className="desc">DownVotes : {tempDowns}</div>
            </div>
            

        <img src={close} onClick={()=>setModel(false)} className="close"></img>
        </div>
        <div className="Grid">
            {
            loading ? (<h1>Loading...</h1>)
            :
            (posts.map((item) => 
            item.images[0].type=="video/mp4"? (<h1></h1>):
            (
            <div className="Card"> 
            <Card sx={{ padding: 1}} style={{backgroundColor: "#0D422F"}}>
                <CardActionArea onClick={()=>getImg(item.images[0].link, item.ups, item.downs, item.score)}>
                    <CardMedia
                        component="img"
                        image={item.images[0].link}
                        alt="image"
                    />
                     <CardContent>
                        <Typography gutterBottom variant="h5" component="div" fontFamily="Poppins" fontSize="1vh">
                            {item.title}
                        </Typography>
                        </CardContent>
                </CardActionArea>
            </Card>
            </div>
            )
            
            
            )
            )
            }
           
        </div>
        </>
        
    );
}



