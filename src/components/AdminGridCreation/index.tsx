import { Container, Form, FormTitle, FormDiv } from "./styles";

import ContentHeader from "../ContentHeader";
import Anchor from "../Anchor";
import Input from "../Input";
import Button from "../Button";
import Label from "../Label";
import Select from "../Select";
import AsyncMultiSelect from "../AsyncMultiSelect";

const AdminGridCreation: React.FC = () => {

    return (
        <Container>
            <ContentHeader title="Administração" lineColor="#1A73E8">
                <Anchor href="/administration/list-users">
                    Voltar
                </Anchor>
            </ContentHeader>

            <Form onSubmit={() => {}}>
                    <FormTitle>Cadastro de usuário</FormTitle>

                    <FormDiv>
                        <Label>Nome</Label>

                        <Input
                            type="text"
                            placeholder="Digite um nome"
                            onChange={() => {}}
                            required
                        />
                    </FormDiv>

                    <FormDiv>
                        <Label>Email</Label>
                        
                        <Input
                            type="email"
                            placeholder="Digite um email"
                            onChange={() => {}}
                            required
                        />
                    </FormDiv>

                    <FormDiv>
                        <Label>Senha</Label>

                        <Input
                            type="password"
                            placeholder="Digite uma senha"
                            onChange={() => {}}
                            required
                        />
                    </FormDiv>

                    <FormDiv>
                        <Label>Papel</Label>

                        <Select>
                        <option value="" disabled selected hidden />
                            <option>Admin</option>
                            <option>Dono</option>
                            <option>Gerente</option>
                        </Select>
                    </FormDiv>

                    <FormDiv>
                        <Label>Status</Label>

                        <Select>
                            <option value="" disabled selected hidden />
                            <option>Ativo</option>
                            <option>Inativo</option>
                        </Select>
                    </FormDiv>

                    <FormDiv>
                        <Label>Unidades</Label>

                        <AsyncMultiSelect />
                    </FormDiv>

                    <Button type="submit">Confirmar</Button>
                </Form>
        </Container>
    )
}

export default AdminGridCreation