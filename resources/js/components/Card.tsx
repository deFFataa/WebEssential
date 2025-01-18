import React from 'react'
import { Link } from 'react-daisyui'

interface Props {
    image?: string,
    title: string,
    details: string
    href?: string
}

const Card = ({ image = '/assets/defaultbg.svg', title, details, href }: Props) => {
    const truncateText = (text: string, maxLength: number) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...'
        }
        return text
    }

    return (
        <div>
            <Link 
                target="_blank"
                href={href}
                className='flex gap-4 w-[303px] h-full p-3 rounded-lg backdrop-blur-sm shadow-md outline outline-1 outline-white/[25%] hover:scale-[1.02] ease-in duration-100 no-underline hover:no-underline max-sm:w-full'
            >
                <div className="stack p-3">
                    <div className="text-secondary-content grid h-16 w-16 place-content-center rounded rotate-45 bg-white">
                        <img src={image} alt="" className='p-3' />
                    </div>
                    <div className="bg-white/20 text-primary-content grid h-16 w-16 place-content-center rounded" style={{ transform: `rotate(-45deg)` }}></div>
                </div>
                <div>
                    <h2 className='font-bold text-lg no-underline hover:no-underline'>{title}</h2>
                    <p className='no-underline hover:no-underline'>{truncateText(details, 40)}</p>
                </div>
            </Link>
        </div>
    )
}

export default Card