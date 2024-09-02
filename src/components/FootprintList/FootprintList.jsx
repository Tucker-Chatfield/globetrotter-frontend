import { Link } from 'react-router-dom';
import styles from './FootprintList.module.css';
import AuthorInfo from '../../components/AuthorInfo/AuthorInfo';

const FootprintList = (props) => {
  return (
    <main className={styles.container}>
      {props.footprints.map((footprint) => (
      <Link key={footprint._id} to={`/footprints/${footprint._id}`}>
        <article>
          <header>
            <div>
              <h2>{footprint.title}</h2>
            </div>
            <p>
              {footprint.author.username} posted on
              {new Date(footprint.createdAt).toLocaleDateString()}
            </p>
          <AuthorInfo content={footprint} />
          </header>
          <p>{footprint.text}</p>
        </article>
      </Link>
    ))}
    </main>
  );
};

export default FootprintList;