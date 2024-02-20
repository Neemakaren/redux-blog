import { useSelector } from "react-redux";
import { selectPostIds, getPostsStatus, getPostsError } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";
import Hero from "../../components/Hero";
import { InfinitySpin } from 'react-loader-spinner';

const PostsList = () => {

    const orderedPostIds = useSelector(selectPostIds)
    const postStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    let content;
    if (postStatus === 'loading') {
        content = <p >"Loading..."</p>;
        content = <div className="c"><InfinitySpin color="black" />

        </div>
    } else if (postStatus === 'succeeded') {
        content = orderedPostIds.map(postId => <PostsExcerpt key={postId} postId={postId} />)
    } else if (postStatus === 'failed') {
        content = <p>{error}</p>;
    }

    return (
        <section>
            <Hero />
            <h2 className='font-bold underline text-5xl flex justify-center mt-20 mb-20'>Featured Posts</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10">
            {content}
            </div>
        </section>
    )
}
export default PostsList