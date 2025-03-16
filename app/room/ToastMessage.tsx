"use client";


const ToastMessage = ({ message }: {
    message: {
        email: string,
        message: string
    }
}) => {

    return (
        <div className='fixed top-[15vh] messageShade left-[5vh]' >
            <div>{message && message.email}</div>
            <div className="text-sm"> {message && message.message}</div>

        </div>
    )
}

export default ToastMessage