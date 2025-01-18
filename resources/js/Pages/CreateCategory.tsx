import { useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { Input, Button, Loading, Table, Link } from 'react-daisyui'
import toast, { Toaster } from 'react-hot-toast'
import { MdEdit } from "react-icons/md"

type Props = {
    categories: { id: number, name: string }[]
}

const CreateCategory = ({ categories} : Props) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    })

    const [toastDisplayed, setToastDisplayed] = useState(false)

    const submit = (e) => {
        e.preventDefault()
        post('/store/category', {
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
            reset()
        }
    }, [flash.message, messageType, toastDisplayed])


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
            <div className="overflow-x-auto mt-5">
                <h1 className='font-bold text-lg my-3'>All Category</h1>
                <Table className='bg-white/10 backdrop-blur-lg'>
                    <Table.Head>
                        <span>No.</span>
                        <span>Name</span>
                        <span>Action</span>
                    </Table.Head>

                    <Table.Body>
                        {categories.map((category, index) => (
                            <Table.Row key={category.id} className='hover:bg-base-100/15 ease-in duration-50'>
                                <span>{index + 1}</span>
                                <span>{category.name}</span>
                                <span className='text-center'>
                                    <Link href={`/category/${category.id}/edit`}>
                                        <MdEdit size={30} className="hover:bg-white/20 hover:underline p-1 rounded-full" />
                                    </Link>
                                </span>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
}

export default CreateCategory
