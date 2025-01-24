import { useForm, usePage, Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { Input, Button, Loading, Table, Modal } from 'react-daisyui';
import toast, { Toaster } from 'react-hot-toast';
import { FaTrash, FaPen } from 'react-icons/fa';

type Props = {
    categories: { id: number, name: string }[];
};

const CreateCategory = ({ categories }: Props) => {
    const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
        name: '',
    });

    const [toastDisplayed, setToastDisplayed] = useState(false);
    const [visibleModalId, setVisibleModalId] = useState<number | null>(null);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/store/category', {
            onSuccess: () => {
                setToastDisplayed(false);
            },
            onError: () => {
                setToastDisplayed(false);
            },
        });
    };

    const deleteCategory = (id: number, e?: React.FormEvent) => {
        e?.preventDefault();
        destroy(`/category/${id}/delete`, {
            onSuccess: () => {
                setToastDisplayed(false);
            },
            onError: () => {
                setToastDisplayed(false);
            },
        });
    };

    const { flash } = usePage<{ flash: { message?: string } }>().props;
    const messageType = flash.message ? 'success' : 'error';

    useEffect(() => {
        if (flash.message && !toastDisplayed) {
            if (messageType !== 'error') {
                toast.success(flash.message);
            } else {
                toast.error(flash.message);
            }
            setToastDisplayed(true);
            reset();
        }
    }, [flash.message, messageType, toastDisplayed]);

    const toggleVisible = (id: number | null) => {
        setVisibleModalId(id);
    };

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
                <h1 className="font-bold text-lg my-3">All Categories</h1>
                <Table className="bg-white/10 backdrop-blur-lg">
                    <Table.Head>
                        <span>No.</span>
                        <span>Name</span>
                        <div className="text-center">Action</div>
                    </Table.Head>

                    <Table.Body>
                        {categories.map((category, index) => (
                            <Table.Row
                                key={category.id}
                                className="hover:bg-base-100/15 ease-in duration-50"
                            >
                                <span>{index + 1}</span>
                                <span>{category.name}</span>
                                <div className="text-center flex gap-1 justify-center">
                                    <Link
                                        href={`/category/${category.id}/edit`}
                                        className="hover:bg-white/20 hover:underline p-4 rounded-full"
                                    >
                                        <FaPen size={15} />
                                    </Link>
                                    <Button
                                        color="ghost"
                                        onClick={() => toggleVisible(category.id)} // Pass the category ID
                                        className="hover:bg-white/20 hover:underline p-4 h-full rounded-full"
                                    >
                                        <FaTrash size={15} />
                                    </Button>
                                </div>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
            {categories.map((category) => (
                <Modal.Legacy
                    key={category.id}
                    open={visibleModalId === category.id}
                >
                    <Modal.Header className="font-bold text-center">
                        Delete Confirmation '{category.name}'
                    </Modal.Header>
                    <Modal.Body>
                        <div className="text-center">
                            Data that are referenced to this category will also be deleted.
                        </div>
                    </Modal.Body>

                    <Modal.Actions>
                        <Button color="ghost" onClick={() => toggleVisible(null)}>
                            Close
                        </Button>
                        <Button
                            className="px-4 py-3 bg-red-500 text-white grid items-center hover:bg-red-600 rounded-md ease-in duration-100"
                            onClick={() => deleteCategory(category.id)}
                        >
                            Yes, I'm Sure.
                        </Button>
                    </Modal.Actions>
                </Modal.Legacy>
            ))}
        </div>
    );
};

export default CreateCategory;
