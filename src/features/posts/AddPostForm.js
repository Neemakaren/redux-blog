import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useNavigate } from "react-router";

const AddPostForm = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const users = useSelector(selectAllUsers)

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)


    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                dispatch(addNewPost({ title, body: content, userId })).unwrap()

                setTitle('')
                setContent('')
                setUserId('')
                navigate('/')
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setAddRequestStatus('idle')
            }
        }

    }

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    return (
        <section>
            <h2 className="font-bold underline text-2xl flex justify-start mt-20 mb-10">Add a New Post</h2>
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
                    className="border-4 resize-none"
                />
                <button
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                    className="p-3 px-6 pt-2 mt-5 text-black bg-black rounded-full baseline bg-gray-400 bg-opacity-50 hover:text-white hover:bg-gray-900 hover:bg-opacity-100 "
                >Save Post</button>
            </form>
        </section>
    )
}
export default AddPostForm