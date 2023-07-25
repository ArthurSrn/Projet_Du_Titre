import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

import usePost from "@/hooks/usePost";

import Header from "@/components/Header";
import Form from "@/components/Form";
import PostItem from "@/components/posts/PostItem";
import CommentFeed from "@/components/posts/CommentFeed";
import Link from "next/link";
import Image from "next/image";
import Formcomment from "@/components/Formcomment";



const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    )
  }

  return ( 
    <>
    <div className="md:mx-28">
      <Header showBackArrow label="Commentaires de l'annonce" />
      <div className="flex flex-row flex-wrap justify-center gap-4 mt-4"><PostItem data={fetchedPost} /></div>
      
      <Formcomment postId={postId as string} isComment placeholder="Ajouter un commentaire" />
      <div className="pb-28">
      <CommentFeed comments={fetchedPost?.comments} />
      </div>
    </div>

    <footer className="bg-[#2caa5b] pt-8 pb-8 lg:px-20 mt-[50px] w-[100%]">
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
 
export default PostView;