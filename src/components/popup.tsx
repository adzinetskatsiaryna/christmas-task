
import "./popup.css";

export type PropsType={
    handleClose: ()=>void
    content: any
}

const Popup = (props:PropsType) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};
 
export default Popup;