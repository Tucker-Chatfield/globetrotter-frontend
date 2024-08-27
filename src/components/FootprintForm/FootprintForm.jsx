import { useState } from 'react';

const FootprintForm = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddFootprint(formData);
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
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