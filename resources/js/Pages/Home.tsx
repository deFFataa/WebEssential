import React from 'react'
import FormInput from '../components/FormInput'
import Category from '../components/Category'

const Home = () => {

    return (
        <div className="w-full">
            <div className="grid grid-rows-1 grid-cols-12 gap-4">
                <div className="col-span-3 p-5 backdrop-blur-lg shadow-lg bg-white/5 mt-5 outline-1 outline outline-white/[25%] rounded-lg">
                    <div className="grid grid-rows-1 grid-cols-1 gap-2">
                        <FormInput />
                        <Category href='/'>All</Category>
                        <Category href='/Icons'>Icons</Category>
                        <Category href='/Designs'>Designs</Category>
                    </div>
                </div>
                <div className="col-span-9 p-5 backdrop-blur-lg shadow-lg bg-white/5 mt-5 outline-1 outline outline-white/[25%] rounded-lg">
                    2
                </div>
            </div>
        </div>
    )
}

export default Home