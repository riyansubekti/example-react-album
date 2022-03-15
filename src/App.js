import React from 'react'
import { Header, Fab, Carousel, ListPhotos } from './components'
import { AlbumContext } from './context'

const App = () => {
  const [albumId, setAlbumId] = React.useState(1);
  const loadMore = 5;
  return (
    <div className="bg-slate-300 w-full h-full">
      <div className="mx-auto max-w-xl bg-white min-h-full relative shadow-lg">
        <div className="px-5 pt-10 pb-5 font-body">
          <AlbumContext.Provider value={{loadMore, albumId, setAlbumId}}>
            <Header />
            <Carousel />
            <ListPhotos />
          </AlbumContext.Provider>
        </div>
        <Fab />
      </div>
    </div>
  )
}

export default App