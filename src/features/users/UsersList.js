import { useSelector } from 'react-redux'
import { selectAllUsers } from './usersSlice'
import { Link } from 'react-router-dom'

const UsersList = () => {
    const users = useSelector(selectAllUsers)

    const renderedUsers = users.map(user => (
        <li key={user.id} className='rounded-2xl border-4 pt-3 pb-2 pr-4 pl-3 shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110'>
            <Link to={`/user/${user.id}`} className='text-2xl flex justify-center'>{user.name}</Link>
        </li>
    ))

    return (
        <section>
            <h2 className='font-bold underline text-4xl flex justify-center mt-20 mb-10'>Users</h2>

            <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10'>{renderedUsers}</ul>
        </section>
    )
}

export default UsersList