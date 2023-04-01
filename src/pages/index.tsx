import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import styles from '@/styles/home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Kevin Minutti</title>
        <meta name="description" content="Kevin Minutti home page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <main className={styles.main}>
         <Image
                className={styles.portrait}
                src="https://raw.githubusercontent.com/K-minutti/v1/main/public/portrait.png" 
                alt="portrait of a frustrated programmer"
                width={216}
                height={200}
                priority
              />
  
        <h1 className={styles.title}>Kevin Minutti</h1>
        <p className={styles.description}>Solving problems and having fun.</p>

          <div className={styles.grid}>
            <Link
              href="https://github.com/K-minutti"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p >What I&apos;m up to <span>&rarr;</span></p>
            </Link>

            <Link
              href="/blog"
              className={styles.card}
            >
              <p >Writing <span>&rarr;</span></p>
            </Link>
          </div>
      </main>
    </>
  )
}
