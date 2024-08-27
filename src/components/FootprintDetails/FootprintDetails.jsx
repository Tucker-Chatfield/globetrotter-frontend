import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as footprintService from '../../services/footprintService';
import CommentForm from '../CommentForm/CommentForm';


const FootprintDetails = (props) => {
  const { footprintId } = useParams();
  const [footprint, setFootprints] = useState(null);
  console.log('footprintId', footprintId);

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
  
  if (!footprint) return <main>Loading...</main>;

  return ( 
  <main>
    <header>
      <h1>{footprint.title}</h1>
      <p>
        {footprint.author.username} posted on
        {new Date(footprint.createdAt).toLocaleDateString()}
      </p>
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
          </header>
          <p>{comment.text}</p>
        </article>
      ))}
    </section>
  </main>
  );
};

export default FootprintDetails;