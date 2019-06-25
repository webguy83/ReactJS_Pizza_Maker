import React from 'react';

import styles from './CustomInput.module.css';

const addSpaceInWord = (word) => {
    return word.replace(/([A-Z])/g, ' $1').trim()
}

const CustomInput = (props) => {
    const { elname, config, label, value, handlechange, invalid, shouldValidate, touched } = props;

    const options = config.options ? config.options.map(item => {
        return <option key={item} value={item}>{item}</option>
    }) : null;

    let inputStyles = [styles.CustomInputElement];
    if (invalid && shouldValidate && touched) {
        inputStyles.push(styles.invalid);
    }

    let inputElement = null;
    switch (elname) {
        case "textarea":
            inputElement = <textarea name={label} className={inputStyles.join(" ")} {...config} placeholder="Enter your comments please." value={value} onChange={handlechange} />;
            break;
        case "select":
            inputElement = <select name={label} style={{ margin: "2rem 0" }} className={inputStyles.join(" ")} onChange={handlechange}>
                {options}
            </select>
            break;
        default:
            inputElement = <input className={inputStyles.join(" ")} {...config} placeholder={"Your " + addSpaceInWord(label)} name={label} value={value} onChange={handlechange} />;
            break;
    }

    return (
        <div className={styles.CustomInput}>
            {inputElement}
        </div>
    );
};

export default CustomInput;