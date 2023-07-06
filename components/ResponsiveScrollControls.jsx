import { useThree } from "@react-three/fiber"
import { useContext, useEffect, useRef } from "react"
import PostFeed from '../components/PostFeed';
import Loader from '../components/Loader';
import { firestore, fromMillis, postToJSON } from '../lib/firebase';
import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import { Scroll, ScrollControls } from '@react-three/drei';
import { PostContext } from "../lib/context";


export default function ResponsiveScrollControls (){
    const [posts, setPosts] = useState(useContext(PostContext));
    const [loading, setLoading] = useState(false);
    const [postsEnd, setPostsEnd] = useState(false);
    const {viewport} = useThree()
         
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

    const [screenSize, setScreenSize] = useState(getCurrentDimension());

  	function getCurrentDimension(){
    	return {
      		width: window.innerWidth,
      		height: window.innerHeight
    	}
    }

    const sectionLengthPxls = 1420
    const vph = screenSize.height
    const pxlToVh = vph/100
    const vhBetweenSections = sectionLengthPxls / pxlToVh
    const portfolioTop = 120 + vhBetweenSections
    const contactTop = portfolioTop + vhBetweenSections

    const htmlSectionLen =  3350
    const headerLen = 1.2*vph
    const totalPageLen = htmlSectionLen + headerLen
    const PAGES = totalPageLen / vph

    return (
        <ScrollControls pages={PAGES} damping={.5}> 
            <Header/>
            <Scroll>

            </Scroll>
            <Scroll html>

              <div className="container">
                <div className="blog">
                    <h2 className='section-header-text--large'>blog</h2>
                    <p>king henry. something 4 ur mind</p>

                  <PostFeed posts={posts} />

                  {!loading && !postsEnd && <button onClick={getMorePosts}>Load more</button>}

                  <Loader show={loading}/>

                  {postsEnd && 'You have reached the end!'}
                </div>
                
                <div className="portfolio" style={{top:`${portfolioTop}vh`}}>
                  <h2 className='section-header-text--large'>Portfolio</h2>
                  
                  <div className='card'>
                    <div>
                      <h3>Project Management Application</h3>
                      <p>I built a task management ticket board using Next.js and a few react.js libraries</p>
                    </div>
                  </div>

                  <div className='card'>
                    <div>
                      <h3>Exercise log and Calorie database Application</h3>
                      <p>This is a web app that helps me track and organize my health and fitness routine</p>
                    </div>
                  </div>

                  <div className='card'>
                    <div>
                      <h3>Appointment Booking Application</h3>
                      <p>This is a web app that can be used to make appointments</p>
                    </div>
                  </div>

                  <div className='card'>
                    <div>
                      <h3>FreeLance Work</h3>
                      <p>Here are links to websites I built for small businesses</p>
                    </div>
                  </div>

                </div>
                
                <div className="contact" style={{top:`${contactTop}vh`}}>
                  <h2 
                    className='section-header-text--large'
                      >You can contact me here: marcelomata91@gmail.com or 
                      <Link 
                        legacyBehavior 
                        href="https://www.linkedin.com/in/marcelomata/"
                        > LinkedIn
                      </Link> 
                  </h2>
                </div>
              </div>

              
            </Scroll>
        </ScrollControls>
    )
}

