import React from 'react';
import classes from "./Input.css";

const Input = ( props ) =>  {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    
    // Props here are coming from the Contact Data component
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch(props.elementType) {
        case('input'):
            inputElement = <input className={inputClasses.join(" ")} {...props.elementConfig} onChange={props.changed} value={props.value}/>;
            break;
        case('textarea'):
            inputElement = <textarea className={inputClasses.join(" ")} {...props.elementConfig} onChange={props.changed} value={props.value} />;
            break;
        case('select'):
            inputElement = (
                <select
                    className={inputClasses.join(" ")}
                    onChange={props.changed}
                    value={props.value}>
                    {props.elementConfig.options.map (option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.value} />
    }

    // Where is props.label coming from? console.log returns undefined...
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default Input;
