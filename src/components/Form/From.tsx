import { useCallback, useState } from 'react';
import './Form.css';

interface FormProps {
    onSubmit(searchValue: string): void;
}

const Form = ({ onSubmit }: FormProps) => {
    const [ value, setValue ] = useState('');
    const onChangeCallback = useCallback(
        (e) => setValue(e.target.value), 
        []
    );

    const onSubmitCallback = useCallback(
        (e) => {
            e.preventDefault();

            setValue('');
            onSubmit(value);
        },
        [onSubmit, value]
    )

    return (
        <form 
            onSubmit={onSubmitCallback} 
            className="weather-form"
        >
            <span className="city-label">City</span>
            <input 
                value={value} 
                onChange={onChangeCallback} 
                placeholder="Enter city name"
            />
            <button>Search</button>
        </form>
    )
};

export default Form;