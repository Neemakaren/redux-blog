import { useSelector } from 'react-redux'
import { selectPostById } from './postsSlice'

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SinglePostPage = () => {
    const { postId } = useParams()

    const post = useSelector((state) => selectPostById(state, Number(postId)))

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    return (
        <article className="rounded-2xl border-4 pt-2 pb-2 pr-4 pl-3 shadow-lg mt-20 p-10">
            <h2 className="font-bold underline text-2xl flex justify-center mb-5">{post.title}</h2>
            <p className='text-2xl'>{post.body}</p>
            <p className="postCredit">
                <Link to={`/post/edit/${post.id}`} className='pr-4 font-bold text-1xl'>Edit Post</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    )
}

export default SinglePostPage