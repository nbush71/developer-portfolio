"use client";

import Image from "next/image";
import { useState } from "react";
import ContactModal from "@/components/ContactModal";
import ThemeToggle from "@/components/ThemeToggle";
import { links } from "@/data/links";
import { projects, techs, type Project } from "@/data/projects";

const btn = "rounded-md px-5 py-2.5 text-sm font-medium transition";
const primary = `${btn} bg-accent text-on-accent hover:brightness-110`;
const outline = `${btn} border border-line hover:border-accent`;
const corner = "absolute size-5 border-accent";

function Brackets({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative p-3 ${className}`}>
      <span className={`${corner} left-0 top-0 border-l-2 border-t-2`} />
      <span className={`${corner} right-0 top-0 border-r-2 border-t-2`} />
      <span className={`${corner} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${corner} bottom-0 right-0 border-b-2 border-r-2`} />
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [tech, setTech] = useState<string | null>(null);
  const [contact, setContact] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);

  const visible = tech ? projects.filter((p) => p.stack.includes(tech)) : projects;
  const selectedProject = visible.find((p) => p.id === selectedProjectId) ?? visible[0];

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <a href="#top" className="text-lg font-semibold">
            <span className="mr-1.5 font-code text-accent">&lt;/&gt;</span>Nadine Bush
          </a>
          <nav className="flex items-center gap-1 text-sm sm:gap-2">
            <a href="#projects" className="hidden rounded-md px-3 py-1.5 hover:text-accent sm:block">Projects</a>
            <a href="#about" className="hidden rounded-md px-3 py-1.5 hover:text-accent sm:block">About</a>
            {links.graphicArts && (
              <a href={links.graphicArts} target="_blank" rel="noreferrer" className="hidden rounded-md px-3 py-1.5 hover:text-accent sm:block">Graphic design</a>
            )}
            <ThemeToggle />
            <button onClick={() => setContact(true)} className="rounded-md border border-accent px-4 py-1.5 font-medium text-accent hover:bg-accent-soft">
              Contact
            </button>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="dotgrid border-b border-line">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-5 md:py-20">
            <div className="space-y-6 md:col-span-3">
              <h1 className="text-4xl font-semibold leading-[1.08] md:text-6xl">
                I build web apps that are clear, fast and easy to use.
              </h1>
              <p className="max-w-xl text-lg font-medium leading-7 text-accent">
                Frontend Web Developer and Full Stack Software Engineer, ready to grow into new opportunities.
              </p>
              <p className="max-w-xl text-lg leading-8 text-muted">
                I&apos;m Nadine, a frontend software engineer. I turn ideas into working websites and apps,
                from the first design to the live launch.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#projects" className={primary}>See my work</a>
                <a href={links.linkedin} target="_blank" rel="noreferrer" className={outline}>LinkedIn</a>
                
              </div>
              <ul className="flex flex-wrap gap-x-8 gap-y-2 pt-2 text-sm">
                <li>{projects.length} live projects</li>
                <li>Paid internship experience</li>
                <li>Full stack: Firebase login, Stripe payments, Next.js API</li>
                <li>Also a graphic designer and technical writer</li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <Brackets className="mx-auto max-w-xs">
                <Image src="https://nbush71.github.io/E-Portfolio/assets/NadineBush.jpg" alt="Nadine Bush"
                       width={640} height={640} priority className="aspect-square w-full rounded-sm object-cover" />
              </Brackets>
              <p className="mx-auto mt-4 flex max-w-xs items-center gap-2 text-sm">
                <span className="size-2.5 rounded-full bg-accent motion-safe:animate-pulse" />
                Open to new opportunities
              </p>
            </div>
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-6xl px-5 py-16">
          <div className="max-w-2xl">
            <p className="font-code text-sm font-medium uppercase tracking-[0.18em] text-accent">Selected work</p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Interactive feature case studies</h2>
            <p className="mt-3 leading-7 text-muted">
              Choose a project to explore what I built, the tools I used, and where you can see the finished work.
            </p>
          </div>

          <div className="mt-8" role="group" aria-label="Filter projects by technology">
            <p className="mb-3 text-sm text-muted" aria-live="polite">
              {tech ? `Showing ${visible.length} of ${projects.length} projects built with ${tech}.` : "Pick a technology to see the projects that use it."}
            </p>
            <ul className="flex flex-wrap gap-2">
              <li>
                <button aria-pressed={tech === null} onClick={() => setTech(null)}
                        className={`rounded-md border px-3 py-1.5 text-sm ${tech === null ? "border-accent bg-accent text-on-accent" : "border-line hover:border-accent"}`}>
                  All
                </button>
              </li>
              {techs.map((t) => {
                const count = projects.filter((p) => p.stack.includes(t.name)).length;
                const on = tech === t.name;
                return (
                  <li key={t.name}>
                    <button aria-pressed={on} onClick={() => setTech(on ? null : t.name)}
                            className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm ${on ? "border-accent bg-accent text-on-accent" : "border-line hover:border-accent"}`}>
                      <Image src={t.logo} alt="" width={18} height={18} unoptimized className="size-[18px] rounded-sm bg-white object-contain" />
                      {t.name}
                      <span className={`font-code text-xs ${on ? "" : "text-muted"}`}>{count}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-8">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3" role="group" aria-label="Choose a project case study">
              {visible.map((p, i) => {
                const isSelected = p.id === selectedProject.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedProjectId(p.id)}
                    className={`flex min-h-16 items-center gap-3 rounded-md border px-4 py-3 text-left transition-colors ${
                      isSelected
                        ? "border-accent bg-accent-soft text-ink"
                        : "border-line bg-card hover:border-accent"
                    }`}
                  >
                    <span className="font-code text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-medium">{p.title}</span>
                    <span className="ml-auto text-sm text-muted" aria-hidden="true">{isSelected ? "Selected" : "View"}</span>
                  </button>
                );
              })}
            </div>

            <article aria-labelledby="featured-project-title" className="mt-6 grid items-center gap-8 rounded-xl border border-line bg-card p-5 md:p-8 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <Brackets>
                  <Image
                    src={selectedProject.image}
                    alt={`${selectedProject.title} project screenshot`}
                    width={1280}
                    height={720}
                    className="aspect-video w-full rounded-sm object-cover object-top"
                  />
                </Brackets>
              </div>
              <div className="space-y-5 lg:col-span-2">
                <div>
                  <p className="font-code text-sm text-accent">{selectedProject.kind}</p>
                  <h3 id="featured-project-title" className="mt-2 text-3xl font-semibold md:text-4xl">
                    {selectedProject.title}
                  </h3>
                </div>
                <p className="text-lg leading-7">{selectedProject.summary}</p>
                <div>
                  <h4 className="mb-2 text-sm font-semibold">Built with</h4>
                  <ul className="flex flex-wrap gap-2" aria-label={`${selectedProject.title} technologies`}>
                    {selectedProject.stack.map((name) => (
                      <li key={name}>
                        <span className="inline-block rounded-md border border-line px-2.5 py-1 font-code text-xs text-muted">
                          {name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-3 pt-1">
                  <a href={selectedProject.live} target="_blank" rel="noreferrer" className={primary}>
                    View live project
                  </a>
                  <a href={selectedProject.repo} target="_blank" rel="noreferrer" className={outline}>
                    View source code
                  </a>
                </div>
              </div>
              <p className="sr-only" aria-live="polite" aria-atomic="true">
                {selectedProject.title} case study selected.
              </p>
            </article>
          </div>
        </section>

        <section id="about" className="border-t border-line bg-card">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-5">
            <h2 className="text-3xl font-semibold md:col-span-2 md:text-4xl">About me</h2>
            <div className="space-y-5 md:col-span-3">
              <p className="max-w-prose text-lg leading-8">
                I&apos;m a frontend software engineer with earlier web development experience, and I&apos;m
                passionate about both technology and design. I build websites and apps that look good, work well
                and are easy to maintain. I also work as a graphic designer and technical writer.
              </p>
              <p className="max-w-prose leading-7">
                On the full stack side, I added Firebase login and Stripe subscriptions to Summarist, and the contact
                form on this site runs on a Next.js API route that saves messages to a Firebase database.
              </p>
              <p className="text-muted">
                Skilled in HTML, CSS, JavaScript, React, Next.js, TypeScript, Tailwind CSS, Firebase and technical writing.
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => setContact(true)} className={primary}>Send me a message</button>
                <a href={links.linkedin} target="_blank" rel="noreferrer" className={outline}>LinkedIn</a>
                
                <a href={links.github} target="_blank" rel="noreferrer" className={outline}>GitHub</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line px-5 py-6 text-center text-sm text-muted">
        Copyright © 2026 Nadine Bush | Frontend Software Engineer
        {links.graphicArts && (
          <>
            {" | "}
            <a href={links.graphicArts} target="_blank" rel="noreferrer" className="hover:text-accent">Graphic Design Portfolio</a>
          </>
        )}
      </footer>

      <ContactModal open={contact} onClose={() => setContact(false)} />
    </>
  );
}
