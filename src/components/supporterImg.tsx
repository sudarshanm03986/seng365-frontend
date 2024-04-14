import { useEffect, useState } from 'react';
import DefaultSupporterImg from './../assets/default_owner_img.png'
import axios from 'axios';


const SupporterImg = (props:any) => {

    const [supporterHeroImg, getSupporterHeroImg] = useState("");


    useEffect (()=> {

        const setImage = () => {

            axios.get(process.env.REACT_APP_DOMAIN + '/users/' + props.id + '/image', { responseType: 'blob'}) 
            .then((res) => {

                const imageUrl = URL.createObjectURL(res.data);
                getSupporterHeroImg(imageUrl);

                
            }, (err) => {

                getSupporterHeroImg(DefaultSupporterImg);
                
            })



        }



        setImage();

    },[props])

    return ( 
       <div className='border-accent border-2 rounded-full'><img src={supporterHeroImg} className={props.className} alt={props.id} /></div> 
     );
}
 
export default SupporterImg;

