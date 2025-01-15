import { useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { Input, Button, Loading } from 'react-daisyui'
import toast, { Toaster } from 'react-hot-toast'

const CreateCategory = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    })

    const [toastDisplayed, setToastDisplayed] = useState(false)

    const submit = (e) => {
        e.preventDefault()
        post('/store/category')
    }

    const { flash } = usePage<{ flash: { message?: string } }>().props
    const messageType = flash.message ? 'success' : 'error'

    useEffect(() => {
        if (flash.message && !toastDisplayed) {
            if(messageType !== 'error'){
                toast.success(flash.message)
            } else {
                toast.error(flash.message)
            }
            setToastDisplayed(true)
            reset()
        }
    }, [flash.message, reset, toastDisplayed])

    return (
        <div>
            <Toaster />
            <h1 className="text-center text-2xl font-bold py-5">Add Category</h1>
            <form onSubmit={submit}>
                <div className="flex space-y-2 flex-col">
                    <div className="form-control w-full max-w-md">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <Input
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && <div className="text-red-500">{errors.name}</div>}
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
            </form>
        </div>
    );
}

export default CreateCategory
