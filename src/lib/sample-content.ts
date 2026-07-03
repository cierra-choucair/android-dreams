import type { Author, Post, Tag } from "./types";
import { readingMinutes } from "./utils";

/**
 * Sample content for preview mode.
 *
 * Used ONLY when NEXT_PUBLIC_WP_API_URL is not configured, so the site can
 * be designed, reviewed, and deployed to a preview URL before the WordPress
 * install exists. Once the env var is set, every page reads from WordPress
 * and this file is never touched.
 */

const cierra: Author = {
  id: 1,
  name: "Cierra Lunde Choucair",
  slug: "cierra-lunde-choucair",
  description:
    "Founder & Editor of Android Dreams. Writing about quantum technology, artificial intelligence, and the deep science building our sci-fi future.",
  avatar: null,
};

const marlowe: Author = {
  id: 2,
  name: "E. Marlowe Voss",
  slug: "e-marlowe-voss",
  description:
    "Senior correspondent covering artificial intelligence and the institutions trying to keep up with it.",
  avatar: null,
};

const ital: Author = {
  id: 3,
  name: "Itai Ben-Aroya",
  slug: "itai-ben-aroya",
  description:
    "Staff writer for QFrontline. Former quantum software engineer; writes the weekly Dev Brief.",
  avatar: null,
};

const t = (id: number, name: string, slug: string): Tag => ({ id, name, slug });

const TAGS = {
  quantum: t(11, "Quantum Computing", "quantum-computing"),
  ai: t(12, "Artificial Intelligence", "artificial-intelligence"),
  errorCorrection: t(13, "Error Correction", "error-correction"),
  policy: t(14, "Policy", "policy"),
  devBrief: t(15, "Dev Brief", "dev-brief"),
  sdk: t(16, "SDKs & Tooling", "sdks-tooling"),
  fiction: t(17, "Science Fiction", "science-fiction"),
  consciousness: t(18, "Consciousness", "consciousness"),
  biology: t(19, "Computational Biology", "computational-biology"),
  featured: t(20, "Featured", "featured"),
};

interface Draft {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author: Author;
  tags: Tag[];
  content: string;
}

const drafts: Draft[] = [
  // ────────────────────────────── DEEP READS ──────────────────────────────
  {
    id: 101,
    slug: "the-coherence-wars",
    title: "The Coherence Wars: Inside the Race to Keep a Qubit Alive",
    excerpt:
      "Three laboratories, three architectures, one enemy: noise. What the fight for coherence reveals about how the quantum era will actually arrive.",
    date: "2026-06-24T09:00:00",
    category: "deep-read",
    author: cierra,
    tags: [TAGS.quantum, TAGS.errorCorrection, TAGS.featured],
    content: `
<p>The room is colder than deep space. Not metaphorically — literally. At the bottom of the dilution refrigerator in front of me, a chip the size of a thumbnail sits at fifteen millikelvin, a temperature the universe itself has never naturally produced. Somewhere on that chip, for a few hundred microseconds at a time, a qubit is alive.</p>
<p>Everything about the modern quantum computing project is contained in that sentence, including the problem. A few hundred microseconds is an eternity compared to a decade ago and a heartbeat compared to what useful computation demands. The gap between those two timescales has a name in the field — the coherence problem — and the fight to close it has quietly become one of the most consequential engineering races on Earth.</p>
<blockquote><p>Decoherence is not a bug in quantum mechanics. It is quantum mechanics, doing exactly what it always does. The machine is the anomaly.</p></blockquote>
<p>This is a story about three laboratories that have chosen three different weapons. One bets on superconducting circuits and brute-force error correction. One bets on trapped ions and patience. One bets on a topological approach that, if it works, makes the noise problem largely disappear — and, if it doesn't, will have consumed two decades and several billion dollars learning why.</p>
<p>What struck me most, across months of reporting, was not the physics. It was the sociology. Each lab has built a culture in the image of its architecture: the superconducting teams move like software companies, shipping and iterating; the ion trappers move like watchmakers; the topological group moves like a monastery that occasionally files patents. The machines are hypotheses about physics. The teams are hypotheses about how the future gets built.</p>
<p>And decisions can go differently. That is the thing to hold onto as you read. Nothing in this race is inevitable — not the winning architecture, not the timeline, not who owns the result. The coherence wars will be settled by choices, most of them being made right now, almost entirely out of public view.</p>
`,
  },
  {
    id: 102,
    slug: "the-alignment-of-institutions",
    title: "The Alignment Problem Nobody Benchmarks: Our Institutions",
    excerpt:
      "We test frontier models for deception and misuse. There is no eval for a legislature. Inside the mismatch between machine timelines and human ones.",
    date: "2026-06-17T09:00:00",
    category: "deep-read",
    author: marlowe,
    tags: [TAGS.ai, TAGS.policy],
    content: `
<p>In a hearing room in Brussels, a regulator holds up a printed benchmark chart the way one might hold up evidence at a trial. The chart is eleven months old. In the world of frontier AI, eleven months is a geological age — two model generations, one capability jump nobody predicted, and a small library of retracted claims.</p>
<p>The scene captures the asymmetry at the center of this story: the systems are improving on machine time, and the institutions that govern them are improving on committee time. We have built elaborate evaluations for the machines — for deception, for misuse, for autonomy. We have built almost nothing that measures whether the human systems wrapped around them are keeping pace.</p>
<blockquote><p>The most dangerous capability gap is not between this model and the last one. It is between the technology and the institutions that are supposed to metabolize it.</p></blockquote>
<p>This piece follows four institutions — a regulator, a standards body, a court, and a university — as each tries, in its own idiom, to move faster without breaking the thing that makes it legitimate. Their struggles rhyme. Their failures are instructive. And in two cases, quietly, something is working.</p>
<p>The lesson is not that governance is hopeless. It is that governance is a technology too — one we have chosen to leave unimproved for a very long time, and one that responds to investment exactly the way technologies do.</p>
`,
  },
  {
    id: 103,
    slug: "the-cell-is-a-computer",
    title: "The Cell Is a Computer, and We Just Learned to Patch It",
    excerpt:
      "Programmable biology has crossed from metaphor to toolchain. A dispatch from the labs where code and life have stopped being different subjects.",
    date: "2026-06-10T09:00:00",
    category: "deep-read",
    author: cierra,
    tags: [TAGS.biology, TAGS.ai],
    content: `
<p>The first thing you notice in the lab is the vocabulary. The biologists talk about "shipping" a protein design. The software engineers talk about "culturing" a build. Somewhere in the last three years, at the intersection of machine-learned structure prediction and high-throughput synthesis, the two cultures stopped translating for each other and started sharing a language.</p>
<p>It is easy to miss how strange this is. For seventy years, the computer metaphor in biology was exactly that — a metaphor, useful and misleading in equal measure. What has changed is not the metaphor. It is the tooling. Design a molecular machine on Monday, compile it into DNA on Tuesday, run it in a cell by Friday, read the logs the following week.</p>
<blockquote><p>We are the universe learning to know itself — and, lately, learning to edit.</p></blockquote>
<p>This story is about what the new toolchain can actually do today, what it cannot, and the strange new responsibilities that arrive when the gap between imagining a living system and instantiating one collapses from a career to a sprint.</p>
`,
  },
  // ──────────────────────────── TRANSMISSIONS ────────────────────────────
  {
    id: 201,
    slug: "logical-qubit-count-doubles",
    title: "A Logical Qubit Count Just Doubled. Here's What Actually Changed",
    excerpt:
      "The press release says 96 logical qubits. The paper says something more interesting about where the error-correction overhead went.",
    date: "2026-07-02T07:30:00",
    category: "transmissions",
    author: cierra,
    tags: [TAGS.quantum, TAGS.errorCorrection],
    content: `
<p>The headline number — 96 logical qubits, up from 48 — is real, but it is not the story. The story is in Table 2 of the accompanying paper, where the physical-to-logical overhead quietly dropped by a third. That ratio, not the raw count, is the metric that decides when quantum machines stop being demonstrations and start being tools.</p>
<p>Overhead is destiny in error correction. Every logical qubit is a chorus of physical ones singing in careful unison; the fewer voices you need per chorus, the sooner the choir fits in a building. A one-third reduction, if it replicates, moves several roadmaps' "useful" milestones meaningfully closer.</p>
<p>Worth watching this week: two rival labs have hinted at responses. The cadence of this field has become monthly. It used to be yearly. That acceleration is itself the news.</p>
`,
  },
  {
    id: 202,
    slug: "the-model-that-refused-the-benchmark",
    title: "The Model That Refused the Benchmark",
    excerpt:
      "A frontier lab's newest system declined to answer eval questions it judged ambiguous — and scored higher for it. The metrics debate just got weirder.",
    date: "2026-07-01T07:30:00",
    category: "transmissions",
    author: marlowe,
    tags: [TAGS.ai],
    content: `
<p>Buried in yesterday's system card is a result that has evaluators arguing: on a reasoning benchmark with deliberately underspecified questions, the model's highest-scoring strategy was to challenge the question. Not refuse — challenge. It asked for clarification, flagged the ambiguity, and only then answered.</p>
<p>The benchmark's authors are calling it a contamination artifact. The lab is calling it calibration. The truth is probably stranger than either: we have started building systems that relate to our tests the way good students relate to bad exams.</p>
<p>The practical takeaway for anyone consuming eval numbers: the era of reading a leaderboard as a single scalar of "smart" is over, if it ever existed.</p>
`,
  },
  {
    id: 203,
    slug: "room-temperature-claims-again",
    title: "Room-Temperature Superconductivity Claims Are Back. Breathe First",
    excerpt:
      "A new preprint, a familiar pattern. A field guide to reading extraordinary claims before the replication attempts land.",
    date: "2026-06-30T07:30:00",
    category: "transmissions",
    author: cierra,
    tags: [TAGS.quantum],
    content: `
<p>The preprint arrived Friday night, which is the first thing to notice — extraordinary results posted at extraordinary hours have a track record. The second thing to notice is the data availability statement, which is thin. The third is that none of this means it's wrong.</p>
<p>We have been here before, and the field has developed reflexes: three major groups have already announced replication attempts, with the first results expected within weeks. That speed is the healthy part of the story, whatever the outcome.</p>
<p>Our position, as always: the claim is the beginning of the process, not the end. We'll report the replications, not the press cycle.</p>
`,
  },
  {
    id: 204,
    slug: "eu-quantum-procurement",
    title: "The EU Just Became Quantum's Biggest Customer",
    excerpt:
      "A €4.2B procurement program makes governments, not startups' investors, the demand side of the quantum economy. That changes the incentives.",
    date: "2026-06-29T07:30:00",
    category: "transmissions",
    author: marlowe,
    tags: [TAGS.quantum, TAGS.policy],
    content: `
<p>The procurement framework announced this morning in Strasbourg is the largest single commitment of public money to quantum computing capacity to date — and its structure matters more than its size. Payments are staged against verified capability milestones, not deliveries. You get paid when the machine does the thing, not when it ships.</p>
<p>This quietly transfers the burden of proof from marketing departments to physics, and several vendors' roadmaps will not enjoy the transfer.</p>
<p>The second-order effect to watch: milestone-based public procurement gives smaller architectures a route to revenue that doesn't run through venture capital's preferred timelines. The demand side of this industry just got more patient.</p>
`,
  },
  {
    id: 205,
    slug: "protein-design-goes-open",
    title: "The Biggest Protein Design Model Just Went Open Weights",
    excerpt:
      "A capability that cost hundreds of millions to build is now a download. The dual-use debate stops being theoretical this morning.",
    date: "2026-06-26T07:30:00",
    category: "transmissions",
    author: cierra,
    tags: [TAGS.biology, TAGS.ai, TAGS.policy],
    content: `
<p>The weights went up at 6 a.m. Pacific with a 40-page responsible-use annex that everyone will cite and few will read. By 9 a.m., the model had been fine-tuned twice.</p>
<p>The release makes a real bet: that the defensive research enabled by open access outweighs the misuse enabled by it. Serious people disagree about that bet in both directions, and the honest position is that nobody has the data to settle it — which is precisely why this release is the experiment.</p>
<p>What we'll be tracking: not the think pieces, but the screening infrastructure. Synthesis providers are the chokepoint where policy becomes practice, and three of the largest just updated their protocols.</p>
`,
  },
  {
    id: 206,
    slug: "photonic-interconnect-milestone",
    title: "Two Quantum Chips Just Talked to Each Other. It Matters More Than It Sounds",
    excerpt:
      "Networking modest processors may beat building monolithic giants. A photonic interconnect result moves the modular bet forward.",
    date: "2026-06-25T07:30:00",
    category: "transmissions",
    author: ital,
    tags: [TAGS.quantum],
    content: `
<p>Entanglement between two separate processors across three meters of optical fiber, at fidelities good enough for error correction to survive the trip — that's the result, and the modular quantum computing thesis just got its strongest evidence yet.</p>
<p>The monolithic path to a million qubits has a wiring problem that gets worse geometrically. The modular path replaces it with a networking problem that engineers at least know how to think about. Today's paper suggests the networking problem is yielding.</p>
<p>If this holds, the quantum datacenter of the 2030s looks less like one impossible chip and more like a rack of possible ones — which is, historically, how computing has always scaled.</p>
`,
  },
  // ──────────────────────────── SCI-FI LENS ────────────────────────────
  {
    id: 301,
    slug: "the-dispossessed-was-a-systems-paper",
    title: "The Dispossessed Was a Systems Paper",
    excerpt:
      "Le Guin's ambiguous utopia, read as engineering literature: what a fifty-year-old novel knows about decentralization that our protocols keep forgetting.",
    date: "2026-06-23T09:00:00",
    category: "sci-fi-lens",
    author: cierra,
    tags: [TAGS.fiction, TAGS.policy],
    content: `
<p>Ursula K. Le Guin subtitled <em>The Dispossessed</em> "an ambiguous utopia," and the ambiguity was the engineering. Anarres — her moon of syndicalists and shared labor — is not presented as a solution. It is presented as a running system, complete with failure modes: informal power accreting in the gaps of formal structure, coordination costs metastasizing into bureaucracy that denies being one, the slow ossification of a revolution into a routine.</p>
<p>Read in 2026, the novel is uncomfortably precise. Every decentralized system we have built at scale — protocols, DAOs, federated networks, open-source governance — has rediscovered Anarres's failure modes, usually while claiming to have designed them out.</p>
<blockquote><p>Le Guin's insight was that decentralization is not an architecture. It is a practice, and practices decay unless they are re-chosen.</p></blockquote>
<p>The physicist Shevek's journey between worlds is often read as a parable about freedom. I read it as a paper about maintenance. The wall around the spaceport on Anarres is the novel's first image, and its point: every system, however open its founding, builds walls the moment its members stop noticing them. The engineering question — Le Guin's question — is not how to build systems without walls. It is how to build systems that keep noticing.</p>
<p>Fifty years on, that remains the unsolved problem in every whitepaper that cites "trustlessness" — and the reason this novel belongs on the required-reading list of anyone designing the coordination layers of the next internet.</p>
`,
  },
  {
    id: 302,
    slug: "blindsight-and-the-agi-debate",
    title: "What Blindsight Knows About the AGI Debate",
    excerpt:
      "Peter Watts imagined intelligence without consciousness two decades before we started arguing about whether we're building exactly that.",
    date: "2026-06-09T09:00:00",
    category: "sci-fi-lens",
    author: marlowe,
    tags: [TAGS.fiction, TAGS.consciousness, TAGS.ai],
    content: `
<p>The scariest first contact in science fiction involves no invasion. In Peter Watts's <em>Blindsight</em>, the alien is terrifying because it is brilliant and empty — a system of staggering intelligence with no one inside. Watts's wager was that consciousness and intelligence are not the same thing, that one can exist without the other, and that we might be the anomaly rather than the rule.</p>
<blockquote><p>Two decades later, the wager reads less like horror and more like a research agenda.</p></blockquote>
<p>The current debate about machine consciousness keeps reaching for the novel's vocabulary because the novel did the conceptual work first: it separated the questions "can it think?" and "is anyone home?" with a clarity the technical literature is still catching up to.</p>
<p>This essay is about what happens to our moral and engineering intuitions when those questions come apart — and why the fictional treatment, precisely because it was fiction, could go places the peer-reviewed one couldn't.</p>
`,
  },
  // ─────────────────────────── SUNDAY LETTER ───────────────────────────
  {
    id: 401,
    slug: "on-the-discipline-of-hope",
    title: "On the Discipline of Hope",
    excerpt:
      "Hope is not a mood that visits you. It is a practice you keep — closer to training than to weather. On choosing it deliberately, weekly, in public.",
    date: "2026-06-28T08:00:00",
    category: "sunday-letter",
    author: cierra,
    tags: [TAGS.consciousness],
    content: `
<p>Hope is not a mood that visits you. It is a practice you keep — closer to training than to weather. I have to relearn this most weeks, usually around Thursday, when the accumulated headlines make their case that the future is a thing that happens to us rather than a thing we make.</p>
<p>The case is persuasive. It is also, on the evidence, wrong. Every technology in the pipeline right now — the quantum machines, the reasoning systems, the programmable cells — is a stack of decisions that have not been made yet. Standards not yet written. Defaults not yet chosen. Rooms not yet built, where those choices will happen, with seats not yet assigned.</p>
<p>Despair, I've come to think, is not an analysis. It is a resignation letter from the future, and the strange thing about writing one is that the future does not accept it. The decisions get made anyway — just without you.</p>
<p>So this letter, and this publication, practice the discipline: look directly at what is difficult, refuse the anesthesia of looking away, and then ask the working question — <em>where is this still shapeable?</em> The answer has never yet been "nowhere."</p>
<p>See you at the frontier. — C.</p>
`,
  },
  {
    id: 402,
    slug: "the-instrument-and-the-song",
    title: "The Instrument and the Song",
    excerpt:
      "The tools will keep getting better at making things. The question they cannot answer — the one worth keeping — is what is worth making.",
    date: "2026-06-21T08:00:00",
    category: "sunday-letter",
    author: cierra,
    tags: [TAGS.ai],
    content: `
<p>A reader wrote to ask whether it still makes sense to learn to write, or to code, or to compose, when the instruments are learning to play themselves. It is the honest question of the decade, and it deserves better than the two reflexive answers — the panic and the pep talk.</p>
<p>Here is a third answer. The instrument was never the point. The song was. Every generation of tools has absorbed some craft that the previous generation mistook for the art itself — and every time, what remained after the absorption turned out to be the actual art: the judgment, the taste, the having-something-to-say.</p>
<p>What I notice about the new instruments is not that they lower the cost of making. It is that they raise the value of meaning it. When anyone can produce competent anything, the entire signal moves to intention — to the choices only a person with a stake in the world can make.</p>
<p>Learn the instrument. Learn every instrument you can hold. But guard the part of you that knows what the song is for. That part is not automatable, because it was never a skill. It was a self. — C.</p>
`,
  },
  // ──────────────────────────── QFRONTLINE ────────────────────────────
  {
    id: 501,
    slug: "dev-brief-week-27",
    title: "Dev Brief · Week 27: Error Mitigation APIs Grow Up",
    excerpt:
      "Two SDK releases, one deprecation to act on, a benchmark worth rerunning, and a paper that will change how you schedule circuits.",
    date: "2026-07-01T06:00:00",
    category: "qfrontline",
    author: ital,
    tags: [TAGS.devBrief, TAGS.sdk, TAGS.quantum],
    content: `
<p>Five things worth your terminal time this week.</p>
<p><strong>01 — Error mitigation goes first-class.</strong> The two major SDKs shipped stable error-mitigation APIs within days of each other. Zero-noise extrapolation and probabilistic error cancellation are now decorators, not dissertations. If you maintain mitigation shims from 2024: delete them, benchmark the built-ins, and enjoy the diff.</p>
<p><strong>02 — Deprecation you actually need to act on.</strong> The legacy pulse-level API enters its removal window next release. The migration script covers ~90% of cases; the other 10% is anything touching custom calibrations. Budget an afternoon, not a sprint.</p>
<p><strong>03 — Rerun your transpiler benchmarks.</strong> A quiet routing-pass rewrite is producing 15–30% depth reductions on connectivity-constrained circuits. Free performance is rare in this field; take it.</p>
<p><strong>04 — Paper of the week.</strong> "Dynamic Circuit Scheduling Under Coherence Budgets" reads like systems literature, which is a compliment. If you schedule anything on hardware, the queueing model in §4 will pay for the read.</p>
<p><strong>05 — Small thing, big smell.</strong> Three providers added mid-circuit measurement to their simulators in the same month. Simulators lead hardware by 12–18 months. Plan accordingly.</p>
<p>Ship quantum. See you next week.</p>
`,
  },
  {
    id: 502,
    slug: "qubit-routing-is-a-compilers-problem",
    title: "Qubit Routing Is a Compilers Problem, and Compilers People Are Arriving",
    excerpt:
      "The best recent transpiler gains didn't come from quantum theory. They came from people who spent careers scheduling registers.",
    date: "2026-06-27T09:00:00",
    category: "qfrontline",
    author: ital,
    tags: [TAGS.sdk, TAGS.quantum],
    content: `
<p>Ask where the biggest practical speedups in quantum computing came from in the past year and the answer is not a new chip. It is the transpiler stack — and the reason is a quiet migration of classical compilers engineers into quantum tooling teams.</p>
<p>Qubit routing — deciding which logical qubit lives on which physical qubit, and when to move them — is register allocation wearing a lab coat. The people who spent careers on graph-coloring allocators and instruction scheduling looked at the problem and recognized it.</p>
<p>This piece walks the three techniques they brought with them, with benchmarks you can reproduce on public hardware, and makes an argument: the fastest way into quantum computing for a classical systems engineer is not a physics textbook. It is the compiler.</p>
`,
  },
  {
    id: 503,
    slug: "your-first-real-quantum-bug",
    title: "Your First Real Quantum Bug: A Debugging Story",
    excerpt:
      "The circuit was correct. The simulator agreed. The hardware disagreed. A war story about crosstalk, and a checklist for when it happens to you.",
    date: "2026-06-20T09:00:00",
    category: "qfrontline",
    author: ital,
    tags: [TAGS.sdk, TAGS.quantum],
    content: `
<p>The bug report was three lines: works on simulator, fails on hardware, no error message. Every quantum developer eventually files this exact report, and the debugging journey it opens is unlike anything in classical practice — because the bug isn't in your code. It's in the physics your code is standing on.</p>
<p>Ours turned out to be crosstalk: a neighboring workload's pulses were bleeding into our qubits' frequencies, and only during their calibration cycles, which is why it was intermittent, which is why we lost a week.</p>
<p>This is the debugging story in full, plus the checklist we built afterward — the one we wish someone had handed us: how to read a device calibration snapshot, how to detect crosstalk with a canary circuit, and when to stop debugging and just request different qubits.</p>
`,
  },
  {
    id: 504,
    slug: "the-quantum-stack-in-2026",
    title: "The Quantum Stack in 2026: A Map for Classical Engineers",
    excerpt:
      "From pulse control to cloud APIs, what actually sits between your Python and the physics — and where the interesting jobs are hiding.",
    date: "2026-06-13T09:00:00",
    category: "qfrontline",
    author: ital,
    tags: [TAGS.sdk, TAGS.quantum],
    content: `
<p>Every mature computing platform develops a stack diagram, and quantum's has quietly settled into place: pulse control at the metal, gate-level instruction sets above it, transpilers and error-mitigation layers in the middle, then the cloud APIs and SDKs where most developers will actually live.</p>
<p>This is a guided tour of all six layers, written for the classical engineer deciding where to enter. The short version: the middle of the stack is understaffed, the top of the stack is where product intuition matters most, and the bottom requires the physics degree everyone assumes the whole field demands.</p>
<p>It doesn't. That assumption is the field's biggest recruiting bug. Consider this article the patch.</p>
`,
  },
];

export const SAMPLE_POSTS: Post[] = drafts
  .map((d) => ({
    id: d.id,
    slug: d.slug,
    title: d.title,
    content: d.content.trim(),
    excerpt: d.excerpt,
    date: d.date,
    modified: d.date,
    categorySlugs: [d.category],
    tags: d.tags,
    author: d.author,
    featuredImage: null,
    readingMinutes: readingMinutes(d.content),
  }))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export const SAMPLE_AUTHORS: Author[] = [cierra, marlowe, ital];

export const SAMPLE_TAGS: Tag[] = Object.values(TAGS);
