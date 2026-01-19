<template>
  <div class="home-wrapper">
    <section class="hero-section">
      <div class="hero-content">
        <h1>Gestão de Projetos Finais</h1>
        <p class="subtitle">A plataforma centralizada para submissão de temas de projeto final.</p>
      </div>
    </section>

    <section class="cards-container">
      <div class="grid-layout">
        
        <div class="info-card">
          <div class="icon-box public-icon">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="28"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
          </div>
          <div class="card-text">
            <h3>Consultar Docentes</h3>
            <p>És aluno? Explora a lista de docentes disponíveis.</p>
          </div>
          <router-link to="/docentes" class="link-action">Ver lista &rarr;</router-link>
        </div>

        <div class="info-card highlight">
          <div class="icon-box private-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="28"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
          </div>
          <div class="card-text">
            <h3>Área do Docente</h3>
            <p>És docente? Acede à área reservada.</p>
          </div>
          <router-link to="/login" class="full-width">
            <button class="btn-primary full-width">Aceder à Gestão</button>
          </router-link>
        </div>

      </div>
    </section>
  </div>
</template>