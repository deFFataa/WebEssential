import React from 'react'
import { Link, usePage } from '@inertiajs/react'

interface Props {
    children: string,
    href: string
}


const Category = ({ children, href }: Props) => {

    const url = usePage().url

    return (
        <div className={`ease-in duration-100 hover:bg-white/10 rounded-lg px-4 py-2 ${url === href ? 'bg-white/10' : ''}`}>
            <Link href={href} >
                {children}
            </Link>
        </div>

    )
}

export default Category