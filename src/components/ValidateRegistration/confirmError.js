function confirmError(app) {
  app.innerHTML = `
    <div id="notfound">
      <div class="notfound">
        <div class="notfound-404">
          <h1>Oops!</h1>
          <h2>404 - Pagina nu a fost găsită!</h2>
        </div>
        <a href="/">Pagina Principală</a>
      </div>
    </div>
  `
}

export { confirmError };