import React, { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { AiOutlineClose } from 'react-icons/ai'
import { userAuth } from '../Context/AuthContext'
import { db } from '../Services/firebase'
import { createImageUrl } from '../Services/MovieServices'
import { arrayRemove, doc, onSnapshot, updateDoc } from 'firebase/firestore'

function Profile() {
  const { user } = userAuth()
  const [movies, setMovies] = useState([])

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, 'users', `${user.email}`), (doc) => {
        if (doc.data()) {
          setMovies(doc.data().favShows)
        }
      })
    }
  }, [user?.email])
  console.log(movies,"movies");
  if (!user) {
    return <><p>Fetching shows...</p></>
  }

  const slide = (offset) => {
    const slider = document.getElementById('slider')
    slider.scrollLeft = slider.scrollLeft + offset
  }

  const removeFavShow = async (movie)=>{
    const userDoc = doc(db,'users',user?.email)
    await updateDoc(userDoc,{
      favShows:arrayRemove(movie)
    })
  }

  return (
    <>
      <div>
        <div>
          <img
            className='bloc w-full h-[500px] object-cover'
            src="https://assets.nflxext.com/ffe/siteui/vlv3/4d7bb476-6d8b-4c49-a8c3-7739fddd135c/deecf71d-7a47-4739-9e1a-31b6b0d55be7/IN-en-20240429-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="back ground image" />
        </div>
        <div className='bg-black/70 fixed top-0 left-0 w-full h-screen' />
        <div className='absolute top-[200px] p-4 md:p-8'>
          <h1 className='text-3xl md:text-5xl font-nsans-bold my-2'> My Shows</h1>
          <p className='font-nsans-light text-gray-400 text-lg'>{user?.email}</p>
        </div>
      </div>
      {/* movieRow */}
      <h2 className='font-nsans-bold md:text-xl p-4 capitalize'>Fav Shows</h2>
      <div className='relative flex items-center group'>
        <MdChevronLeft size={40} onClick={() => slide(-500)} className='bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer' />
        <div id={`slider`} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
          {
            movies?.map((movie) => {
              return <>
              <div key={movie.id} className='relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block
               rounded-lg overflow-hidden cursor-pointer m-2'>
                <img className='w-full h-40 black object-cover object-top '
                  src={createImageUrl(movie.backdrop_path ?? movie.poster_path, "w500")} alt={movie.title} />

                <div className='absolute top-0  w-full h-48 bg-black/88 opacity-0 hover:opacity-100'>
                  <p className='whitespace-normal text-xs  md:text-sm flex justify-center items-center h-full'>{movie.title}</p>
                     <p><AiOutlineClose size={30} className='absolute top-2 right-2' 
                     onClick={()=>removeFavShow(movie)}/>
                     </p>
                </div>
              </div>
              </>
            })
          }
        </div>
        <MdChevronRight onClick={() => slide(500)} size={40} className='bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-18 hidden group-hover:block cursor-pointer' />
      </div>
    </>

  )
}

export default Profile
