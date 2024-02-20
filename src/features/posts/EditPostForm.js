import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPostById, updatePost, deletePost } from './postsSlice'
import { useParams, useNavigate } from 'react-router-dom'

import { selectAllUsers } from "../users/usersSlice";

const EditPostForm = () => {
    const { postId } = useParams()
    const navigate = useNavigate()

    const post = useSelector((state) => selectPostById(state, Number(postId)))
    const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.body)
    const [userId, setUserId] = useState(post?.userId)
    const [requestStatus, setRequestStatus] = useState('idle')

    const dispatch = useDispatch()

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(Number(e.target.value))

    const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle';

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setRequestStatus('pending')
                dispatch(updatePost({ id: post.id, title, body: content, userId, reactions: post.reactions })).unwrap()

                setTitle('')
                setContent('')
                setUserId('')
                navigate(`/post/${postId}`)
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setRequestStatus('idle')
            }
        }
    }

    const usersOptions = users.map(user => (
        <option
            key={user.id}
            value={user.id}
        >{user.name}</option>
    ))

    const onDeletePostClicked = () => {
        try {
            setRequestStatus('pending')
            dispatch(deletePost({ id: post.id })).unwrap()

            setTitle('')
            setContent('')
            setUserId('')
            navigate('/')
        } catch (err) {
            console.error('Failed to delete the post', err)
        } finally {
            setRequestStatus('idle')
        }
    }

    return (
        <section>
            <h2 className="font-bold underline text-2xl flex justify-start mt-20 mb-10">Edit Post</h2>
            <form className="flex flex-col w-10/12 rounded-2xl border-4 pt-6 pb-2 pr-4 pl-3 shadow-lg justify-center">
                <label htmlFor="postTitle" className="pb-2">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                    className="pt-1 pb-1 pl-2 mb-5 border-4"
                />
                <label htmlFor="postAuthor" className="pb-2">Author:</label>
                <select id="postAuthor" className="border-4 pb-2" value={userId} onChange={onAuthorChanged}>
                    <option value="" className="pb-2"></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent" className="pb-2">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                    className="border-4 resize-none pl-4 pb-6"
                />
                <button
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                    className="p-3 px-6 pt-2 mt-5 text-black bg-black rounded-full baseline bg-green-600 bg-opacity-50 hover:text-white hover:bg-green-900 hover:bg-opacity-100 "
                >
                    Save Post
                </button>
                <button className="deleteButton p-3 px-6 pt-2 mt-5 text-black bg-black rounded-full baseline bg-red-700 hover:text-white hover:bg-red-900 hover:bg-opacity-100 "
                    type="button"
                    onClick={onDeletePostClicked}   
                >
                    Delete Post
                </button>
            </form>
        </section>
    )
}

export default EditPostForm