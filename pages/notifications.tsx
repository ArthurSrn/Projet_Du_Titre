import Header from "@/components/Header";
import NotificationsFeed from "@/components/NotificationsFeed";
import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      session
    }
  }
}

const Notifications = () => {
  return ( 
    <>
    <div className=" md:mx-28">
      <Header showBackArrow label="Notifications" />
    <div className="pb-28"><NotificationsFeed /></div>
       
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
 
export default Notifications;