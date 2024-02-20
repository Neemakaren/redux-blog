import { Link } from "react-router-dom"
import { IoLogoYoutube } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


const Header = () => {
    const navigate=useNavigate();
    return (
        <div className='flex justify-between items-center text-1.7xl mt-10'>
            <p className='w-[180px] text-3xl'>Redux Blog</p>
        <ul className='hidden md:flex gap-4 md:gap-14 text-1.6xl '>
            <Link to='/' className='hover:font-bold cursor-pointer hover:underline' onClick={()=>navigate('/')}>Home</Link>
            <Link to='post' className='hover:font-bold cursor-pointer hover:underline'>Post</Link>
            <Link to='user' className='hover:font-bold cursor-pointer hover:underline'>Users</Link>
        </ul>
    </div>
    )
}

export default Header