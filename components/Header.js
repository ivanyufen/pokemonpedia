import { useRouter } from 'next/router'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image'

export default function Header(){
  const router = useRouter();

  return (
    <div className='flex justify-center items-center bg-green-600 p-2 sticky top-0 z-20'>
      {router.pathname === '/detail' && 
        <FontAwesomeIcon onClick={() => router.back()} icon={faArrowLeft} color='white' className='absolute left-5 cursor-pointer' /> 
      }
      <Image 
      alt='https://assets.tokopedia.net/assets-tokopedia-lite/v2/arael/kratos/36c1015e.png' 
      src='https://assets.tokopedia.net/assets-tokopedia-lite/v2/arael/kratos/36c1015e.png'
      style={{ width: 25, height: 'auto', marginRight: 10 }}
      width={25}
      height={25}
      />
      <span onClick={() => router.push('/')} className='text-white cursor-pointer'>Pokepedia</span>
    </div>
  )
}