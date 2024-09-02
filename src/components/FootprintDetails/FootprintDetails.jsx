import { AuthedUserContext } from '../../App';
import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as footprintService from '../../services/footprintService';
import CommentForm from '../CommentForm/CommentForm';


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
  
  if (!footprint) return <main>Loading...</main>;

  return ( 
  <main>
    <header>
      <h1>{footprint.title}</h1>
      <p>
        {footprint.author.username} posted on
        {new Date(footprint.createdAt).toLocaleDateString()}
      </p>
      {footprint.author._id === user._id && (
        <>
          <Link to={`/footprints/${footprintId}/edit`}>Edit</Link>
          <button onClick={() => props.handleDeleteFootprint(footprintId)}>Delete</button>
        </>
      )}
    </header>
    <p>{footprint.text}</p>
    <section>
      <h2>Comments</h2>
      {!footprint.comments.length && <p>There are no comments.</p>}
      <CommentForm handleAddComment={handleAddComment} />

      {footprint.comments.map((comment) => (
        <article key={comment._id}>
          <header>
            <p>
              {comment.author.username} posted on
              {new Date(comment.createdAt).toLocaleDateString()}
            </p>
            {comment.author._id === user._id && (
              <>
                <Link to={`/footprints/${footprintId}/comments/${comment._id}/edit`}>Edit</Link>
                <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
              </>
            )}
          </header>
          <p>{comment.text}</p>
        </article>
      ))}
    </section>
  </main>
  );
};

export default FootprintDetails;