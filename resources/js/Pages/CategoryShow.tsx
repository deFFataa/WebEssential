import React from 'react'
import FormInput from '../components/FormInput'
import Category from '../components/Category'
import { Link, usePage } from '@inertiajs/react'
import Home from './Home'
import Card from '../components/Card'
import { Table } from 'react-daisyui'

const CategoryShow = ({ categories, posts }) => {
  const { url } = usePage();

  return (
    <div>
      <Home categories={categories}>
        {posts.length === 0 && 'There are no posts in this category.'}
        {posts.length > 0 &&
          <div className='flex flex-wrap gap-7'>
            {posts.map((post) => (
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
      </Home>
    </div>
  )
}

export default CategoryShow