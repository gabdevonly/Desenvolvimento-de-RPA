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
  } catch {
    await page.screenshot({
      path: "imagens_Tomador/Erro_Cadastro_Tomador_DadosCadastrais.png",
    });
    console.log(
      'Houve uma falha ao executar o bloco de codigo da aba "DADOS CADASTRAIS". verifique!!'
    );
  }
})();
