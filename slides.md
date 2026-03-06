---
theme: seriph
title: Beefree AI Co-Pilot
info: |
  ## Beefree AI Co-Pilot
  Email generation, multi-agent architecture, and the hard truths about building with LLMs.
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
addons:
  - slidev-addon-react
fonts:
  sans: 'Roboto'
  serif: 'Roboto Slab'
  mono: 'Roboto Mono'
---

# AI Co-Pilot

Amplifying creativity inside Beefree/RGE Studio

---

# AI is becoming the baseline

<div style="display: grid; grid-template-columns: 1fr 300px; gap: 2rem; align-items: center;">

<div>

From **Stensul** to **Knak**, from **Stripo** to **ActiveCampaign**,  
the message is the same: *"Give us a prompt. We'll generate your campaign."*

- Full emails
- Layouts + copy
- Even automation logic

<div class="mt-8">

**But is speed alone enough?**

</div>

</div>

<div>
<img src="/assets/guy.png" style="width: 100%; height: auto; border-radius: 8px;" />
</div>

</div>

---

# Speed without control is not the future

Distributed teams working across complex stacks do not just want automation. They care about:

- **Brand integrity**
- **Accessibility**
- **Clean, stable HTML**
- **Control**

<div class="mt-8">

> The real question is: What does responsible, reliable AI look like inside the tools professionals trust every day?

</div>

---

# Assistive. Not autonomous.

<div style="display: grid; grid-template-columns: 1fr 300px; gap: 2rem; align-items: center;">

<div>

Our AI Co-Pilot does not replace humans, but it is:

- An **assistant**
- A **co-creator**
- A **force multiplier** for human creativity

<div class="mt-8 text-xl">

An **intelligent design partner**!

</div>

</div>

<div>
<img src="/assets/design-partner.png" style="width: 100%; height: auto; border-radius: 8px;" />
</div>

</div>

---

# AI Co-Pilot in Beefree/RGE Studio

<div style="display: grid; grid-template-columns: 1fr 300px; gap: 2rem; align-items: center;">

<div>

The customer brings:
- The **idea**
- The **brief**
- The **brand**

<div class="mt-8">

The AI Co-Pilot helps turn that into a full, stable, on-brand email inside the design environment they already trust.

</div>

</div>

<div>
<img src="/assets/new-ideas.png" style="width: 100%; height: auto; border-radius: 8px;" />
</div>

</div>

---
layout: center
---

<div style="display: grid; grid-template-columns: 1fr 300px; gap: 2rem; align-items: center;">

<div>

<h1 style="font-size: 2.5rem; line-height: 1.3;">We are not automating creativity.</h1>
<h1 style="font-size: 2.5rem; line-height: 1.3; margin-top: 1rem;">We are <span style="color: #7747ff;">amplifying</span> it.</h1>

<p style="margin-top: 2rem; font-size: 0.9rem;">
<a href="https://growens.atlassian.net/wiki/spaces/BEEPro/pages/6270877697/Beefree+App+-+AI+Co-Pilot+-+Beta+version" target="_blank" style="color: #7747ff; text-decoration: none; border-bottom: 1px solid #7747ff;">Beefree AI Co-Pilot internal docs</a>
</p>

</div>

<div>
<img src="/assets/party.png" style="width: 100%; height: auto; border-radius: 8px;" />
</div>

</div>

---
layout: center
---

<div style="text-align: center;">

# Now, let's get more technical

<p style="font-size: 1.2rem; color: #666; margin-top: 1rem;">A deep dive into how we built it</p>

</div>

---

# Agenda

1. Agent vs Tools
2. Beefree AI Co-Pilot Capabilities
3. The challenges we faced
4. How we solved them
5. Architecture
6. Lessons Learned
7. Live Demo
8. What's Next

---

# Agent vs Tools

<React is="AgentVsToolsStatic" />

---

# Agent vs Tools

<React is="AgentVsToolsAnimated" />

---

# Beefree AI Co-Pilot Capabilities

<React is="Capabilities" />

---

# The challenges we faced

1. **Consistency**: Tools get called correctly, but not consistently. <br/>Use blue in row 1, red in row 2, blue again in row 3.
2. **Probabilistic execution**: Just because you ask for something in a prompt doesn't guarantee it happens 100% of the time. LLMs are non-deterministic by nature.
3. **Prompt engineering**: Every line you add to the system prompt competes with every line already there. By adding you dilute.
4. **Evaluating correctness**: You can't unit test an agent. Knowing if it's doing a good job is non-trivial.

---

# How we solved them

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start;">

<div>


1. **Plan guideline** <br/> We define a strict plan schema that constrains what the agent can express, making inconsistent outputs structurally impossible.

2. **Planner agent** <br/> Instead of calling tools directly, the agent generates a detailed plan following the guideline.

3. **Executor** <br/> Tool calls are no longer made by the agent. The executor reads the plan and programmatically calls the right tools in the right sequence.


</div>

<div>
<React is="PlanExecuteAnimation" />
</div>

</div>

---
class: '!p-4 no-watermark'
---

<React is="BeforeAfter" />

---
layout: default
---

# Architecture

<div style="margin-top: 6em;">

```mermaid
---
config:
  securityLevel: 'loose'
  theme: 'base'
  themeVariables:
    lineColor: '#C4A3FF'
    edgeLabelBackground: '#fcf9ff'
---
graph LR
    U([User Request]) --> A[Guardrail]
    A -->|email design related| B[Router]
    A -->|not email design related| Z([Output: Not Related])
    B -->|Edit| C[Editor]
    B -->|Create| D[Prompt Enhancer]
      D --> E[Planner]
    subgraph What we just saw
      E --> F((Executor))
    end
    C -.-> H1{{MCP Tools}}
    F -.-> H2{{MCP Tools}}
    C --> O([Output])
    F --> O
    
    style U fill:#D4F1F4,stroke:#00838F,stroke-width:3px,color:#1a1a1a
    style O fill:#D4F1F4,stroke:#00838F,stroke-width:3px,color:#1a1a1a
    style Z fill:#D4F1F4,stroke:#00838F,stroke-width:3px,color:#1a1a1a
    style A fill:#E8DEFF,stroke:#7747ff,stroke-width:2px,color:#1a1a1a
    style B fill:#E8DEFF,stroke:#7747ff,stroke-width:2px,color:#1a1a1a
    style C fill:#E8DEFF,stroke:#7747ff,stroke-width:2px,color:#1a1a1a
    style D fill:#E8DEFF,stroke:#7747ff,stroke-width:2px,color:#1a1a1a
    style E fill:#E8DEFF,stroke:#7747ff,stroke-width:2px,color:#1a1a1a
    style F fill:#7747ff,stroke:#4A148C,stroke-width:2px,color:#fff
    style H1 fill:#FFE4CC,stroke:#FF9F5A,stroke-width:2px,color:#1a1a1a
    style H2 fill:#FFE4CC,stroke:#FF9F5A,stroke-width:2px,color:#1a1a1a
```

</div>


---

# Lessons Learned

1. **A structured plan is likely one key to good results.**  
   A tight output schema changes everything.

2. **Adding lines to the system prompt is overrated.**  
   Every new instruction competes with the rest. More words, less focus.

3. **Less AI is sometimes the right call!**  
   Deterministic beats autonomous when you need reliability.

4. **More complexity? More agents, smaller scope.**  
   Don't give one LLM a bigger prompt. Split the work across specialized agents that each do one thing well.

5. **Email client compatibility vs LLM fluency:**  
   Some tools (like Migma.ai) generate emails using JavaScript, a language well known by LLMs. That's why their initial outputs can look impressive. We use a custom format that's harder for LLMs to understand, but it's the foundation of our cross-client rendering reliability. As we refine our approach, we'll get better results while maintaining that compatibility.



---
layout: center
class: text-center
---

# Demo

<div class="mt-8 text-lg" style="font-style: italic;">
"Please, God of demos, stay with us..."
</div>

---
layout: default
class: '!p-0 no-watermark'
---

<React is="DemoGrid" />

---

# What's Next

- **Parallelizing the planner**  
  Get faster and more precise with planning orchestrator + N parallel section planners.

- **UX refinements**  
  Better feedback loops: revert SDK actions and smoother editing experience.

- **Personalized context**  
  Learning from customer's styles and templates.

- **Hackaton: Fine-tuning open source LLM on our toolset (to explore during cool-downs)**  
  Instead of teaching the LLM our JSON through prompts, train it to speak our MCP tools natively.

<div class="mt-8" style="background: #f3f0ff; border-left: 4px solid #7747ff; padding: 0.8rem 1rem; border-radius: 0 8px 8px 0;">

💡 **Interesting fact:** We've already converted our template catalog into MCP tool call sequences, the training data is ready. Now exploring fine-tuning.

</div>

---
layout: center
class: text-center
---

# Thanks for Listening!

<!-- Write a travel inspiration email in Airbnb's style. Tone: warm, human, wanderlust-driven. Structure: destination hero with white body background → friendly headline about belonging anywhere → two-sentence intro → three-column destination cards each with a photo, location name, and starting price → host spotlight split-screen with photo and short quote → CTA: 'Start Exploring.' Warm coral and white palette. -->

<!-- Write a premiere email for a new dark thriller series in Netflix's style. Tone: cinematic, mysterious. Structure: full-bleed key art hero with title treatment overlay → release date in red → two-line series logline → three-column episode preview strip with stills and one-line teasers → cast spotlight split-screen → CTA: 'Watch Now.' Black background, Netflix red accents only. -->

<!-- Write a feature announcement email in Spotify's style. Tone: friendly, energetic, slightly playful. Structure: colorful gradient hero with feature name large → two-sentence explanation of what's new → three-column icon triptych showing how it works step by step → animated GIF of the feature in the app → user testimonial pull quote → CTA: 'Try It Now.' Spotify green on dark background. -->

<!-- Write a launch email for a new iPhone in Apple's style. Tone: quiet confidence, zero hype. Structure: full-bleed product hero on white → five-word headline → two-sentence intro → alternating split-screen sections for three key features, each with a close-up shot and one paragraph → specs comparison table against previous model → primary CTA: 'Order Now'. Pure white background, SF Pro typography implied, single grey accent. -->