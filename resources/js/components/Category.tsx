import React from 'react';
import { Link, usePage } from '@inertiajs/react';

interface Props {
    children: React.ReactNode;
    href: string;
}

const Category = ({ children, href }: Props) => {
    const url = usePage().url;

    // Extract base paths (ignore query parameters)
    const isActive = url.split('?')[0] === href;

    return (
        <Link
            href={href}
            as="a"
            target="_blank"
            className={`ease-in duration-100 hover:bg-white/10 rounded-lg px-4 py-2 ${
                isActive ? 'bg-white/10' : ''
            }`}
        >
            {children}
        </Link>
    );
};

export default Category;
