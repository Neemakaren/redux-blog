import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from 'react-router-dom';

import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

const PostsExcerpt = ({ postId }) => {
    const post = useSelector(state => selectPostById(state, postId))

    return (
             
        <div className="rounded-2xl border-4 pt-6 pb-2 pr-4 pl-3 shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 ...">
        <article>
            <h2>{post.title}</h2>
            <p className="col-span-1 flex flex-row bg-white rounded-lg" >{post.body.substring(0, 75)}...</p>
            <p className="postCredit">
                <Link to={`post/${post.id}`} className="pr-4">View Post</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
        </div>
    )
}

export default PostsExcerpt