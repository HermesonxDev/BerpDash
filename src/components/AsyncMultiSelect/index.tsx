import React from "react";
import AsyncSelect from "react-select/async";
import { MultiValue, ActionMeta, StylesConfig } from "react-select";

interface OptionType {
    value: string;
    label: string;
}

interface AsyncMultiSelectProps {
    onChange: (selectedOptions: OptionType[]) => void;
}

const mockData = [
    { id: "1", name: "Unidade 1" },
    { id: "2", name: "Unidade 2" },
    { id: "3", name: "Unidade 3" },
    { id: "4", name: "Unidade 4" },
    { id: "5", name: "Unidade 5" },
];

const AsyncMultiSelect: React.FC<AsyncMultiSelectProps> = ({ onChange }) => {

    const loadOptions = (inputValue: string): Promise<OptionType[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const filteredOptions = mockData
                    .filter(item => item.name.toLowerCase().includes(inputValue.toLowerCase()))
                    .map(item => ({ value: item.id, label: item.name }));
                resolve(filteredOptions);
            }, 1000);
        });
    };

    const customStyles: StylesConfig<OptionType, true> = {
        container: (provided) => ({
            ...provided,
            width: "100%",
        }),
        control: (provided, state) => ({
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
            onChange={(
                newValue: MultiValue<OptionType>,
                actionMeta: ActionMeta<OptionType>
            ) => {
                onChange(newValue as OptionType[]);
            }}
            placeholder="Digite para buscar..."
            noOptionsMessage={() => "Digite para buscar opções"}
            styles={customStyles}
        />
    );
};

export default AsyncMultiSelect;
