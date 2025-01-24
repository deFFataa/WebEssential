import { Navbar, Dropdown, Button, Indicator, Badge } from 'react-daisyui'
import { Link, usePage } from '@inertiajs/react'
import React, { useState, useEffect } from 'react'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import FormInput from '../components/FormInput'
import Category from '../components/Category'

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

    const { categories } = usePage<{ categories: { id?: number, name: string }[] }>().props

    const [categoryName, setCategoryName] = useState(categories)
    const [searchVal, setSearchVal] = useState('')
    const [isSearchActive, setIsSearchActive] = useState(false)

    useEffect(() => {
        if (searchVal.trim() === '') {
            setCategoryName(categories)
            setIsSearchActive(false)
            return
        }

        setIsSearchActive(true)

        const filterBySearch = categories.filter((item) =>
            item.name.toLowerCase().includes(searchVal.toLowerCase())
        )

        if (filterBySearch.length === 0) {
            setCategoryName([{ name: 'No results found' }])
            return
        }

        setCategoryName(filterBySearch)
    }, [searchVal, categories])

    const category_list = categoryName.map((category) => {
        if (category.name === 'No results found') {
            return (
                <div key={category.id} className="text-gray-500 p-2">
                    {category.name}
                </div>
            )
        }
        return (
            <li key={category.id}>
                <Category href={`/category/${category.id}`}>
                    {category.name}
                </Category>
            </li>
        )
    })

    return (
        <main className="px-[114px] max-sm:px-[20px] relative">
            <Navbar className={`${isScroll ? 'backdrop-blur-lg bg-base-100/50' : 'bg-white/5'} shadow-lg  mt-5 outline-1 outline outline-white/[25%] rounded-lg sticky top-5 z-[9999] max-md:justify-between`}>
                <Navbar.Start className='max-sm:w-12'>
                    <Dropdown>
                        <Button tag="label" color="ghost" shape="circle" tabIndex={0}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </Button>
                        <Dropdown.Menu id='menu' className="menu-sm w-52 mt-3 z-[1] h-auto max-h-[200px] overflow-y-auto">
                            <div className="max-sm:hidden">
                                <li>
                                    <Link href="/">Homepage</Link>
                                </li>
                                <li>
                                    <a href="https://isaac-balabbo-portfolio.netlify.app/" target="_blank">Portfolio</a>
                                </li>
                            </div>
                            <div className="max-sm:block space-y-2 hidden">
                                <li>
                                    <Link href="/">Homepage</Link>
                                </li>
                                <li>
                                    <a href="https://isaac-balabbo-portfolio.netlify.app/" target="_blank">Portfolio</a>
                                </li>
                                <li>
                                    <label className="input input-sm input-bordered max-w-xs flex items-center gap-2">
                                        <input type="text" onChange={(e) => setSearchVal(e.target.value)} className="input-sminput input-bordered w-full max-w-xs" placeholder="Search" />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                            className="h-4 w-4 opacity-70">
                                            <path
                                                fillRule="evenodd"
                                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                                clipRule="evenodd" />
                                        </svg>
                                    </label>
                                </li>
                                <li>
                                    {!isSearchActive && <Category href="/">All</Category>}
                                </li>
                                {category_list}
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Start>
                <Navbar.Center>
                    <Link href='/' className="text-lg font-bold">Web Essentials</Link>
                </Navbar.Center>
                <Navbar.End className="navbar-end gap-0">
                    <Button tag='a' href='https://www.facebook.com/deFFataa/' target='_blank' color='ghost' shape='circle'>
                        <FaFacebook size={20} />
                    </Button>
                    <Button tag='a' href='https://www.instagram.com/iceac_/' target='_blank' color='ghost' shape='circle'>
                        <FaInstagram size={20} />
                    </Button>
                </Navbar.End>
            </Navbar>


            {children}
        </main>
    )
}