import Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import useUser from "@/hooks/useUser";
import Link from "next/link";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";
import Image from "next/image";

const UserView = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: fetchedUser, isLoading } = useUser(userId as string);

  
  if (isLoading || !fetchedUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    )
  }
  
  return (
    <>
      
      <Header showBackArrow label={fetchedUser?.name} />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
    <div className="flex flex-col">
    <div className="bg-[#2caa5b]">
    <h3 className="text-xl font-semibold ml-4 mt-4 mb-10 text-white">Mes annonces :</h3>
    </div>
    <div className="flex flex-row flex-wrap justify-center lg:justify-start gap-4 mt-4 mb-32 md:ml-8">
      
      <PostFeed userId={userId as string}/>
    </div>
    </div>
    <footer className="bg-[#2caa5b] pt-8 pb-8 lg:px-20 mt-[50px]  w-[100%]">
        <div className="max-w-7xl  px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl"> 
          <div className='flex flex-row items-center'>
            <Image
              src="/capotage_logo.png"
              alt="Comback Logo"
              className="w-1/4 md:w-auto  mb-2 rounded-[50px]"
              width="100"
              height="100"
            />
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
              <div>
                
              </div>
              <div>
                
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
   );
}
 
export default UserView;