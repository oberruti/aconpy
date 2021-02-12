/* eslint-disable eqeqeq */
import React, { useCallback, useState } from 'react'
import { Post, Posts, SetPostsType } from '../App'
import colors from '../styles'
import { Modify } from './modify'

interface PostsListProps {
    posts: Posts, setPosts: SetPostsType, setIsAddPostAvailable: React.Dispatch<React.SetStateAction<boolean>>
}

export const PostsList = (props: PostsListProps): JSX.Element => {

    const [isModifying, setIsModifying] = useState(false)
    const [modifyingPost, setModifyingPost] = useState({
        title: '',
        content: '',
        author: '',
        id: 0,
    })

    const style = {
        width: '500px',
        height: '100%',
        display: 'block',
        borderColor: colors.textButtons,
        color: colors.textButtons,
        borderRadius: '3px',
        borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        marginTop: '10px',
        overflowWrap: 'break-word' as 'break-word',
    }

    const title = {
        color: colors.title,
        fontSize: '40px',
        marginTop: '10px',
        marginLeft: '10px',
    }
    const content = {
        color: colors.content,
        fontSize: '25px',
        marginTop: '20px',
        marginLeft: '10px',
    }
    const author = {
        color: colors.subtitle,
        fontSize: '15px',
        marginTop: '5px',
        marginLeft: '10px',
        fontStyle: 'italic',
    }

    const buttonsStyle = {
        paddingLeft: '420px',
        marginTop: '10px',
        marginBottom: '10px'
    }

    const onClickDelete = useCallback(
        (id: number) => {
            props.setPosts(props.posts.filter((post: Post) => {
                if (post.id !== id){
                    return post
                } 
            }))
        },
        [props],
    )

    const onClickModify = useCallback((post: Post) => {
        props.setIsAddPostAvailable(false)
        setIsModifying(true)
        setModifyingPost(post)
    }, [setIsModifying, setModifyingPost, props])

    const listOfPosts = props.posts.map((post, index) => {
        if (post.author === '' || post.content === '' || post.title === '') {
            props.posts.filter((maybeEmptyPost: Post) => {
                if (post.id !== maybeEmptyPost.id){
                    return post
                } 
            })
            return 
        }
        return(
            <div style={style} key={index}>
                <div style={title}>{post.title}</div>
                <div style={content}>{post.content}</div>
                <div style={author}>{post.author}</div>
                <div style={buttonsStyle} onClick={() => onClickModify(post)}>MODIFY</div>
                <div style={buttonsStyle} onClick={() => onClickDelete(post.id)}>DELETE</div>
            </div>
        )
    })

    if (isModifying) {
        return (
            <Modify
                post={modifyingPost}
                posts={props.posts}
                setIsModifying={setIsModifying}
                setPosts={props.setPosts}
                setIsAddPostAvailable={props.setIsAddPostAvailable}
            />
        )
    }

    return(
        <div>
            {listOfPosts}
        </div>
    )
}