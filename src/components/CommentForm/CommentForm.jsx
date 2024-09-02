import { Navigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as footprintService from '../../services/footprintService';

const CommentForm = (props) => {
  const [formData, setFormData] = useState({ text: '' });
  const { footprintId, commentId } = useParams();

  useEffect(() => {
    const fetchFootprint = async () => {
      const footprintData = await footprintService.show(footprintId);
      setFormData(footprintData.comments.find((comment) => comment._id === commentId));
    };
    if (footprintId && commentId) fetchFootprint();
  }, [footprintId, commentId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (footprintId && commentId) {
      footprintService.updateComment(footprintId, commentId, formData);
      Navigate(`/footprints/${footprintId}`);
    } else {
      props.handleAddComment(formData);
    }
    setFormData({ text: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text-input">Your comment:</label>
      <textarea
      required
      type="text"
      name="text"
      id="text-input"
      value={formData.text}
      onChange={handleChange}
      />
      <button type="submit">SUBMIT COMMENT</button>
    </form>
  );
};

export default CommentForm;