import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as footprintService from '../../services/footprintService';
import styles from './FootprintForm.module.css';

const FootprintForm = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
  });

  const { footprintId } = useParams();

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (footprintId) {
      props.handleUpdateFootprint(footprintId, formData);
    } else {
      props.handleAddFootprint(formData);
    }
  };

  useEffect(() => {
    const fetchFootprint = async () => {
      const footprintData = await footprintService.show(footprintId);
      setFormData(footprintData);
    };
    if (footprintId) fetchFootprint();
  }, [footprintId]);

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1>{footprintId ? 'Edit Footprint' : 'New Footprint'}</h1>
        <label htmlFor='title-input'>Title</label>
        <input 
          required
          type="text"
          name="title"
          id="title-input"
          value={formData.title}
          onChange={handleChange}        
        />
        <label htmlFor="text-input">Text</label>
        <textarea 
          required
          type="text"
          name="text"
          id="text-input"
          value={formData.text}
          onChange={handleChange}
        />
        <label htmlFor="image-input">Image</label>
        <select 
          name="image"
          id="image-input"
          value={formData.image}
          onChange={handleChange}
        >
        </select>
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default FootprintForm;