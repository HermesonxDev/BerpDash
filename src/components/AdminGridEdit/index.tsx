import { useState, useEffect } from "react";
import { Container, Form, FormDiv, FormDivButton, FormTitle } from './styles';
import { useNavigate, useParams } from "react-router-dom";

import ContentHeader from "../ContentHeader";
import Anchor from "../Anchor";
import Input from "../Input";
import Button from "../Button";
import Label from "../Label";
import Select from "../Select";
import AsyncMultiSelect from "../AsyncMultiSelect";

import listOfRoles from '../../utils/roles';

import { useFirestore } from "../../hooks/firestore";
interface OptionType {
    value: string;
    label: string;
}

const AdminGridEdit: React.FC = () => {

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [telephone, setTelephone] = useState<string>("");
    const [role, setRole] = useState<string[]>([]);
    const [status, setStatus] = useState<boolean | null>(null);
    const [units, setUnits] = useState<string[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<OptionType[]>([]);
    const [selectedUnits, setSelectedUnits] = useState<OptionType[]>([]);

    const { id } = useParams();
    
    const { SearchUser, getFirestore, editUserFirebase, getFirestoreWithSearch } = useFirestore()

    const { documents: listOfUnits } = getFirestore('units')

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

    useEffect(() => {
        const fetchUserData = async () => {
            if (id) {
                const userData = await SearchUser("id", id);

                if (userData && !Array.isArray(userData)) {
                    setName(userData.name || "")
                    setEmail(userData.email || "")
                    setPassword(userData.password || "")
                    setTelephone(userData.telephone || "")
                    setRole(userData.role || [])
                    setStatus(userData.status || null)
                    setUnits(userData.units || [])
                }
            }
        };

        fetchUserData();
    }, [id]);

    useEffect(() => {
        if (role.length > 0) {
            setSelectedRoles(role.map(r => ({
                value: r,
                label: listOfRoles.find(role => role.value === r)?.label || r
            })));
        }

        if (units.length > 0) {
            setSelectedUnits(units.map(u => {
                const foundUnit = listOfUnits.find(unit => unit.id === u);
                return {
                    value: foundUnit?.id || u,
                    label: foundUnit?.name || u
                };
            }));
        }
    }, [role, units, listOfUnits]);

    return (
        <Container>
            <ContentHeader title="Administração" lineColor="#1A73E8">
                <Anchor href="/administration/list-users">
                    Voltar
                </Anchor>
            </ContentHeader>

            <Form onSubmit={(event) => editUserFirebase(
                event,
                id,
                name,
                telephone,
                role,
                status,
                units,
                navigate
            )}>
                <FormTitle>Editar usuário</FormTitle>

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
                        value={email}
                        readOnly
                    />
                </FormDiv>

                <FormDiv>
                    <Label>Senha</Label>
                    <Input
                        type="password"
                        value={password}
                        readOnly
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
                    <Label>Cargo</Label>
                    <AsyncMultiSelect
                        loadData={loadRoleOptions}
                        onChange={(selectedOptions) => {
                            setSelectedRoles(selectedOptions);
                            setRole(selectedOptions.map(option => option.value));
                        }}
                        defaultValue={selectedRoles}
                    />
                </FormDiv>

                <FormDiv>
                    <Label>Status</Label>
                    <Select
                        value={status !== null ? status.toString() : "false"}
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
                        onChange={(selectedOptions) => {
                            setSelectedUnits(selectedOptions);
                            setUnits(selectedOptions.map(option => option.value));
                        }}
                        defaultValue={selectedUnits}
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
    );
}

export default AdminGridEdit;