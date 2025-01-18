import React, { useEffect, useState } from 'react'
import { usePage } from '@inertiajs/react'
import FormInput from '../components/FormInput'
import Category from '../components/Category'
import Card from '../components/Card'

interface Props {
    children?: React.ReactNode
    categories: { id: number, name: string }[],
    posts?: any[]
}

const Home = ({ categories, children, posts }: Props) => {
    const { url } = usePage()
    const isHomePage = url === '/'

    const [categoryName, setCategoryName] = useState(categories)
    const [searchVal, setSearchVal] = useState('')
    const [isSearchActive, setIsSearchActive] = useState(false)

    const currentCategoryId = url.split('/').pop()
    const activeCategory = isHomePage
        ? 'All'
        : categories.find((cat) => cat.id.toString() === currentCategoryId)?.name || 'Unknown Category'

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
            setCategoryName([{ id: 0, name: 'No results found' }])
            return
        }

        setCategoryName(filterBySearch)
    }, [searchVal, categories])

    const category_list = categoryName.map((category) => {
        if (category.id === 0 && category.name === 'No results found') {
            return (
                <div key={category.id} className="text-gray-500">
                    {category.name}
                </div>
            )
        }
        return (
            <Category key={category.id} href={`/category/${category.id}`}>
                {category.name}
            </Category>
        )
    })

    return (
        <div className="w-full">
            <div className="max-w-[300px] absolute p-5 backdrop-blur-lg shadow-lg bg-white/5 mt-5 outline-1 outline outline-white/[25%] rounded-lg max-sm:hidden">
                <div className="grid grid-rows-1 grid-cols-1 gap-2">
                    <h1 className='font-bold text-lg'>Categories</h1>
                    <FormInput
                        onChange={(e) => setSearchVal(e.target.value)}
                    />
                    {!isSearchActive && <Category href="/">All</Category>}
                    {category_list}
                </div>
            </div>
            <div className="max-sm:block md:absolute left-[415px] h-auto w-full max-w-[1005px] p-5 backdrop-blur-lg shadow-lg bg-white/5 mt-5 outline-1 outline outline-white/[25%] rounded-lg">
                <h1 className="text-2xl font-bold mb-5">{activeCategory}</h1>
                <div className="flex flex-wrap gap-7 h-auto max-sm:flex-col">
                    {isHomePage &&
                        posts &&
                        posts.map((post) => (
                            <Card
                                key={post.id}
                                image={
                                    post.avatar == null
                                        ? '/assets/defaultbg.svg'
                                        : `/storage/${post.avatar}`
                                }
                                title={post.title}
                                details={post.content}
                                href={post.link}
                            />
                        ))}
                </div>
                {children}
            </div>
        </div>
    )
}

export default Home
