import { useSelector } from 'react-redux'
import { selectUserById } from '../users/usersSlice'
import { selectAllPosts, selectPostsByUser } from '../posts/postsSlice'
import { Link, useParams } from 'react-router-dom'

const UserPage = () => {
    const { userId } = useParams()
    const user = useSelector(state => selectUserById(state, Number(userId)))

    const postsForUser = useSelector(state => selectPostsByUser(state, Number(userId)))

    const postTitles = postsForUser.map(post => (
        <li key={post.id} className='rounded-2xl border-4 pt-3 pb-2 pr-4 pl-3 shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110'>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ))

    return (
        <section>
            <h2 className="font-bold underline text-2xl flex justify-start mt-20 mb-10">{user?.name}</h2>

            <ol className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10'>{postTitles}</ol>
        </section>
    )
}

export default UserPage