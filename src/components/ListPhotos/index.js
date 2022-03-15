import React, { useCallback, useRef, useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AlbumContext } from '../../context'

const ListPhotos = () => {
  const { loadMore, albumId } = useContext(AlbumContext);
  const [albums, setAlbums] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false)

  const getRef = useRef()
  const loadMoreRef = useCallback(node => {
    if (loading) return;
    if (getRef.current) getRef.current.disconnect();
    getRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        // 1 second to load more data for testing
        // setTimeout(() => setPage(prevPage => prevPage + loadMore), 1000);

        // immediately load more
        setPage(prevPage => prevPage + loadMore);
      }
    })
    if (node) getRef.current.observe(node)
  }, [loading, hasMore])

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios({
      method: 'GET',
      url: `https://jsonplaceholder.typicode.com/albums/${albumId}/photos?_start=${page}&_limit=${loadMore}`,
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setAlbums(prevData => {
        return [...new Set([...prevData, ...res.data.map(dt => dt)])]
      })
      setHasMore(res.data.length > 0);
      setLoading(false);
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [page, albumId])

  useEffect(() => {
    setAlbums([]);
    setPage(0);
  }, [albumId])

  return (
    <div className="mt-5">
      <div className="grid grid-cols-2 gap-2">
        {
          albums.map((data, i) => {
            let rows = (i+1) % 2 === 0;
            return (
              <img
                ref={loadMoreRef}
                key={i}
                src={data.thumbnailUrl}
                className={`m-auto bg-blue-300 max-w-[200px] w-full rounded ${rows ? 'h-[100px]' : 'row-span-2 h-[200px]'}`}
                />
            )
          })
        }
      </div>
      <div>{loading && 'Loading...'}</div>
    </div>
  )
}

export default ListPhotos