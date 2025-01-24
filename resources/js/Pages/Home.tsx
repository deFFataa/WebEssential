import React, { useEffect, useState } from 'react';
import { usePage, Link, Head } from '@inertiajs/react';
import FormInput from '../components/FormInput';
import Category from '../components/Category';
import Card from '../components/Card';

interface Props {
    children?: React.ReactNode;
    categories: any;
    posts?: any;
}

const Home = ({ categories, children, posts }: Props) => {
    const { url } = usePage();
    const isHomePage = /^\/(\?page=\d+)?$/.test(url);

    const currentCategoryId = url.match(/\/category\/(\d+)/)?.[1];
    const activeCategory = isHomePage
        ? 'All'
        : categories.find((cat) => cat.id.toString() === currentCategoryId)?.name || 'Unknown Category';

    const [categoryName, setCategoryName] = useState(categories);
    const [searchVal, setSearchVal] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);

    useEffect(() => {
        if (searchVal.trim() === '') {
            setCategoryName(categories);
            setIsSearchActive(false);
            return;
        }

        setIsSearchActive(true);

        const filterBySearch = categories.filter((item) =>
            item.name.toLowerCase().includes(searchVal.toLowerCase())
        );

        if (filterBySearch.length === 0) {
            setCategoryName([{ id: 0, name: 'No results found' }]);
            return;
        }

        setCategoryName(filterBySearch);
    }, [searchVal, categories]);

    const category_list = categoryName.map((category) => {
        if (category.id === 0 && category.name === 'No results found') {
            return (
                <div key={category.id} className="text-gray-500">
                    {category.name}
                </div>
            );
        }
        return (
            <Category key={category.id} href={`/category/${category.id}`}>
                {category.name}
            </Category>
        );
    });

    return (
        <>
            <Head title={activeCategory} />
            <div className="w-full grid grid-cols-[auto,1fr] max-md:grid-cols-1 gap-5 max-sm:gap-0">
                <div className="p-5 backdrop-blur-lg shadow-lg bg-white/5 mt-5 outline outline-1 outline-white/[25%] rounded-lg max-sm:hidden">
                    <div className="grid grid-rows-1 grid-cols-1 gap-2">
                        <h1 className="font-bold text-lg">Categories</h1>
                        <FormInput onChange={(e) => setSearchVal(e.target.value)} />
                        {!isSearchActive && <Category href="/">All</Category>}
                        {category_list}
                    </div>
                </div>

                <div className="p-5 backdrop-blur-lg shadow-lg bg-white/5 mt-5 outline outline-1 outline-white/[25%] rounded-lg flex flex-col h-full">
                    <h1 className="text-2xl font-bold mb-5">{activeCategory}</h1>

                    {isHomePage &&
                        <div className="grid grid-cols-3 grid-rows-auto max-lg:grid-cols-1 max-xl:grid-cols-2 gap-5">
                            {posts.data.map((post) => (
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
                            ))}</div>}

                    {isHomePage && (
                        <div className="flex gap-1 justify-end mt-auto">
                            {posts.links.map((link) =>
                                link.url ? (
                                    <Link
                                        key={link.label}
                                        href={link.url}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`ease-in duration-100 hover:bg-white/10 rounded-lg px-4 py-2 ${link.active ? 'bg-white/10' : ''
                                            }`}
                                    />
                                ) : (
                                    <span
                                        key={link.label}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className="ease-in duration-100 rounded-lg px-4 py-2 text-gray-600"
                                    />
                                )
                            )}
                        </div>
                    )}

                    {children}
                </div>
            </div>
        </>
    );
};

export default Home;
