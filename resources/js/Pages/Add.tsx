import React from 'react'
import { Input, Textarea, FileInput, Button } from 'react-daisyui'
import { useForm } from '@inertiajs/react'

const Add = () => {

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        avatar: null as File | null
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/store')
    }

    return (
        <div>
            <h1 className="text-center text-2xl font-bold py-5">Add Post</h1>
            <form className='' onSubmit={handleSubmit}>
                <div className="flex space-y-2 flex-col">
                    <div className="form-control w-full max-w-md">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <Input
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
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
                </div>
                <Button className='px-10 mt-5' color='primary' type="submit" disabled={processing}>
                    {processing ? 'Processing...' : 'Add'}
                </Button>
            </form>
        </div>
    )
}

export default Add