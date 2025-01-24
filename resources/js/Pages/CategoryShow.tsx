import React, { use } from 'react'
import FormInput from '../components/FormInput'
import Category from '../components/Category'
import { Link, usePage } from '@inertiajs/react'
import Home from './Home'
import Card from '../components/Card'
import { Table } from 'react-daisyui'

const CategoryShow = ({ categories, posts }) => {

  const url = usePage().url

  console.log(posts)

  return (
    <div>
      <Home categories={categories}>
        {posts.data.length === 0 && 'There are no posts in this category.'}
        {posts.data.length > 0 &&
          <div className='grid grid-cols-3 grid-rows-auto max-lg:grid-cols-1 gap-5'>
            {posts.data.map((post) => (
              <Card
                key={post.id}
                image={post.avatar == null ? '/assets/defaultbg.svg' : `/storage/${post.avatar}`}
                title={post.title}
                details={post.content}
                href={post.link}
              />
            ))}
          </div>
        }
        {posts.last_page > 1 &&
          <div className="mt-auto flex justify-end">
            <div className='flex gap-1'>
              {posts.links.map((link) => (
                link.url ?

                  <Link
                    key={link.label}
                    href={link.url}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`ease-in duration-100 hover:bg-white/10 rounded-lg px-4 py-2 ${link.active ? 'bg-white/10' : ''
                      }`}

                  />
                  :
                  <span
                    key={link.label}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className="ease-in duration-100 rounded-lg px-4 py-2 text-gray-600"
                  />
              ))}
            </div>
          </div>
        }
      </Home>
    </div>
  )
}

export default CategoryShow