import Form from '@/components/Form'
import Header from '@/components/Header'
import FollowBar from '@/components/layout/FollowBar'
import PostFeed from '@/components/posts/PostFeed'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <> 

    <div className='bg-[#2caa5b]  m-12 flex flex-col pl-12 px-12 rounded-lg lg:rounded-t-[40%]'>
     <div> 
     <h2 className=' text-white text-4xl text-center pt-10'>Ça potage !</h2>
    <p className='text-white text-3xl lg:px-28 text-center pt-14 pb-10'> Bienvenue sur la plateforme communautaire de potager et vente locale de produits frais, <span className='inline-flex animate-text-gradient bg-gradient-to-r from-[#cff3d3] via-[#fefffe] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-3xl text-transparent'> rassemblant des passionnés </span> de jardinage pour faciliter les échanges.</p>
  
    </div>
    <div className='flex flex-row justify-between '>
    
    
    <Image
              src="/images/legumes.png"
              alt="Comback Logo"
              className="lg:w-[8%] w-[25%] h-auto"
              width="512"
              height="512"
            />

    <Image
              src="/images/carottes.png"
              alt="Comback Logo"
              className="lg:w-[8%] w-[25%] h-auto"
              width="512"
              height="512"
            />

    
    </div>
    </div>
    <div className='flex flex-row justify-center'>
      <div>
      <Header label="Home" />
      <h3 className='text-xl font-semibold ml-4 mt-4 mb-6'>Ajouter une annonce</h3>
      <Form placeholder="Ajouter votre annonce" />
      <div className='flex  flex-col'>
        <h3 className='text-xl font-semibold ml-4 mt-4 mb-10'>Voir les annonces</h3>
        <div className='flex flex-row flex-wrap justify-center lg:justify-start gap-4 mt-4 md:ml-8 '><PostFeed /></div>
      </div>
      </div>
      {/* rajouter par la suite ne pas oublier l'import */}
      <div className='flex justify-start'><FollowBar /></div>
    </div>
    
    <footer className="bg-[#2caa5b] pt-8 pb-8 xl:pb-24 lg:px-20 mt-[50px] lg:relative lg:bottom-[-220px] w-[100%]">
        <div className="max-w-7xl  px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl"> 
          <div className='flex flex-row items-center'>
            <span className='text-3xl text-white'>Ça potage</span>
            </div>
            <p className="text-white text-lg mb-8 font-sans">
            Plateforme communautaire de potager et vente locale de produits frais, rassemblant des passionnés de jardinage pour faciliter les échanges, les conseils et la vente de récoltes à petite échelle.
            </p>
            <div className="flex flex-row justify-start items-center sm:items-start sm:flex-row gap-4">
              <div>
                <Link href={""}>
                  <p className='text-white flex justify-end'>Mentions légales</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
  
    

    </>
  )
}
