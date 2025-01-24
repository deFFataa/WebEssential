import React, { useEffect, useState } from 'react'
import { Input, Textarea, FileInput, Button, Select, Loading, Table, Divider, Modal } from 'react-daisyui'
import { useForm, usePage, Link, router } from '@inertiajs/react'
import toast, { Toaster } from 'react-hot-toast'
import { MdEdit } from "react-icons/md"

interface Props {
    categories: [{
        id: number,
        name: string
    }],
    post: {
        id: number,
        title: string,
        content: string,
        avatar: string,
        link: string,
        category_id: number,
        category: {
            name: string
        }
    }
}

const PostEdit = ({ categories, post }: Props) => {

    console.log(post)

    const { data, setData, put, processing, errors, reset } = useForm({
        title: post.title,
        content: post.content,
        avatar: post.avatar || null,
        link: post.link,
        categories: post.category_id,
    })

    const [toastDisplayed, setToastDisplayed] = useState(false)

    const submit = (e) => {
        e.preventDefault()
        router.post(`/posts/${post.id}/update`, {
            _method: 'put',
            forceFormData: true,
            avatar: data.avatar,
            title: data.title,
            content: data.content,
            link: data.link,
            categories: data.categories
        });
    }
    const [visible, setVisible] = useState<boolean>(false);
    const toggleVisible = () => {
        setVisible(!visible);
    };


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

    const [file, setFile] = useState<string | undefined>(post.avatar)

    const handleFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setData('avatar', e.target.files[0])
            setFile(URL.createObjectURL(e.target.files[0]))
        }
    }

    return (
        <div>
            <Toaster />
            <h1 className="text-center text-2xl font-bold py-5">Edit Post</h1>
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
                                onChange={(e) => setData('categories', Number(e.target.value))}
                            >
                                <option value={post.category_id} selected defaultValue={post.category_id} hidden>{post.category.name}</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
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
                            {file == post.avatar ? <img className='w-1/2' src={'/storage/' + file} alt="" /> :
                                <img className='w-1/2' src={file} alt="" />
                            }
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
                    </div>
                </div>
                <Divider />
                <div className="flex justify-end">
                    <div className=''>
                        {processing ? (
                            <div className="mt-5">
                                Updating... <Loading size="xs" variant="spinner" />
                            </div>
                        ) : (
                            <div className='flex gap-4'>
                                <Link className="px-10 mt-5 grid items-center hover:bg-white/20 rounded-md ease-in duration-100" href="/create-post">Cancel</Link>
                                <Button className="px-10 mt-5" color="primary" type="submit">
                                    Update
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </form >
            <div className=''>
                <Button color='ghost' onClick={toggleVisible} className='px-4 py-3 text-red-500 grid items-center hover:bg-white/20 hover:font-semibold rounded-md ease-in duration-100'>Delete</Button>
                <Modal.Legacy open={visible}>
                    <Modal.Header className="font-bold text-center">Delete Confirmation</Modal.Header>
                    <Modal.Body>
                        <div className='text-center'>
                            Data that are referenced to this category will also be deleted.
                        </div>
                    </Modal.Body>

                    <Modal.Actions>
                        <Button color='ghost' onClick={toggleVisible}>Close</Button>
                        <Link className="px-4 py-3 bg-red-500 text-white grid items-center hover:bg-red-600 rounded-md ease-in duration-100" method='delete' href={`/posts/${post.id}/delete`}>Yes, I'm Sure.</Link>
                    </Modal.Actions>
                </Modal.Legacy>
            </div>
        </div >
    )
}

export default PostEdit