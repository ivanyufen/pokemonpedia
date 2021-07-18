import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faMeteor } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { PokemonContext } from 'context/PokemonContext';
import Image from 'next/image'
import Modal from 'components/Modal';

const API_URL = 'https://pokeapi.co/api/v2/';

export async function getServerSideProps(ctx: any){
  const pokemonName = ctx?.query?.name;

  if(!pokemonName){
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }

  const result = await fetch(`${API_URL}pokemon/${pokemonName}`).then((res) => {
    if(res.status != 404){
      return res.json();
    } else {
      return 'Not Found';
    }
  });

  return {
    props: {
      pokemonDetail: result
    }
  }
}

const Detail = (props: any) => {
  const { addOwnedPokemons } = useContext(PokemonContext);
  const { pokemonDetail } = props;
  const [modalShown, setModalShown] = useState(false);
  const [nickname, setNickname] = useState('');
  const [catched, setCatched] = useState(true);

  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  const savePokemon = () => {
    if(nickname.trim() === ''){
      alert('Nickname must be filled!');
      return;
    }

    const payload = {
      ...pokemonDetail,
      nickname
    }

    const result = addOwnedPokemons(payload);
    const { success, reason } = result;

    if(success){
      setModalShown(false);
      setNickname('');
      alert('Pokemon saved!');
    } else {
      alert(reason);
    }
    return;
  }

  const handleCatch = () => {
    //probability 50%
    const catched = Math.random() < 0.5;
    if(catched){
      setCatched(true);
      setModalShown(true);
    } else {
      setCatched(false);
      setModalShown(true);
    }
  }

  if(pokemonDetail === 'Not Found'){
    return <div className='h-screen text-center p-10'>Pokemon not found</div>
  }

  return (
    <div className='h-auto text-center p-10'>
      <div>
        <h1 className='text-xl'>Hi, my name is {capitalizeFirstLetter(pokemonDetail.name)}!</h1>
        <div className='cursor-pointer text-blue-500' onClick={handleCatch}>Click here to Catch</div>
      </div>
      <Image
        width={100}
        height={100}
        className='w-40 h-40 bg-green-600 rounded-full p-5 m-auto my-5'
        src={pokemonDetail.sprites.front_default}
        alt={pokemonDetail.sprites.front_default}
      />
      <div className='text-left'>
        <h2 className='mb-5'>About me: </h2>
        
        <div className='text-xs flex flex-row'>
          <div className='mr-5'>
            <div className='mb-3'>
              <FontAwesomeIcon icon={faLeaf} style={{ marginRight: 10 }}/> 
              TYPE: 
            </div>
            <div>
              <FontAwesomeIcon icon={faMeteor} style={{ marginRight: 10 }}/> 
              MOVES: 
            </div>
          </div>
         
          <div>
            <div className='mb-3'>
              {pokemonDetail.types.map((poke: any) => poke.type.name).join(', ')}
            </div>
            <div>
            <ul>
              {pokemonDetail.moves.slice(0, 20).map((poke: any) => <li key={poke.move.name}>{poke.move.name}</li>)}
            </ul>
            </div>
          </div>

          { modalShown && 
            <Modal title={catched ? 'Catched!' : 'Whoops!'} visible={modalShown}>
              <div className="relative p-6 flex-auto">
                <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                  { catched ? `Give him a new nickname` : `${pokemonDetail.name} just run away!`}
                  {catched && <input value={nickname} onChange={(e) => setNickname(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nickname" type="text" placeholder="Nickname" />}
                </p>
              </div>
              
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                {
                  catched ? 
                  <div>
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setModalShown(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-green-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => savePokemon()}
                    >
                      Save
                    </button>
                  </div>
                  :
                  <div>
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setModalShown(false)}
                    >
                      Close
                    </button>
                  </div>
                }
              </div>
            </Modal>
          }
        </div>
      </div>
    </div>
  )
}


export default Detail;