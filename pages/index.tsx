import home from './home'

export async function getServerSideProps(){
  return {
    redirect: {
      destination: '/home?tab=allPokemons',
      permanent: true,
    }
  }
}
const App = () => {
  return <></>
}

export default App;