import Image from "next/image";

import { useRouter } from "next/router";

const SidebarLogo = () => {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push('/')}
         >
            <Image
                src="/capotage_logo.png"
                width={100}
                height={100}
                alt="of the author"
            />
        </div>
    )
}

export default SidebarLogo