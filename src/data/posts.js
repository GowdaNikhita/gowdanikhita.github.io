export const posts = [
  /* ── 1 of 8 — June 20, 2026 ─────────────────────────────── */
  {
    slug: 'mcp-is-the-new-attack-surface',
    date: 'June 20, 2026',
    isoDate: '2026-06-20',
    title: 'MCP Is the New Attack Surface and We\'re Already Behind',
    readTime: 6,
    excerpt:
      'The Model Context Protocol unlocked a genuinely new way to build AI agents. It also quietly handed attackers a new attack surface that most security tooling isn\'t equipped to reason about. Three weeks into my internship at Keysight, I can\'t think about anything else.',
    content: [
      {
        type: 'p',
        text: 'A 2026 disclosure confirmed that researchers found 492 MCP servers exposed to the public internet with zero authentication. Not weak authentication. No authentication. A separate analysis identified up to 200,000 vulnerable MCP instances across IDEs, internal tools, and cloud services. Antiy CERT confirmed 1,184 malicious skills planted across ClawHub, the marketplace for the OpenClaw AI agent framework. And Gartner is projecting that 40% of enterprise applications will embed task-specific AI agents by the end of this year, up from under 5% in 2025.',
      },
      {
        type: 'p',
        text: 'That gap between deployment velocity and security posture is what I keep thinking about. We are shipping agentic AI at a pace that has meaningfully outrun our ability to secure it.',
      },
      {
        type: 'h2',
        text: 'What MCP Actually Is — and Why It Changes the Risk Profile',
      },
      {
        type: 'p',
        text: 'The Model Context Protocol is an open standard, introduced by Anthropic, that lets AI agents connect to external tools, data sources, and APIs through a standardized interface. Before MCP, every AI integration was bespoke — you wrote custom glue code to let your LLM call your APIs. MCP standardizes that layer. The upside is a massive acceleration in how quickly you can build capable agents. The downside is that you\'ve introduced a standardized attack surface.',
      },
      {
        type: 'p',
        text: 'When I built my autonomous multi-agent dev team last year — orchestrating Claude Code and custom skill agents into a fully autonomous pipeline — I was thinking about task completion rate and agent communication protocols. I was not thinking hard enough about what happens when one of those agents processes a malicious instruction embedded in a document it reads, then uses its real tool access to act on it. That\'s tool poisoning, and it\'s a first-class MCP attack vector.',
      },
      {
        type: 'h2',
        text: 'Tool Poisoning Is Not Like Traditional Injection',
      },
      {
        type: 'p',
        text: 'Tool poisoning works like this: an attacker embeds instructions in a data source that an agent will read — a document, an email, a database record, an API response. The agent processes that content using real credentials through real access paths. It doesn\'t know the difference between instructions from its operator and instructions that arrived inside data it was told to process. Traditional injection is about confusing a parser. Tool poisoning is about confusing a reasoning system that has tool access.',
      },
      {
        type: 'p',
        text: 'The MCPTox benchmark, published in late 2025 and updated in early 2026, tested 45 live MCP servers and 353 tools against poisoned tool descriptions. Many popular agents showed attack success rates above 60%, with the highest at 72%. These aren\'t lab conditions — these are the same MCP server implementations people are deploying in production.',
      },
      {
        type: 'p',
        text: 'What makes this particularly difficult to defend against is the trust model. A Claude agent with AWS access that reads a customer-submitted support ticket doesn\'t have a clean boundary between "content to process" and "instructions to follow." The model\'s job is to understand and act on natural language. A well-crafted injection looks, to the model, exactly like legitimate content.',
      },
      {
        type: 'h2',
        text: 'Privilege Drift and the Identity Problem',
      },
      {
        type: 'p',
        text: 'Three weeks into my internship at Keysight, I\'ve started noticing the identity problem everywhere. Traditional IAM was designed for humans and static service accounts. An AI agent is neither. It\'s ephemeral, context-dependent, and its effective permissions depend on what tool calls it decides to make — which depends on what it\'s been told and what it\'s inferred from its context.',
      },
      {
        type: 'p',
        text: 'The security community is still working out what "least privilege" means for an agent that can dynamically compose tool calls. An agent that can read S3, call a Lambda, and write to a database has a wildly different blast radius than a human who can do the same things — because the agent can chain those operations at machine speed with no human in the loop. Privilege drift, where agents accumulate permissions over time as capabilities are added, is already showing up in enterprise deployments.',
      },
      {
        type: 'h2',
        text: 'What Defenses Actually Exist',
      },
      {
        type: 'p',
        text: 'The honest answer is that the defense ecosystem for agentic AI is early. The Cloud Security Alliance published a set of MCP security best practices in 2026, and they\'re a good starting point: authenticate every MCP server, validate tool descriptions at registration time rather than trusting them at runtime, enforce output validation before agents act on tool responses, and log every tool invocation with enough context to reconstruct what the agent did and why.',
      },
      {
        type: 'p',
        text: 'Sandboxing is the other piece. Agents that process untrusted data shouldn\'t have the same tool access as agents that operate on trusted internal content. This seems obvious stated plainly, but in practice the architecture often doesn\'t enforce it — you have one agent with broad access and you rely on the model\'s judgment to use that access appropriately. That\'s not a security architecture. That\'s optimism.',
      },
      {
        type: 'blockquote',
        text: 'We spent years learning that you can\'t rely on application-level input validation as a primary security control. We\'re about to learn the same lesson with AI agents, and the blast radius when we get it wrong is larger.',
      },
      {
        type: 'p',
        text: 'I\'m building my threat models at Keysight with this in mind now. Every time I map a trust boundary, I\'m asking: what if an agent sits on this side of the boundary? The answer changes the attack surface in ways that STRIDE, as traditionally applied, doesn\'t fully capture. I think formalizing threat modeling for agentic systems is one of the most important open problems in applied security right now. Nobody has solved it yet.',
      },
    ],
  },

  /* ── 2 of 8 — May 5, 2026 ───────────────────────────────── */
  {
    slug: 'ai-tooling-is-now-a-cve-category',
    date: 'May 5, 2026',
    isoDate: '2026-05-05',
    title: 'AI Tooling Is Now a CVE Category and the Industry Is Not Ready',
    readTime: 6,
    excerpt:
      'CVE-2025-32711 (EchoLeak), CVE-2025-53770 (SharePoint ToolShell), CVE-2025-53773 (GitHub Copilot RCE). The line between "AI tool" and "exploitable attack surface" collapsed in the past twelve months. Here\'s what I think it means.',
    content: [
      {
        type: 'p',
        text: 'When I built SENTINEL in 2025, the question driving the project was: what is the actual attack success rate against an LLM application? The answer — 29.1% overall, 73% for data exfiltration — was high enough to make anyone in security take notice. What I didn\'t fully anticipate was how quickly the threat landscape would shift from LLM applications in general to the AI tooling ecosystem specifically.',
      },
      {
        type: 'p',
        text: 'In the past year, security researchers have assigned CVEs to vulnerabilities in Langflow (CVE-2025-3248, CVSS 9.8, active exploitation confirmed by CISA in May 2025), Microsoft SharePoint Server (CVE-2025-53770, known as ToolShell, an unauthenticated RCE that lets attackers harvest credentials and move laterally), EchoLeak (CVE-2025-32711, enabling data extraction through LLM outputs), and GitHub Copilot (CVE-2025-53773, remote code execution). We are not talking about edge-case research vulnerabilities. These are in-the-wild exploits against software that millions of developers use daily.',
      },
      {
        type: 'h2',
        text: 'Langflow and the AI Framework Blind Spot',
      },
      {
        type: 'p',
        text: 'CVE-2025-3248 is worth understanding in detail because it illustrates a specific failure mode that I expect to see repeated across the AI tooling ecosystem. Langflow is a popular Python framework for building LLM-powered applications. The vulnerability was in the /api/v1/validate/code endpoint — an unauthenticated route that executed arbitrary code by abusing Python decorators and default arguments. CVSS 9.8. Exploited within hours of public disclosure. CISA added it to the KEV catalog on May 5, 2025, and researchers observed 361 malicious IP addresses actively scanning for vulnerable instances.',
      },
      {
        type: 'p',
        text: 'The pattern here is familiar from the broader framework vulnerability history: a developer-facing tool that prioritizes ease of use over security-by-default, an endpoint that does something powerful (code execution) without requiring authentication, and rapid weaponization once the vulnerability is public. What\'s new is that this is an AI framework. The targets running vulnerable Langflow instances are, by definition, people building AI applications — which means the downstream risk extends to whatever LLM pipelines they\'ve built.',
      },
      {
        type: 'p',
        text: 'I think about this in the context of my own SENTINEL work. SENTINEL uses the Anthropic tool-use API, runs in Docker, and has no exposed unauthenticated endpoints. But I built it as a research tool with full control over its environment. Most people using AI frameworks like Langflow are deploying them in environments where they have less control, less visibility, and often less security expertise. The framework choices you make determine the attack surface you\'re taking on.',
      },
      {
        type: 'h2',
        text: 'SharePoint ToolShell Is a Different Kind of Problem',
      },
      {
        type: 'p',
        text: 'CVE-2025-53770, nicknamed ToolShell, is a critical unauthenticated RCE in on-premises Microsoft SharePoint Server 2016, 2019, and Subscription Edition. The attacker can execute PowerShell commands, access document libraries, create administrative accounts, harvest credentials, and pivot laterally. It\'s not an AI vulnerability in the narrow sense — SharePoint predates modern AI tooling. But it shows up in this conversation because on-premises SharePoint is increasingly being integrated with Microsoft Copilot and other AI tools, meaning a SharePoint compromise can be an entry point to AI-assisted workflows that then have access to sensitive organizational data.',
      },
      {
        type: 'p',
        text: 'This is the integration problem. As organizations wire AI tools to their existing systems, the attack surface of each system expands to include the trust relationships between them. An AI tool that can read from SharePoint inherits whatever vulnerabilities exist in that SharePoint instance. The security review for the AI integration needs to include a security review of every system it connects to.',
      },
      {
        type: 'h2',
        text: 'GitHub Copilot RCE: When the Dev Toolchain Is the Target',
      },
      {
        type: 'p',
        text: 'CVE-2025-53773, a remote code execution vulnerability in GitHub Copilot, cuts directly to what I think is the most significant emergent risk: the developer toolchain itself. GitHub Copilot is installed in IDE environments across millions of developer machines. It has access to code, file systems, and often to secrets that live in development environments. A vulnerability in Copilot that allows RCE is not an abstract risk. It\'s a direct path from attacker to developer workstation to source code to credentials to production.',
      },
      {
        type: 'p',
        text: 'We spent years building the understanding that attackers target developers because developers have access to everything. Spearphishing developers, compromising developer workstations, planting malicious packages in registries — these are all well-documented attack vectors. AI coding tools now sit between the developer and their machine in a way that creates new surface area for exactly those attacks.',
      },
      {
        type: 'h2',
        text: 'The Emerging Pattern and What to Do About It',
      },
      {
        type: 'p',
        text: 'I think the pattern across these vulnerabilities is clear: AI tooling is being built, deployed, and integrated at speed, and security review is not keeping pace. Langflow\'s unauthenticated code execution endpoint should have been caught in design review. SharePoint integration with Copilot should have prompted a security architecture review of the trust chain. IDE AI tools should be treated as privileged access tools with the corresponding security controls.',
      },
      {
        type: 'blockquote',
        text: 'The fastest way to expand your attack surface is to add a powerful new tool without reviewing its trust model. AI tools are powerful almost by definition. The review can\'t be optional.',
      },
      {
        type: 'p',
        text: 'Practically: threat-model your AI tool integrations the same way you\'d threat-model a new microservice with privileged access. Ask what data it can read, what actions it can take, what happens if it\'s compromised, and whether there are unauthenticated endpoints in its API surface. These are not new questions. But they need to be applied to a class of tools that the industry has been treating as categorically different from the software that gets security reviewed. They\'re not different. They\'re software.',
      },
    ],
  },

  /* ── 3 of 8 — April 14, 2026 ────────────────────────────── */
  {
    slug: 'scattered-spider-one-year-on',
    date: 'April 14, 2026',
    isoDate: '2026-04-14',
    title: 'Scattered Spider, One Year On: Social Engineering Is Still the Hardest Bug to Patch',
    readTime: 6,
    excerpt:
      'A year ago this week, Marks & Spencer went dark. £500 million wiped from market cap. £3.8 million per day in lost e-commerce revenue. The attack method: a phone call to a help desk. If that doesn\'t make you rethink your identity verification posture, nothing will.',
    content: [
      {
        type: 'p',
        text: 'On April 17, 2025, Marks & Spencer — one of the UK\'s most recognisable retail brands — was hit by a ransomware attack that knocked out online ordering, disrupted contactless payments, idled hundreds of warehouse staff, and wiped over £500 million from the company\'s market capitalisation. The estimated daily loss in e-commerce revenue reached £3.8 million. M&S Chairman Archie Norman later confirmed the entry point: someone impersonated an M&S employee and called the service desk operated by a third-party vendor, who performed a password reset for them.',
      },
      {
        type: 'p',
        text: 'A phone call. That\'s what initiated a breach that caused hundreds of millions of pounds in damage. The Scattered Spider collective, believed responsible for coordinating the attacks that also hit Co-op and Harrods in the same wave, deployed DragonForce ransomware after obtaining the Windows domain controller\'s NTDS.dit file — the Active Directory database storing password hashes for every domain user. With that file, offline hash cracking yields cleartext credentials for the whole estate. The initial access, though, was a social engineering call.',
      },
      {
        type: 'h2',
        text: 'Why Social Engineering Keeps Working at Scale',
      },
      {
        type: 'p',
        text: 'I want to be direct about something: social engineering isn\'t working because people are stupid. It works because the systems we\'ve built are designed to be helpful to callers, because help desks operate under pressure to resolve issues quickly, and because the verification mechanisms we\'ve put in front of those help desks are routinely insufficient for the threat model.',
      },
      {
        type: 'p',
        text: 'Scattered Spider is particularly adept at this. The group uses publicly available employee information, SIM swapping, and fluent, confident English to navigate corporate help desks. They know how enterprise IT support works because they\'ve done this many times. The people they\'re calling are doing their jobs correctly by the standards of their training — they\'re just working under a threat model that doesn\'t account for a sophisticated adversary who has done their homework.',
      },
      {
        type: 'p',
        text: 'When I build STRIDE threat models, I have to include social engineering as an attack vector even though it\'s not a technical vulnerability in the code. The M&S incident is a perfect illustration of why. The company\'s technical controls — their passwords, their Active Directory, their access controls — were working exactly as intended. The failure was at the human boundary, the place where a person with authority to grant access decided to grant it based on fraudulent identity claims.',
      },
      {
        type: 'h2',
        text: 'What NTDS.dit Exfiltration Means for Your Blast Radius',
      },
      {
        type: 'p',
        text: 'The moment attackers obtained M&S\'s NTDS.dit file, the rest of the incident was largely a question of time and technique. That file contains the password hashes for every account in the Active Directory domain. Offline cracking — Hashcat on a GPU cluster — works effectively against NTLM hashes. Once you have cleartext credentials for privileged accounts, you have the keys to the domain.',
      },
      {
        type: 'p',
        text: 'The implication for defenders is that protecting the domain controller needs to be treated as the highest priority in a Windows enterprise environment. Not "important" in a checklist sense, but actually the primary focus of privileged access management, credential tiering, and monitoring. The domain controller is the crown jewel that makes every other attack trivially easy once obtained. Knowing that Scattered Spider prioritises NTDS.dit exfiltration tells you exactly what to harden.',
      },
      {
        type: 'p',
        text: 'Practically: implement credential tiering so that domain admin accounts can\'t be used for general-purpose tasks. Enforce phishing-resistant MFA (FIDO2 hardware keys, not TOTP that can be phished or SIM-swapped) for all privileged access. Require out-of-band verification for any help-desk action that results in credential modification. And if someone calls your help desk asking for a password reset for a C-suite employee, that call should trigger a specific escalation protocol, not a routine ticket.',
      },
      {
        type: 'h2',
        text: 'Third-Party Vendors Are Part of Your Attack Surface',
      },
      {
        type: 'p',
        text: 'The M&S breach began not with M&S\'s own help desk, but with the third-party vendor operating it. This is a pattern that shows up repeatedly in major breaches — the entry point is a supplier, a partner, a contractor, or an outsourced function. The 2025 supply chain breach report found that 30% of all breaches involved a third party, double the proportion from the prior year.',
      },
      {
        type: 'p',
        text: 'This creates a genuine asymmetry: you can invest heavily in your own security posture while remaining exposed through the security postures of every entity that has any level of access to your systems. Vendor security assessment can\'t be a checkbox exercise completed once at contract signing. It needs to be continuous, and it needs to include the human controls at the vendor — how they verify identity before performing privileged actions on your behalf.',
      },
      {
        type: 'blockquote',
        text: 'Your identity verification posture is only as strong as its weakest human link. For M&S, that link was a third-party help desk operating under a verification procedure that didn\'t match the threat. The technical controls were fine. The process failed.',
      },
      {
        type: 'p',
        text: 'A year later, the industry has published extensive post-mortems on the M&S incident. The lessons are clear. What I\'m less confident about is whether those lessons have translated into changed help-desk procedures, updated vendor contracts, and phishing-resistant MFA rollouts across the organisations that read those post-mortems. The next Scattered Spider campaign will tell us.',
      },
    ],
  },

  /* ── 4 of 8 — March 22, 2026 ────────────────────────────── */
  {
    slug: 'openai-lockdown-mode-prompt-injection',
    date: 'March 22, 2026',
    isoDate: '2026-03-22',
    title: 'OpenAI Blinked First: What Lockdown Mode Tells Us About Prompt Injection',
    readTime: 6,
    excerpt:
      'On February 13, 2026, OpenAI launched Lockdown Mode for ChatGPT and acknowledged that prompt injection in AI browsers "may never be fully patched." I\'ve been thinking about that statement ever since.',
    content: [
      {
        type: 'p',
        text: 'On February 13, 2026, OpenAI did something unusual for a company that typically favours confident announcements: they shipped a feature called Lockdown Mode and publicly acknowledged, in the accompanying documentation, that prompt injection in AI-powered browsers "may never be fully patched." That\'s a remarkable statement. It\'s also, I think, an accurate one — and the industry should sit with what it means.',
      },
      {
        type: 'p',
        text: 'Prompt injection is ranked #1 in the OWASP Top 10 for LLM Applications (2025 edition). Attack success rates in the literature range between 50% and 84% depending on model configuration, with adaptive techniques exceeding 85% in some scenarios. Multi-hop indirect attacks — where instructions are embedded in data that agents consume, rather than in the user turn directly — increased by over 70% year-over-year in 2025 to 2026. When OpenAI ships a dedicated Lockdown Mode, it\'s an acknowledgement that the product team has internalised these numbers.',
      },
      {
        type: 'h2',
        text: 'The "May Never Be Fully Patched" Problem',
      },
      {
        type: 'p',
        text: 'The statement that prompt injection may never be fully patched is not defeatism. It\'s a structural observation about the nature of the vulnerability. Traditional injection attacks — SQL injection, command injection, XSS — exist because a system fails to separate code from data. You fix them by properly escaping data, using parameterised queries, enforcing output encoding. These are tractable engineering problems.',
      },
      {
        type: 'p',
        text: 'Prompt injection is different. An LLM\'s purpose is to understand and respond to natural language. Natural language instructions and natural language data look identical at the input level. There is no delimiter the model can reliably use to distinguish "instruction from the operator" from "instruction embedded in content I was told to process." You can add such delimiters — system prompt framing, instruction-hierarchy tagging, careful context structuring — and these measures help. But they are probabilistic controls on a probabilistic system, not deterministic enforcement of a security boundary.',
      },
      {
        type: 'p',
        text: 'In the SENTINEL work I did last year, this was exactly what I observed. Instruction-hierarchy tagging reduced data exfiltration attack success rates from 73% to a substantially lower number. But it didn\'t reduce them to zero. The residual rate depended on how well the attacker understood the tagging scheme and crafted their injection to work within or around it. Defense frameworks can reduce aggregate attack success from 73.2% to 8.7% when layered properly — that\'s a meaningful improvement. But 8.7% is not zero. For a high-stakes deployment, 8.7% might still be unacceptable.',
      },
      {
        type: 'h2',
        text: 'What Lockdown Mode Actually Does',
      },
      {
        type: 'p',
        text: 'Lockdown Mode is OpenAI\'s response to the specific threat of prompt injection in AI-powered browser contexts, where the model processes web content and can be influenced by instructions embedded on pages it visits. In Lockdown Mode, the model\'s access to tools and external content is significantly restricted. It\'s a deliberate capability reduction in exchange for a stronger security posture — essentially, a least-privilege mode for the AI.',
      },
      {
        type: 'p',
        text: 'This is a sensible engineering decision, and I think it\'s the right framing for how the industry should think about AI security controls more broadly. You can\'t fully eliminate the attack surface — the OpenAI statement is honest about that. What you can do is reduce the blast radius when an attack succeeds. A model in Lockdown Mode that gets injected can\'t exfiltrate data it doesn\'t have access to, can\'t take actions it\'s been restricted from taking, can\'t use tools it hasn\'t been granted.',
      },
      {
        type: 'h2',
        text: 'Real CVEs Against AI Browsers Are Already Here',
      },
      {
        type: 'p',
        text: 'The theoretical risks have already materialised into assigned CVEs. EchoLeak (CVE-2025-32711) is a vulnerability enabling data extraction through LLM outputs — specifically, an attacker could craft content that causes an AI model to inadvertently leak sensitive information from its context window to external channels. The Cursor IDE has its own documented vulnerabilities. These are not hypothetical attack chains. They are confirmed vulnerabilities with assigned identifiers and real impact.',
      },
      {
        type: 'p',
        text: 'The existence of EchoLeak in particular is significant because it demonstrates something I\'ve been arguing since I built SENTINEL: data exfiltration is the most achievable attack category against LLM applications. My numbers showed 73% success. The CVE confirms the pattern. An AI model that has access to sensitive data in its context and can produce outputs that reach untrusted parties is a data exfiltration risk that needs to be explicitly defended against, not just hoped away.',
      },
      {
        type: 'h2',
        text: 'The Practical Implications',
      },
      {
        type: 'p',
        text: 'What do you actually do with all of this? A few concrete things. First, stop thinking about prompt injection as a theoretical risk to be addressed later. It has assigned CVEs, active exploitation, and now a major AI lab shipping a dedicated security mode to address it. It is a production risk, today.',
      },
      {
        type: 'p',
        text: 'Second, model deployment decisions should include explicit consideration of what sensitive data is in the model\'s context window. The simplest mitigation for data exfiltration via injection is not putting sensitive data in contexts where it can be exfiltrated. Tight scoping of model access — retrieval-augmented generation with careful retrieval constraints, rather than dumping all relevant documents into context — reduces the exfiltration surface.',
      },
      {
        type: 'blockquote',
        text: 'OpenAI shipping Lockdown Mode is the AI industry\'s equivalent of a firewall vendor shipping an "untrusted network" mode. It\'s an acknowledgement that the external environment is adversarial. We should have been building with that assumption from the start.',
      },
      {
        type: 'p',
        text: 'Third, the SENTINEL observation still stands: layered defenses reduce attack success rates meaningfully. Prompt hardening, input sanitization, instruction-hierarchy tagging, output validation, and minimal context exposure together bring you to a risk level you can manage. No single layer is sufficient. The combination is what works.',
      },
    ],
  },

  /* ── 5 of 8 — February 8, 2026 ──────────────────────────── */
  {
    slug: 'healthcare-ransomware-tax',
    date: 'February 8, 2026',
    isoDate: '2026-02-08',
    title: 'Healthcare Can\'t Keep Paying the Ransomware Tax',
    readTime: 6,
    excerpt:
      'Ransomware attacks on healthcare surged 30% in 2025. A breach at NYC Health + Hospitals that ran from November through this week affected 1.8 million people. The University of Mississippi Medical Center\'s 35 clinics closed. At some point, this is a patient safety issue — and we need to say so clearly.',
    content: [
      {
        type: 'p',
        text: 'This week, NYC Health + Hospitals confirmed a months-long intrusion that ran from approximately November 25, 2025 through February 11, 2026, originating from an unnamed third-party vendor. At least 1.8 million people had their data exposed. It\'s being reported to the Department of Health and Human Services as one of the largest healthcare breaches of 2026. It lands in a context where healthcare ransomware attacks surged 30% in 2025 compared to the previous year, where 293 ransomware incidents hit hospitals and direct care providers in just the first nine months of 2025, and where the average breach in healthcare costs $7.42 million — the highest of any sector.',
      },
      {
        type: 'p',
        text: 'I want to talk about this as a security problem, but I also want to be honest about what it is: a patient safety problem. When the University of Mississippi Medical Center was hit by ransomware and all 35 clinic locations statewide had to close, forcing clinicians back to pen-and-paper documentation, we\'re not talking about data privacy inconvenience. We\'re talking about disrupted care, delayed diagnoses, and the very real possibility of patient harm. At that point, cybersecurity is public health infrastructure.',
      },
      {
        type: 'h2',
        text: 'Why Healthcare Is Such a High-Value Target',
      },
      {
        type: 'p',
        text: 'Healthcare\'s vulnerability to ransomware is structural. Electronic health record systems are often legacy platforms with long procurement and deployment cycles — upgrades happen in years, not sprints. Clinical staff operate under time pressure that makes security friction intolerable. Downtime is genuinely life-affecting in ways it isn\'t in most other industries, which means the incentive to pay ransoms rather than restore from backups is higher. And the data — medical records, billing information, insurance details — is among the most sensitive and marketable personal data in existence.',
      },
      {
        type: 'p',
        text: 'The FBI\'s 2025 IC3 report documented 460 ransomware incidents hitting the healthcare and public health sector, making it the most targeted critical infrastructure category. The top active variants by impact were Akira, Qilin, RansomHub, LockBit, and Medusa. These aren\'t random automated attacks — they\'re deliberate targeting by groups that understand healthcare\'s payment incentives and operational vulnerability to downtime.',
      },
      {
        type: 'h2',
        text: 'Third-Party Vendors Keep Being the Entry Point',
      },
      {
        type: 'p',
        text: 'The NYC Health + Hospitals breach originated from a third-party vendor. The 2025 Scattered Spider attacks on UK retailers also pivoted through third-party service providers. The 2025 supply chain breach statistics show that 30% of all breaches involved a third party — double the prior year. I\'ve started treating the pattern as a law: whatever your own security posture, your third-party vendors expand your attack surface in proportion to the access they have and inversely to the scrutiny you apply to them.',
      },
      {
        type: 'p',
        text: 'For healthcare specifically, the third-party attack surface is enormous. Billing processors, EHR vendors, medical device manufacturers, diagnostic labs, cloud service providers, IT managed service providers — a mid-sized hospital system can have hundreds of third-party relationships, each with some level of access to patient data or clinical systems. Security questionnaires completed once at onboarding do not constitute continuous assurance. The intrusion at NYC Health + Hospitals apparently ran for nearly three months before detection. That\'s 80+ days of dwell time through a third-party connection.',
      },
      {
        type: 'h2',
        text: 'The Technical Reality of Healthcare Network Security',
      },
      {
        type: 'p',
        text: 'Healthcare networks have a unique challenge that pure-enterprise environments don\'t: medical devices. MRI machines, infusion pumps, patient monitors, diagnostic equipment — many of these run embedded operating systems that haven\'t received security patches in years, can\'t be easily segmented without breaking clinical workflows, and have network connectivity that was added without security design review. A ransomware attacker who has established a foothold in a healthcare network has a rich ecosystem of pivot targets that can\'t be patched on any reasonable timeline.',
      },
      {
        type: 'p',
        text: 'The RetailOps observability platform I built last year was partly about this exact problem in a different domain: how do you correlate signals from heterogeneous systems — some well-instrumented, some poorly — to detect anomalies in real time? Healthcare needs the equivalent for clinical networks. Correlating authentication events, network traffic patterns, and device behavior against baselines is achievable with modern tooling. The challenge is that most healthcare organisations don\'t have the security engineering staff to build and operate it.',
      },
      {
        type: 'h2',
        text: 'The Regulatory Response Is Coming and It Won\'t Be Enough',
      },
      {
        type: 'p',
        text: 'HHS has been tightening HIPAA Security Rule requirements in response to the ransomware wave. Mandatory encryption, network segmentation, and incident response planning are all on the table as required (not recommended) controls. These are sensible requirements. They\'re also retrospective — they address the security postures of five years ago, not the threat landscape of today.',
      },
      {
        type: 'p',
        text: 'What I\'d actually want to see is mandatory third-party vendor security requirements with teeth — specifically, that vendors with access to patient data must maintain continuous monitoring and incident notification timelines that are measured in hours, not the months it took to surface the NYC Health + Hospitals compromise. The breach ran from November through February. Three months.',
      },
      {
        type: 'blockquote',
        text: 'When ransomware closes hospital clinics, cybersecurity has become healthcare infrastructure. We need to fund it, regulate it, and staff it accordingly — not treat it as an IT line item that can absorb budget cuts.',
      },
      {
        type: 'p',
        text: 'I don\'t have a clean solution to offer. The structural issues — legacy systems, thin margins, complex third-party ecosystems, medical device insecurity — don\'t yield to clever tooling alone. But pretending this is primarily a compliance problem, rather than a patient safety problem that happens to have a technical surface, is the kind of category error that produces frameworks instead of fixes.',
      },
    ],
  },

  /* ── 6 of 8 — January 20, 2026 ──────────────────────────── */
  {
    slug: 'cloud-misconfiguration-still-winning',
    date: 'January 20, 2026',
    isoDate: '2026-01-20',
    title: 'Cloud Misconfiguration Is Still Winning: A Reckoning',
    readTime: 6,
    excerpt:
      'In December 2024, CISA issued BOD 25-01 mandating federal agencies secure their cloud environments after widespread misconfiguration exposed sensitive data. In 2025, cloud-conscious intrusions jumped 37%. The problem is not the cloud. The problem is us.',
    content: [
      {
        type: 'p',
        text: 'Cloud misconfigurations cause 99% of cloud security failures. That statistic is from multiple independent sources and it\'s been roughly consistent for the past three years. The number hasn\'t meaningfully declined despite enormous investment in cloud security tooling, CSPM products, and security awareness training. In 2025, cloud-conscious intrusions jumped 37% year-over-year. The attack patterns targeting cloud environments are getting faster and more automated. The defenses are improving. The attacker advantage is not shrinking.',
      },
      {
        type: 'p',
        text: 'In December 2024, CISA issued Binding Operational Directive 25-01, mandating that federal agencies implement specific cloud security configurations — this followed a period in which widespread cloud misconfiguration was found to have exposed sensitive federal data. A binding directive aimed at federal agencies is notable, but the underlying problem it addresses isn\'t unique to government. Nearly half of all AWS S3 buckets are potentially misconfigured, with many publicly accessible due to default or lax settings. The average breach cost is $4.44 million globally, $10.22 million for US companies specifically.',
      },
      {
        type: 'h2',
        text: 'Why Misconfiguration Keeps Winning',
      },
      {
        type: 'p',
        text: 'The persistent rate of cloud misconfiguration isn\'t primarily a technology problem. Cloud platforms have had misconfiguration detection, automated remediation tooling, and sensible secure-by-default settings available for years. AWS has Security Hub, Config Rules, Macie, and a dozen other services specifically designed to catch and correct misconfigured resources. The problem is that 82% of cloud security incidents involve human error, and the attack surface created by misconfiguration is enormous, dynamic, and partially invisible.',
      },
      {
        type: 'p',
        text: 'The dynamic part is underappreciated. A properly configured environment at the time of a security review is not a properly configured environment six months later. Developers create S3 buckets with permissive ACLs during testing and forget to tighten them before production. IAM roles accumulate permissions as requirements change, and nobody removes the old permissions. New services are deployed in regions that aren\'t covered by the existing monitoring configuration. Drift is constant. Point-in-time audits don\'t capture it.',
      },
      {
        type: 'p',
        text: 'When I built the RetailOps/Kira platform last year, I was thinking about this problem from the observability angle: how do you continuously monitor a distributed AWS environment and surface anomalies in real time? The infrastructure-as-code approach with Terraform, ArgoCD, and GitHub Actions helps because it creates a source-of-truth for intended configuration. Every infrastructure change is a code commit. You can diff the current state against the intended state. But that only works if everything in your environment is managed as code — and most real environments have shadow infrastructure that someone provisioned through the console at 2am during an incident and never codified.',
      },
      {
        type: 'h2',
        text: 'IAM Is the Actual Perimeter',
      },
      {
        type: 'p',
        text: 'The leading cloud security threats in 2026, according to most threat intelligence reports, are misconfiguration, over-permissioned IAM, stolen credentials, API failures, and Kubernetes misconfigurations. IAM appears twice in that list — once directly and once through the credential theft that IAM misconfigurations enable. The cloud doesn\'t have a network perimeter in the traditional sense. Access control, expressed through IAM, is the actual perimeter. Getting IAM right is the foundational cloud security task.',
      },
      {
        type: 'p',
        text: 'Over-permissioned IAM is endemic because it\'s easy and fast to grant broad permissions and time-consuming to maintain least-privilege configurations as systems evolve. The classic failure mode: you attach AdministratorAccess to a Lambda function because it\'s easier than figuring out the exact permissions it needs, and you mean to fix it later. Later never comes. The Lambda gets compromised through a dependency vulnerability, and the blast radius is the entire account.',
      },
      {
        type: 'p',
        text: 'Effective IAM hygiene in AWS means permission boundaries, SCPs (Service Control Policies) that enforce guardrails at the organization level, regular access reviews, and tooling that continuously evaluates whether granted permissions are actually being used. AWS IAM Access Analyzer tells you which permissions a role has used in the past 90 days. If your Lambda function has an S3 full-access policy and has never called S3, that policy should be removed. This is not complicated. It requires discipline and tooling support to do continuously.',
      },
      {
        type: 'h2',
        text: 'Zero Trust and ZTNA Are Moving From Marketing to Implementation',
      },
      {
        type: 'p',
        text: 'The one genuinely positive signal in cloud security for 2026 is that zero trust architecture is moving from a marketing concept to an actual implementation trend. A 2025 survey found that 26% of organisations have already deployed Zero Trust Network Access and another 53% are in the process. Gartner projects that 10% of large enterprises will have a mature, measurable zero trust program by end of 2026, up from under 1% in 2023.',
      },
      {
        type: 'p',
        text: 'That 10% number is worth examining. It means 90% of large enterprises will not have a mature zero trust program. Zero trust isn\'t a product you buy — it\'s an architecture you build, and building it requires re-engineering identity, network access, device trust, and data governance simultaneously. Organisations that try to do it by buying a ZTNA product and calling it done will have ZTNA for remote access and traditional perimeter security for everything else. That\'s an improvement but it\'s not zero trust.',
      },
      {
        type: 'blockquote',
        text: 'The cloud didn\'t create the misconfiguration problem. It made misconfigurations faster to create, more globally accessible when created, and more consequential when exploited. The accountability still belongs to us.',
      },
      {
        type: 'p',
        text: 'What I\'m taking into 2026: treat IAM like code, which means it goes in version control, gets reviewed, has tests, and has automated drift detection. Build infrastructure as code from day one, not as a retrofit. And apply the same STRIDE analysis to cloud architecture that you\'d apply to any other system — the cloud threat model is just the traditional threat model with an attacker who can enumerate and probe your infrastructure from anywhere in the world.',
      },
    ],
  },

  /* ── 7 of 8 — December 12, 2025 ─────────────────────────── */
  {
    slug: 'open-source-malware-surge',
    date: 'December 12, 2025',
    isoDate: '2025-12-12',
    title: 'The Open Source Malware Surge Is Not Slowing Down',
    readTime: 6,
    excerpt:
      'Sonatype identified 34,319 malicious open source packages in Q3 2025 alone, bringing the total since 2019 to 877,522. The Lazarus Group planted 107 packages with over 30,000 downloads. This isn\'t a supply chain story anymore. It\'s a volume problem.',
    content: [
      {
        type: 'p',
        text: 'Sonatype\'s Q3 2025 open source malware index is not easy reading. In the three months from July through September 2025, researchers identified 34,319 malicious packages across npm, PyPI, and Hugging Face — bringing the total since Sonatype began tracking in 2019 to 877,522 confirmed malicious packages. In Q2 2025, the count was 16,279 — meaning Q3 was more than double Q2. The acceleration is the story.',
      },
      {
        type: 'p',
        text: 'To put the volume in context: package registries like npm and PyPI host millions of legitimate packages. Security researchers have finite capacity to review them. Automated detection tools catch known patterns but are blind to novel techniques. The economics favour the attacker — publishing a malicious package takes minutes, detection and removal takes days to weeks, and the window of exposure during that gap is real.',
      },
      {
        type: 'h2',
        text: 'The Lazarus Group\'s npm Campaign',
      },
      {
        type: 'p',
        text: 'In Q2 2025, researchers attributed 107 malicious npm packages to the Lazarus Group — the North Korean state-aligned APT. Those 107 packages had accumulated more than 30,050 combined downloads before detection. Lazarus\'s targeting of developer tools and open source ecosystems is a strategic choice: software developers have access to source code, internal systems, cloud credentials, and production infrastructure. A developer whose machine is compromised through a malicious package is a high-value pivot point.',
      },
      {
        type: 'p',
        text: 'This is a continuation of a strategy Lazarus has been executing for years — they were behind the 2018 npm cryptomining campaign, the 2021 npm supply chain attacks targeting Japanese companies, and now this sustained Q2 2025 campaign. The group understands software supply chain attack vectors at a sophisticated level and has consistently prioritised them as a primary intrusion vector. They\'re not experimenting with this technique. They\'ve operationalised it.',
      },
      {
        type: 'p',
        text: 'The choice of npm is also notable. npm is the largest package registry by volume, heavily used in frontend, backend Node.js, and increasingly in full-stack AI tooling. The data exfiltration techniques Lazarus uses in these packages target developer environment files: .env files, SSH keys, cloud credentials cached in ~/.aws/credentials, shell history. These are exactly the things you\'d want to steal if you were planning a subsequent infrastructure compromise.',
      },
      {
        type: 'h2',
        text: 'Data Exfiltration as the Dominant Payload',
      },
      {
        type: 'p',
        text: 'Across all malicious package categories — not just Lazarus campaigns — FortiGuard Labs found that data exfiltration is the most common malicious payload behaviour in malicious npm and PyPI packages, typically executed through install scripts. This matters because it\'s hard to catch. A package that exfiltrates data during installation does so before any runtime analysis can observe it. By the time the package is flagged and removed from the registry, the damage is done: credentials are stolen, environment files are exfiltrated, and the attacker has what they need for the next phase of the attack.',
      },
      {
        type: 'p',
        text: 'The install-time execution window is a fundamental vulnerability in how package managers work. `npm install`, `pip install`, `poetry add` — all of them run arbitrary code from package authors as a side effect of installation. This isn\'t a bug in the package managers; it\'s a feature that enables legitimate build tooling, compiled extensions, and setup scripts. But it creates an attack surface that\'s difficult to close without breaking a significant proportion of legitimate packages.',
      },
      {
        type: 'h2',
        text: 'What My SCA Work Has Taught Me',
      },
      {
        type: 'p',
        text: 'I spent a lot of time this year thinking about SCA — both in the BASTION project and in studying for my first semester security coursework at Ohio State. The standard SCA workflow — scan your dependency tree against a vulnerability database, flag known-bad versions, produce a remediation list — is valuable and non-negotiable. But it\'s essentially reactive. You can only flag packages that are already in a vulnerability database.',
      },
      {
        type: 'p',
        text: 'Malicious packages targeting developers through supply chain attacks operate in the window before detection and database inclusion. The 107 Lazarus packages accumulated 30,000 downloads before being identified and removed. A standard SCA tool running against your dependency tree wouldn\'t have flagged them. They were malicious, not vulnerable — the distinction matters for what detection mechanisms apply.',
      },
      {
        type: 'p',
        text: 'The emerging response is behavioural analysis at install time: tools that sandbox the installation of new packages and observe what they do before allowing them into the build environment. This is more expensive and slower than a database lookup, but it\'s the only approach that can catch novel malicious behaviour rather than only known-bad signatures. Several security vendors are building in this direction. The production-grade tooling isn\'t quite there yet, but the problem is well-understood enough that it should be within reach.',
      },
      {
        type: 'h2',
        text: 'The SBOM Question Is Getting Harder',
      },
      {
        type: 'p',
        text: 'Software bills of materials — SBOMs — have been a regulatory focus since the Biden administration\'s 2021 executive order on improving cybersecurity. The idea is sound: if you know exactly what\'s in your software, you can reason about its security properties. In practice, SBOMs face a fundamental challenge when the supply chain is actively adversarial: an SBOM tells you what packages you\'re using, not whether those packages are doing what they claim.',
      },
      {
        type: 'blockquote',
        text: 'The open source supply chain is a trust system operating at a scale that makes trust verification impossible without automation. We need the automation to catch up to the volume.',
      },
      {
        type: 'p',
        text: 'At 877,522 malicious packages identified since 2019 and accelerating sharply through 2025, this is no longer an edge-case security concern. It\'s a volume problem — and volume problems require systematic solutions, not case-by-case vigilance. Pinning dependencies to exact versions, verifying cryptographic hashes, auditing new dependencies before adding them, and using private mirrors with pre-validated packages are all practices that reduce exposure. None of them are new. The fact that they\'re still not universal is the part I find genuinely frustrating.',
      },
    ],
  },

  /* ── 8 of 8 — November 15, 2025 ─────────────────────────── */
  {
    slug: 'ai-framework-vulnerability-nobody-warned-us',
    date: 'November 15, 2025',
    isoDate: '2025-11-15',
    title: 'The AI Framework Vulnerability Nobody Warned Us About',
    readTime: 6,
    excerpt:
      'CVE-2025-3248 — a CVSS 9.8 unauthenticated RCE in Langflow — was exploited within hours of disclosure and landed in CISA\'s KEV catalog on May 5, 2025. Six months later, I think it\'s the harbinger of a much larger category of vulnerabilities we aren\'t taking seriously.',
    content: [
      {
        type: 'p',
        text: 'On May 5, 2025, CISA added CVE-2025-3248 to its Known Exploited Vulnerabilities catalog. The vulnerability: an unauthenticated remote code execution flaw in Langflow, a popular Python framework for building LLM-powered applications. CVSS score: 9.8 out of 10. Exploitation was observed within hours of disclosure. Researchers tracked 361 malicious IP addresses actively scanning for vulnerable instances. Successful exploitation delivered the Flodrix botnet, enabling DDoS participation, full system compromise, and sensitive data exfiltration.',
      },
      {
        type: 'p',
        text: 'It\'s been six months. I keep coming back to this CVE because I think it\'s not just a vulnerability — it\'s an early signal of a category of vulnerabilities that the security community hasn\'t fully reckoned with: flaws in the frameworks and tools used to build AI applications, exploited precisely because those tools are now widely deployed and have privileged access to the systems and data they operate on.',
      },
      {
        type: 'h2',
        text: 'The Specific Failure in Langflow',
      },
      {
        type: 'p',
        text: 'The technical root cause of CVE-2025-3248 is worth understanding because it\'s architecturally instructive. Langflow exposed an API endpoint — /api/v1/validate/code — that executed arbitrary Python code by abusing decorators and default arguments. The endpoint existed to validate user-provided code in the Langflow interface. It had no authentication requirement. Any unauthenticated caller on the network could send crafted HTTP requests to this endpoint and execute arbitrary code on the server.',
      },
      {
        type: 'p',
        text: 'This is not a subtle vulnerability. An unauthenticated code execution endpoint is about as serious as a security flaw gets. The question that I can\'t fully answer is how this made it into production releases for as long as it did. The fix was addressed in Langflow version 1.3.0. The vulnerability was in earlier versions that were apparently widely deployed.',
      },
      {
        type: 'p',
        text: 'Part of the answer is the speed at which AI tooling has been developed and deployed. Langflow is a fast-moving open source project serving a rapidly growing user base. The development culture in the LLM application space has prioritised capability and developer experience over security-by-default, partly because the users building with these tools are often ML engineers and data scientists rather than security engineers. The expectation that an internal ML workflow tool needs the same security scrutiny as a production-facing API has not been universal.',
      },
      {
        type: 'h2',
        text: 'The Deployment Context Matters Enormously',
      },
      {
        type: 'p',
        text: 'The severity of CVE-2025-3248 is partly a function of how Langflow gets deployed. Many Langflow instances are run locally by developers prototyping LLM workflows — in that context, a local-only deployment with no network exposure has a very different risk profile from a Langflow instance exposed on a VPS for team access. The CVE is CVSS 9.8 under the assumption of network-accessible deployment, which turned out to be accurate for a significant number of real instances.',
      },
      {
        type: 'p',
        text: 'This pattern repeats across the AI tooling ecosystem. Tools designed for local or controlled-environment use get deployed in more exposed configurations because the teams using them grow, collaborating remotely becomes a requirement, and adding network access is the path of least resistance. Security review of that deployment decision — should this tool be network-accessible, and if so, does its authentication and authorization model support that? — often doesn\'t happen because the tool wasn\'t originally conceived as a network service.',
      },
      {
        type: 'h2',
        text: 'The Broader AI Toolchain Attack Surface',
      },
      {
        type: 'p',
        text: 'When I built SENTINEL, I thought carefully about the attack surface of the toolkit itself. It runs in Docker. It has no exposed unauthenticated endpoints. It uses the Anthropic tool-use API rather than brittle JSON string parsing — partly for reliability, partly because tool-use creates a more constrained input/output contract that\'s easier to reason about from a security perspective. These were deliberate choices, but I made them because I was thinking about security while building.',
      },
      {
        type: 'p',
        text: 'Most people building with AI frameworks are not thinking about security while building. They\'re thinking about their use case, their model performance, their data pipeline. The frameworks they use inherit assumptions about deployment context that may not match where the tool ends up running. And unlike a misconfigured S3 bucket — which affects data you store there — a compromised AI framework deployment potentially affects everything the framework can access: the models, the data they process, the APIs they call, the infrastructure they run on.',
      },
      {
        type: 'h2',
        text: 'What Security Review for AI Frameworks Should Include',
      },
      {
        type: 'p',
        text: 'Reviewing an AI framework for security needs to include questions that aren\'t in the standard web application security review checklist. Does the framework expose any code execution endpoints? (Langflow did. This should be a deal-breaker for network-accessible deployment until patched.) What does the framework do with user-provided content — does it evaluate it, pass it to model APIs, or execute it? What are the network-accessible endpoints and what authentication do they require? If the framework processes external data (web pages, uploaded documents, database content), can that data influence the framework\'s behavior in unintended ways?',
      },
      {
        type: 'p',
        text: 'That last question is the LLM-specific one. An AI framework that processes external content is potentially susceptible to indirect prompt injection — instructions embedded in the content that cause the model to behave in unintended ways. The Langflow CVE was a traditional code execution vulnerability, not a prompt injection issue. But the same deployment context that made CVE-2025-3248 impactful — a widely-deployed framework with privileged access to data and compute — also makes indirect injection attacks impactful when they succeed.',
      },
      {
        type: 'blockquote',
        text: 'Building with a framework means inheriting its security posture. That\'s always been true. It\'s newly urgent when the framework can execute code, process external content, and make API calls on your behalf.',
      },
      {
        type: 'p',
        text: 'CVE-2025-3248 got added to CISA\'s KEV catalog and organisations scrambled to update or isolate their Langflow instances. That\'s the reactive loop. The proactive version is treating AI framework security review as a required step in any deployment decision — same rigour as any other software you\'re allowing to run with privileged access in your environment. The tooling ecosystem is moving fast enough that these reviews need to be continuous, not one-time.',
      },
    ],
  },
];
