import React from "react";
import AsyncSelect from "react-select/async";
import { MultiValue, StylesConfig } from "react-select";

interface OptionType {
    value: string;
    label: string;
}

interface AsyncMultiSelectProps {
    onChange: (selectedOptions: OptionType[]) => void,
    loadData: (inputValue: string) => Promise<OptionType[]>,
    defaultValue?: OptionType[];
}

const AsyncMultiSelect: React.FC<AsyncMultiSelectProps> = ({ onChange, loadData, defaultValue }) => {

    const loadOptions = async (inputValue: string): Promise<OptionType[]> => {
        return await loadData(inputValue);
    }

    const customStyles: StylesConfig<OptionType, true> = {
        container: (provided) => ({
            ...provided,
            width: "100%",
            '@media (max-width: 770px)': {
                width: "80%"
            },
            '@media (max-width: 420px)': {
                width: "70%",
            },
            '@media (max-width: 400px)': {
                width: "68%"
            }
        }),
        control: (provided) => ({
            ...provided,
            width: "100%",
            borderRadius: "5px",
            margin: "7px 0",
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: "#fff",
            borderRadius: "5px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#333" : state.isFocused ? "#ddd" : "#fff",
            color: state.isSelected ? "#fff" : "#333",
            padding: "10px",
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: "#bfbfbf",
            borderRadius: "3px",
            color: "#fff",
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: "#fff",
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: "#fff",
            "&:hover": {
                backgroundColor: "#D9D9D9",
                color: "#fff",
            },
        }),
        placeholder: (provided) => ({
            ...provided,
            fontSize: "13px",
        }),
    };

    return (
        <AsyncSelect
            isMulti
            cacheOptions
            defaultOptions={false}
            loadOptions={loadOptions}
            onChange={(newValue: MultiValue<OptionType>) => onChange(newValue as OptionType[])}
            placeholder="Digite para buscar..."
            noOptionsMessage={() => "Digite para buscar opções"}
            styles={customStyles}
            value={defaultValue}
        />
    );
};

export default AsyncMultiSelect;
