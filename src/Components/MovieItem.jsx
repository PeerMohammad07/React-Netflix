import React,{useState} from 'react'
import { createImageUrl } from '../Services/MovieServices'
import { FaHeart ,FaRegHeart } from "react-icons/fa";
import { arrayUnion,doc,updateDoc } from 'firebase/firestore';
import {db} from '../Services/firebase'
import { userAuth } from '../Context/AuthContext';
import Swal from 'sweetalert2'


function MovieItem({movie}) {
  const {user} = userAuth()

  const [like,setLike] = useState(false)
  const {title,backdrop_path,poster_path} = movie

  const markFavShow = async () =>{
    const userEmail = user?.email 

    if(userEmail){
      const userDoc = doc(db,'users',userEmail)
      setLike(!like)
      await updateDoc(userDoc,{
        favShows:arrayUnion({...movie})
      })
    }else{
      Swal.fire({
        icon:'warning',
        text:'Login to save video'
      })
    }
  }

  return (
    <>
    <div className='relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block
     rounded-lg overflow-hidden cursor-pointer m-2'>
      <img className='w-full h-40 black object-cover object-top'
      src={createImageUrl(backdrop_path??poster_path,"w500")} alt={title} />

      <div className='absolute top-0  w-full h-48 bg-black/88 opacity-0 hover:opacity-100'>
          <p className='whitespace-normal text-xs  md:text-sm flex justify-center items-center h-full'>{movie.title}</p>
          <p onClick={markFavShow} className='cursor-pointer'>
            {
              like? <FaHeart size={20} className='absolute top-2 left-2 text-gray-300 '/> : <FaRegHeart size={20}  className='absolute top-2 left-2 text-gray-300 '/>
            }
          </p>
      </div>
    </div>
    </>
  )
}

export default MovieItem
