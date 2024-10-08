const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/footprints`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const show = async (footprintId) => {
  try {
    const res = await fetch(`${BASE_URL}/${footprintId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const create = async (footprintFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(footprintFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const createComment = async (footprintId, commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${footprintId}/comments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteFootprint = async (footprintId) => {
  try {
    const res = await fetch(`${BASE_URL}/${footprintId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const update = async (footprintId, footprintFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${footprintId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(footprintFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

const updateComment = async (footprintId, commentId, commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${footprintId}/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteComment = async (footprintId, commentId, commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${footprintId}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export { index, show, create, createComment, deleteFootprint, update, updateComment, deleteComment };