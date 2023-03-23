import Head from 'next/head'
import Link from 'next/link';
import Date from '../../components/date';
import { getSortedPostsData, Posts } from '../../lib/posts';

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
      props: {
        allPostsData,
      },
    };
  }

interface AllPosts {
    allPostsData: Posts
}

export default function Blog(props: AllPosts) {
  const {allPostsData} = props

    return (
        <>
          <Head>
            <title>Kevin Minutti</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="favicon.ico" />
          </Head>
          <main>
          <section >
              <h1 >Blog</h1>
                  <ul >
                    {allPostsData.map(({ id, date, title }) => (
                      <li className="listItem" key={id}>
                        <Link href={`/posts/${id}`}>{title}</Link>
                        <br />
                        <small className="lightText">
                          <Date dateString={date} />
                        </small>
                      </li>
                    ))}
                  </ul>
          </section>
      </main>
    </>
    )
}

