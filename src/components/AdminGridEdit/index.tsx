import { useState, useEffect } from "react";
import { Container, Form, FormDiv, FormDivButton, FormTitle } from './styles';
import { useParams } from "react-router-dom";

import ContentHeader from "../ContentHeader";
import Anchor from "../Anchor";
import Input from "../Input";
import Button from "../Button";
import Label from "../Label";
import Select from "../Select";
import AsyncMultiSelect from "../AsyncMultiSelect";
import SearchUser from "../../hooks/SearchUser";

const AdminGridEdit: React.FC = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState<boolean | null>(null);
    const [units, setUnits] = useState<string[]>([]);

    const { id } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            if (id) {
                const userData = await SearchUser("id", id);

                if (userData && !Array.isArray(userData)) {

                    const mappedRole = (() => {
                        const roles = Array.isArray(userData.role) ? userData.role : [userData.role];
                        if (roles.includes('admin')) return 'admin';
                        if (roles.includes('owner')) return 'owner';
                        if (roles.includes('manager')) return 'manager';
                        return '';
                    })();
                    
                    setName(userData.nome || "");
                    setEmail(userData.email || "");
                    setRole(mappedRole);
                    setStatus(userData.status || null);
                    setUnits(userData.units || []);
                }
            }
        };

        fetchUserData();
    }, [id]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ name, email, role, status, units });
    };

    return (
        <Container>
            <ContentHeader title="Administração" lineColor="#1A73E8">
                <Anchor href="/administration/list-users">
                    Voltar
                </Anchor>
            </ContentHeader>

            <Form onSubmit={submit}>
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
                    <Select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="" disabled>
                            Selecione um papel
                        </option>
                        <option value="admin">Admin</option>
                        <option value="owner">Dono</option>
                        <option value="manager">Gerente</option>
                    </Select>
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
                        onChange={(selectedOptions) =>
                            setUnits(selectedOptions.map((option) => option.value))
                        }
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

export default AdminGridEdit;

