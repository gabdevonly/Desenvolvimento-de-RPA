/*
Este script inicializa o navegador Playwright, faz login na plataforma AgendaCash,
gera dados fictícios (CPF, RG, telefone, matrícula) e executa o cadastro de um tomador,
preenchendo informações pessoais e de segurado, com os dados ficticios que gerou, tirando capturas de tela de cada etapa.
*/

import { config } from "dotenv";
import { chromium } from "playwright";
import {
  realizarLogin,
  geracpf,
  geraRG,
  geraTelefone,
  geraMat,
} from "./Funcoes";

config();

(async () => {
  //Conectando o navegador e incializando com o site do AGENDA CASH
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  const cpf = await geracpf();
  const RG = await geraRG();
  const telefone = geraTelefone();
  const matricula = geraMat(5);
  const nome = "Teste";
  const sobrenome = "Automatizado";
  const dominEmail = "@email.com";

  try {
    await realizarLogin(page);
  } catch {
    await page.screenshot({ path: "imagens_Tomador/Erro_Login.png" });
    console.log("Erro ao efetuar login");
  }

  try {
    await page.click("#Cadastros");
    await page.click("text=Tomadores");
    await page.click('button:has-text("Adicionar")');
    await page.fill("#name", nome + " " + sobrenome);
    await page.fill("#socialName", nome + " " + sobrenome);
    await page.fill("#cpf", cpf.toString());

    //Função para alterar o valor do campo, diretamente no elemento/console da pagina

    await page.evaluate(() => {
      const input = document.getElementById("birthDate");
      if (input) {
        input.removeAttribute("readonly");
      }
    });

    try {
      await page.waitForTimeout(200);
      await page.click("#birthDate");
      await page.click('button:has-text("junho de 2025")');
      await page.click('button:has-text("2025")');
      await page.click("button.rounded-lg");
      await page.click("button.rounded-lg");
      await page.click('button:has-text("1999")');
      await page.waitForTimeout(500);
      await page.click('button:has-text("jan.")');
      await page.waitForTimeout(500);
      await page.click('button:has-text("18")');
    } catch {
      console.log("Não foi possivel selecionar a data de nascimento");
    }

    await page.fill("#phone", telefone.toString());
    await page.fill("#email", nome + "." + sobrenome + dominEmail);
    await page.selectOption("select#managingUnitId", {
      label: "Prefeitura de Cuiabá - SISPREV",
    });
    await page.fill("#rgNumber", RG.toString());
    await page.selectOption("select#rgIssuingAgency", { label: "Outros" });
    await page.selectOption("select#rgIssuingState", { label: "Mato Grosso" });

    try {
      await page.click("#rgIssueDate");
      await page.click('button:has-text("junho de 2025")');
      await page.click('button:has-text("2025")');
      await page.click("button.rounded-lg");
      await page.click("button.rounded-lg");
      await page.click('button:has-text("2006")');
      await page.waitForTimeout(500);
      await page.click('button:has-text("jan.")');
      await page.waitForTimeout(500);
      await page.click('button:has-text("18")');
    } catch {
      console.log("Não foi possivel selecionar a data de emissão RG");
    }

    await page.screenshot({
      path: "imagens_Tomador/Confirmacao_Cadastro_Tomador_Abacadastrais.png",
    });
  } catch {
    await page.screenshot({
      path: "imagens_Tomador/Erro_Cadastro_Tomador_DadosCadastrais.png",
    });
    console.log(
      'Houve uma falha ao executar o bloco de codigo da aba "DADOS CADASTRAIS". verifique!!'
    );
  }

  try {
    await page.click('button:has-text("Dados do Segurado")');
    await page.fill("#registration", matricula.toString());
    await page.selectOption("select#category", { label: "Ativo" });
    await page.selectOption("select#agencyId", {
      label: "Prefeitura de Cuiabá",
    });
    await page.selectOption("select#productTypeId", {
      label: "Produto Premium",
    });
    await page.screenshot({
      path: "imagens_Tomador/Confirmacao_Cadastro_Tomador_AbaSegurado.png",
    });
    await page.click('button:has-text("Salvar")');
    console.log(
      "Processo de teste finalizado, verificar se os testes ocorreram corretamente."
    );

    await page.waitForTimeout(500);

    await page.screenshot({
      path: "imagens_Tomador/Confirmacao_Cadastro_Tomador_Confirmacao.png",
    });
    await browser.close();
  } catch {
    await page.screenshot({
      path: "imagens_Tomador/Erro_Cadastro_Tomador_DadosSegurado.png",
    });
    console.log(
      'Houve uma falha ao executar o bloco de codigo da aba "DADOS SEGURADO". verifique!!'
    );
  }
})();
