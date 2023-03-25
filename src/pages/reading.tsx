import Head from 'next/head'
import styles from '@/styles/Home.module.css'

const readingList = [
    {
      date: "01.02.23",
      book: "A Mind for Numbers",
      author: "Barbara Oakley"
    }, 
    {
      date: "01.09.23 ",
      book: "Hackers",
      author: "Steven Levy"
    }, 
    {
      date: "01.23.23",
      book: "Siddhartha",
      author: "Hermann Hesse"
    }, 
    
]

export default function ReadingList() {
    return (
        <>
          <Head>
            <title>Kevin Minutti</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="favicon.ico" />
          </Head>
          <main  className={styles.main}>
            <h1>Reading List</h1>
            <div> 
              <ul className="list">
              {readingList.map(({ date, book, author }) => (
                  <li className="listItem" key={date}>
                      <p><span>{date}</span> | {book} - {author}</p>
                  </li>
            ))}
            </ul>
            </div>
         </main>
    </>
    )
}