import React, { useState, ReactNode, ChangeEvent, FormEvent } from 'react';

// Typy pro jednotlivá pole ve formuláři
type Field = {
    label: string;
    type?: string;  // Může být zadán typ (např. "text", "password"), ale není povinný
};

// Typ pro `fields` objekt, kde klíče jsou názvy polí a hodnoty jsou definice jednotlivých polí
type Fields = {
    [key: string]: Field;
};

// Typy pro props pro komponentu Form
interface FormProps {
    fields: Fields;
    onSubmit: (formData: { [key: string]: string }) => void;
    children: ReactNode;
}

const Form: React.FC<FormProps> = ({ fields, onSubmit, children }) => {
    // Stav pro data formuláře
    const [formData, setFormData] = useState<{ [key: string]: string }>(
        Object.keys(fields).reduce((acc, field) => {
            acc[field] = '';  // Inicializace každého pole na prázdnou hodnotu
            return acc;
        }, {} as { [key: string]: string })
    );

    // Funkce pro změnu hodnot ve formuláři
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Odeslání formuláře
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        onSubmit(formData);
    };

    // Injektování `value`, `onChange`, a dalších atributů jako `label`, `type` do dětí
    const enhancedChildren = React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        const fieldName = child.props.name;
        if (fields[fieldName]) {
            return React.cloneElement(child, {
                value: formData[fieldName],
                onChange: handleChange,
                label: fields[fieldName].label,  // Zajistíme správný label
                type: fields[fieldName].type || 'text',  // Defaultní typ bude text, pokud není zadaný
            });
        }
        return child;
    });

    return <form onSubmit={handleSubmit}>{enhancedChildren}</form>;
};

export default Form;
