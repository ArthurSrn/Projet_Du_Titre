
import axios from 'axios';
import { ChangeEvent, useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';

import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import usePosts from '@/hooks/usePosts';



import Avatar from './Avatar';
import Button from './Button';
import usePost from '@/hooks/usePost';

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Formcomment: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
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
      // Vous pouvez également traiter le fichier ici si nécessaire.
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
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
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
                rounded-lg
                bg-[#cfe8cfcc] 
                ring-0 
                outline-none 
                text-[20px] 
                placeholder-neutral-500 
                text-white
              "
              placeholder="Ajouter un commentaire"
            />
            <p className="text-sm flex justify-end text-neutral-500">{MAX_CHARACTERS - body.length} <span className='hidden md:block'>caractères restants</span></p>
            
            
            
            <div className="mt-4 flex flex-row justify-end">
              <Button disabled={isLoading || !body } onClick={onSubmit} label="Poster l'annonce" />
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
  );
};

export default Formcomment;



