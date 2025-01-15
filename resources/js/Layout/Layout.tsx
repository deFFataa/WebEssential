import { Navbar, Dropdown, Button, Indicator, Badge } from 'react-daisyui'
import { Link } from '@inertiajs/react'
import React, { useEffect } from 'react'
import { FaFacebook, FaInstagram } from 'react-icons/fa'

export default function Layout({ children }) {

    const [isScroll, setIsScroll] = React.useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                setIsScroll(true)
            } else {
                setIsScroll(false)
            }
        })
    }, [])

    return (
        <main className="px-[120px]">
            <Navbar className={`${isScroll ? 'bg-base-100' : 'bg-white/5'} shadow-lg  mt-5 outline-1 outline outline-white/[25%] rounded-lg sticky top-5 z-[9999]`}>
                <Navbar.Start>
                    <Dropdown>
                        <Button tag="label" color="ghost" shape="circle" tabIndex={0}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </Button>
                        <Dropdown.Menu className="menu-sm w-52 mt-3 z-[1]">
                            <li>
                                <Link href="/">Homepage</Link>
                            </li>
                            <li>
                                <a href="https://isaac-balabbo-portfolio.netlify.app/" target="_blank">Portfolio</a>
                            </li>
                            <li>
                                <Link href="/about">About</Link>
                            </li>
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Start>
                <Navbar.Center>
                    <h1 className="text-lg font-bold">Web Essentials</h1>
                </Navbar.Center>
                <Navbar.End className="navbar-end">
                    <Button tag='a' color='ghost' shape='circle'>
                        <FaFacebook size={20} />
                    </Button>
                    <Button tag='a' color='ghost' shape='circle'>
                        <FaInstagram size={20} />
                    </Button>
                </Navbar.End>
            </Navbar>


            {children}
        </main>
    )
}