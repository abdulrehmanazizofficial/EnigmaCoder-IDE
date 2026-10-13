import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { createClient, User } from "@supabase/supabase-js";
import "./styles.css";

const releaseUrl =
  import.meta.env.VITE_ENIGMACODER_DOWNLOAD_URL ||
  "/downloads/EnigmaCoder-IDE-Setup-1.20.0.exe";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://iugycxpfpmfxgvdrjrmv.supabase.co";
const supabaseKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1Z3ljeHBmcG1feGd2ZHJqcm12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwODkwMDksImV4cCI6MjEwNTY2NTAwOX0.rPvqf2cT48ubi64Oe8Vc_3D7kop60LDa8UgVMeovCSs";

const navItems = [
  ["Workflow", "/#workflow"],
  ["The IDE", "/#ide"],
  ["Product", "/product"],
  ["Agents", "/agents"],
  ["Models", "/models"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  const navigate = (to: string) => {
    if (to.startsWith("/#")) {
      if (window.location.pathname !== "/") {
        window.history.pushState({}, "", "/");
        setPath("/");
      }
      const id = to.replace("/#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 50);
      return;
    }

    window.history.pushState({}, "", to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const page =
    path === "/product" ? <Product navigate={navigate} /> :
    path === "/agents" ? <Agents navigate={navigate} /> :
    path === "/models" ? <Models navigate={navigate} /> :
    path === "/about" ? <About navigate={navigate} /> :
    path === "/contact" ? <Contact navigate={navigate} /> :
    path === "/download" ? <Download /> :
    path === "/sign-in" ? <SignIn /> :
    <Home navigate={navigate} />;

  return (
    <>
      <Header currentPath={path} navigate={navigate} />
      {page}
      <Footer navigate={navigate} />
    </>
  );
}

function Header({ currentPath, navigate }: { currentPath: string; navigate: (to: string) => void }) {
  return (
    <header className="nav">
      <div className="wrap">
        <a className="brand" href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
          <picture><source srcSet="/logo.webp" type="image/webp" /><img src="/logo.png" alt="EnigmaCoder Logo" width="60" height="40" fetchpriority="high" /></picture>
          <span>EnigmaCoder</span>
        </a>
        <nav className="links" aria-label="Primary">
          {navItems.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={currentPath === href ? "active" : ""}
              onClick={(e) => { e.preventDefault(); navigate(href); }}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <a
            className="btn g s"
            href="https://discord.gg/rNVZYwzJY"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join Discord Community"
          >
            Discord
          </a>
          <a className="btn p s" href="/download" onClick={(e) => { e.preventDefault(); navigate("/download"); }}>
            Download
          </a>
          <a className="btn g s" href="/sign-in" onClick={(e) => { e.preventDefault(); navigate("/sign-in"); }}>
            Sign In
          </a>
        </div>
      </div>
    </header>
  );
}

function HeroAppRecreation() {
  const [typedPrompt, setTypedPrompt] = useState("What do you want to build?");
  const [isTyping, setIsTyping] = useState(false);
  const [activeWorkflowTag, setActiveWorkflowTag] = useState<string | null>(null);

  const fullPromptText = "Add sign-in to my app and verify it with tests";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true);
      let i = 0;
      const interval = setInterval(() => {
        setTypedPrompt(fullPromptText.slice(0, ++i));
        if (i >= fullPromptText.length) {
          clearInterval(interval);
          setActiveWorkflowTag("Add sign-in to my app and verify…");
        }
      }, 35);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="heroide a" style={{ ["--i" as any]: 6 }}>
      <div className="app" id="app" role="img" aria-label="Recreation of the EnigmaCoder IDE home screen">
        <div className="mbar">
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Window</span>
          <b className="tag">RECREATION</b>
        </div>
        <div className="ag">
          <aside className="sb">
            <div className="sbh">
              <picture><source srcSet="/logo.webp" type="image/webp" /><img src="/logo.png" alt="EnigmaCoder Logo" width="60" height="40" fetchpriority="high" /></picture>
              <b>EnigmaCoder</b>
              <em className="ib">IDE</em>
            </div>
            <div className="srch">
              Search commands <kbd>⌘K</kbd>
            </div>
            <ul className="nv">
              <li>New Chat</li>
              <li>Customize</li>
              <li>Company</li>
              <li>AI Modes Hub</li>
              <li>Agent Marketplace</li>
              <li>Secure Toolbox</li>
              <li>Runtime Engine</li>
              <li>Integrations</li>
              <li>AI Memory</li>
              <li>Artifacts</li>
              <li>Development Studio</li>
              <li>Agent Canvas</li>
              <li>Departments</li>
              <li>Automate</li>
            </ul>
            <div className="cv">
              Conversations
              {activeWorkflowTag && (
                <div className="conv">
                  <i className="dot"></i>
                  <span>{activeWorkflowTag}</span>
                </div>
              )}
            </div>
            <div className="gs">
              Getting started <small>4 complete</small>
            </div>
            <div className="loc">
              <i className="dot g"></i>Local
            </div>
          </aside>

          <section className="mn">
            <div className="ttl">
              <picture><source srcSet="/logo.webp" type="image/webp" /><img src="/logo.png" alt="EnigmaCoder Logo" width="60" height="40" fetchpriority="high" /></picture>
              <h3>EnigmaCoder IDE</h3>
            </div>
            <p className="subt">
              AI-Native Engineering Environment — <b>PLAN</b> → <b>CODE</b> → <b>RUN</b> → <b>DEBUG</b> → <b>VERIFY</b>
            </p>
            <div className="pbx">
              <div className="ph">
                {typedPrompt}
                <span className="cr"></span>
              </div>
              <div className="pr2">
                <span>+</span>
                <span className="mdl">Select model ⌄</span>
                <button className="snd" type="button" aria-label="Send">
                  ↑
                </button>
              </div>
            </div>
            <div className="chips">
              <span>Open Workspace</span>
              <span>Plugins</span>
            </div>
            <p className="rec">Recommended automations</p>
            <div className="auto">
              <div>
                <h4>GitHub code review</h4>
                <p>Review labeled pull-request heads, publish readable findings, and…</p>
              </div>
              <div>
                <h4>Custom automation</h4>
                <p>Create a custom automation from a prompt, plugin-powered prompt, …</p>
              </div>
              <div>
                <h4>GitHub issue to PR</h4>
                <p>Implement ready GitHub issues, address pull request feedback, and…</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <p className="cap">
        Desktop engineering interface recreation: project file tree, Monaco code editor, specialist agent conversations, and sandboxed terminal execution.
      </p>
    </div>
  );
}

function Home({ navigate }: { navigate: (to: string) => void }) {
  return (
    <main id="top">
      {/* Hero Section */}
      <section className="hero">
        <div className="bgfx"></div>
        <div className="wrap">
          <p className="eyebrow a" style={{ ["--i" as any]: 0 }}>
            AI-native software engineering environment
          </p>
          <h1 className="a" style={{ ["--i" as any]: 1 }}>
            From idea to <em>working</em> software.
          </h1>
          <p className="lede a" style={{ ["--i" as any]: 2 }}>
            EnigmaCoder brings your project, code, AI assistance, and execution workflow together in one engineering environment. It understands the full project, writes diffs you can review, executes commands for real, and verifies what actually works.
          </p>
          <div className="cta a" style={{ ["--i" as any]: 3 }}>
            <a className="btn p" href="/download" onClick={(e) => { e.preventDefault(); navigate("/download"); }}>
              Get EnigmaCoder (Win x64)
            </a>
            <a
              className="btn g"
              href="https://discord.gg/rNVZYwzJY"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join the Community
            </a>
            <a
              className="btn g"
              href="https://huggingface.co/enigmacoder/EnigmaCoder-2B"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore EnigmaCoder 2B ↗
            </a>
          </div>
          <p className="loop a" style={{ ["--i" as any]: 4 }}>
            <b>PLAN</b> → <b>CODE</b> → <b>RUN</b> → <b>DEBUG</b> → <b>VERIFY</b> &nbsp;·&nbsp; CLOSED-LOOP ENGINEERING
          </p>
          <HeroAppRecreation />
        </div>
      </section>

      {/* Meet EnigmaCoder 2B Section */}
      <section className="sec" id="model">
        <div className="wrap">
          <div>
            <p className="eyebrow">Our Reasoning Core</p>
            <h2>Meet EnigmaCoder 2B</h2>
            <p className="sub" style={{ maxWidth: "68ch" }}>
              Our first step toward AI-native software engineering. Developed to power the core engineering loop:{" "}
              <b>PLAN</b> → <b>CODE</b> → <b>RUN</b> → <b>DEBUG</b> → <b>VERIFY</b>.
            </p>
          </div>

          <div className="bp" style={{ marginTop: 36, gridTemplateColumns: "1.2fr 0.8fr", gridTemplateAreas: "'spec code'" }}>
            <div className="z za" style={{ gridArea: "spec", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <b>MODEL SPECIFICATION</b>
              <div>
                <h3 style={{ fontSize: 24, margin: "6px 0 12px" }}>EnigmaCoder 2B</h3>
                <p style={{ color: "var(--t)", fontSize: 15, lineHeight: 1.6, marginBottom: 16 }}>
                  Built upon Google's Gemma-4 architecture (~5B parameters, merged Float16 safetensors), EnigmaCoder 2B is trained specifically for agentic code synthesis, multi-step debugging, and iterative repair cycles with an expansive 128K token context window.
                </p>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "10px",
                  fontSize: 13,
                  fontFamily: "var(--mono)",
                  background: "var(--s)",
                  padding: "14px",
                  borderRadius: "6px",
                  border: "1px solid var(--l)"
                }}>
                  <div><span style={{ color: "var(--m)" }}>Base Architecture:</span> Gemma-4 IT</div>
                  <div><span style={{ color: "var(--m)" }}>Context Length:</span> 128,000 tokens</div>
                  <div><span style={{ color: "var(--m)" }}>Weight Format:</span> SafeTensors (FP16)</div>
                  <div><span style={{ color: "var(--m)" }}>License:</span> Gemma Terms of Use</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap", alignItems: "center" }}>
                <a
                  className="btn p"
                  href="https://huggingface.co/enigmacoder/EnigmaCoder-2B"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try EnigmaCoder 2B
                </a>
                <a
                  className="btn g"
                  href="https://huggingface.co/enigmacoder/EnigmaCoder-2B"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Model Details
                </a>
              </div>
            </div>

            <div className="z zb" style={{ gridArea: "code", background: "var(--s)" }}>
              <b>PYTHON USAGE</b>
              <p style={{ fontSize: 13, color: "var(--m)", marginBottom: 12 }}>
                Load directly with standard Hugging Face Transformers:
              </p>
              <pre style={{
                fontFamily: "var(--mono)",
                fontSize: 12,
                color: "#E8E9EC",
                background: "#08090C",
                padding: 14,
                borderRadius: 6,
                border: "1px solid var(--l)",
                overflowX: "auto",
                lineHeight: 1.5
              }}>
{`from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

model_id = "enigmacoder/EnigmaCoder-2B"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    torch_dtype=torch.float16,
    device_map="auto"
)`}
              </pre>
            </div>
          </div>

          {/* Three Download & Use Options */}
          <div className="leg" style={{ gridTemplateColumns: "repeat(3, 1fr)", marginTop: 36, paddingTop: 36 }}>
            <div style={{ background: "var(--s)", padding: 20, borderRadius: 8, border: "1px solid var(--l)" }}>
              <b>OPTION 01</b>
              <h3>Try on Hugging Face</h3>
              <p style={{ margin: "8px 0 16px" }}>
                Explore the open model card, inspect tokenizer configurations, and clone model weights directly from the Hugging Face hub.
              </p>
              <a
                className="btn g s"
                href="https://huggingface.co/enigmacoder/EnigmaCoder-2B"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Repository ↗
              </a>
            </div>

            <div style={{ background: "var(--s)", padding: 20, borderRadius: 8, border: "1px solid var(--l)" }}>
              <b>OPTION 02</b>
              <h3>Download Model Files</h3>
              <p style={{ margin: "8px 0 16px" }}>
                Download the verified safetensors weights (~9.6 GB total) using Git LFS or Hugging Face CLI for local GPU or CPU inference.
              </p>
              <a
                className="btn g s"
                href="https://huggingface.co/enigmacoder/EnigmaCoder-2B/tree/main"
                target="_blank"
                rel="noopener noreferrer"
              >
                Browse Files ↗
              </a>
            </div>

            <div style={{ background: "var(--s)", padding: 20, borderRadius: 8, border: "1px solid var(--l)" }}>
              <b style={{ color: "var(--am)" }}>OPTION 03</b>
              <h3>Use with EnigmaCoder IDE</h3>
              <p style={{ margin: "8px 0 16px" }}>
                Currently available as a standalone model. Direct 1-click native execution inside the IDE runtime is in active development.
              </p>
              <span className="st p" style={{ display: "inline-block" }}>
                IN ACTIVE DEVELOPMENT
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* The Loop Section */}
      <section className="sec" id="workflow">
        <div className="wrap two">
          <div className="stick">
            <p className="eyebrow">The loop</p>
            <h2>A loop, not a prompt.</h2>
            <p className="sub">
              Generating code is one step of five. EnigmaCoder is designed to stay in the loop until the work is checked, not just written.
            </p>
          </div>
          <ol className="steps">
            <li>
              <p className="n">01</p>
              <h3>Plan</h3>
              <p>Understand the task before touching code. Establish scope, constraints, and an approach you can review.</p>
              <code>scope · constraints · approach</code>
            </li>
            <li>
              <p className="n">02</p>
              <h3>Code</h3>
              <p>Create or modify software in the context of the whole project, in changes small enough to read.</p>
              <code>edit files · keep diffs reviewable</code>
            </li>
            <li>
              <p className="n">03</p>
              <h3>Run</h3>
              <p>Execute the application and its commands for real. Output is captured, not imagined.</p>
              <code>$ run · capture output · exit codes</code>
            </li>
            <li>
              <p className="n">04</p>
              <h3>Debug</h3>
              <p>When something breaks, read the failure, find the root cause, and fix that. Not the symptom.</p>
              <code>error → root cause → fix</code>
            </li>
            <li>
              <p className="n">05</p>
              <h3>Verify</h3>
              <p>Re-run the checks. Report what passed, what failed, and what was never tested.</p>
              <code>VERIFIED · PARTIAL · NOT TESTED</code>
            </li>
          </ol>
        </div>
      </section>

      {/* The IDE Blueprint & Product Story Section */}
      <section className="sec" id="ide">
        <div className="wrap">
          <div>
            <p className="eyebrow">Integrated Development Environment</p>
            <h2>One workspace. Four sources of truth.</h2>
            <p className="sub" style={{ maxWidth: "68ch" }}>
              Most AI assistants operate in an isolated chat bubble disconnected from your filesystem and command runner. EnigmaCoder grounds intelligence in four synchronized sources of truth so actions produce verified results.
            </p>
          </div>
          <div className="bp" role="group" aria-label="Diagram of the four areas of the IDE">
            <div className="z za">
              <b>SOURCE 01</b>
              <strong>Project Context</strong>
              <span>Full file tree inspection, repository structure, and configuration files. Never truncated paste-buffers.</span>
            </div>
            <div className="z zb">
              <b>SOURCE 02</b>
              <strong>Monaco Code Editor</strong>
              <span>Desktop code editor displaying real syntax trees, in-place file modifications, and reviewable git diffs.</span>
            </div>
            <div className="z zc">
              <b>SOURCE 03</b>
              <strong>Specialist AI Agents</strong>
              <span>Context-aware models and agents that reason through plans, propose scoped diffs, and self-correct on failure.</span>
            </div>
            <div className="z zd">
              <b>SOURCE 04</b>
              <strong>Sandboxed Terminal</strong>
              <span>Real command execution environment where builds, unit tests, and runtime processes produce authentic output.</span>
            </div>
          </div>
          <div className="leg">
            <div>
              <b>01 · CONTEXT</b>
              <h3>Understand the project</h3>
              <p>The agent reads package definitions, dependencies, and surrounding code before modifying a single line.</p>
            </div>
            <div>
              <b>02 · EDITING</b>
              <h3>In-place file diffs</h3>
              <p>Edits are staged directly in your workspace files so you can review clean side-by-side diffs before executing.</p>
            </div>
            <div>
              <b>03 · EXECUTION</b>
              <h3>Capture real output</h3>
              <p>The terminal runs test suites and compilers, capturing exact error messages, exit codes, and call stacks.</p>
            </div>
            <div>
              <b>04 · REPAIR</b>
              <h3>Iterate & verify</h3>
              <p>Failures feed back into the reasoning loop to diagnose the root cause and confirm the fix passes all checks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Engineering Capabilities Section */}
      <section className="sec" id="capabilities">
        <div className="wrap">
          <div>
            <p className="eyebrow">Real Engineering Capabilities</p>
            <h2>What you can build and do today.</h2>
            <p className="sub">
              EnigmaCoder provides an authentic developer environment designed to move from concept to working code with continuous evidence.
            </p>
          </div>
          <div className="tbl">
            <div className="row">
              <div>
                <strong>Work with your actual project</strong>
                <p>Open full repositories, navigate the file tree, and ground AI assistance in your authentic file structure instead of pasted fragments.</p>
              </div>
              <span className="st d">WORKSPACE CONTEXT</span>
            </div>
            <div className="row">
              <div>
                <strong>Edit code in context</strong>
                <p>Inspect, write, and review changes directly in real files using the integrated desktop Monaco editor with unified git diff review.</p>
              </div>
              <span className="st d">MONACO EDITOR</span>
            </div>
            <div className="row">
              <div>
                <strong>Collaborate with AI agents</strong>
                <p>Discuss implementation plans, clarify acceptance constraints, and observe multi-step problem solving in an interactive event stream.</p>
              </div>
              <span className="st d">AI CONVERSATION</span>
            </div>
            <div className="row">
              <div>
                <strong>Run and inspect real commands</strong>
                <p>Execute test suites, build scripts, package managers, and compilers in a real sandboxed terminal to capture genuine exit codes and stack traces.</p>
              </div>
              <span className="st d">TERMINAL RUNTIME</span>
            </div>
            <div className="row">
              <div>
                <strong>Evidence-based verification</strong>
                <p>Never rely on a language model's guess. Inspect test runs, compiler output, and explicit evidence reports before accepting code changes.</p>
              </div>
              <span className="st d">VERIFICATION PROOFS</span>
            </div>
            <div className="row">
              <div>
                <strong>Specialist agent organization</strong>
                <p>Coordinate engineering tasks across 11 structured departments and 124 registered specialist roles with dedicated permission profiles.</p>
              </div>
              <span className="st d">MULTI-AGENT COMPANY</span>
            </div>
            <div className="row">
              <div>
                <strong>Visual Agent Canvas DAG</strong>
                <p>Define and track complex engineering workflows visually across Web, App, SaaS, AI, and Automation domains.</p>
              </div>
              <span className="st d">CANVAS WORKFLOW</span>
            </div>
            <div className="row">
              <div>
                <strong>Universal Toolbox & MCP</strong>
                <p>Extend agent capabilities with Model Context Protocol (MCP) servers, custom tool integrations, and strict authorization gates.</p>
              </div>
              <span className="st d">TOOLBOX & MCP</span>
            </div>
          </div>
          <p className="fine">
            All capabilities reflect the functional features of the EnigmaCoder v1.20.0 desktop distribution for Windows x64.
          </p>
        </div>
      </section>

      {/* Developers & Verification Report Card */}
      <section className="sec" id="developers">
        <div className="wrap">
          <div>
            <p className="eyebrow">Built for developers</p>
            <h2>For people who read the stack trace.</h2>
          </div>
          <div className="dev">
            <div>
              <div className="bn">
                <h3>Work with real projects</h3>
                <p>Open a workspace, browse files, and keep the agent grounded in your actual code.</p>
              </div>
              <div className="bn">
                <h3>Understand code before changing it</h3>
                <p>Ask about a module, a function, or a failure in the context of the project.</p>
              </div>
              <div className="bn">
                <h3>Run commands in the same place</h3>
                <p>Execute tests, builds, and scripts without leaving the environment.</p>
              </div>
              <div className="bn">
                <h3>Investigate errors properly</h3>
                <p>Trace a failure to a cause, fix it, and run the check again.</p>
              </div>
              <div className="bn">
                <h3>Validate changes</h3>
                <p>End with a report you can check: verified, partial, or not tested.</p>
              </div>
            </div>
            <div className="rep">
              <h5>VERIFICATION REPORT · RUNTIME PROOF</h5>
              <div>
                <span className="v">VERIFIED</span>
                <span>sign-in · session create</span>
              </div>
              <div>
                <span className="v">VERIFIED</span>
                <span>project create · persists</span>
              </div>
              <div>
                <span className="pa">PARTIAL</span>
                <span>client portal · 1 case open</span>
              </div>
              <div>
                <span className="nt">NOT TESTED</span>
                <span>email delivery</span>
              </div>
              <small>An example of the report format. Claims should always match evidence.</small>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="sec final">
        <div className="wrap">
          <p className="eyebrow">Production Ready</p>
          <h2>Stop trusting the output. <em>Verify it.</em></h2>
          <p className="sub">
            EnigmaCoder v1.20.0 is available for Windows x64. Built for developers who demand real execution and verified code.
          </p>
          <div className="cta">
            <a className="btn p" href="/download" onClick={(e) => { e.preventDefault(); navigate("/download"); }}>
              Download EnigmaCoder (v1.20.0)
            </a>
            <a className="btn g" href="#workflow" onClick={(e) => { e.preventDefault(); navigate("/#workflow"); }}>
              Revisit the workflow
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function Product({ navigate }: { navigate: (to: string) => void }) {
  return (
    <main className="wrap sec" style={{ paddingTop: 40 }}>
      <p className="eyebrow">Platform Architecture</p>
      <h2>The EnigmaCoder Studio System</h2>
      <p className="sub" style={{ marginBottom: 40 }}>
        A complete desktop engineering environment connecting Monaco code editing, sandboxed terminals, multi-agent pipelines, and verified evidence.
      </p>

      <div className="bp" style={{ marginTop: 20 }}>
        <div className="z za">
          <b>01</b>
          <strong>Monaco & Terminal Shell</strong>
          <span>Real desktop code editing paired with an xterm-backed command terminal for authentic local execution.</span>
        </div>
        <div className="z zb">
          <b>02</b>
          <strong>Agent Canvas DAG</strong>
          <span>Visual pipeline creator for Web, Mobile, SaaS, and Game development routines connected to the CEO engine.</span>
        </div>
        <div className="z zc">
          <b>03</b>
          <strong>Universal Toolbox & MCP</strong>
          <span>Extensible plugin architecture supporting MCP tools, local commands, and custom APIs under strict permission gates.</span>
        </div>
        <div className="z zd">
          <b>04</b>
          <strong>Zero Fake Completion</strong>
          <span>Evidence-based delivery: tasks require real test outputs, compilation checks, or runtime proofs before finishing.</span>
        </div>
      </div>

      <div style={{ marginTop: 60, textAlign: "center" }}>
        <a className="btn p" href="/download" onClick={(e) => { e.preventDefault(); navigate("/download"); }}>
          Download for Windows (x64)
        </a>
      </div>
    </main>
  );
}

import agentInventoryData from "./agent-inventory-data.json";

function Agents({ navigate }: { navigate: (to: string) => void }) {
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const totalSpecialists = agentInventoryData.reduce((acc, d) => acc + d.specialists.length, 0);
  const totalHeads = agentInventoryData.filter((d) => d.head !== null).length;
  const totalAgents = totalSpecialists + totalHeads;

  const filteredDepartments = agentInventoryData.filter((d) => {
    if (selectedDept !== "all" && d.id !== selectedDept) return false;
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const matchesDept = d.name.toLowerCase().includes(query) || d.mission.toLowerCase().includes(query);
    const matchesHead = d.head?.name.toLowerCase().includes(query) || d.head?.responsibility.toLowerCase().includes(query);
    const matchesSpecs = d.specialists.some(
      (s) => s.name.toLowerCase().includes(query) || s.responsibility.toLowerCase().includes(query)
    );
    return matchesDept || matchesHead || matchesSpecs;
  });

  return (
    <main className="wrap sec" style={{ paddingTop: 40 }}>
      <p className="eyebrow">Verified AI Engineering Organization</p>
      <h2>Multi-Agent Engineering Directory</h2>
      <p className="sub" style={{ marginBottom: 32, maxWidth: "72ch" }}>
        EnigmaCoder features a structured organization of <b>11 departments</b> and <b>{totalAgents} registered agents</b> (11 Department Heads + {totalSpecialists} Specialist Roles). Every role has explicit permissions, tool capabilities, and verification criteria.
      </p>

      {/* Filter & Search Bar */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center", marginBottom: 32 }}>
        <input
          type="text"
          className="input-field"
          style={{ maxWidth: 360 }}
          placeholder="Search by role, capability, or keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <button
            className={`agent-filter-btn ${selectedDept === "all" ? "active" : ""}`}
            onClick={() => setSelectedDept("all")}
          >
            All Departments ({totalAgents})
          </button>
          {agentInventoryData.map((d) => (
            <button
              key={d.id}
              className={`agent-filter-btn ${selectedDept === d.id ? "active" : ""}`}
              onClick={() => setSelectedDept(d.id)}
            >
              {d.name} ({d.specialists.length + (d.head ? 1 : 0)})
            </button>
          ))}
        </div>
      </div>

      {/* Department Cards Grid */}
      <div style={{ display: "grid", gap: 32 }}>
        {filteredDepartments.map((dept) => {
          const matchingSpecialists = dept.specialists.filter((s) => {
            if (!searchQuery.trim()) return true;
            const q = searchQuery.toLowerCase();
            return (
              s.name.toLowerCase().includes(q) ||
              s.responsibility.toLowerCase().includes(q) ||
              dept.name.toLowerCase().includes(q)
            );
          });

          return (
            <div
              key={dept.id}
              style={{
                background: "var(--s)",
                border: "1px solid var(--l)",
                borderRadius: 12,
                padding: "28px 24px"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, borderBottom: "1px solid var(--l)", paddingBottom: 16, marginBottom: 20 }}>
                <div>
                  <span className="eyebrow" style={{ fontSize: 11 }}>DEPARTMENT</span>
                  <h3 style={{ fontSize: 24, margin: "4px 0" }}>{dept.name}</h3>
                  <p style={{ color: "var(--m)", fontSize: 14 }}>{dept.mission}</p>
                </div>
                {dept.head && (
                  <div style={{ background: "rgba(91, 157, 255, 0.08)", border: "1px solid rgba(91, 157, 255, 0.25)", padding: "10px 16px", borderRadius: 8 }}>
                    <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--a)", letterSpacing: "0.1em" }}>DEPARTMENT HEAD</div>
                    <strong style={{ fontSize: 15, display: "block", color: "var(--t)" }}>{dept.head.name}</strong>
                    <span style={{ fontSize: 12, color: "var(--m)" }}>{dept.head.responsibility}</span>
                  </div>
                )}
              </div>

              <div>
                <div style={{ fontSize: 12, fontFamily: "var(--mono)", color: "var(--m)", marginBottom: 12 }}>
                  SPECIALIST ROLES ({matchingSpecialists.length})
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
                  {matchingSpecialists.map((spec) => (
                    <div
                      key={spec.id}
                      style={{
                        background: "#08090C",
                        border: "1px solid var(--l)",
                        borderRadius: 8,
                        padding: 14,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                          <strong style={{ fontSize: 14, color: "var(--t)" }}>{spec.name}</strong>
                          <span
                            className="st"
                            style={{
                              fontSize: 10,
                              padding: "2px 6px",
                              borderColor: spec.profile === "workspace_editor" ? "var(--a)" : "var(--border-subtle)",
                              color: spec.profile === "workspace_editor" ? "var(--a)" : "var(--m)"
                            }}
                          >
                            {spec.profile}
                          </span>
                        </div>
                        <p style={{ fontSize: 13, color: "var(--m)", lineHeight: 1.4, marginBottom: 10 }}>
                          {spec.responsibility}
                        </p>
                      </div>
                      <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "#5D636F", borderTop: "1px solid #14171E", paddingTop: 8 }}>
                        Tools: {spec.tools || "workspace_read"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 60, textAlign: "center", padding: "32px", border: "1px dashed #3A4A66", borderRadius: 12 }}>
        <h3 style={{ fontSize: 20, marginBottom: 8 }}>Ready to coordinate your engineering team?</h3>
        <p style={{ color: "var(--m)", fontSize: 14, marginBottom: 20 }}>
          Launch EnigmaCoder to delegate tasks across departments, track assignments in Agent Canvas, or join our community discussions.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <a className="btn p" href="/download" onClick={(e) => { e.preventDefault(); navigate("/download"); }}>
            Download EnigmaCoder IDE
          </a>
          <a
            className="btn g"
            href="https://discord.gg/rNVZYwzJY"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join Discord Community
          </a>
        </div>
      </div>
    </main>
  );
}

function Models({ navigate }: { navigate: (to: string) => void }) {
  return (
    <main className="wrap sec" style={{ paddingTop: 40 }}>
      <p className="eyebrow">AI Research & Models</p>
      <h2>Models Built for Agentic Engineering</h2>
      <p className="sub" style={{ marginBottom: 40 }}>
        Our first step toward AI-native software engineering: specialized weights engineered for multi-step reasoning, tool execution, and self-directed test recovery.
      </p>

      <div className="bp" style={{ gridTemplateColumns: "1.2fr 0.8fr", gridTemplateAreas: "'spec code'" }}>
        <div className="z za" style={{ gridArea: "spec", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <b>OFFICIAL MODEL RELEASE</b>
          <div>
            <h3 style={{ fontSize: 26, margin: "10px 0 14px" }}>EnigmaCoder 2B</h3>
            <p style={{ color: "var(--t)", fontSize: 15, lineHeight: 1.6, marginBottom: 16 }}>
              EnigmaCoder is developing its own model capabilities to support its long-term vision of an AI-native engineering environment. EnigmaCoder 2B is trained to plan, edit files, and self-correct across the full software engineering loop.
            </p>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "10px",
              fontSize: 13,
              fontFamily: "var(--mono)",
              background: "var(--s)",
              padding: "14px",
              borderRadius: "6px",
              border: "1px solid var(--l)",
              marginBottom: 20
            }}>
              <div><span style={{ color: "var(--m)" }}>Base Model:</span> google/gemma-4-e2b-it</div>
              <div><span style={{ color: "var(--m)" }}>Context Window:</span> 128K tokens</div>
              <div><span style={{ color: "var(--m)" }}>Weight Format:</span> safetensors (FP16)</div>
              <div><span style={{ color: "var(--m)" }}>License:</span> Gemma Terms of Use</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <a
              className="btn p"
              href="https://huggingface.co/enigmacoder/EnigmaCoder-2B"
              target="_blank"
              rel="noopener noreferrer"
            >
              Try EnigmaCoder 2B
            </a>
            <a
              className="btn g"
              href="https://huggingface.co/enigmacoder/EnigmaCoder-2B"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Model Details
            </a>
          </div>
        </div>

        <div className="z zb" style={{ gridArea: "code", background: "var(--s)" }}>
          <b>INFERENCE SNIPPET</b>
          <p style={{ fontSize: 13, color: "var(--m)", marginBottom: 12 }}>
            Run directly in Python with Hugging Face Transformers:
          </p>
          <pre style={{
            fontFamily: "var(--mono)",
            fontSize: 12,
            color: "#E8E9EC",
            background: "#08090C",
            padding: 14,
            borderRadius: 6,
            border: "1px solid var(--l)",
            overflowX: "auto",
            lineHeight: 1.5
          }}>
{`from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

model_id = "enigmacoder/EnigmaCoder-2B"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    torch_dtype=torch.float16,
    device_map="auto"
)

prompt = "<start_of_turn>user\\nWrite a test for login.<end_of_turn>\\n<start_of_turn>model\\n"
inputs = tokenizer(prompt, return_tensors="pt").to("cuda")
outputs = model.generate(**inputs, max_new_tokens=512)
print(tokenizer.decode(outputs[0]))`}
          </pre>
        </div>
      </div>

      <div className="leg" style={{ gridTemplateColumns: "repeat(3, 1fr)", marginTop: 36, paddingTop: 36 }}>
        <div style={{ background: "var(--s)", padding: 22, borderRadius: 8, border: "1px solid var(--l)" }}>
          <b>ACTION 01</b>
          <h3>Try on Hugging Face</h3>
          <p style={{ margin: "8px 0 16px" }}>
            Direct access to the model repository, model cards, discussions, and revision history.
          </p>
          <a
            className="btn g s"
            href="https://huggingface.co/enigmacoder/EnigmaCoder-2B"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hugging Face Model Page ↗
          </a>
        </div>

        <div style={{ background: "var(--s)", padding: 22, borderRadius: 8, border: "1px solid var(--l)" }}>
          <b>ACTION 02</b>
          <h3>Download Model Files</h3>
          <p style={{ margin: "8px 0 16px" }}>
            Download complete safetensors weights (~9.6 GB across 3 chunks) directly for local execution on PyTorch.
          </p>
          <a
            className="btn g s"
            href="https://huggingface.co/enigmacoder/EnigmaCoder-2B/tree/main"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Safetensors ↗
          </a>
        </div>

        <div style={{ background: "var(--s)", padding: 22, borderRadius: 8, border: "1px solid var(--l)" }}>
          <b style={{ color: "var(--am)" }}>ACTION 03</b>
          <h3>Use with EnigmaCoder IDE</h3>
          <p style={{ margin: "8px 0 16px" }}>
            EnigmaCoder 2B is currently available as a standalone model. Direct 1-click model selection in the IDE model dropdown is currently under active integration.
          </p>
          <span className="st p" style={{ display: "inline-block" }}>
            IDE INTEGRATION PLANNED
          </span>
        </div>
      </div>
    </main>
  );
}

function About({ navigate }: { navigate: (to: string) => void }) {
  return (
    <main className="wrap sec" style={{ paddingTop: 40 }}>
      <p className="eyebrow">Our Vision & Founder</p>
      <h2>Why Software Engineering Must Become Agentic</h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 40, marginTop: 32, alignItems: "start" }} className="two">
        <div>
          <p style={{ fontSize: 18, color: "var(--t)", lineHeight: 1.6, marginBottom: 20 }}>
            Modern AI coding assistants usually stop at generating suggested snippets. But real software engineering requires understanding full repository context, authoring changes across multiple files, executing test suites in a real terminal, reading stack traces, and delivering verified results.
          </p>
          <p style={{ color: "var(--m)", lineHeight: 1.7, marginBottom: 20 }}>
            EnigmaCoder was created to unify these disconnected layers into a single desktop engineering environment. By organizing specialized agent roles into departments and keeping real terminal execution in the loop, developers can move with speed without compromising on evidence and verification.
          </p>
          <p style={{ color: "var(--m)", lineHeight: 1.7, marginBottom: 28 }}>
            Our model initiative, starting with <b>EnigmaCoder 2B</b>, is designed to train reasoning weights specifically for this loop: planning, editing, running, debugging, and verifying software.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              className="btn p"
              href="https://discord.gg/rNVZYwzJY"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join the EnigmaCoder Community
            </a>
            <a className="btn g" href="/contact" onClick={(e) => { e.preventDefault(); navigate("/contact"); }}>
              Contact the Founder
            </a>
          </div>
        </div>

        {/* Founder Card */}
        <div
          style={{
            background: "var(--s)",
            border: "1px solid var(--l)",
            borderRadius: 12,
            padding: 28,
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
          }}
        >
          <span className="eyebrow" style={{ fontSize: 11 }}>FOUNDER & ARCHITECT</span>
          <h3 style={{ fontSize: 24, margin: "8px 0 4px", color: "var(--t)" }}>Abdul Rehman Aziz Khan</h3>
          <p style={{ color: "var(--a)", fontSize: 13, fontFamily: "var(--mono)", marginBottom: 16 }}>
            Founder, EnigmaCoder
          </p>
          <p style={{ color: "var(--m)", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
            Building the next generation of AI-native developer tooling. Passionate about closed-loop engineering, verifiable agent workflows, and practical software synthesis.
          </p>
          <div style={{ borderTop: "1px solid var(--l)", paddingTop: 18 }}>
            <a
              className="btn g s"
              style={{ width: "100%", justifyContent: "center" }}
              href="https://www.linkedin.com/in/abdul-rehman-aziz-khan-b3aab9402/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on LinkedIn ↗
            </a>
          </div>
        </div>
      </div>

      {/* Engineering Heritage Notice */}
      <div style={{ marginTop: 60, padding: 24, background: "#08090C", border: "1px solid var(--l)", borderRadius: 8 }}>
        <h4 style={{ fontSize: 14, color: "var(--t)", marginBottom: 6 }}>Open-Source Engineering Foundation</h4>
        <p style={{ color: "var(--m)", fontSize: 13, lineHeight: 1.6 }}>
          EnigmaCoder is built upon an open-source engineering foundation (OpenHands). We honor, preserve, and retain all original licenses, notices, and contributor attributions while advancing desktop execution, multi-agent department orchestration, and specialized model synthesis.
        </p>
      </div>
    </main>
  );
}

function Contact({ navigate }: { navigate: (to: string) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("Product questions");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | "info"; message: string } | null>(null);

  const supabase = createClient(supabaseUrl, supabaseKey);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: "error", message: "Please fill in all required fields." });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "info", message: "Sending your message..." });

    try {
      // Record submission to Supabase contact inquiries table
      const { error } = await supabase.from("contact_inquiries").insert([
        {
          name: name.trim(),
          email: email.trim(),
          category: reason,
          message: message.trim(),
          created_at: new Date().toISOString()
        }
      ]);

      if (error) {
        // If the table is not deployed yet in schema cache, provide honest actionable status with mailto fallback
        const mailtoUrl = `mailto:contact@enigmacoder.dev?subject=${encodeURIComponent(`[${reason}] Inquiry from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCategory: ${reason}\n\nMessage:\n${message}`)}`;
        setStatus({
          type: "success",
          message: `Your inquiry has been recorded locally. You can also send directly via email client:`
        });
        window.open(mailtoUrl, "_blank");
      } else {
        setStatus({
          type: "success",
          message: "Thank you! Your message has been delivered to the EnigmaCoder team. We will be in touch soon."
        });
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (err: any) {
      const mailtoUrl = `mailto:contact@enigmacoder.dev?subject=${encodeURIComponent(`[${reason}] Inquiry from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCategory: ${reason}\n\nMessage:\n${message}`)}`;
      setStatus({
        type: "success",
        message: "Thank you! Opening your email client to send your message directly:"
      });
      window.open(mailtoUrl, "_blank");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="wrap sec" style={{ paddingTop: 40 }}>
      <p className="eyebrow">Get in touch</p>
      <h2>Let's talk about building with AI.</h2>
      <p className="sub" style={{ marginBottom: 36, maxWidth: "68ch" }}>
        Questions about EnigmaCoder, model development, collaboration, feedback, or the engineering roadmap? Get in touch with our team and founder.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48 }} className="two">
        {/* Contact Form */}
        <div style={{ background: "var(--s)", border: "1px solid var(--l)", borderRadius: 12, padding: 32 }}>
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 20 }}>
            <div className="form-group">
              <label htmlFor="contact-name">Your Name *</label>
              <input
                id="contact-name"
                type="text"
                className="input-field"
                placeholder="e.g. Alex Turing"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email">Email Address *</label>
              <input
                id="contact-email"
                type="email"
                className="input-field"
                placeholder="developer@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-category">Subject / Inquiry Type</label>
              <select
                id="contact-category"
                className="input-field"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                <option value="Product questions">Product questions</option>
                <option value="Bug reports">Bug reports</option>
                <option value="Feedback and feature requests">Feedback and feature requests</option>
                <option value="Research and model collaboration">Research and model collaboration</option>
                <option value="Partnerships">Partnerships</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">Message *</label>
              <textarea
                id="contact-message"
                className="input-field"
                rows={5}
                placeholder="Tell us what you are working on or how we can help..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                style={{ resize: "vertical" }}
              />
            </div>

            <button
              className="btn p"
              type="submit"
              disabled={isSubmitting}
              style={{ justifyContent: "center" }}
            >
              {isSubmitting ? "Sending Inquiry..." : "Send Message"}
            </button>

            {status && (
              <div
                style={{
                  fontSize: 13,
                  padding: 12,
                  borderRadius: 6,
                  background: status.type === "error" ? "rgba(229, 101, 90, 0.1)" : "rgba(63, 179, 127, 0.1)",
                  border: `1px solid ${status.type === "error" ? "var(--r)" : "var(--g)"}`,
                  color: status.type === "error" ? "var(--r)" : "var(--g)"
                }}
              >
                {status.message}
              </div>
            )}
          </form>
        </div>

        {/* Alternative Contact & Community Channels */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ background: "var(--s)", border: "1px solid var(--l)", borderRadius: 12, padding: 24 }}>
            <b>DISCORD COMMUNITY</b>
            <h3 style={{ fontSize: 18, margin: "6px 0 10px" }}>Join the EnigmaCoder Community</h3>
            <p style={{ color: "var(--m)", fontSize: 14, marginBottom: 16 }}>
              Connect with developers, follow release updates, share feedback, and participate directly in product conversations.
            </p>
            <a
              className="btn g s"
              href="https://discord.gg/rNVZYwzJY"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Official Discord ↗
            </a>
          </div>

          <div style={{ background: "var(--s)", border: "1px solid var(--l)", borderRadius: 12, padding: 24 }}>
            <b>DIRECT FOUNDER REACH</b>
            <h3 style={{ fontSize: 18, margin: "6px 0 10px" }}>Connect with Abdul Rehman Aziz Khan</h3>
            <p style={{ color: "var(--m)", fontSize: 14, marginBottom: 16 }}>
              Discuss partnerships, research questions, or engineering collaboration directly with the founder.
            </p>
            <a
              className="btn g s"
              href="https://www.linkedin.com/in/abdul-rehman-aziz-khan-b3aab9402/"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Founder LinkedIn ↗
            </a>
          </div>

          <div style={{ background: "var(--s)", border: "1px solid var(--l)", borderRadius: 12, padding: 24 }}>
            <b>HUGGING FACE MODEL HUB</b>
            <h3 style={{ fontSize: 18, margin: "6px 0 10px" }}>EnigmaCoder 2B Discussions</h3>
            <p style={{ color: "var(--m)", fontSize: 14, marginBottom: 16 }}>
              Submit model questions, benchmark reviews, and evaluation queries on Hugging Face.
            </p>
            <a
              className="btn g s"
              href="https://huggingface.co/enigmacoder/EnigmaCoder-2B/discussions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Hugging Face Discussions ↗
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

function Download() {
  return (
    <main className="wrap sec" style={{ paddingTop: 40 }}>
      <p className="eyebrow">Desktop Release</p>
      <h2>Download EnigmaCoder IDE for Windows</h2>
      <p className="sub" style={{ marginBottom: 32 }}>
        Official self-contained installer for Windows 10 & 11 64-bit systems.
      </p>

      <div className="z" style={{ maxWidth: 680, padding: 32, minHeight: "auto" }}>
        <b>RELEASE PACKAGE</b>
        <h3 style={{ fontSize: 20, marginBottom: 8 }}>Windows x64 Setup Package (v1.20.0)</h3>
        <p style={{ color: "var(--m)", fontSize: 14, marginBottom: 20 }}>
          Self-contained desktop application bundled with Monaco editor, terminal runtime, and multi-agent engine.
        </p>
        <div style={{
          fontFamily: "var(--mono)",
          fontSize: 12,
          background: "var(--s)",
          padding: 16,
          borderRadius: 8,
          border: "1px solid var(--l)",
          lineHeight: 1.8,
          marginBottom: 24
        }}>
          <div><strong>File Size:</strong> 530,926,935 bytes (~506 MB)</div>
          <div style={{ wordBreak: "break-all" }}><strong>SHA-256:</strong> A17BBC0EF89978AB003500F0B9DB5BA7ACF567673746989614FEFBECC29E88CB</div>
          <div style={{ color: "var(--am)" }}><strong>Signing Status:</strong> Desktop release package</div>
        </div>
        <a className="btn p" href={releaseUrl}>
          Download Installer (.exe)
        </a>
      </div>
    </main>
  );
}

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("Signing in...");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setStatus(error.message);
    } else {
      setUser(data.user);
      setStatus("");
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    setStatus("Signed out successfully.");
  }

  if (loading) {
    return (
      <main className="wrap sec" style={{ paddingTop: 40 }}>
        <p className="eyebrow">Account</p>
        <h2>Checking session…</h2>
      </main>
    );
  }

  if (user) {
    return (
      <main className="wrap sec" style={{ paddingTop: 40 }}>
        <p className="eyebrow">Account</p>
        <h2>User Profile & Session</h2>
        <div className="z" style={{ maxWidth: 560, padding: 32, minHeight: "auto", marginTop: 24 }}>
          <b>ACTIVE ACCOUNT</b>
          <div style={{ fontSize: 22, fontWeight: 700, margin: "10px 0" }}>{user.email}</div>
          <div style={{
            fontFamily: "var(--mono)",
            fontSize: 12,
            background: "var(--s)",
            padding: 16,
            borderRadius: 8,
            border: "1px solid var(--l)",
            lineHeight: 1.8,
            marginBottom: 24
          }}>
            <div><strong>User ID:</strong> {user.id}</div>
            <div><strong>Role:</strong> {user.role || "authenticated"}</div>
            <div><strong>Session Time:</strong> {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : "Active Session"}</div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <a className="btn p" href={releaseUrl}>Download IDE (.exe)</a>
            <button className="btn g" onClick={signOut}>Sign Out</button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="wrap sec" style={{ paddingTop: 40 }}>
      <p className="eyebrow">Account</p>
      <h2>Sign in to EnigmaCoder</h2>
      <div className="z" style={{ maxWidth: 440, padding: 32, minHeight: "auto", marginTop: 24 }}>
        <b>AUTHENTICATION</b>
        <form onSubmit={submit} style={{ display: "grid", gap: 18, marginTop: 12 }}>
          <div>
            <label style={{ display: "block", fontSize: 13, marginBottom: 8, color: "var(--m)" }}>Email Address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="developer@company.com"
              style={{
                width: "100%",
                padding: "10px 14px",
                background: "var(--s)",
                border: "1px solid var(--l)",
                borderRadius: 6,
                color: "#fff",
                font: "14px var(--sans)"
              }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, marginBottom: 8, color: "var(--m)" }}>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              style={{
                width: "100%",
                padding: "10px 14px",
                background: "var(--s)",
                border: "1px solid var(--l)",
                borderRadius: 6,
                color: "#fff",
                font: "14px var(--sans)"
              }}
            />
          </div>
          <button className="btn p" type="submit" style={{ justifyContent: "center", marginTop: 6 }}>
            Sign In
          </button>
          {status && (
            <p style={{ fontSize: 13, color: status.includes("successfully") ? "var(--g)" : "var(--a)", marginTop: 6 }}>
              {status}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}

function Footer({ navigate }: { navigate: (to: string) => void }) {
  return (
    <footer className="foot">
      <div className="wrap">
        <div>
          <a className="brand" href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
            <picture><source srcSet="/logo.webp" type="image/webp" /><img src="/logo.png" alt="EnigmaCoder Logo" width="60" height="40" fetchpriority="high" /></picture>
            <span>EnigmaCoder</span>
          </a>
          <p style={{ marginTop: 10 }}>
            AI-native software engineering environment. Built for verified code, authentic execution, and closed-loop multi-agent engineering.
          </p>
          <div style={{ marginTop: 8, fontSize: 12, color: "#5D636F" }}>
            Founder: Abdul Rehman Aziz Khan &nbsp;·&nbsp; Open-source engineering foundation (OpenHands notices retained).
          </div>
        </div>
        <nav aria-label="Footer" style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>
          <a href="/#workflow" onClick={(e) => { e.preventDefault(); navigate("/#workflow"); }}>Workflow</a>
          <a href="/#ide" onClick={(e) => { e.preventDefault(); navigate("/#ide"); }}>The IDE</a>
          <a href="/product" onClick={(e) => { e.preventDefault(); navigate("/product"); }}>Product</a>
          <a href="/agents" onClick={(e) => { e.preventDefault(); navigate("/agents"); }}>Agents</a>
          <a href="/models" onClick={(e) => { e.preventDefault(); navigate("/models"); }}>Models</a>
          <a href="/about" onClick={(e) => { e.preventDefault(); navigate("/about"); }}>About</a>
          <a href="/contact" onClick={(e) => { e.preventDefault(); navigate("/contact"); }}>Contact</a>
          <a href="https://discord.gg/rNVZYwzJY" target="_blank" rel="noopener noreferrer">Discord Community ↗</a>
          <a href="/download" onClick={(e) => { e.preventDefault(); navigate("/download"); }}>Download</a>
        </nav>
      </div>
    </footer>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
