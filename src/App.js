import React, { useEffect, useState } from 'react'
import './index.scss'
import Collection from './Collection'
import jsonFile from './data.json'

function App() {
	const [searchValue, setSearchValue] = useState('')
  const [page, setPage] = useState(0)
	const [categoryId, setCategotryId] = useState(0)
  const [isLoading,setIsLoading] = useState(true);
	const [collections, setCollections] = useState([])

	useEffect(() => {
       setIsLoading(true)
       setTimeout(() =>{
  categoryId === 0
		? setCollections(jsonFile.collections)
		: setCollections(
				jsonFile.collections.filter(obj => obj.category === categoryId)
		  )
      setIsLoading(false)
    }
       , 1000)
    

    
		
	}, [categoryId])
	return (
		<div className='App'>
			<h1>Моя коллекция фотографий</h1>
			<div className='top'>
				<ul className='tags'>
					{jsonFile.categories.map((obj,i) => 
          <li className={categoryId===i ? 'active': ''} onClick={()=>setCategotryId(i)} key={obj.name}>{obj.name}</li>
          )}
				</ul>
				<input
					value={searchValue}
					onChange={e => setSearchValue(e.target.value)}
					className='search-input'
					placeholder='Поиск по названию'
				/>
			</div>
			<div className='content'>
				{
          isLoading ? <h2>Идет загрузка...</h2>:
          collections
					? collections
							.filter(obj =>
								obj.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
							)
							.map((obj, i) => (
								<Collection key={i} name={obj.name} images={obj.photos} />
							))
					: null
        }
			</div>
			<ul className='pagination'>
				<li>1</li>
				<li className='active'>2</li>
				<li>3</li>
			</ul>
		</div>
	)
}

export default App
