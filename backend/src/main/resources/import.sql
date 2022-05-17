-- DEPARTAMENTO
INSERT INTO tb_departamento VALUES (1, 'TI');
INSERT INTO tb_departamento VALUES (2, 'RH');

-- CARGO
INSERT INTO tb_cargo VALUES(1, 'Analista de Sistemas', 'https://link', 'Analista', 1);
INSERT INTO tb_cargo VALUES(2, 'Analista de RH', 'https://link', 'Tecnologo', 1);
INSERT INTO tb_cargo VALUES(3, 'Analista de Sistemas', 'https://link', 'Analista',  2);
INSERT INTO tb_cargo VALUES(4, 'Analista de RH', 'https://link', 'Tecnologo', 2);

-- SOLICITACAO VAGA
INSERT INTO tb_solicitacao_vaga VALUES(1, 'Necessário', 'Sorocaba', 2, 'Nenhum', 'Efetivo', 1);
INSERT INTO tb_solicitacao_vaga VALUES(2, 'Necessário', 'Santos', 2, 'Nenhum', 'Estágio', 3);

-- STATUS
INSERT INTO tb_status VALUES (1, 'Iniciado');
INSERT INTO tb_status VALUES (1, 'Teste');
INSERT INTO tb_status VALUES (1, 'Entrevista');
INSERT INTO tb_status VALUES (1, 'Concluido');

-- PROCESSO SELETIVO
INSERT INTO tb_processo_seletivo VALUES(1, 'TI', '2022-09-09', '2022-08-09', 1, 1, 1);
INSERT INTO tb_processo_seletivo VALUES(2, 'TI', '2022-09-09', '2022-08-09', 3, 2, 1);

-- CANDIDATO
INSERT INTO tb_candidato VALUES (1, 'ti', 'Jardim', '15981196538', '18021310', 'Sorocaba', '38974521890', '1990-11-12', 'diego@mail.com', 'SP', 'M', 'Diego', 'Brasil', 'Rua Souza');
INSERT INTO tb_candidato VALUES (2, 'ti', 'Jardim', '15981196530', '18021310', 'Sorocaba', '24611075800', '2001-09-10', 'carlos@mail.com', 'SP', 'M', 'Carlos', 'Brasil', 'Rua Souza');
INSERT INTO tb_candidato VALUES (3, 'ti', 'Jardim', '15981196531', '18021310', 'Sorocaba', '24611075800', '2001-09-10', 'jessica@mail.com', 'SP', 'F', 'jessica', 'Brasil', 'Rua Souza');
INSERT INTO tb_candidato VALUES (4, 'ti', 'Jardim', '15981196532', '18021310', 'Sorocaba', '24611075800', '2001-09-10', 'kelly@mail.com', 'SP', 'F', 'kelly', 'Brasil', 'Rua Souza');
INSERT INTO tb_candidato VALUES (5, 'ti', 'Jardim', '15981196535', '18021310', 'Sorocaba', '24611075800', '2001-09-10', 'lucas@mail.com', 'SP', 'M', 'lucas', 'Brasil', 'Rua Souza');

-- INSCRICAO
INSERT INTO tb_inscricao VALUES (1, '2022-09-09', 1, 1, 1);
INSERT INTO tb_inscricao VALUES (2, '2022-09-09', 1, 2, 1);
INSERT INTO tb_inscricao VALUES (3, '2022-09-09', 2, 1, 1);
INSERT INTO tb_inscricao VALUES (4, '2022-09-09', 2, 2, 1);
INSERT INTO tb_inscricao VALUES (5, '2022-09-09', 3, 1, 1);
INSERT INTO tb_inscricao VALUES (6, '2022-09-09', 3, 2, 1);
INSERT INTO tb_inscricao VALUES (7, '2022-09-09', 4, 1, 1);
INSERT INTO tb_inscricao VALUES (8, '2022-09-09', 4, 2, 1);
INSERT INTO tb_inscricao VALUES (9, '2022-09-09', 5, 1, 1);
INSERT INTO tb_inscricao VALUES (10, '2022-09-09', 5, 2, 1);

-- USUARIO_CANDIDATO
INSERT INTO tb_usuario_candidato VALUES (1, 'diego@mail.com', '+rKLXWvIsjFOndd9jK7s6Q==', '1');
INSERT INTO tb_usuario_candidato VALUES (2, 'carlos@mail.com', '+rKLXWvIsjFOndd9jK7s6Q==', '1');
INSERT INTO tb_usuario_candidato VALUES (3, 'jessica@mail.com', '+rKLXWvIsjFOndd9jK7s6Q==', '1');
INSERT INTO tb_usuario_candidato VALUES (4, 'kelly@mail.com', '+rKLXWvIsjFOndd9jK7s6Q==', '1');
INSERT INTO tb_usuario_candidato VALUES (5, 'lucas@mail.com', '+rKLXWvIsjFOndd9jK7s6Q==', '1');
