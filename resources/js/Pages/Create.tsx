import React, { useEffect, useState } from 'react'
import { Input, Textarea, FileInput, Button, Select, Loading } from 'react-daisyui'
import { useForm, usePage } from '@inertiajs/react'
import toast, { Toaster } from 'react-hot-toast'

interface Props {
    category: []
}

const Create = ({ category }: Props) => {

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        content: '',
        avatar: null as File | null,
        link: '',
        category: '',
    })

    const submit = (e) => {
        e.preventDefault()
        post('/store/post')
    }

    const [toastDisplayed, setToastDisplayed] = useState(false)

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
            reset()
        }
    }, [flash.message, reset, toastDisplayed])

    const options = category.map((category: any) => {
        return (
            <option key={category.id} value={category.id}>{category.name}</option>
        )
    })

    return (
        <div>
            <Toaster />
            <h1 className="text-center text-2xl font-bold py-5">Add Post</h1>
            <form className='' onSubmit={submit}>
                <div className="flex space-y-2 flex-col">
                    <div className="form-control w-full max-w-md">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <Select className={errors.category && 'border-red-500'}>
                            <option value="">Select a category</option>
                            {options}
                        </Select>
                        {errors.category && <div className="text-red-500">{errors.category}</div>}
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
                    <div className='form-control w-full max-w-md'>
                        <label className="label">
                            <span className="label-text">Avatar</span>
                        </label>
                        <FileInput
                            onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    setData('avatar', e.target.files[0])
                                }
                            }}
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
                {processing ? (
                    <div className="mt-5">
                        Adding... <Loading size="xs" variant="spinner" />
                    </div>
                ) : (
                    <Button className="px-10 mt-5" color="primary" type="submit">
                        Add
                    </Button>
                )}
            </form >
        </div >
    )
}

export default Create