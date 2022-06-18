-- DEPARTAMENTO
INSERT INTO tb_departamento VALUES (1, 'Administrativo');
INSERT INTO tb_departamento VALUES (2, 'Comercial');
INSERT INTO tb_departamento VALUES (3, 'Compras');
INSERT INTO tb_departamento VALUES (4, 'Comunicação');
INSERT INTO tb_departamento VALUES (5, 'Contábil');
INSERT INTO tb_departamento VALUES (6, 'Financeiro');
INSERT INTO tb_departamento VALUES (7, 'Jurídico');
INSERT INTO tb_departamento VALUES (8, 'Logística');
INSERT INTO tb_departamento VALUES (9, 'Marketing');
INSERT INTO tb_departamento VALUES (10, 'Operacional/Produção');
INSERT INTO tb_departamento VALUES (11, 'Recursos Humanos');
INSERT INTO tb_departamento VALUES (12, 'Segurança');
INSERT INTO tb_departamento VALUES (13, 'Tecnologia da Informação');
INSERT INTO tb_departamento VALUES (14, 'Vendas');

-- STATUS
INSERT INTO tb_status VALUES (1, 'Iniciado');
INSERT INTO tb_status VALUES (2, 'Teste');
INSERT INTO tb_status VALUES (3, 'Entrevista');
INSERT INTO tb_status VALUES (4, 'Concluído');
INSERT INTO tb_status VALUES (5, 'Reprovado no Teste');
INSERT INTO tb_status VALUES (6, 'Reprovado');
INSERT INTO tb_status VALUES (7, 'Aprovado');

-- CARGO
INSERT INTO tb_cargo VALUES(1, 'Analista de Sistemas', 'Desenvolvedor Frontend Junior', 13);
INSERT INTO tb_cargo VALUES(2, 'Analista de Sistemas', 'Tecnologo', 13);
INSERT INTO tb_cargo VALUES(3, 'Analista de Sistemas', 'Desenvolvedor Backend Pleno',  13);
INSERT INTO tb_cargo VALUES(4, 'Analista de Sistemas', 'Desenvolvedor Backend Pleno Senior', 13);
INSERT INTO tb_cargo VALUES(5, 'Analista de Sistemas', 'Analista de Dados Junior', 13);

-- SOLICITACAO VAGA
INSERT INTO tb_solicitacao_vaga VALUES(1, 'Necessário', 'São Paulo', 2, 'Inglês fluente', 'Finalizada', 'Efetivo', 1);
INSERT INTO tb_solicitacao_vaga VALUES(2, 'Necessário', 'Rio de Janeiro', 2, 'Nenhum', 'Finalizada', 'Efetivo', 2);
INSERT INTO tb_solicitacao_vaga VALUES(3, 'Necessário', 'São Paulo', 1, 'Nenhum', 'Finalizada', 'Efetivo', 3);
INSERT INTO tb_solicitacao_vaga VALUES(4, 'Necessário', 'Pará', 3, 'Inglês intermediário', 'Finalizada', 'Efetivo', 1);
INSERT INTO tb_solicitacao_vaga VALUES(5, 'Necessário', 'São Paulo', 1, 'Nenhum', 'Aprovada', 'Efetivo', 3);
INSERT INTO tb_solicitacao_vaga VALUES(6, 'Necessário', 'Pará', 1, 'Inglês intermediário', 'Em Análise', 'Efetivo', 1);

-- PROCESSO SELETIVO
INSERT INTO tb_processo_seletivo VALUES(1, 'TI', '2022-09-09', '2022-08-09', 'Lógica de programação', 3, 1, 1);
INSERT INTO tb_processo_seletivo VALUES(2, 'TI', '2022-09-09', '2022-08-09', 'Java 17', 5, 2, 1);
INSERT INTO tb_processo_seletivo VALUES(3, 'TI', '2022-09-09', '2022-08-09', 'Angular', 1, 3, 1);
INSERT INTO tb_processo_seletivo VALUES(4, 'TI', '2022-09-09', '2022-08-09', 'Lógica de programação', 4, 4, 1);

-- CANDIDATO
INSERT INTO tb_candidato VALUES (1, 'TI', 'Jardim', '15981196538', '18021310', 'Sorocaba', '38974521890', '1990-11-12', 'diego@mail.com', 'SP', 'Masculino', 'Diego', 'Brasil', 'Rua Souza');
INSERT INTO tb_candidato VALUES (2, 'TI', 'Jardim', '15981196530', '18021310', 'Sorocaba', '24611075800', '2001-09-10', 'carlos@mail.com', 'SP', 'Masculino', 'Carlos', 'Brasil', 'Rua Souza');
INSERT INTO tb_candidato VALUES (3, 'TI', 'Jardim', '15981196531', '18021310', 'Sorocaba', '70595456030', '2001-09-10', 'jessica@mail.com', 'SP', 'Feminino', 'jessica', 'Brasil', 'Rua Souza');
INSERT INTO tb_candidato VALUES (4, 'TI', 'Jardim', '15981196532', '18021310', 'Sorocaba', '72717632018', '2001-09-10', 'kelly@mail.com', 'SP', 'Feminino', 'kelly', 'Brasil', 'Rua Souza');
INSERT INTO tb_candidato VALUES (5, 'TI', 'Jardim', '15981196535', '18021310', 'Sorocaba', '50834633000', '2001-09-10', 'lucas@mail.com', 'SP', 'Masculino', 'Lucas', 'Brasil', 'Rua Souza');

-- INSCRICAO
INSERT INTO tb_inscricao VALUES (1, '2022-09-09', null, null, null, 1, 1, 2);
INSERT INTO tb_inscricao VALUES (2, '2022-09-09', null, null, null, 1, 2, 1);
INSERT INTO tb_inscricao VALUES (3, '2022-09-09', null, null, null, 2, 1, 2);
INSERT INTO tb_inscricao VALUES (4, '2022-09-09', null, null, null, 2, 2, 1);
INSERT INTO tb_inscricao VALUES (5, '2022-09-09', null, null, null, 3, 1, 2);
INSERT INTO tb_inscricao VALUES (6, '2022-09-09', null, null, null, 3, 2, 1);
INSERT INTO tb_inscricao VALUES (7, '2022-09-09', null, null, null, 4, 1, 1);
INSERT INTO tb_inscricao VALUES (8, '2022-09-09', null, null, null, 4, 2, 1);
INSERT INTO tb_inscricao VALUES (9, '2022-09-09', null, null, null, 5, 1, 2);

-- USUARIO_CANDIDATO
INSERT INTO tb_usuario_candidato VALUES (1, 'diego@mail.com', '+rKLXWvIsjFOndd9jK7s6Q==', '1');
INSERT INTO tb_usuario_candidato VALUES (2, 'carlos@mail.com', '+rKLXWvIsjFOndd9jK7s6Q==', '1');
INSERT INTO tb_usuario_candidato VALUES (3, 'jessica@mail.com', '+rKLXWvIsjFOndd9jK7s6Q==', '1');
INSERT INTO tb_usuario_candidato VALUES (4, 'kelly@mail.com', '+rKLXWvIsjFOndd9jK7s6Q==', '1');
INSERT INTO tb_usuario_candidato VALUES (5, 'lucas@mail.com', '+rKLXWvIsjFOndd9jK7s6Q==', '1');


-- USUARIO_FUNCIONARIO
INSERT INTO tb_usuario_funcionario VALUES (1, '15981196533', '97373313035', 'funcionario@mail.com', '+rKLXWvIsjFOndd9jK7s6Q==', 'Pedro Ferreira', 'Funcionário do RH', 13);
INSERT INTO tb_usuario_funcionario VALUES (2, '15981196535', '93624904043', 'gestor@mail.com', '+rKLXWvIsjFOndd9jK7s6Q==', 'Amanda Carneiro', 'Gestor de Departamento', 1);

-- FORMACAO_ACADEMICA
INSERT INTO tb_formacao_academica VALUES (1, 'Analise e Desenvolvimento de Sistemas', '2019-01-01', '2021-12-01', 'FATEC - Faculdade de Tecnologia de Sorocaba', 'Tecnólogo', 1);
INSERT INTO tb_formacao_academica VALUES (2, 'Ciência da Computação', '2015-01-01', '2020-12-01', 'UNICAMP - Universidade Estadual de Campinas', 'Graduação', 2);
INSERT INTO tb_formacao_academica VALUES (3, 'Mestrado Acadêmico em Ciência da Computação', '2021-02-01', '2022-05-31', 'UFSCAR - Universidade Federal de São Carlos', 'Mestrado', 2);
INSERT INTO tb_formacao_academica VALUES (4, 'Analise e Desenvolvimento de Sistemas', '2020-01-01', '2022-12-01', 'FATEC - Faculdade de Tecnologia de Sorocaba', 'Tecnólogo', 3);

-- EXPERIENCIA_PROFISSIONAL
INSERT INTO tb_experiencia_profissional VALUES (1, 'Analista de Sistemas', '2021-01-01', '2022-05-31', 'Docshifter', 1);
INSERT INTO tb_experiencia_profissional VALUES (2, 'Desenvolvedor de Software', '2020-01-01', '2020-11-25', 'GFT', 1);
INSERT INTO tb_experiencia_profissional VALUES (3, 'Analista de Sistema', '2021-04-01', '2022-05-31', 'Alvin', 2);
INSERT INTO tb_experiencia_profissional VALUES (4, 'Analista de Infraestrutura', '2019-01-01', '2021-01-24', 'Thoughtworks', 2);
INSERT INTO tb_experiencia_profissional VALUES (5, 'Estágio em Desenvolvimento', '2021-01-01', '2022-05-31', 'Ifood', 3);
