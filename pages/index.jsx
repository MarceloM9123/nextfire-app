import PostFeed from '../components/PostFeed';
import Loader from '../components/Loader';
import { firestore, fromMillis, postToJSON } from '../lib/firebase';
import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import { Scroll, ScrollControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Script from 'next/script';
import ResponsiveCamera from '../components/ResponsiveCamera';
import ResponsiveScrollControls from '../components/ResponsiveScrollControls';
import { PostContext } from '../lib/context.js';


const LIMIT = 4;

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT);

    const posts = (await postsQuery.get()).docs.map(postToJSON);

    return {
      props: { posts },
    };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js" />
      
        <PostContext.Provider value={posts}>
          <Canvas>
            <ResponsiveCamera/>
            <ResponsiveScrollControls/>
          </Canvas>
        </PostContext.Provider>
    </>
    
  )
}
