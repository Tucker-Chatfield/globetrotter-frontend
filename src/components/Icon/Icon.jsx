import Add from '../../assets/images/add.svg';
import Edit from '../../assets/images/edit.svg';
import Trash from '../../assets/images/trash.svg';
import Create from '../../assets/images/create.svg';
import Comments from '../../assets/images/comments.svg';


const Icon = ({ category }) => {
  const icons = {
    Add: Add,
    Edit: Edit,
    Trash: Trash,
    Create: Create,
    Comments: Comments,
  };

  return (
    <img
      src={icons[category]}
      alt={`A ${category} icon.`}
      id={category.toLowerCase()}
      className="icon"
    />
  );
};

export default Icon;