import Image from 'next/image';

export default function Background() {
    return (
        <div className="flex items-center justify-center w-full h-screen bg-white">
            <Image src='/background.png' alt="Background" 
                layout="fill" 
                objectFit="cover" 
                className="z-0" 
            />
        </div>
    );
}