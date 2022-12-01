import React from 'react'

const Spinner = ({ msg }) => {
    return (
        <div className='justify-center items-center flex flex-col'>

            <p className="text-lg text-center px-2 text-primary">{msg}</p>
            <span class="loader" ></span>

        </div>
    )
}

export default Spinner
