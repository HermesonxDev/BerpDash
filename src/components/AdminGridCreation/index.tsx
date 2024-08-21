import { useState } from "react";
import { Container, Form, FormTitle, FormDiv } from "./styles";

import ContentHeader from "../ContentHeader";
import Anchor from "../Anchor";
import Input from "../Input";
import Button from "../Button";
import Label from "../Label";
import Select from "../Select";
import AsyncMultiSelect from "../AsyncMultiSelect";

const AdminGridCreation: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState<boolean | null>(null);
    const [units, setUnits] = useState<string[]>([]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({name, email, password, role, status, units});
    };

    return (
        <Container>
            <ContentHeader title="Administração" lineColor="#1A73E8">
                <Anchor href="/administration/list-users">
                    Voltar
                </Anchor>
            </ContentHeader>

            <Form onSubmit={submit}>
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
                    <Label>Papel</Label>
                    <Select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="" disabled>
                            Selecione um papel
                        </option>
                        <option value="Admin">Admin</option>
                        <option value="Dono">Dono</option>
                        <option value="Gerente">Gerente</option>
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

                <Button type="submit">Confirmar</Button>
            </Form>
        </Container>
    );
};

export default AdminGridCreation;
