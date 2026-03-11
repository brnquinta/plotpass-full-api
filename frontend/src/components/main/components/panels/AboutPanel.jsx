import logo from "../../../../images/logoBlue.svg";

function About() {
  return (
    <section className="about">
      <h1 className="about__title">Sobre</h1>

      <div className="about__content">
        <img
          src={logo}
          alt="Logo do aplicativo"
          className="about__logo"
        />

        <p className="about__text">
          O PlotPass é uma plataforma social criada para facilitar a troca de
          recomendações de filmes e séries entre usuários. A proposta do
          aplicativo é permitir que pessoas descubram novos conteúdos através
          das indicações de amigos e acompanhem o que já assistiram ou ainda
          pretendem assistir.
        </p>

        <p className="about__signature">
          Desenvolvido por <strong>Bruno Quintanilha</strong>
        </p>
      </div>
    </section>
  );
}

export default About;