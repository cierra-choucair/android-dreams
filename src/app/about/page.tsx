import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — We Are the Universe Learning to Know Itself",
  description:
    "The editorial manifesto of Android Dreams: why we exist, what we believe, what we commit to, and what we refuse.",
  alternates: { canonical: "/about" },
};

function SectionHeading({ numeral, title }: { numeral: string; title: string }) {
  return (
    <h2 className="mt-24 flex items-baseline gap-5 font-display text-4xl tracking-wide text-cream sm:text-5xl">
      <span aria-hidden className="font-mono text-sm tracking-wide2 text-orange">
        § {numeral}
      </span>
      {title}
    </h2>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-14 border-l-[3px] border-orange py-2 pl-6 sm:pl-10">
      <p className="font-serif text-2xl italic leading-snug text-cream sm:text-3xl">{children}</p>
    </blockquote>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-6 text-[1.15rem] leading-[1.8] text-cream/85">{children}</p>;
}

function Belief({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-12 font-serif text-xl font-semibold leading-snug text-cream">{children}</p>
  );
}

export default function AboutPage() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] glow-orange-tl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] glow-magenta-br" />

      <article className="relative mx-auto max-w-3xl px-4 pb-28 pt-20 sm:px-6">
        {/* Masthead */}
        <header className="text-center">
          <p className="eyebrow text-orange">Android Dreams · Editorial Manifesto</p>
          <h1 className="mt-10 font-display text-6xl leading-[0.95] tracking-wide text-cream sm:text-7xl">
            We Are the Universe
            <br />
            <span className="text-orange">Learning to Know Itself.</span>
          </h1>
          <div aria-hidden className="mx-auto mt-12 h-16 w-[3px] bg-orange" />
        </header>

        {/* Preamble */}
        <section className="mt-16">
          <P>
            There is a question that has followed humanity since the first
            person looked up at the night sky and wondered what they were
            looking at. Not a scientific question. Not a philosophical one,
            exactly. Something older than both. Something that lives in the
            body before it reaches the mind.
          </P>
          <P>
            <em>What is all of this? And what are we inside of it?</em>
          </P>
          <P>
            Android Dreams was built to live inside that question. Not to
            answer it — but to follow it, carefully, rigorously, and with the
            belief that the act of following is itself one of the most human
            things we can do.
          </P>
        </section>

        {/* § I */}
        <SectionHeading numeral="I" title="The Problem We Are Here to Solve" />
        <section>
          <P>
            We live in an era of unprecedented information and unprecedented
            confusion. The two are not coincidental — they are the same
            phenomenon. As the volume of data produced about the world has
            grown beyond any individual&apos;s capacity to process, the human
            response has been predictable and deeply understandable:
            withdrawal, apathy, and a quiet surrender of the belief that any
            of it can be understood.
          </P>
          <PullQuote>
            We are not drowning in too much information. We are drowning in
            information without meaning.
          </PullQuote>
          <P>
            This is compounded by the relentless exposure to atrocity. Global
            crises arrive in our pockets in real time, rendered in high
            resolution, impossible to look away from and impossible to fully
            absorb. The cumulative effect on the human psyche is not anger or
            action — it is numbness. And a numb person does not build
            anything.
          </P>
          <P>
            Meanwhile, at the frontier of science and technology, the most
            extraordinary things in human history are quietly taking place.
            Machines are beginning to reason. Quantum systems are being coaxed
            into coherence. The boundaries between biology and computation are
            dissolving. We are, without exaggeration, in the middle of a
            transformation as significant as the industrial revolution — and
            most people have no idea, because no one is telling the story in a
            way that reaches them.
          </P>
          <P>
            Android Dreams exists because these two facts — the crisis of
            meaning and the silence around discovery — are not separate
            problems. They are the same problem. And they have the same
            solution.
          </P>
        </section>

        {/* § II */}
        <SectionHeading numeral="II" title="What We Believe" />
        <section>
          <Belief>We believe that discovery is the purest of human endeavors.</Belief>
          <P>
            From the moment we are born, we are built to take in data from
            every sense, to make meaning from it, to construct understanding.
            This is not a feature of certain exceptional minds. It is the
            fundamental operating principle of human consciousness. We are,
            each of us, meaning-making machines — and the universe we live in
            is inexhaustibly worth understanding.
          </P>

          <Belief>We believe the unknown is not something to fear.</Belief>
          <P>
            The increasing strangeness of the world — the uncanny feeling that
            the ground of our understanding keeps shifting — is not a sign
            that something is wrong. It is a sign that something is working.
            Discovery, by definition, destabilizes what we thought we knew.
            That destabilization is the feeling of the world becoming larger.
            It is the sensation of becoming more capable of seeing what is
            actually there.
          </P>

          <Belief>
            We believe that every person is more capable of contributing to
            human knowledge than they believe.
          </Belief>
          <P>
            The idea that science and technology are the province of
            specialists is a failure of communication, not a fact about human
            potential. When people understand what is being built, they
            participate. They ask better questions. They make better
            decisions. They become nodes in a system that is ever creating and
            never just repeating.
          </P>

          <Belief>We believe that hope is not naive. It is a discipline.</Belief>
          <P>
            We see the weight of the world. We do not look away from
            difficulty or pretend that the challenges ahead are small. But we
            refuse to let the magnitude of the problems become an argument for
            paralysis. There is a future being built right now, by human
            hands, in real time. That future is still shapeable. That is not
            sentiment. It is a statement of fact, and it is the most important
            story we can tell.
          </P>
          <PullQuote>
            Every technology is a decision about what kind of world we want.
            And decisions can go differently.
          </PullQuote>
        </section>

        {/* § III */}
        <SectionHeading numeral="III" title="What We Commit To" />
        <section>
          <P>
            Android Dreams is committed to <strong>journalistic rigor</strong>{" "}
            without exception. We do not sacrifice accuracy for a good
            narrative. We do not chase fear for attention. We do not dress
            speculation as fact, or allow the pressure of a news cycle to
            compromise the integrity of what we publish. The story has to be
            true before it can be meaningful.
          </P>
          <P>
            We are committed to{" "}
            <strong>the sacred art of writing and storytelling</strong> as the
            primary instrument of understanding. We believe that a
            well-crafted sentence is not decoration — it is the vehicle by
            which one human mind transfers an idea to another. That transfer
            is irreplaceable. It cannot be automated, aggregated, or optimized
            away. Android Dreams is a human publication, built on human ideas,
            committed to human novelty.
          </P>
          <P>
            We are committed to <strong>free press</strong> as a structural
            value, not a talking point. We have no editorial allegiance to any
            company, ideology, or interest — including the ventures connected
            to our founder. When there is a connection worth disclosing, we
            disclose it. When a story is critical of something we are close
            to, we tell it anyway. The credibility of this publication is
            worth more than any single story, and that credibility lives or
            dies on the consistency of this commitment.
          </P>
          <P>
            We are committed to <strong>the imagination</strong>. Science
            fiction is not escapism. It is one of the most rigorous practices
            of futures thinking that exists — a genre that has been telling us
            what our decisions lead to, across centuries of imagined worlds,
            in ways that data and analysis cannot replicate. We take it
            seriously as a lens, as a language, and as evidence of what
            humanity has always known: that imagining the future is the first
            step toward building it.
          </P>
        </section>

        {/* § IV */}
        <SectionHeading numeral="IV" title="What We Refuse" />
        <section>
          <P>
            We will not publish fear-driven content to chase clicks. Fear is
            not a strategy. It is a betrayal of the reader.
          </P>
          <P>
            We will not add to the mounting pile of generated, hollow,
            interchangeable content that is flooding the internet. Tools are
            tools. The ideas must be ours — original, considered, and earned
            through the practice of genuine inquiry.
          </P>
          <P>
            We will not dumb things down. We will work harder to make them
            clear — which is a completely different thing. Our reader is not
            someone who cannot handle complexity. They are someone who has not
            yet been given the right context. That is our job.
          </P>
          <P>
            We will not pretend that the future is inevitable, that the
            technology determines the outcome, or that the decisions being
            made in labs and boardrooms today are beyond the influence of the
            people who will live inside their consequences. The future is not
            something that happens to us. It is something we are building —
            and Android Dreams exists to make sure that as many people as
            possible understand that they have a seat at that table.
          </P>
        </section>

        {/* § V */}
        <SectionHeading numeral="V" title="Why We Are Here" />
        <section>
          <PullQuote>
            Android Dreams is the universe personified — ever seeking to know
            itself more.
          </PullQuote>
          <P>
            That is the simplest and most complete description of what this
            publication is. We are not here to report on technology. We are
            here to participate in one of the oldest human projects: the
            project of understanding the world we find ourselves in, and
            passing that understanding to the person next to us.
          </P>
          <P>
            The future is being built quietly, quickly, and often without
            context. Our job is to document it, interpret it, and remind
            everyone who reads us that it is still something we can shape.
          </P>
          <P>That is the work. We are glad you are here for it.</P>
        </section>

        {/* Signature */}
        <footer className="mt-24 border-t border-cream/10 pt-10 text-center">
          <div aria-hidden className="mx-auto mb-8 h-2.5 w-2.5 bg-orange" />
          <p className="font-mono text-xs uppercase tracking-wide2 text-dim">
            Cierra Lunde Choucair · Founder &amp; Editor · Android Dreams
          </p>
          <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-wide2 text-dimmer">
            androiddreams.com
          </p>
        </footer>
      </article>
    </div>
  );
}
