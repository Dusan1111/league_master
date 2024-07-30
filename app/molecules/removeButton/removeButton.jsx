import "./removeButton.scss";

const RemoveButtonComponent = ({ content, remove }) => {
  return (
    <button className="remove_button" onClick={remove}>
      {content}
    </button>
  );
};

export default RemoveButtonComponent;
