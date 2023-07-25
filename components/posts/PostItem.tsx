import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { AiFillHeart, AiOutlineComment, AiOutlineHeart,} from 'react-icons/ai';
import { formatDistanceToNowStrict } from 'date-fns';
import Image from 'next/image';

import useLoginModal from '@/hooks/useLoginModal';
import useCurrentUser from '@/hooks/useCurrentUser';


import Avatar from '../Avatar';
import useUpvote from '@/hooks/useUpVote';
import { BsFillShiftFill } from 'react-icons/bs';
interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data = {}, userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { hasLiked, toggleLike } = useUpvote({ postId: data.id, userId });

  const goToUser = useCallback((ev: any) => {
    ev.stopPropagation();
    router.push(`/users/${data.user.id}`)
  }, [router, data.user.id]);



  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);
 
  const onLike = useCallback(async (ev: any) => {
    ev.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    toggleLike();
  }, [loginModal,  currentUser, toggleLike]);

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt])

  return (
    <div
      onClick={goToPost} className="border-4  rounded-lg">
      <div className='flex flex-col  w-[250px] h-[345px]  pt-2 ml-2 mx-2'>
        <div className='flex flex-row pl-1 '>
          <div className='pb-2'>
      <Avatar userId={data.user.id} />
      </div>

      <div className="">
        <p
          onClick={goToUser}
          className="
                ml-2
                text-black 
                font-semibold 
                cursor-pointer 
                hover:underline
            ">
          {data.user.name}
        </p>
        <span
          onClick={goToUser}
          className="
                text-neutral-500
                cursor-pointer
                hover:underline
            ">
          @{data.user.username}
        </span>
        </div>
        </div>

      <div className='p-2 relative h-[150px] w-[250px]'>
        <Image
          // src="/capotage_logo.png"
          
          src={data.ImageUrl || '/capotage_logo.png'}
          alt="Logo"
          className=""
          fill
          style={{
          objectFit: 'cover',
          borderRadius: '5%',
          }}
          
        />

      </div>

        <span className="text-neutral-700 text-sm pl-2 flex justify-end">
          {createdAt}
        </span>

        <div className='bg-neutral-50 rounded-lg'>
        <div className="text-black">
          {data.body}
        </div>
        <div className='relative'>
          <div className="  flex mt-3 gap-6">
            <div
              className="
                flex 
                flex-row 
                items-center 
                text-neutral-800 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-green-700
            ">
              <AiOutlineComment size={20} />
              <p>
                {data.comments?.length || 0}
              </p>
            </div>
            <div>
            </div>
            <div
              onClick={onLike}
              className="
                flex 
                flex-row 
                items-center 
                text-neutral-800  
                gap-2 
                cursor-pointer 
                transition 
                hover:text-green-600
            ">
              <BsFillShiftFill color={hasLiked ? 'green' : ''} size={20} />
              <p>
                {data.likedIds.length}
              </p>
              </div>
              </div>
            </div>
          </div>
        
      </div>
    </div>
  )
}

export default PostItem;
