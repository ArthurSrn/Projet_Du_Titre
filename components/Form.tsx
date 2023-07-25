

import axios from 'axios';
import { ChangeEvent, useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';

import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import usePosts from '@/hooks/usePosts';
import Image from 'next/image';



import Avatar from './Avatar';
import Button from './Button';
import usePost from '@/hooks/usePost';

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string)

  const [body, setBody] = useState('');
  const [ImageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const MAX_CHARACTERS = 100;
  

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageUrl(file.name);
      
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = event.target.value;
    if (inputText.length <= MAX_CHARACTERS) {
      setBody(inputText);
    }
  };

  const onSubmit = useCallback(async () => {
    try {
      // alert(ImageUrl)
      setIsLoading(true);

      const url = isComment ? `/api/comments?postId=${postId}` : '/api/posts';

      await axios.post(url, { body, ImageUrl });


      toast.success('Annonce ajoutée !');
      setBody('');
      setImageUrl('');
      mutatePosts();
      mutatePost();
  
    } catch (error) {
      toast.error("Une erreur s'est produite. Veuillez réessayer");
    } finally {
      setIsLoading(false);
    }
  }, [body, ImageUrl, mutatePosts, isComment, postId, mutatePost]);

  return (
    <div className='flex flex-col'>
    <div className="border-b-[1px] border-green-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row">
          <div className='m-2'>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
          <textarea
              disabled={isLoading}
              onChange={(event) => setBody(event.target.value)}
              value={body}
              maxLength={MAX_CHARACTERS}
              className="
                disabled:opacity-80
                peer
                resize-none 
                mt-3 
                w-full
                md:w-[80%]
                rounded-lg
                bg-[#cfe8cfcc] 
                ring-0 
                outline-none 
                text-[20px] 
                placeholder-neutral-500 
                text-black
              "
              placeholder="Déscription de l'annonce"
            />
            <div className='relative'>
            <p className="text-sm flex justify-start text-neutral-500 absolute right-[5%] md:right-[20%]">{MAX_CHARACTERS - body.length} <span className='hidden md:block'> caractères restants</span></p>
            </div>
            <div className='mt-4 mb-4'>
            <input
              disabled={isLoading}
              onChange={handleFileChange}
              type="file"
              placeholder="Image URL"
              className="hidden"
              id="fileInput"
            />
            <label
            htmlFor="fileInput"
            className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer"
            >
              Ajouter une image
            </label>
            </div>
            

            <div className='flex-row flex justify-center'>
              <Image
              src="/images/jardin_famille.png"
              alt="Image formulaire"
              className=" hidden md:block w-[25%] h-auto"
              width="256"
              height="256"
            />
            </div>
            
            
            <div className="mt-4 flex flex-row justify-end">
              <Button disabled={isLoading || !body || !ImageUrl} onClick={onSubmit} label="Poster l'annonce" />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-black text-2xl text-center mb-4 font-bold">Rejoindre la communauté !</h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Connection" onClick={loginModal.onOpen} />
            <Button label="Inscription" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
  </div>
  </div>
  );
};

export default Form;



// const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
//   const registerModal = useRegisterModal();
//   const loginModal = useLoginModal();

//   const { data: currentUser } = useCurrentUser();
//   const { mutate: mutatePosts } = usePosts();
//   const { mutate: mutatePost } = usePost(postId as string)


//   const [body, setBody] = useState('');
//   const [imageUrl, setImageUrl] = useState('')
//   const [isLoading, setIsLoading] = useState(false);

//   const onSubmit = useCallback(async () => {
//     try {
//       setIsLoading(true);

//       const url = isComment ? `/api/comments?postId=${postId}` : '/api/posts';

//       await axios.post(url, { body });

//       toast.success('Annonce ajouté !');
//       setBody('');
//       mutatePosts();
//       mutatePost();
  
//     } catch (error) {
//       toast.error("Une erreur s'est produite. Veuillez réessayer");

//     } finally {
//       setIsLoading(false);
//     }
//   }, [body, mutatePosts, isComment, postId, mutatePost]);

//   return (
//     <div className="border-b-[1px] border-neutral-800 px-5 py-2">
//       {currentUser ? (
//         <div className="flex flex-row gap-4">
//           <div>
//             <Avatar userId={currentUser?.id} />
//           </div>
//           <div className="w-full">
//             <textarea
//               disabled={isLoading}
//               onChange={(event) => setBody(event.target.value)}
//               value={body}
//               className="
//                 disabled:opacity-80
//                 peer
//                 resize-none 
//                 mt-3 
//                 w-full 
//                 bg-black 
//                 ring-0 
//                 outline-none 
//                 text-[20px] 
//                 placeholder-neutral-500 
//                 text-white
//               "
//               placeholder={placeholder}>
//             </textarea>

//             <input type="file" name='image' />
          
//             <div className="mt-4 flex flex-row justify-end">
//               <Button disabled={isLoading || !body} onClick={onSubmit} label="Poster l'annonce" />
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="py-8">
//           <h1 className="text-black text-2xl text-center mb-4 font-bold">Rejoindre la communauté !</h1>
//           <div className="flex flex-row items-center justify-center gap-4">
//             <Button label="Connection" onClick={loginModal.onOpen} />
//             <Button label="Inscription" onClick={registerModal.onOpen} secondary />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Form;


// import axios from 'axios';
// import { useCallback, useState } from 'react';
// import { toast } from 'react-hot-toast';

// import useLoginModal from '@/hooks/useLoginModal';
// import useRegisterModal from '@/hooks/useRegisterModal';
// import useCurrentUser from '@/hooks/useCurrentUser';
// import usePosts from '@/hooks/usePosts';

// import Avatar from './Avatar';
// import Button from './Button';
// import usePost from '@/hooks/usePost';

// interface FormProps {
//   placeholder: string;
//   isComment?: boolean;
//   postId?: string;
// }