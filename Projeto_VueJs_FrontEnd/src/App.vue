<template>
  <div class="login-container">

    <div v-if="!logado" class="login-content">
      <div class="background-overlay">
        <img src="/amor.jpg" alt="Logo" class="logo" />
        <h2 class="information">
          Informe abaixo suas credenciais para acesso ao amor da sua vida.
        </h2>
      </div>

      <form @submit.prevent="fazerLogin" class="login-form">
        <div class="input-wrapper">
          <i class="fas fa-envelope"></i>
          <input class="login-text" v-model="email" placeholder="Email" type="email" required />
        </div>

        <div class="input-wrapper">
          <i class="fas fa-lock"></i>
          <input class="login-text" v-model="senha" placeholder="Nossa data Especial" type="password" required />
        </div>

        <small class="senha">Esqueceu a senha?</small>
        <button type="submit">Entrar</button>
        <p style="color:white;">{{ mensagem }}</p>
      </form>
    </div>

    <div v-else class="romantic-message">
      <h1 class="romantic-title">💘 Kemily Brandão e Gabriel Brandão 💘</h1>
      <h1 class="romantic-title">💘 Bem-vinda ao nosso cantinho 💘</h1>
      <p class="romantic-text">{{ mensagem }}</p>

      <p class="romantic-extra">
        Princessa, isso é apenas um pequeno gesto para simbolizar o meu amor por você. Algo que trabalho todo dia e,
        também estou aprendendo. Espero que goste, pois, deu um trabalho do cacete KKKKKK!
      </p>

      <h2>16 de Novembro/2019</h2>

      <p class="romantic-extra">
        A data que marcou nossas vidas, um "OI Vizinho" que rendeu até os dias de hoje, jamais esquecerei!
      </p>

      <h2>Novembro/2019 a Meados de Outubro/2023</h2>

      <p class="romantic-extra">
        Esse período foi muito difícil pra nós, pois enfrentamos duras batalhas que alternavam entre ciúmes e 
        a dificuldade do nosso relacionamento com a sua família! Até o seu sogro e sogra (Meu pai e minha mãe) tomarem a frente e
        chamarem a sua família para uma conversa e consentimento com a sua mãe, para que eu pudesse pedir a
        sua mão em casamento...
      </p>

      <h2>Outubro/2023 até Meados de Novembro/2024</h2>

      <p class="romantic-extra">
        Aaaaaa, como esquecer esse periodo 😢, foi quando descobrimos o surgimento da nossa pequena, um pedacinho de nois 2 sendo gerado
        dentro de você. Fruto do nosso amor!
        
        Junto vieram as preocupações KKKKK, será que estamos preparados ? E como eu te disse, o filho sempre vem fixado no tempo de Deus.

        Foi um periodo muito legal, na onde começamos a intender de fato o sentido da vida e do amor.
      </p>

      <h2>Novembro/2024 até os dias de hoje</h2>

      <p class="romantic-extra">
        E cá estamos nós, juntos até hoje na graça de Deus.
        Estamos construindo a nossa familia, agora já temos a nossa casinha, nada melhor que isso 😍.

        Mesmo com altos e baixos, estamos firmes e fortes e temos um ao outro sempre.

        E é isso, uma pequena demonstração de amor, e comprovação que de fato eu amo a nossa historia,
        e jamais esquecerei. Quando vier uma pequena dúvida sobre meu amor por você, LEMBRE-SE DESSE DIA.

        Isso foi totalmente escrito por mim, então desculpe se não parecer tão bonito, mais eu fiz com coração💘.
      </p>

      <h1>TE AMOOOOO AGORA E PARA SEMPRE MINHA PRINCESINHA 😍💘</h1>

      <img src="/nos2.jpeg" alt="Nós dois" class="foto-romantica" />
      <img src="/nos2_1.jpeg" alt="Nós dois" class="foto-romantica" />

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      senha: '',
      mensagem: '',
      logado: false,
      email_correto: 'kemilya835@gmail.com',
      senha_correta: '16/11/2019',
    };
  },
  methods: {
    fazerLogin() {
      if (this.email === this.email_correto && this.senha === this.senha_correta) {
        this.logado = true;
        this.mensagem = 'Você é o amor da minha vida! 💖';
      } else {
        this.mensagem = 'Você errou a nossa data? Achei que vc me amava... 😢';
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #aa3c47;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
}

.login-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 400px;
}

.background-overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.logo {
  width: 120px;
  height: auto;
  margin-bottom: 10px;
}

.information {
  font-family: Georgia;
  font-size: 18px;
  font-weight: bold;
  color: white;
  margin-top: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #aa3c47;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 100%;
  box-sizing: border-box;
}

.input-wrapper {
  position: relative;
  color: white;
}

.login-text {
  width: 100%;
  padding: 10px 10px 10px 30px;
  border-radius: 8px;
  box-sizing: border-box;
}

.input-wrapper i {
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: #000;
}

.senha {
  font-family: Georgia;
  font-size: 14px;
  color: white;
  text-align: right;
}

.login-form button {
  background-color: #d11024;
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-size: 16px;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.login-form button:hover {
  background-color: #0b0530;
}

.romantic-message {
  color: white;
  padding: 20px;
  max-width: 600px;
  width: 100%;
  text-align: left;
}

.romantic-title {
  font-size: 28px;
  margin-bottom: 10px;
}

.romantic-text,
.romantic-extra {
  margin-bottom: 16px;
  line-height: 1.5;
}

/* Responsivo */
@media (max-width: 500px) {
  .logo {
    width: 100px;
  }

  .information {
    font-size: 16px;
  }

  .login-form button {
    font-size: 14px;
  }
}

.foto-romantica {
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}
</style>
