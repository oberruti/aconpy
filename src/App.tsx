import React, { useState } from 'react';
import { AddPost } from './posts/add';
import { PostsList } from './posts/show';
import colors from './styles';

export type SetPostsType = React.Dispatch<React.SetStateAction<Posts>>

export type Posts = Post[]

export type Post = {
  title: string;
  content: string;
  author: string;
  id: number;
}

function App() {
  const style = {
    background: colors.background,
    minHeight: '720px',
    height: '100%',
    minWidth: '100%',
    display: 'flex',
    paddingTop: '100px',
    justifyContent: 'center',
    paddingBottom: '200px'
  }

  const getBasePosts = (): Posts => {
    const posts = localStorage.getItem('localStoragePosts')
    if (posts === null) {
      return [{
        title: '',
        content: '',
        author: '',
        id: 0,
      }]
    }
    return JSON.parse(posts)
  }

  const basePosts = getBasePosts()

  const [posts, setPosts] = useState(basePosts)

  const [isAddPostAvailable, setIsAddPostAvailable] = useState(true)
  return (
    <div style={style}>
      <div style={{display: 'block'}}>
        <AddPost posts={posts} setPosts={setPosts} isAddPostAvailable={isAddPostAvailable} />
        <PostsList posts={posts} setPosts={setPosts} setIsAddPostAvailable={setIsAddPostAvailable} />
      </div>
    </div>
  );
}

export default App;
