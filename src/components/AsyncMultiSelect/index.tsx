import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import { MultiValue, ActionMeta, StylesConfig } from "react-select";

interface OptionType {
    value: string;
    label: string;
}

const mockData = [
    { id: "1", name: "Item 1" },
    { id: "2", name: "Item 2" },
    { id: "3", name: "Item 3" },
    { id: "4", name: "Item 4" },
    { id: "5", name: "Item 5" },
];

const AsyncMultiSelect: React.FC = () => {
    const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);

    const handleChange = (newValue: MultiValue<OptionType>, actionMeta: ActionMeta<OptionType>) => {
        setSelectedOptions(newValue as OptionType[]);
    };

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
            onChange={handleChange}
            value={selectedOptions}
            placeholder="Digite para buscar..."
            noOptionsMessage={() => "Digite para buscar opções"}
            styles={customStyles}
        />
    );
};

export default AsyncMultiSelect;
