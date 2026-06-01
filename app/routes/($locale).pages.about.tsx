import type {Route} from './+types/pages.about';

export const meta: Route.MetaFunction = () => {
  return [{title: 'About Us | Animo Run Club'}];
};

export default function AboutPage() {
  return (
    <div className="px-8 sm:px-12 lg:px-16 py-12 max-w-3xl">
      {/* Mission */}
      <section className="mb-16">
        <h1 className="text-2xl font-bold mb-6">Our Mission</h1>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          [Animo] Run Club is born with the intention of creating a safe and
          inclusive space, where energy, respect, and community meet in every
          step. We foster healthy coexistence through movement, sharing the joy
          of running outdoors regardless of level or experience. Our mission is
          to celebrate what our bodies can do, be grateful for every day we can
          move, and strengthen bonds through shared effort. More than miles, we
          build community, spirit, and well-being.
        </p>
        <ul className="space-y-3 text-sm text-gray-800 italic">
          <li>We create and cross bridges — together</li>
          <li>We run with gratitude and advance with spirit</li>
          <li>Where willpower motivates you and community sustains you</li>
          <li className="font-semibold not-italic uppercase tracking-wide">
            ANIMO — a word with infinite meaning
          </li>
        </ul>
      </section>

      {/* Vision */}
      <section className="mb-16">
        <h2 className="text-xl font-bold mb-6">Our Vision</h2>
        <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
          <p>
            To be a reference for an active, conscious, and supportive
            community, where running is not just a physical activity, but a way
            to reconnect with oneself, with others, and with the environment.
          </p>
          <p>
            We want to inspire people of all ages to move from gratitude,
            enthusiasm, and mutual support.
          </p>
          <p>
            We dream of a group that unites friends, families, parents and
            children, leading them to discover new paths, emotions, and personal
            capabilities.
          </p>
          <p>
            Our purpose is clear: it&apos;s not about winning, but about
            participating, sharing, and growing together.
          </p>
          <p className="text-gray-800 font-medium">
            Every Sunday, we are that cry to the world that says: we are here,
            with you, to motivate you! ANIMO!
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mb-16">
        <h2 className="text-xl font-bold mb-8">Our Values</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-2">
              Gratitude in Movement
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We run with awareness of what our bodies can do and what they allow
              us to experience.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-2">
              Inclusion and Respect
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Everyone is welcome here. Age, pace, or experience does not
              matter: every step counts.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-2">
              Community and Support
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We motivate each other. We celebrate big and small achievements,
              and we accompany each other in challenges.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-2">
              Passion and Consistency
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We don&apos;t look for speed, we look for purpose. Spirit is
              trained, just like legs and heart. Beyond the physical, we
              cultivate the mind: the courage to start, the patience to
              continue, and the satisfaction of not giving up.
            </p>
          </div>
        </div>
      </section>

      {/* Documenting the Process */}
      <section>
        <h2 className="text-xl font-bold mb-6">Documenting the Process</h2>
        <ul className="ml-5 space-y-3 text-gray-600 text-sm leading-relaxed" style={{listStyle: 'disc'}}>
          <li>
            At Animo Run Club we believe every step counts and every story
            deserves to be told. We love witnessing the evolution of our members.
          </li>
          <li>
            Every runner is worthy of constant recognition and celebration.
          </li>
          <li>
            We are committed to documenting and increasing the visibility of the
            individual and collective process, helping each member become a
            living inspiration for others. We want every person to recognize
            their own path, look at themselves with pride, and be a better
            version of themselves.
          </li>
          <li>
            We don&apos;t just run.{' '}
            <span className="text-gray-800 font-medium">
              Here we celebrate the journey.
            </span>
          </li>
          <li>
            We love seeing the evolution of each member, personal growth, and
            spiritual increase. Each member deserves constant celebration for
            every step they take. Helping each one to be an inspiration to
            others and to recognize that they themselves arrived and are
            increasingly a better version of themselves.
          </li>
        </ul>
      </section>
    </div>
  );
}
