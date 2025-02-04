import { useForm, usePage, Link } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { Input, Button, Loading, Table, Modal } from 'react-daisyui'
import toast, { Toaster } from 'react-hot-toast'

type Props = {
    category: { id: number, name: string }
}

const EditCategory = ({ category }: Props) => {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: category.name,
    })

    const [toastDisplayed, setToastDisplayed] = useState(false)

    const submit = (e) => {
        e.preventDefault()
        put('/category/' + category.id + '/update', {
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
        }
    }, [flash.message, messageType, toastDisplayed])

    const [visible, setVisible] = useState<boolean>(false);
    const toggleVisible = () => {
        setVisible(!visible);
    };

    return (
        <div>
            <Toaster />
            <h1 className="text-center text-2xl font-bold py-5">Edit Category</h1>
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
                        Updating... <Loading size="xs" variant="spinner" />
                    </div>
                ) : (
                    <div className='flex gap-4 justify-end max-w-md'>
                        <div className='flex gap-4 '>
                            <Link className="px-10 mt-5 grid items-center hover:bg-white/20 rounded-md ease-in duration-100" href="/create-category">Cancel</Link>
                            <Button className="px-10 mt-5" color="primary" type="submit">
                                Update
                            </Button>
                        </div>
                    </div>
                )}
            </form>
            <div className='absolute top-[262px] text-end'>
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
                        <Link className="px-4 py-3 bg-red-500 text-white grid items-center hover:bg-red-600 rounded-md ease-in duration-100" method='delete' href={`/category/${category.id}/delete`}>Yes, I'm Sure.</Link>
                    </Modal.Actions>
                </Modal.Legacy>
            </div>
        </div>
    );
}

export default EditCategory
