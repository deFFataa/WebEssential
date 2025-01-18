import React, { useEffect, useState } from 'react'
import { Input, Textarea, FileInput, Button, Select, Loading, Table } from 'react-daisyui'
import { useForm, usePage, Link } from '@inertiajs/react'
import toast, { Toaster } from 'react-hot-toast'
import { MdEdit } from "react-icons/md"

interface Props {
    categories: [],
    posts: []
}

const Create = ({ categories, posts }: Props) => {

    console.log(posts)

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        content: '',
        avatar: null as File | null,
        link: '',
        categories: '',
    })

    const [toastDisplayed, setToastDisplayed] = useState(false)

    const submit = (e) => {
        e.preventDefault()
        post('/store/post', {
            onSuccess: () => {
                setToastDisplayed(false)
            },
            onError: () => {
                setToastDisplayed(false)
            }
        })

    }


    const { flash } = usePage<{ flash: { message?: string } }>().props
    const messageType = flash.message ? 'success' : 'error'

    useEffect(() => {
        if (flash.message && !toastDisplayed) {
            if (messageType !== 'error') {
                toast.success(flash.message)
            } else {
                toast.error(flash.message)
            }
            setToastDisplayed(true)
            reset('avatar', 'title', 'content', 'link')
        }
    }, [flash.message, messageType, toastDisplayed])

    const [file, setFile] = useState<string | undefined>()

    const handleFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setData('avatar', e.target.files[0])
            setFile(URL.createObjectURL(e.target.files[0]))
        }
    }

    return (
        <div>
            <Toaster />
            <h1 className="text-center text-2xl font-bold py-5">Add Post</h1>
            <form className='' onSubmit={submit}>
                <div className="grid grid-cols-2 grid-rows-1 max-sm:grid-cols-1">
                    <div className="flex space-y-2 flex-col">
                        <div className="form-control w-full max-w-md">
                            <label className="label">
                                <span className="label-text">Category</span>
                            </label>
                            <Select
                                className={errors.categories && 'border-red-500'}
                                value={data.categories}
                                onChange={(e) => setData('categories', e.target.value)}
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat: any) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </Select>
                            {errors.categories && <div className="text-red-500">{errors.categories}</div>}
                        </div>
                        <div className="form-control w-full max-w-md">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <Input
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className={errors.title && 'border-red-500'}
                            />
                            {errors.title && <div className="text-red-500">{errors.title}</div>}
                        </div>
                        <div className="form-control w-full max-w-md">
                            <label className="label">
                                <span className="label-text">Details</span>
                            </label>
                            <Textarea
                                value={data.content}
                                size='md'
                                onChange={(e) => setData('content', e.target.value)}
                                className={errors.content && 'border-red-500'}
                            />
                            {errors.content && <div className="text-red-500">{errors.content}</div>}
                        </div>
                    </div>
                    <div className="flex space-y-2 flex-col">
                        <div className='form-control w-full max-w-md'>
                            {file && <img className='w-1/2' src={file} alt="" />}
                            <label className="label">
                                <span className="label-text">Avatar</span>
                            </label>
                            <FileInput
                                onChange={handleFile}
                            />
                            {errors.avatar && <div className="text-red-500">{errors.avatar}</div>}
                        </div>
                        <div className="form-control w-full max-w-md">
                            <label className="label">
                                <span className="label-text">Link</span>
                            </label>
                            <Input
                                value={data.link}
                                onChange={(e) => setData('link', e.target.value)}
                                className={errors.link && 'border-red-500'}
                            />
                            {errors.link && <div className="text-red-500">{errors.link}</div>}
                        </div>
                        <div className='self-end max-w-md w-full'>
                            {processing ? (
                                <div className="mt-5">
                                    Adding... <Loading size="xs" variant="spinner" />
                                </div>
                            ) : (
                                <div className='flex gap-4'>
                                    <Button tag='a' className="px-10 mt-5" href="/">Cancel</Button>
                                    <Button className="px-10 mt-5" color="primary" type="submit">
                                        Add
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </form >

            <div className="overflow-x-auto mt-5">
                <h1 className='font-bold text-lg my-3'>All Post</h1>
                <Table className='bg-white/10 backdrop-blur-lg'>
                    <Table.Head>
                        <span>No.</span>
                        <span>Name</span>
                        <span>Job</span>
                        <span>Action</span>
                    </Table.Head>

                    <Table.Body>
                        {posts.map((post: { id: number, title: string, category: { name: string } | null }, index) => (
                            <Table.Row key={post.id} className='hover:bg-base-100/15 ease-in duration-50'>
                                <span>{index + 1}</span>
                                <span>{post.title}</span>
                                <span>{post.category && post.category.name}</span>
                                <span className='text-center'>
                                    <Link href={`/posts/${post.id}`}>
                                        <MdEdit size={30} className="hover:bg-white/20 hover:underline p-1 rounded-full" />
                                    </Link>
                                </span>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>

            </div>
        </div >
    )
}

export default Create