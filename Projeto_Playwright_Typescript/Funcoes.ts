import { Page } from "playwright";
import { config } from "dotenv";
import axios from "axios";

// Carrega variáveis de ambiente do arquivo .env

config();

/**
 * A função realizarLogin faz login na plataforma AgendaCash.
 * Ela acessa a URL, preenche o e-mail e a senha com valores do .env,
 * clica no botão de login, tira prints antes e depois,
 * e confirma se o login deu certo verificando se o dashboard está ativo.
 */

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

/**
 * A função geracpf faz uma requisição POST para a API do site 4Devs,
 * solicitando a geração de um CPF válido (sem pontuação).
 * Retorna o CPF gerado.
 */

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

/**
 * A função geracnpj faz uma requisição POST para a API do site 4Devs,
 * solicitando a geração de um CNPJ válido (sem pontuação).
 * Retorna o CNPJ gerado.
 */

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

/**
 * A função geraRG faz uma requisição POST para a API do 4Devs,
 * solicitando a geração de um número de RG.
 * Retorna o RG gerado.
 */

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

/**
 * A função geraTelefone cria um número de celular aleatório.
 * Gera um DDD entre 10 e 99, sempre usa prefixo 9 (celular),
 * monta as duas partes do número com 4 dígitos cada.
 * Retorna o telefone como string.
 */

export function geraTelefone(): string {
  const ddd = Math.floor(Math.random() * 90 + 10);
  const prefixo = 9;
  const parte1 = Math.floor(Math.random() * 9000 + 1000);
  const parte2 = Math.floor(Math.random() * 9000 + 1000);

  return `${ddd}${prefixo}${parte1}${parte2}`;
}

/**
 * A função geraMat cria um número de matrícula aleatório.
 * Recebe a quantidade de dígitos (padrão é 5),
 * gera um número inteiro dentro desse intervalo
 * e retorna como string.
 */

export function geraMat(digitos: number = 5): string {
  const min = Math.pow(10, digitos - 1);
  const max = Math.pow(10, digitos) - 1;

  const numero = Math.floor(Math.random() * (max - min + 1)) + min;
  return numero.toString();
}

/**
 * A função geracep faz uma requisição POST para a API do site 4Devs,
 * solicitando a geração de um CEP válido (sem pontuação).
 * Retorna o CEP gerado.
 */

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
