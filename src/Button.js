import React from "react";

const Button = ({ id, caption, onClickHandler }) => {
  return (
    <div className="form-group">
      <button
        id={id}
        className="form-control btn btn-primary"
        onClick={onClickHandler}
      >
        {caption}
      </button>
    </div>
  );
};
export default Button;
