import { Outlet, useNavigate } from 'react-router-dom';
import { CiMenuKebab } from 'react-icons/ci';
import { useState, useEffect, useRef } from 'react';

const Main = () => {
    const [menu, setMenu] = useState(false);
    const menuButtonRef = useRef(null);
    const navigate = useNavigate();

    const handleClickOutsideMenu = (event) => {
        if (menuButtonRef.current && !menuButtonRef.current.contains(event.target)) {
            setMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutsideMenu);

        return () => {
            document.removeEventListener('click', handleClickOutsideMenu);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('name');
        navigate('/');
    }

    return (
        <div className='md:grid min-h-screen md:place-content-center'>
            <div className='md:w-96 w-full bg-slate-200 md:h-[38rem] h-screen md:rounded-md overflow-hidden relative'>
                <div className='px-3 py-2 bg-slate-400 flex justify-between items-center'>
                    <h3 className='text-lg uppercase font-semibold'>Chat Us</h3>
                    <button ref={menuButtonRef} onClick={() => setMenu(!menu)}>
                        <CiMenuKebab />
                    </button>

                    <div className={`bg-white ${menu ? 'w-28 h-20' : 'w-0 h-0'} duration-200 absolute right-5 top-5 z-40 overflow-hidden`}>
                        <button className='w-full font-medium text-center py-2 bg-slate-500 text-white border-b'>
                            Settings
                        </button>
                        <button className='w-full font-medium text-center py-2 bg-slate-500 text-white' onClick={handleLogout} >
                            Logout
                        </button>
                    </div>

                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default Main;
