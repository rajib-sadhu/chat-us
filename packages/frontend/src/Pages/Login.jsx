import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        if (name <= 3 && name >= 20) {
            toast.error('Please enter the name between 3 to 20 char');
        }
        else {
            localStorage.setItem('name', JSON.stringify({ name }));
            navigate('/chat-page');
        }
    }
    

    return (
        <div className="h-full grid place-content-center text-center">
            <div>
                <h1 className="uppercase font-semibold text-2xl">Login</h1>
                <form className='w-full space-y-3 mt-5' onSubmit={handleSubmit} >
                    <input type="text" name="name" id="" placeholder='Enter your name' className='px-2 py-1 placeholder:text-slate-500' required />
                    <button type='submit' className="px-3 py-1 bg-slate-400 hover:bg-slate-500 rounded-sm block w-full font-medium">Let's Go</button>
                </form>
            </div>
        </div>
    );
};

export default Login;