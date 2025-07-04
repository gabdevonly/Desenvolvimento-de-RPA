import { Page } from "playwright";
import { config } from "dotenv";
import axios from "axios";

config();

export async function realizarLogin(page: Page): Promise<void> {
  await page.goto("https://app.agendacash.com.br/dashboard");

  await page.fill("#email", process.env.EMAIL || "");
  await page.fill("#password", process.env.PASSWORD || "");
  await page.click('button:has-text("Entrar")');
  await page.screenshot({
    path: "imagens_login/Confirmacao_Login_1.png",
  });

  const dashboard = await page.waitForSelector('a[href="/dashboard"].active', {
    timeout: 10000,
  });

  if (!dashboard) {
    throw new Error("Falha no login!");
  }

  console.log("Login efetuado com sucesso!");
  await page.screenshot({
    path: "imagens_login/Confirmacao_Login_2.png",
  });
}

export async function geracpf() {
  const response = await axios.post(
    "https://www.4devs.com.br/ferramentas_online.php",
    new URLSearchParams({
      acao: "gerar_cpf",
      pontuacao: "N",
    }).toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data;
}

export async function geracnpj() {
  const response = await axios.post(
    "https://www.4devs.com.br/ferramentas_online.php",
    new URLSearchParams({
      acao: "gerar_cnpj",
      pontuacao: "N",
    }).toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data;
}

export async function geraRG() {
  const response = await axios.post(
    "https://www.4devs.com.br/ferramentas_online.php",
    new URLSearchParams({
      acao: "gerar_rg",
    }).toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data;
}

export function geraTelefone(): string {
  const ddd = Math.floor(Math.random() * 90 + 10);
  const prefixo = 9;
  const parte1 = Math.floor(Math.random() * 9000 + 1000);
  const parte2 = Math.floor(Math.random() * 9000 + 1000);

  return `${ddd}${prefixo}${parte1}${parte2}`;
}

export function geraMat(digitos: number = 5): string {
  const min = Math.pow(10, digitos - 1);
  const max = Math.pow(10, digitos) - 1;

  const numero = Math.floor(Math.random() * (max - min + 1)) + min;
  return numero.toString();
}

export async function geracep() {
  const response = await axios.post(
    "https://www.4devs.com.br/ferramentas_online.php",
    new URLSearchParams({
      acao: "gerar_cep",
    }).toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
}

export async function SelectOptions(
  field: string,
  textdigit: string,
  button: string,
  page: Page
) {
  const input = page.locator('input[placeholder="Buscar..."]');

  await page.click(field);
  await input.fill(textdigit);
  await input.press(button);
}
