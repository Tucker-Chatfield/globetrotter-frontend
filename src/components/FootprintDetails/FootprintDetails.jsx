import { AuthedUserContext } from '../../App';
import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as footprintService from '../../services/footprintService';
import CommentForm from '../CommentForm/CommentForm';
import styles from './FootprintDetails.module.css';
import Loading from '../Loading/Loading';
import AuthorInfo from '../../components/AuthorInfo/AuthorInfo';
import Icon from '../Icon/Icon';

const FootprintDetails = (props) => {
  const { footprintId } = useParams();
  const [footprint, setFootprints] = useState(null);
  const user = useContext(AuthedUserContext);

  useEffect(() => {
    const fetchFootprint = async () => {
      const footprintData = await footprintService.show(footprintId);
      console.log('footprintData', footprintData);
      setFootprints(footprintData);
    };
    fetchFootprint();
  }, [footprintId]);

  
  const handleAddComment = async (commentFormData) => {
    const newComment = await footprintService.createComment(footprintId, commentFormData);
    setFootprints({ ...footprint, comments: [...footprint.comments, newComment] });
  };

  const handleDeleteComment = async (commentId) => {
    console.log('commentId:', commentId);
    await footprintService.deleteComment(footprintId, commentId);
    setFootprints({
      ...footprint,
      comments: footprint.comments.filter((comment) => comment._id !== commentId),
    });
  };
  
  if (!footprint) return <Loading />

  return ( 
  <main className={styles.container}>
    <section>
      <header>
        <h1>{footprint.title}</h1>
        <div>
         <AuthorInfo content={footprint} />

          {footprint.author._id === user._id && (
            <>
              <Link to={`/footprints/${footprintId}/edit`}>
                <Icon category="Edit" />
              </Link>
              <button onClick={() => props.handleDeleteFootprint(footprintId)}>
                <Icon category="Trash" />
              </button>
            </>
          )}
        </div>

      </header>
      <p>{footprint.text}</p>
    </section>
    <section>
      <h2>Comments</h2>
      {!footprint.comments.length && <p>There are no comments.</p>}
      <CommentForm handleAddComment={handleAddComment} />
      {footprint.comments.map((comment) => (
        
        <article key={comment._id}>
        {console.log('Rendering Buttons: ', String(comment.author) === String(user._id))}
          <header>
            <div>
              <AuthorInfo content={comment} />

              {comment.author && comment.author._id && String(comment.author._id) === String(user._id) && (
                <>
                  <Link to={`/footprints/${footprintId}/comments/${comment._id}/edit`}>
                    <Icon category="Edit" />
                  </Link>
                  <button onClick={() => handleDeleteComment(comment._id)}>
                    <Icon category="Trash" />
                  </button>
                </>
              )}
            </div>
          </header>
          <p>{comment.text}</p>
        </article>
      ))}
    </section>
  </main>
  );
};

export default FootprintDetails;