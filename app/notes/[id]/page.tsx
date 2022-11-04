import Head from 'next/head';
import styles from '../Notes.module.css';

async function getNote(noteId: string) {
    const res = await fetch(`http://localhost:8090/api/collections/notes/records/${noteId}`, {
        next: { revalidate: 10 }, ///< ISR
    });
    const data = await res.json();
    return data;
}

export default async function NotePage({ params }: any) {
    const note = await getNote(params.id);
    const { id, title, content, created } = note || {};

    return (
        <>
            <Head>
                <title>My note: {note.tiyle}</title>
            </Head>
            <h1>Note: {note.id}</h1>
            <div className={styles.note}>
                <h2>{title}</h2>
                <h5>{content}</h5>
                <p>{created}</p>
            </div>
        </>
    )
}