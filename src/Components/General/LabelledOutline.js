import React from "react";
import ReactDOM from "react-dom";
import InputLabel from "@material-ui/core/InputLabel";
import NotchedOutline from "@material-ui/core/OutlinedInput/NotchedOutline";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    position: "relative"
  },
  content: {
    padding: "18.5px 14px"
  },
  inputLabel: {
    position: "absolute",
    left: 0,
    top: 0,
    // slight alteration to spec spacing to match visual spec result
    transform: "translate(14px, 20px) scale(0.75)"
  }
};

const LabelledOutline = ({ classes, id, label, children, button }) => {
  const [labelWidth, setLabelWidth] = React.useState(0);
  const labelRef = React.useRef(null);
  React.useEffect(() => {
    const labelNode = ReactDOM.findDOMNode(labelRef.current);
    setLabelWidth(labelNode != null ? labelNode.offsetWidth : 0);
  }, [label]);

  return (
    <div style={{ position: "relative", marginTop: "8px" }}>
      <div style={{display: "flex", flexDirection: "row"}}>
      <InputLabel
        ref={labelRef}
        htmlFor={id}
        variant="outlined"
        className={classes.inputLabel}
      >
          {label}
      </InputLabel>
      {button}
      </div>
      
      <div className={classes.root}>
        <div id={id} className={classes.content}>
          {children}
          <NotchedOutline notched labelWidth={labelWidth} />
        </div>
      </div>
      
    </div>
  );
};
export default withStyles(styles)(LabelledOutline);
