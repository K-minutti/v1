import { getAllPostIds, getPostData } from '../../../lib/posts';
import { GetStaticProps } from 'next';
import Date from '../../../components/date';
import styles from '@/styles/post.module.css'
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { MDXRemote } from 'next-mdx-remote';
const components = {
  Head,
  Image,
  Link,
};

// export async function getStaticProps({ params }: any)
export const getStaticProps: GetStaticProps = async ({ params }: any) => {
    // Add the "await" keyword like this:
    const postData = await getPostData(params.id);
    return {
      props: {
        postData,
      },
    };
  }

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}


export default function Post({postData}: any) {
    return (
      <div>
        <Head>
        <title>{postData.title}</title>
        </Head>
        <br />
        <article className={styles.article}>
          <div className={styles.header}>
          <h1 >{postData.title}</h1>
          </div>
          <div>
            <Date dateString={postData.date} />
          </div>
          <section className={styles.body}>
          <MDXRemote {...postData.source} components={components} />
          {/* <div className={styles.content} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} /> */}
        
          </section>
      </article>
      </div>
    );
  }