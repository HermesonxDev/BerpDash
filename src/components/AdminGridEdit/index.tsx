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
import SearchUser from "../../hooks/SearchUser";

import listOfRoles from '../../utils/roles';
import listOfUnits from '../../utils/units';
import { doc, getFirestore, setDoc } from "firebase/firestore";
import app from "../../config/firebase";
interface OptionType {
    value: string;
    label: string;
}

const AdminGridEdit: React.FC = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<string[]>([]);
    const [status, setStatus] = useState<boolean | null>(null);
    const [units, setUnits] = useState<string[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<OptionType[]>([]);
    const [selectedUnits, setSelectedUnits] = useState<OptionType[]>([]);

    const { id } = useParams();
    const db = getFirestore(app)
    const navigate = useNavigate()

    const loadRoleOptions = async (): Promise<OptionType[]> => {
        return listOfRoles.map(item => ({
            value: item.value,
            label: item.label,
        }));
    };
    
    const loadUnitOptions = async (): Promise<OptionType[]> => {
        return listOfUnits.map(item => ({
            value: item.value,
            label: item.label,
        }));
    };

    useEffect(() => {
        const fetchUserData = async () => {
            if (id) {
                const userData = await SearchUser("id", id);

                if (userData && !Array.isArray(userData)) {
                    setName(userData.name || "");
                    setEmail(userData.email || "");
                    setRole(userData.role || []);
                    setStatus(userData.status || null);
                    setUnits(userData.units || []);
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
            setSelectedUnits(units.map(u => ({
                value: u,
                label: listOfUnits.find(unit => unit.value === u)?.label || u
            })));
        }
    }, [role, units]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            if (id) {
                const userRef = doc(db, "users", id);
                await setDoc(userRef, {
                    name,
                    email,
                    role,
                    status,
                    units
                }, { merge: true });
            }
            navigate("/administration/list-users")
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
        }
    }
    
    return (
        <Container>
            <ContentHeader title="Administração" lineColor="#1A73E8">
                <Anchor href="/administration/list-users">
                    Voltar
                </Anchor>
            </ContentHeader>

            <Form onSubmit={handleSubmit}>
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
                        placeholder="Digite um email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </FormDiv>

                <FormDiv>
                    <Label>Papel</Label>
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