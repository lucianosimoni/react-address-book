import NavigationRail from "./NavigationRail";

function About() {
  return (
    <>
      <NavigationRail />

      <main className="about-main">
        <header>
          <h1>I'm Luciano Simoni 🧙‍♂️</h1>
        </header>

        <ul>
          <li>A young Software Developer</li>
          <li>Based in London</li>
          <li>
            Studied at{" "}
            <a target="_blank" href="https://boolean.co.uk/">
              Boolean UK
            </a>
          </li>
          <li>A nice guy</li>
          <li>I love the art of coding</li>
          <li>I love art</li>
          <li>🧙‍♂️</li>
          <li>Follow me on github:</li>
          <li>
            <a target="_blank" href="https://github.com/lucianosimoni">
              https://github.com/lucianosimoni
            </a>
          </li>
        </ul>
        <h3></h3>
      </main>
    </>
  );
}

export default About;
