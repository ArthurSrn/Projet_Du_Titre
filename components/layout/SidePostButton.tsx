import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/router";
import { useCallback } from "react";

const SidePostButton = () => {  
    const router = useRouter();
    const loginModal = useLoginModal();

    const onClick = useCallback(() => {
        loginModal.onOpen()
    }, [loginModal])

    
    return (
        <div onClick={onClick}>
            <div className="bg-green-700 rounded-[100px] hidden lg:block">
                <p className="p-3 text-white">Poster une annonce</p>
            </div>
        </div>
    );
}

export default SidePostButton


