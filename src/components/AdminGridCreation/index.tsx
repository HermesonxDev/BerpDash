import { useState } from "react";
import { Container, Form, FormTitle, FormDiv, FormDivButton } from "./styles";
import { useNavigate } from "react-router-dom";
import { useFirestore } from "../../hooks/firestore";

import ContentHeader from "../ContentHeader";
import Anchor from "../Anchor";
import Input from "../Input";
import Button from "../Button";
import Label from "../Label";
import Select from "../Select";
import AsyncMultiSelect from "../AsyncMultiSelect";

import listOfRoles from '../../utils/roles'

interface OptionType {
    value: string;
    label: string;
}

const AdminGridCreation: React.FC = () => {
    
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [telephone, setTelephone] = useState<string>("");
    const [role, setRole] = useState<string[]>([]);
    const [status, setStatus] = useState<boolean | null>(null);
    const [units, setUnits] = useState<string[]>([]);

    const { createUserFirebase, getFirestoreWithSearch } = useFirestore()
    const navigate = useNavigate()

    const loadRoleOptions = async (): Promise<OptionType[]> => {
        return listOfRoles.map(item => ({
            value: item.value,
            label: item.label,
        }))
    }
    
    const loadUnitOptions = async (inputValue: string): Promise<OptionType[]> => {
        const units = await getFirestoreWithSearch('units', inputValue);
        return units.map(unit => ({
            value: unit.id,
            label: unit.name,
        }))
    }

    return (
        <Container>
            <ContentHeader title="Administração" lineColor="#1A73E8">
                <Anchor href="/administration/list-users">
                    Voltar
                </Anchor>
            </ContentHeader>

            <Form onSubmit={
                (event) => createUserFirebase(
                    event,
                    name,
                    email,
                    password,
                    telephone,
                    role,
                    status,
                    units,
                    navigate
            )}>
                <FormTitle>Cadastro de usuário</FormTitle>

                <FormDiv>
                    <Label>Nome</Label>
                    <Input
                        type="text"
                        placeholder="Digite um nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </FormDiv>

                <FormDiv>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        placeholder="Digite um email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </FormDiv>

                <FormDiv>
                    <Label>Senha</Label>
                    <Input
                        type="password"
                        placeholder="Digite uma senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </FormDiv>

                <FormDiv>
                    <Label>Telefone</Label>
                    <Input
                        type="text"
                        placeholder="Digite um telefone"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        required
                    />
                </FormDiv>

                <FormDiv>
                    <Label>Papel</Label>
                    
                    <AsyncMultiSelect
                        loadData={loadRoleOptions}
                        onChange={(selectedOptions) => setRole(selectedOptions.map(option => option.value))}
                    />
                </FormDiv>

                <FormDiv>
                    <Label>Status</Label>
                    <Select
                        value={status !== null ? status.toString() : ""}
                        onChange={(e) => setStatus(e.target.value === "true")}
                    >
                        <option value="" disabled>
                            Selecione um status
                        </option>
                        <option value="true">Ativo</option>
                        <option value="false">Inativo</option>
                    </Select>
                </FormDiv>

                <FormDiv>
                    <Label>Unidades</Label>
                    <AsyncMultiSelect
                        loadData={loadUnitOptions}
                        onChange={(selectedOptions) => setUnits(selectedOptions.map(option => option.value))}
                    />
                </FormDiv>

                <FormDivButton>
                    <Button type="submit">Confirmar</Button>
                    <Anchor href="/administration/list-users">
                        Cancelar
                    </Anchor>
                </FormDivButton>
            </Form>
        </Container>
    )
}

export default AdminGridCreation;
