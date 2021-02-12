import { useState } from "react"
import { Post, Posts, SetPostsType } from "../App"
import colors from "../styles"

interface ModifyProps {
    post: Post
    posts: Posts
    setIsModifying: React.Dispatch<React.SetStateAction<boolean>>
    setPosts: SetPostsType
    setIsAddPostAvailable: React.Dispatch<React.SetStateAction<boolean>>
}

export const Modify = (props: ModifyProps): JSX.Element => {
    const style = {
        width: '500px',
        height: '50px',
        borderColor: colors.textButtons,
        color: colors.textButtons,
        borderRadius: '3px',
        borderStyle: 'solid',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    }
    const formStyle = {
        ...style,
        height: '500px',
        display: 'block'
    }
    const inputTitlesStyle = {
        color: colors.title,
        marginLeft: '30px',
        paddingTop: '40px',
    }
    const buttons = {
        ...style,
        width: '100px',
        height: '20px',
        borderColor: colors.textButtons,
        color: colors.textButtons,
        borderRadius: '3px',
        borderStyle: 'solid',
        cursor: 'pointer',
        marginLeft: '350px',
        marginTop: '20px'
    }

    const [title, setTitle] = useState(props.post.title)
    const [content, setContent] = useState(props.post.content)
    const [author, setAuthor] = useState(props.post.author)

    const onSave = () => {
        const post = {
            title,
            author,
            content,
            id: props.post.id,
        }

        const newPosts = [...props.posts.filter((p: Post) => p.id !== props.post.id ), post]
        props.setPosts(newPosts)
        localStorage.setItem('localStoragePosts', JSON.stringify(newPosts))
        onCancel()
    }

    const onCancel = () => {
        setTitle('')
        setAuthor('')
        setContent('')
        props.setIsModifying(false)
        props.setIsAddPostAvailable(true)
    }

    const contentStyle = {
        height: '30px',
        width: '420px',
        borderColor: colors.textButtons,
        color: colors.textButtons,
        background: colors.background,
        borderRadius: '3px',
        borderStyle: 'solid',
        cursor: 'pointer',
        marginTop: '5px',
    }

    const textAreaStyle = {
        width: '420px',
        borderColor: colors.textButtons,
        color: colors.textButtons,
        background: colors.background,
        borderRadius: '3px',
        borderStyle: 'solid',
        cursor: 'pointer',
        marginTop: '5px',
        height: '120px',
        maxHeight: '120px',
        minHeight: '120px',
        maxWidth: '420px',
        minWidth: '420px'
    }

    return(
        <div>
            <div style={formStyle}>
                <div style={inputTitlesStyle}>
                    TITLE:
                    <input style={contentStyle} maxLength={100} value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div style={inputTitlesStyle}>
                    AUTHOR:
                    <input style={contentStyle} maxLength={50} value={author} onChange={(e) => setAuthor(e.target.value)}/>
                </div>
                <div style={inputTitlesStyle}>
                    CONTENT:
                    <textarea style={textAreaStyle} maxLength={1000} value={content} onChange={(e) => setContent(e.target.value)}/>
                </div>
                <div style={buttons} onClick={onSave}>
                    SAVE
                </div>
                <div style={buttons} onClick={onCancel}>
                    CANCEL
                </div>
            </div>
        </div>
    )
}