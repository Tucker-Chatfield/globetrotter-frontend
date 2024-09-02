import styles from "./Landing.module.css";
import Stars from '../../assets/images/stars.svg';
import Logotype from '../../assets/images/logotype.svg';

const Landing = () => {
  return (
    <>
      <main className={styles.container}>
        <section className={styles.splash}>
          <img src={Logotype} alt="globetrotter logo" />
        </section>

        <section className={styles.about}>
          <header>
            <h3>WHO WE ARE</h3>
            <h1>ABOUT US</h1>
          </header>
          <article>
            <p>
              Welcome to Globetrotter, your ultimate social media platform for
              sharing and discovering travel experiences from around the world.
              We believe that every journey is an adventure worth sharing, and
              Globetrotter is here to help you connect with fellow travelers,
              inspire others with your stories, and explore the world through
              the eyes of our vibrant community.
            </p>
          </article>
        </section>

        <section className={styles.testimonial}>
          <header>
            <h3>MESSAGE FROM OUR GLOBETROTTERS</h3>
            <h1>TESTIMONIALS</h1>
          </header>
          <article>
            <header>
              <h4>Sarah M.</h4>
              <p>Traveller and Globetrotter User</p>
            </header>
            <p>
              As a travel enthusiast, I've always been on the lookout for a
              platform that truly captures the essence of exploring the world. I
              stumbled upon Globetrotter through a friend who couldn’t stop
              raving about it, and I’m so glad I gave it a try. From the moment
              I joined, I felt like I had found my tribe—people who share the
              same passion for travel as I do. What I love most about
              Globetrotter is the sense of community. Unlike other social media
              platforms where travel content gets lost in the mix, Globetrotter
              is all about celebrating every journey. I've discovered so many
              incredible destinations through the posts here, and the tips I’ve
              gotten from fellow travelers have been invaluable. It’s inspiring
              to see the world through the eyes of others, and it's made me even
              more excited to plan my next adventure. Globetrotter isn’t just an
              app; it’s a community that makes you feel connected no matter
              where you are. For anyone who loves to travel, this is the place
              to be!
            </p>
            <footer>
              <img src={Stars} alt="Four blue stars" />
            </footer>
          </article>
        </section>
      </main>

      <footer className={styles.footer}>
        © 2024 GLOBO INC. ALL RIGHTS RESERVED
      </footer>
    </>
  );
};

export default Landing;
