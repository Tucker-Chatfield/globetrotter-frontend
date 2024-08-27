import { Link } from 'react-router-dom';

const FootprintList = (props) => {
  return (
    <main>
      {props.footprints.map((footprint) => (
      <Link key={footprint._id} to={`/footprints/${footprint._id}`}>
        <article>
          <header>
            <h2>{footprint.title}</h2>
            <p>
              {footprint.author.username} posted on
              {new Date(footprint.createdAt).toLocaleDateString()}
            </p>
          </header>
          <p>{footprint.text}</p>
        </article>
      </Link>
    ))}
    </main>
  );
};

export default FootprintList;