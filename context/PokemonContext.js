import { createContext, useState } from 'react';

const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
  let ownedPokemons = [];
  if (typeof window !== "undefined") {
    const ownedPokemonsLocals = localStorage.getItem('ownedPokemons');
    if(ownedPokemonsLocals){
      ownedPokemons = JSON.parse(ownedPokemonsLocals);
    }
  }

  const [myPokemons, setMyPokemons] = useState(ownedPokemons || []);

  const addOwnedPokemons = (newPokemon) => {
    let tempOwnedPokemons = [...myPokemons];
    if(tempOwnedPokemons.findIndex(item => item.nickname === newPokemon.nickname) > -1){
      return {
        success: false,
        reason: `Nickname ${newPokemon.nickname} already exist!`
      }
    } else {
      tempOwnedPokemons = [...tempOwnedPokemons, newPokemon];
      setMyPokemons(tempOwnedPokemons);
      localStorage.setItem('ownedPokemons', JSON.stringify(tempOwnedPokemons));
      return {
        success: true
      }
    }
  }

  const releaseOwnedPokemons = (pokemon) => {
    let tempOwnedPokemons = [...myPokemons];
    const indexToRemove = tempOwnedPokemons.findIndex(item => item.nickname == pokemon.nickname);
    tempOwnedPokemons.splice(indexToRemove, 1);
    setMyPokemons(tempOwnedPokemons);
    localStorage.setItem('ownedPokemons', JSON.stringify(tempOwnedPokemons));
  }

  return (
    <PokemonContext.Provider value={{
        myPokemons,
        addOwnedPokemons,
        releaseOwnedPokemons
      }}
    >
      {children}
      </PokemonContext.Provider>
  )
}

export {
  PokemonProvider,
  PokemonContext
}