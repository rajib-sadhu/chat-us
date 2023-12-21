import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="h-full grid place-content-center text-center">
            <div className="space-y-3">
                <h1 className="uppercase font-semibold text-2xl">Welcome to ChatUs</h1>
                <Link to='login' className="px-3 py-1 bg-slate-400 hover:bg-slate-500 rounded-sm inline-block">Get Started</Link>
            </div>
        </div>
    );
};

export default Home;