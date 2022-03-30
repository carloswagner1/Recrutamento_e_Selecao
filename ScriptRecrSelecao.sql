create database tg;

use tg;

# CRIANDO AS TABELAS NECESSÁRIAS

Create table Candidato
(CodCand int not null,
 NomeCand varchar(40) not null,
 RG int,
 CPF int,
 Sexo char(1) check(sexo in ('F', 'f', 'M', 'm')),
 EstCivil varchar(15),
 DataNasc date,
 endereco varchar(50),
 cidade varchar(20),
 cep varchar(10),
 uf varchar(2));
 
 
 Create table Telefone
(IdTel int not null,
 CodCand int not null,
 TipoTel varchar(10),
 NumTel int);
 
 Create table Email
(IdEmail int not null,
 CodCand int not null,
 Email varchar(40));
 
 Create table ExpProf
(IdExp int not null,
 CodCand int not null,
 Empresa varchar(40),
 Cargo varchar(40),
 DescrTarefa varchar(200),
 DataAdm date,
 DataDesl date);
 
 Create table FormAcad
(IdForm int not null,
 CodCand int not null,
 TipoForm varchar(20),
 Curso varchar(40),
 Inst varchar(40),
 DataIngr date,
 DataConcl date);
 
 Create table Depto
(CodDepto int not null,
 NomeDepto varchar(40));
 
 Create table Cargo 
(CodCargo int not null,
 CodDepto int not null,
 NomeCargo varchar(40),
 FxSalMin decimal(7,2),  
 FxSalMax decimal(7,2),  
 DescrCargo varchar(100));
 
 Create table ProcSel
(IdProc int not null,
 CodCargo int not null,
 DataIni date,
 DataFin date,
 StatusProcSel varchar(15),
 IdTeste int not null);
 
 Create table Requisito
(IdReq int not null,
 IdProc int not null,
 DescrReq varchar(100),
 Tipo varchar(30));
 
 Create table Inscricao
(IdInscr int not null,
 CodCand int not null,
 IdProc int not null,
 DataInscr date,
 PretSal decimal(7,2),
 Situacao varchar(15));
 
 Create table assunto
 (IdAssunto int not null,
  DescrAssunto varchar(100)
 );

 Create table Teste (
IdTeste int not null,
IdAssunto int not null,
Descricao varchar (100),
Pontuacao decimal
);
 
 Create table InscricaoTeste 
 (IdInscr int not null,
 IdTeste int not null,
 Nota decimal,
 DataTeste date
 );

# DEFININDO AS RESTRIÇÕES PK (PRIMARY KEY)

Alter table Candidato
 add constraint PK_Candidado_CodCand PRIMARY KEY(CodCand);

Alter table Telefone
 add constraint PK_Telefone_IdTel PRIMARY KEY(IdTel);
 
Alter table Email
 add constraint PK_Email_IdEmail PRIMARY KEY(IdEmail);

Alter table ExpProf
 add constraint PK_ExpProf_IdExp PRIMARY KEY(IdExp);

Alter table FormAcad
 add constraint PK_FormAcad_IdForm PRIMARY KEY(IdForm);

Alter table Depto
 add constraint PK_Depto_CodDepto PRIMARY KEY(CodDepto);
 
Alter table Cargo
 add constraint PK_Cargo_CodCargo PRIMARY KEY(CodCargo); 
 
Alter table ProcSel
 add constraint PK_ProcSel_IdProc PRIMARY KEY(IdProc);
 
Alter table Requisito
 add constraint Requisito_IdReq PRIMARY KEY(IdReq);
 
Alter table Inscricao
 add constraint Inscricao_IdInscr PRIMARY KEY(IdInscr);

Alter table Assunto
 add constraint Assunto_IdAssunto PRIMARY KEY(IdAssunto);

Alter table Teste
 add constraint Teste_IdTeste PRIMARY KEY(IdTeste);
 
# DEFININDO AS RESTRIÇÕES FK (FOREIGN KEY)

Alter table Telefone 
 add constraint FK_Tel_CodCand FOREIGN KEY(CodCand) references Candidato(CodCand);

Alter table Email 
 add constraint FK_Email_CodCand FOREIGN KEY(CodCand) references Candidato(CodCand);

Alter table ExpProf 
 add constraint FK_ExpProf_CodCand FOREIGN KEY(CodCand) references Candidato(CodCand);
 
Alter table FormAcad
 add constraint FK_FormAcad_CodCand FOREIGN KEY(CodCand) references Candidato(CodCand);

Alter table Inscricao 
 add constraint FK_Inscricao_CodCand FOREIGN KEY(CodCand) references Candidato(CodCand); 
 
Alter table Inscricao 
 add constraint FK_Inscricao_IdProc FOREIGN KEY(IdProc) references ProcSel(IdProc);

Alter table ProcSel 
 add constraint FK_ProcSel_CodCargo FOREIGN KEY(CodCargo) references Cargo(CodCargo);

Alter table ProcSel 
 add constraint FK_ProcSel_IdTeste FOREIGN KEY(IdTeste) references Teste(IdTeste);


Alter table Requisito 
 add constraint FK_Requisito_IdProc FOREIGN KEY(IdProc) references ProcSel(IdProc);

Alter table Cargo 
 add constraint FK_Cargo_CodDepto FOREIGN KEY(CodDepto) references Depto (CodDepto);
 
 Alter table Teste 
 add constraint FK_Teste_IdAssunto FOREIGN KEY(IdAssunto) references Assunto(IdAssunto);

Alter table InscricaoTeste 
 add constraint FK_InscricaoTeste_IdTeste FOREIGN KEY(IdTeste) references Teste(IdTeste);
 
 Alter table InscricaoTeste 
 add constraint FK_InscricaoTeste_IdInscr FOREIGN KEY(IdInscr) references Inscricao(IdInscr);