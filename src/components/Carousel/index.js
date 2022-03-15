import React, { useRef, useState, useEffect,useContext } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import ListPhotos from '../ListPhotos'
import { AlbumContext } from '../../context'

const Carousel = () => {
  const { setAlbumId } = useContext(AlbumContext);
  const [active, setActive] = useState(0);
  const [width, setWidth] = useState(0);
  const [albums, setAlbums] = useState(false);
  const [error, setError] = useState(false);
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, [albums])

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/photos?_limit=10',
      timeout: 60000
    }).then(res => {
      setAlbums(res.data);
    }).catch(e => {
      console.error(e.message);
      setError(true);
    })
  }, [])

  return (
    <>
      <div className="mt-4">
        <motion.div ref={carousel} whileTap={{cursor: 'grabbing'}} className="cursor-grab overflow-hidden">
          <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className="flex">
            { albums ?
            albums.map((dt, i) => {
              return (
                <motion.div key={i} className="min-w-[140px] min-h-[140px] px-[10px]">
                  {
                    i === active ?
                    <motion.div>
                      <figure className="w-[140px] h-full rounded-[10px] bg-[#F89F1E]">
                        <img 
                          className="pointer-events-none w-[140px] h-[100px] rounded-t-[10px] rounded-bl-[20px]"
                          draggable="false"
                          src="https://via.placeholder.com/150/92c952"
                          alt="test" />
                        <figcaption className="h-[40px] text-[11px] px-[10px] py-[6px] text-white">
                          {dt.title}
                        </figcaption>
                      </figure>
                    </motion.div> :
                    <motion.div>
                      <img
                        className={`mt-5 w-[140px] h-[100px] rounded-[10px] ${active < i ? 'ml-5' : ''}`}
                        onClick={() => {
                          setActive(i);
                          setAlbumId(dt.id);
                        }} src={dt.thumbnailUrl}
                        draggable="false" /> 
                    </motion.div>
                  }
                </motion.div>
              )
            }) : error ? <span>Error Get Data Albums!</span> : null}
          </motion.div>
        </motion.div>

        <div className="text-xs text-slate-600 ml-1 mt-1 text-right">{active+1} of {albums.length}</div>
      </div>
    </>
  )
}

export default Carousel