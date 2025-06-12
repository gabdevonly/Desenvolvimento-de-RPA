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
      <h1 class="romantic-title">💘 Bem-vinda ao nosso cantinho 💘</h1>
      <p class="romantic-text">{{ mensagem }}</p>

      <p class="romantic-extra">
        Princessa, isso é apenas um pequeno gesto para simbolizar o meu amor por você. Algo que trabalho todo dia e,
        tambem estou aprendendo. Espero que goste, pois, deu um trabalho do cacete KKKKKK ! 
      </p>

      <h2>Novembro/2019</h2>

      <p class="romantic-extra">
        A data que marcou nossas vidas, um "OI Vizinho" que rendeu até os dias de hoje, jamais esquecerei! 
      </p>

      <h2>Novembro/2019 a Meados de Outubro/2023</h2>

      <p class="romantic-extra">
        Esse periodo foi muito dificil pra nois, pois, enfretamos duras batalhas que alternavam entre ciumes e 
        a dificuldade do nosso relacionamento com a sua familia! Até o seu sogro e sogra (Meu pai e Minha mãe) tomar a frente e
        chamar a sua familia para uma conversa e concentimento com a sua mãe, para que eu pudesse pedir a
        sua mão em casamento...
      </p>


    </div>
  </div>
</template>




<script>
export default {
  data() {
    return {
      email:'',
      senha:'',
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
        this.mensagem = 'Email ou senha incorretos 😢';
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
  height: 100vh; /* Total da tela */
  background-color: #aa3c47;
  overflow: hidden;
  flex-direction: column;
  text-align: center;
}

.login-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.login-text {
  display: block;
  margin-bottom: 15px;
  border-radius: 8px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}

.background-overlay {
  position: absolute;
  top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.logo {
  width: 200px;
  height: auto;
  margin-bottom: 10px;
}

.senha {
  font-family: Georgia;
  font-size: 15px;
  color: white;
}

.information {
  font-family: Georgia;
  font-size: 20px;
  font-weight: bold;
  color: white;
}

.login-form {
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #aa3c47;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  min-width: 300px;
}

.login-form input,
.login-form button {
  padding: 10px;
  font-size: 16px;
}

.login-form button {
  background-color: #d11024;
  color: white;
  border: none;
  cursor: pointer;
}

.login-form button:hover {
  background-color: #0B0530;
}

.input-wrapper{
  color: white;
}


</style>
