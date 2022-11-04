import Link from 'next/link';
import styles from './Notes.module.css';
import CreateNote from './CreateNote';

interface INote {
    id: string;
    title: string;
    content: string;
    created: string;
    updated: string;
}

async function getNotes() {
    const res = await fetch('http://localhost:8090/api/collections/notes/records?page=1&perPage=30', {
        cache: 'no-store', ///< SSR
        // cache: 'force-cache', ///< SSG
        // next: {
        //     revalidate: 20, ///< ISR
        //},
    });
    const data = await res.json();
    return data?.items as INote[];
}

export default async function NotesPage() {
    const notes = await getNotes();

    return (
        <div>
            <h1>Notes</h1>
            <div className={styles.grid}>
                {notes?.map((note) => {
                    return <Note key={note.id} note={note} />
                })}
            </div>

            <CreateNote />
        </div>
    )
}

function Note({ note }: INote) {
  const { id, title, content, created } = note || {};

  return (
    <Link href={`/notes/${id}`}>
        <div className={styles.note}>
            <h2>{title}</h2>
            <h5>{content}</h5>
            <p>{created}</p>
        </div>
    </Link>
  );
}
