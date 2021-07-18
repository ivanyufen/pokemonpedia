import Tabs from 'components/Tabs';
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router'
import Loader from 'components/Loader';
import { PokemonContext } from 'context/PokemonContext';
import Image from 'next/image'

const API_URL = 'https://pokeapi.co/api/v2/';

const tabs = [
  {
    title: 'All Pokemon',
    route: 'allPokemons'
  },
  {
    title: 'My Pokemon',
    route: 'my-pokemons'
  }
]

export async function getServerSideProps(ctx: any){
  return {
    props: {
      activeTab: ctx?.query?.tab || 'allPokemons'
    }
  }
}

const Home = (props: any) => {
  //router
  const router = useRouter();

  // context
  const { myPokemons, releaseOwnedPokemons } = useContext<any>(PokemonContext);
  
  // state
  const [activeTab, setActiveTab] = useState(props.activeTab);
  const [isLoadingPokemons, setIsLoadingPokemons] = useState(false);
  const [pokemons, setPokemons] = useState<any>([]);

  useEffect(() => {
    getPokemons();
  }, [])


  const goToDetail = (name: string) => {
    router.push(`/detail?name=${name}`);
  }

  const handleRelease = (pokemon: any) => {
    releaseOwnedPokemons(pokemon);
    alert(`${pokemon.nickname} has been released!`)
  }

  const renderAllPokemons = () => {
    return (
      <div className='flex flex-col'>
        <div className='p-5'>
            <div>Total: {pokemons.length}</div>
            <div>Total Pokemons Owned: {myPokemons.length}</div>
        </div>
        <div className='flex flex-col w-full'>
          {pokemons.map((item: any) => (
            <div key={item.url} onClick={() => goToDetail(item.name)} style={{ boxShadow: 'rgb(34 34 34) 0.4rem 0.4rem 0px' }} className='p-5 rounded m-5 bg-green-600 text-white hover:bg-green-500 cursor-pointer'>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderMyPokemons = () => {
    if(!myPokemons || myPokemons.length === 0){
      return (
        <div className='h-screen flex flex-col justify-start items-center'>
          <Image width={200} height={250} alt='https://assets.tokopedia.net/assets-tokopedia-lite/v2/arael/kratos/36c1015e.png' src='https://assets.tokopedia.net/assets-tokopedia-lite/v2/arael/kratos/36c1015e.png' className='w-40 h-auto m-auto' />
          <div className='text-center'>Oops.. You haven&#39;t catch any pokemons!</div>
        </div>
      )
    }
    return (
      <>
        <div className='flex flex-col w-full'>
          {myPokemons.map((item: any) => (
            <React.Fragment key={item.nickname}>
              <div style={{ boxShadow: 'rgb(34 34 34) 0.4rem 0.4rem 0px' }} className='p-5 rounded m-5 bg-green-600 text-white'>
                <div className='flex flex-row items-center'>
                  <div className='mr-10 w-20'>
                    <Image
                      width={150}
                      height={150}
                      className='bg-white rounded-full my-5'
                      src={item.sprites.front_default}
                      alt={item.sprites.front_default}
                    />
                  </div>
                  <div>
                  <p>Name: {item.name}</p>
                  <p>Nickname: {item.nickname}</p>
                  </div>
                </div>
              </div>
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleRelease(item)}
              >
                Release
              </button>
            </React.Fragment>
          ))}
        </div>
      </>
    )
  }

  const getPokemons = async () => {
    try {
      setIsLoadingPokemons(true);
      const result = await fetch(`${API_URL}pokemon`).then((res) => res.json());
      const { results } = result;
      setPokemons(results);
    } finally {
      setIsLoadingPokemons(false)
    }
  }

  useEffect(() => {
    const { query } = router;
    if(query.tab !== activeTab){
      router.push(`/home?tab=${activeTab}`, undefined, { shallow: true });
    }
  }, [activeTab]);

  const handleOnChangeTab = (newTab: any) => {
    setActiveTab(newTab.route);
  }

  return (
    <>
      <Tabs 
        tabs={tabs} 
        activeTab={activeTab}
        onChange={handleOnChangeTab}
      />
      
      {
        isLoadingPokemons &&
        <Loader />
      }
      
      {
        (activeTab === 'allPokemons' && !isLoadingPokemons) &&
        renderAllPokemons()
      }
      {
        (activeTab === 'my-pokemons' && !isLoadingPokemons) &&
        renderMyPokemons()
      }
    </>
  )
}


export default Home;