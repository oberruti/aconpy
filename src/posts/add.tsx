import React, { useState } from 'react'
import { Post, Posts, SetPostsType } from '../App'
import colors from '../styles'

interface AddPostProps {posts: Posts, setPosts: SetPostsType, isAddPostAvailable: boolean}

export const AddPost = (props: AddPostProps): JSX.Element => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')

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

    const finalText = {
        display: 'flex',
        alignSelf: 'center',
        cursor: 'pointer',
        marginLeft: '330px',
        marginTop: '7px',
        fontSize: '30px'
    }

    if (!isExpanded) {
        return(
            <div style={style} onClick={() => {
                if (props.isAddPostAvailable) {
                    setIsExpanded(!isExpanded)
                }
            }}>
                ADD NEW POST
                <div style={finalText}>^</div>
            </div>
        )
    }

    const expandedStyle = {
        ...style,
        borderColor: colors.textButtons,
        opacity: '0.8',
    }

    const expandedFinalText = {
        ...finalText,
        transform: 'rotate(180deg)',
        marginTop: '-7px',
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

    const onSave = () => {
        const newPost = {
            title,
            author,
            content,
            id: getTheLastIdPlusOne(props.posts)
        }

        const newPosts = [...props.posts, newPost]
        props.setPosts(newPosts)
        localStorage.setItem('localStoragePosts', JSON.stringify(newPosts))
        onCancel()
    }

    const onCancel = () => {
        setAuthor('')
        setContent('')
        setTitle('')
        setIsExpanded(false)
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
            <div style={expandedStyle} onClick={() => setIsExpanded(!isExpanded)}>
                ADD NEW POST
                <div style={expandedFinalText}>^</div>
            </div>
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

const getTheLastIdPlusOne = (posts: Posts): number => {
    console.log(posts)
    if (posts === []) {
        return 0
    }
    if (posts[1] === undefined) {
        if (posts[0] === undefined) {
            return 0
        }
        return posts[0].id+1
    }
    const ordererIds = posts.sort((a: Post, b: Post) => b.id - a.id)
    return ordererIds[0].id+1
} 