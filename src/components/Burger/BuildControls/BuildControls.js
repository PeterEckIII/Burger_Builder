import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Lettuce", type: "lettuce" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const BuildControls = props => {
    console.log("BuildControlSSS props", props);
    return (
        <div className={classes.BuildControls}>
            <strong><p>Curren Price: ${props.price.toFixed(2)}</p></strong>
            {controls.map(ctrl => {
                return <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label} 
                    less={() => props.ingredientRemoved(ctrl.type)}
                    more={() => props.ingredientAdded(ctrl.type)}
                    disabled={props.disabled[ctrl.type]} />;
                })}
                <button 
                    className={classes.OrderButton}
                    disabled={!props.purchasable}
                    onClick={props.ordered}>PLACE YOUR ORDER</button>
        </div>
    );
};

export default BuildControls;
