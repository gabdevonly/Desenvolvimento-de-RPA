/*
Este script abre o navegador, faz login no AgendaCash,
acessa a aba de cadastros, preenche o formulário para adicionar um novo usuário,
tira capturas de tela para confirmar o processo e fecha o navegador ao final.
*/

import { config } from "dotenv";
import { chromium } from "playwright";
import { realizarLogin } from "./Funcoes";

config();

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await realizarLogin(page);
  } catch {
    await page.screenshot({ path: "Erro_Login.png" });
    console.log("Erro ao efetuar login");
  }

  try {
    await page.click("#Cadastros");
    await page.click("text=Usuários");
    await page.click('button:has-text("Adicionar")');
    await page.fill("#name", "Gabriel Teste Automatizado");
    await page.fill("#email", "testeautomatizado@email.com");
    await page.fill("#phone", "99999999999");
    await page.locator("#role").selectOption("ADMIN");
    await page.locator("#sex").selectOption("Masculino");
    await page.screenshot({
      path: "imagens_CadastroUser/Confirmacao_cadastro_Usuario_Agenda_Cash_1.png",
    });
    await page.click('button:has-text("Salvar")');

    const cadastro_user = await page.waitForSelector(
      'button:has-text("Adicionar")',
      {
        timeout: 10000,
      }
    );

    if (cadastro_user) {
      await page.screenshot({
        path: "imagens_CadastroUser/Confirmacao_cadastro_Usuario_Agenda_Cash_2.png",
      });
    } else {
      console.log("Verificar confirmação do cadastro.");
    }
  } catch {
    await page.screenshot({
      path: "imagens_CadastroUser/Erro_Cadastro_User.png",
    });
    console.log("Erro ao cadastrar usuario");
  }

  console.log(
    "Processo de teste finalizado, verificar se os testes ocorreram corretamente."
  );
  await browser.close();
})();
