import PostFeed from '../components/PostFeed';
import Loader from '../components/Loader';
import { firestore, fromMillis, postToJSON } from '../lib/firebase';

import { useState } from 'react';
import Header from '../components/Header';

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
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;

    const query = firestore
      .collectionGroup('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT);

      const newPosts = (await query.get()).docs.map((doc) => doc.data());

      setPosts(posts.concat(newPosts));
      setLoading(false);

      if (newPosts.Length < LIMIT) {
        setPostsEnd(true);
      }
  };

  return (
    <>
        <Header/>
        <main>
          <h2 className='section-header-text--large'>Hi, I'm Marcelo</h2>
          <h2 className='section-header-text--large'>I build software</h2>
          <h2 className='section-header-text--large'>Check out what I'm up to...</h2>

          <PostFeed posts={posts} />

          {!loading && !postsEnd && <button onClick={getMorePosts}>Load more</button>}

          <Loader show={loading}/>

          {postsEnd && 'You have reached the end!'}
          
          <div>
            <h2 className='section-header-text--large'>Here's some stuff I've made...</h2>
            <div className='card'>
              <div>
                <h3>Project Management Application</h3>
              </div>
            </div>
            <div className='card'>
              <div>
                <h3>Exercise log and Calorie database Application</h3>
              </div>
            </div>
            <div className='card'>
              <div>
                <h3>Appointment Booking Application</h3>
              </div>
            </div>
          </div>
          
          <h2 className='section-header-text--large'>You can contact me here</h2>

          </main>
    </>
    
  )
}
