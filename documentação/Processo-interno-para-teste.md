# Processo interno para testar a Cat42

## Listar 5 produtos que tenha ressarcimento

> **Nota** - Condições para encontrar estes produtos

- Do periodo que será importado, exemplo 01/01/2019, procure 5 produtos que tenham valor de ressarcimento. (Olhar tabela cat42_modelo3)
- Analisar se este 5 produtos selecionados anteriomente estão lançados na nota fiscal do periodo anterior, exemplo 01/12/2018 à 31/12/2018. Precisam esta lançados para este produtos serem utilizados. 

> **Query** - Lista os produtos e a Nota Fiscal com as condições acima
```sql
SELECT A.*,
       IN_PRODUTO_SERVICO_MESTRE.CD_PRODUTO_SERVICO,
       IN_PRODUTO_SERVICO_ITEM.DS_PRODUTO_SERVICO
FROM (





SELECT I.ID_NOTA_FISCAL_ENTRADA,
       I.NR_DOCUMENTO,
       I.ID_PRODUTO_SERVICO,
       M.DT_EMISSAO_DOCUMENTO,
       M.NR_CHAVE_NF_ELETRONICA
   FROM IN_NOTA_FISCAL_ENTRADA M
  INNER JOIN IN_NOTA_FISCAL_ENTRADA_ITEM I ON (M.ID_NOTA_FISCAL_ENTRADA = I.ID_NOTA_FISCAL_ENTRADA)
  WHERE M.ID_EMPRESA = 1
    AND M.DT_ENTRADA BETWEEN to_date('01/12/2018','dd/mm/yyyy') AND to_date('31/12/2018','dd/mm/yyyy')
    AND M.ID_NOTA_FISCAL_ENTRADA IN ( SELECT MAX(P.ID_NOTA_FISCAL_ENTRADA)
                                         FROM IN_NOTA_FISCAL_ENTRADA P
                                        INNER JOIN IN_NOTA_FISCAL_ENTRADA_ITEM F ON (P.ID_NOTA_FISCAL_ENTRADA = F.ID_NOTA_FISCAL_ENTRADA)
                                        WHERE P.ID_EMPRESA       = 1
                                          AND P.DT_ENTRADA BETWEEN to_date('01/12/2018','dd/mm/yyyy') AND to_date('31/12/2018','dd/mm/yyyy')
                                          AND F.ID_PRODUTO_SERVICO = I.ID_PRODUTO_SERVICO 
                                          AND P.DT_EMISSAO_DOCUMENTO =  (SELECT MAX(PP.DT_EMISSAO_DOCUMENTO)
                                                                           FROM IN_NOTA_FISCAL_ENTRADA PP
                                                                          INNER JOIN IN_NOTA_FISCAL_ENTRADA_ITEM FF ON (PP.ID_NOTA_FISCAL_ENTRADA = FF.ID_NOTA_FISCAL_ENTRADA)
                                                                          WHERE PP.ID_EMPRESA       = 1
                                                                            AND PP.DT_ENTRADA BETWEEN to_date('01/12/2018','dd/mm/yyyy') AND to_date('31/12/2018','dd/mm/yyyy')
                                                                            AND FF.ID_PRODUTO_SERVICO = I.ID_PRODUTO_SERVICO) )






) A 


 inner join IN_PRODUTO_SERVICO_MESTRE on IN_PRODUTO_SERVICO_MESTRE.Id_Produto_Servico = A.Id_Produto_Servico
 INNER JOIN IN_PRODUTO_SERVICO_ITEM   ON (IN_PRODUTO_SERVICO_MESTRE.ID_PRODUTO_SERVICO =  IN_PRODUTO_SERVICO_ITEM.ID_PRODUTO_SERVICO)
 WHERE IN_PRODUTO_SERVICO_ITEM.DT_INICIAL IN (SELECT MAX(ITEM.DT_INICIAL)
                                                FROM IN_PRODUTO_SERVICO_ITEM ITEM
                                               WHERE ITEM.ID_PRODUTO_SERVICO =
                                                     IN_PRODUTO_SERVICO_MESTRE.ID_PRODUTO_SERVICO
                                                 AND ITEM.DT_INICIAL <= a.dt_emissao_documento)
   AND IN_PRODUTO_SERVICO_MESTRE.ID_EMPRESA = 1
   and A.ID_PRODUTO_SERVICO IN (
select cat42_modelo3.Id_Produto_Servico 
  from cat42_modelo3
 where id_produto_servico in (13, 21, 22, 23, 25) 
   and dt_entrada_saida between to_date('01/01/2019','dd/mm/yyyy') AND to_date('31/01/2019','dd/mm/yyyy')
   and vl_ressarcimento is not null
   AND cat42_modelo3.Id_Empresa = 1
)
```

## Produto e Notas Listada

- Com os produto e notas fiscai encontrados utilize a chave eletrônica par procurar nos xml.

## Outro Método - Mais facil

- Liste os XML das notas ficais de entrada e com as chaves ficais em mãos, busque pelos produtos que tem o ressarcimento

> **Query** - Lista os produtos e a Nota Fiscal atráves da chave eletrônica

```
SELECT A.*,
       IN_PRODUTO_SERVICO_MESTRE.CD_PRODUTO_SERVICO,
       IN_PRODUTO_SERVICO_ITEM.DS_PRODUTO_SERVICO
FROM (
SELECT I.ID_NOTA_FISCAL_ENTRADA,
       I.NR_DOCUMENTO,
       I.ID_PRODUTO_SERVICO,
       M.DT_EMISSAO_DOCUMENTO,
       M.NR_CHAVE_NF_ELETRONICA
   FROM IN_NOTA_FISCAL_ENTRADA M
  INNER JOIN IN_NOTA_FISCAL_ENTRADA_ITEM I ON (M.ID_NOTA_FISCAL_ENTRADA = I.ID_NOTA_FISCAL_ENTRADA)
  WHERE M.ID_EMPRESA = 1
    AND M.DT_ENTRADA BETWEEN to_date('01/12/2018','dd/mm/yyyy') AND to_date('31/12/2018','dd/mm/yyyy')
                                                                                  
    AND M.NR_CHAVE_NF_ELETRONICA IN 

('42181282641986000143550030004089901722663440',
'42181282641986000143550030004072961572148300',
'41181260394723001388550040001135361001802340',
'41181260394723001388550040001132841003671899',
'41181260394723001388550040001135361001802340',
'35181217364307000174550010000018051008070008',
'35181217364307000174550010000018031052888300',
'35181217364307000174550010000018041980366065',
'35181217364307000174550010000018081633103359'
)

) A 
 inner join IN_PRODUTO_SERVICO_MESTRE on IN_PRODUTO_SERVICO_MESTRE.Id_Produto_Servico = A.Id_Produto_Servico
 INNER JOIN IN_PRODUTO_SERVICO_ITEM   ON (IN_PRODUTO_SERVICO_MESTRE.ID_PRODUTO_SERVICO =  IN_PRODUTO_SERVICO_ITEM.ID_PRODUTO_SERVICO)
 WHERE IN_PRODUTO_SERVICO_ITEM.DT_INICIAL IN (SELECT MAX(ITEM.DT_INICIAL)
                                                FROM IN_PRODUTO_SERVICO_ITEM ITEM
                                               WHERE ITEM.ID_PRODUTO_SERVICO =
                                                     IN_PRODUTO_SERVICO_MESTRE.ID_PRODUTO_SERVICO
                                                 AND ITEM.DT_INICIAL <= a.dt_emissao_documento)
   AND IN_PRODUTO_SERVICO_MESTRE.ID_EMPRESA = 1
   and A.ID_PRODUTO_SERVICO IN (
select cat42_modelo3.Id_Produto_Servico 
  from cat42_modelo3
 where dt_entrada_saida between to_date('01/01/2019','dd/mm/yyyy') AND to_date('31/01/2019','dd/mm/yyyy')
   and vl_ressarcimento is not null
   AND cat42_modelo3.Id_Empresa = 1
   AND cat42_modelo3.Id_Produto_Servico IN (13, 21, 23, 25, 66)
)
```