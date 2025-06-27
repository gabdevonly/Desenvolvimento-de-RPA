/*
Responsavel por automatizar o cadastro de uma nova Unidade Gestora no sistema AgendaCash.
Ele abre o navegador usando Playwright, faz login com a função `realizarLogin`,
gera dados fictícios (CNPJ, telefone e CEP) usando funções utilitárias,
preenche os dados básicos da unidade, preenche o endereço,
tira capturas de tela em cada etapa para registro
e finaliza salvando o cadastro e fechando o navegador.
*/

import { config } from "dotenv";
import { chromium } from "playwright";
import { realizarLogin, geracnpj, geraTelefone, geracep } from "./Funcoes";

config();

(async () => {
  //Conectando o navegador e incializando com o site do AGENDA CASH
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  const cnpj = await geracnpj();
  const telefone = await geraTelefone();
  const cep = await geracep();
  const nome = "Teste Automatizado";

  try {
    await realizarLogin(page);
  } catch {
    await page.screenshot({ path: "imagens_UnidadeGestora/Erro_Login.png" });
    console.log("Erro ao efetuar login");
  }

  try {
    await page.click("#Gestão");
    await page.click("text=Unidades Gestoras");
    await page.click('button:has-text("Adicionar")');
    await page.fill("#name", nome);
    await page.fill("#cnpj", cnpj.toString());
    await page.fill("#corporate-name", nome);
    await page.fill("#acronym", "TAT");
    await page.fill("#phone", telefone);

    await page.screenshot({
      path: "imagens_UnidadeGestora/Confirmacao_Cadastro_UnidadeGestora_AbaDadosBasicos.png",
    });
    await page.waitForTimeout(500);
  } catch {
    await page.screenshot({
      path: "imagens_UnidadeGestora/Erro_Cadastro_Tomador_DadosBasicos.png",
    });
    console.log(
      'Houve uma falha ao executar o bloco de codigo da aba "DADOS BASICOS". verifique!!'
    );
  }

  try {
    await page.click('button:has-text("Endereço")');
    await page.fill("#cep", cep.toString());
    await page.waitForTimeout(3000);
    await page.fill("#number", "1");
    await page.screenshot({
      path: "imagens_UnidadeGestora/Confirmacao_Cadastro_UnidadeGestora_AbaEndereco.png",
    });
    await page.click('button:has-text("Salvar")');
    await page.screenshot({
      path: "imagens_UnidadeGestora/Confirmacao_Cadastro_UnidadeGestora_Confirmacao.png",
    });
    console.log(
      "Processo de teste finalizado, verificar se os testes ocorreram corretamente."
    );
    await browser.close();
  } catch {
    console.log(
      'Houve uma falha ao executar o bloco de codigo da aba "ENDERECO". verifique!!'
    );
  }
})();
