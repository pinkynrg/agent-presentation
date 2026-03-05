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
fonts:
  sans: 'Roboto'
  serif: 'Roboto Slab'
  mono: 'Roboto Mono'
---

# Beefree AI Co-Pilot

---

# Agenda

1. Agent vs Tools
2. Beefree AI Co-Pilot Capabilities
3. Architecture
4. The challenges we faced
5. How we solved them
6. Live Demo
7. Lessons Learned
8. What's Next

---

# Agent vs Tools

<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2rem; margin-top: 2rem;">

<div>
<div style="text-align: center; font-size: 3rem; margin-bottom: 1rem;">🔧</div>
<h3 style="text-align: center; color: #7747ff; margin-bottom: 1rem;">Tool</h3>
<div style="text-align: center; font-size: 0.9rem; line-height: 1.8;">
<div style="margin-bottom: 0.8rem;">🔨 <strong>Hammer</strong><br/>drives nails</div>
<div style="margin-bottom: 0.8rem;">🪛 <strong>Screwdriver</strong><br/>turns screws</div>
<div style="margin-bottom: 0.8rem;">📏 <strong>Ruler</strong><br/>measures length</div>
<div style="color: #999; font-size: 0.85rem; font-style: italic;">...and 50+ more</div>
</div>
</div>

<div>
<div style="text-align: center; font-size: 3rem; margin-bottom: 1rem;">🧰</div>
<h3 style="text-align: center; color: #7747ff; margin-bottom: 1rem;">MCP Server</h3>
<div style="text-align: center; font-size: 0.9rem; line-height: 1.8; padding: 0 1rem;">
A collection of tools with labels describing what each tool should be used for
</div>
</div>

<div>
<div style="text-align: center; font-size: 3rem; margin-bottom: 1rem;">👷</div>
<h3 style="text-align: center; color: #7747ff; margin-bottom: 1rem;">Agent</h3>
<div style="text-align: center; font-size: 0.9rem; line-height: 1.8;">
<div style="background: #f5f0ff; padding: 0.6rem; border-radius: 8px; margin-bottom: 0.8rem;">
<strong>You:</strong> "Build me a bookshelf"
</div>
<div style="font-size: 0.85rem; color: #666;">
📖 Reads labels<br/>
📏 Measures<br/>
🪚 Cuts<br/>
🔨 Assembles
</div>
</div>
</div>

</div>

---

# Agent vs Tools (Technical)

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const step = ref(0)
let interval = null

onMounted(() => {
  interval = setInterval(() => {
    step.value = (step.value + 1) % 4
  }, 2000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2rem; margin-top: 1.5rem;">

<div>
<div style="text-align: center; font-size: 2.5rem; margin-bottom: 1rem;">🧰</div>
<h3 style="text-align: center; color: #7747ff; margin-bottom: 1rem; font-size: 1.1rem;">MCP Tools</h3>
<div style="font-size: 0.75rem; line-height: 1.4;">

<div style="background: #f8f6ff; padding: 0.5rem; border-radius: 6px; margin-bottom: 0.5rem; border-left: 3px solid #7747ff;">
<code style="color: #7747ff; font-weight: bold; font-size: 0.7rem;">beefree_add_section</code><br/>
<span style="color: #666; font-size: 0.65rem;">Creates email rows</span>
</div>

<div style="background: #f8f6ff; padding: 0.5rem; border-radius: 6px; margin-bottom: 0.5rem; border-left: 3px solid #7747ff;">
<code style="color: #7747ff; font-weight: bold; font-size: 0.7rem;">beefree_add_image</code><br/>
<span style="color: #666; font-size: 0.65rem;">Adds images</span>
</div>

<div style="background: #f8f6ff; padding: 0.5rem; border-radius: 6px; margin-bottom: 0.5rem; border-left: 3px solid #7747ff;">
<code style="color: #7747ff; font-weight: bold; font-size: 0.7rem;">beefree_add_button</code><br/>
<span style="color: #666; font-size: 0.65rem;">Creates buttons</span>
</div>

<div style="text-align: center; color: #999; font-size: 0.7rem; font-style: italic; margin-top: 0.3rem;">
...and 50+ more
</div>

</div>
</div>

<div>
<div style="text-align: center; font-size: 2.5rem; margin-bottom: 1rem;">🤖</div>
<h3 style="text-align: center; color: #7747ff; margin-bottom: 1rem; font-size: 1.1rem;">Agent</h3>
<div style="font-size: 0.8rem;">

<div style="background: #e8f5e9; padding: 0.8rem; border-radius: 8px; margin-bottom: 1rem; border-left: 3px solid #00838F;">
<strong style="font-size: 0.75rem;">User:</strong><br/>
<span style="font-style: italic; font-size: 0.75rem;">"Create a product hero"</span>
</div>

<div style="display: flex; flex-direction: column; gap: 0.6rem;">
<div 
  :style="{
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    opacity: step >= 1 ? 1 : 0.3,
    transition: 'opacity 0.3s'
  }"
>
<span style="color: #7747ff; font-size: 1rem;">→</span>
<code style="background: #f8f6ff; padding: 0.3rem 0.5rem; border-radius: 4px; font-size: 0.7rem;">add_section([12])</code>
</div>
<div 
  :style="{
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    opacity: step >= 2 ? 1 : 0.3,
    transition: 'opacity 0.3s'
  }"
>
<span style="color: #7747ff; font-size: 1rem;">→</span>
<code style="background: #f8f6ff; padding: 0.3rem 0.5rem; border-radius: 4px; font-size: 0.7rem;">add_image(0, 0, "hero.jpg")</code>
</div>
<div 
  :style="{
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    opacity: step >= 3 ? 1 : 0.3,
    transition: 'opacity 0.3s'
  }"
>
<span style="color: #7747ff; font-size: 1rem;">→</span>
<code style="background: #f8f6ff; padding: 0.3rem 0.5rem; border-radius: 4px; font-size: 0.7rem;">add_button(0, 0, "Shop Now")</code>
</div>
</div>

</div>
</div>

<div>
<div style="text-align: center; font-size: 2.5rem; margin-bottom: 1rem;">📧</div>
<h3 style="text-align: center; color: #7747ff; margin-bottom: 1rem; font-size: 1.1rem;">Result</h3>
<div style="background: #f5f5f5; border: 2px solid #e0e0e0; border-radius: 8px; padding: 0.8rem; min-height: 200px;">

<div v-if="step >= 1" :style="{ background: 'white', border: '2px dashed #7747ff', borderRadius: '6px', padding: '0.8rem', opacity: step >= 1 ? 1 : 0, transition: 'opacity 0.5s ease' }">
<div style="font-size: 0.65rem; color: #7747ff; font-weight: bold; margin-bottom: 0.5rem;">Section (1 column)</div>
<div v-if="step >= 2" :style="{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '4px', height: '80px', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7rem', opacity: step >= 2 ? 1 : 0, transition: 'opacity 0.5s ease' }">🖼️ hero.jpg</div>
<div v-if="step >= 3" :style="{ background: '#7747ff', color: 'white', borderRadius: '4px', padding: '0.5rem 1rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', opacity: step >= 3 ? 1 : 0, transition: 'opacity 0.5s ease' }">Shop Now</div>
</div>

</div>
</div>

</div>

---

# Beefree AI Co-Pilot Capabilities

- **Better email creation** from natural language prompts
- **Basic email editing** of existing designs
- **Attachments** pdf and txt files for the LLM to read and extract information from
- **Workspace styles** can be attached to the prompt, so the LLM can match the brand's look and feel
- **Create with AI** CTA button in the projects list page

> This is a **Beta**, more cycles ahead for improvements and new features.

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
    E --> F((Executor))
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

# The challenges we faced

1. **Tool calling reliability**: Agents don't always call the right tool at the right time.
2. **Prompt engineering**: Every line you add competes with every line already there. The real skill is **subtraction**.
3. **Color contrasts**: Ensuring text is readable against background colors.
4. **Evaluating correctness**: You can't unit test an agent. Knowing if it's doing a good job is non-trivial.
5. LLMs know **HTML, Python, React** and other common languages fluently. 
They've seen them millions of times. On the other hand it doesn't know **Beefree custom JSON format** or our specific **MCP toolset**.


> Beefree's JSON is harder to work with but it's **why emails render correctly everywhere**.

---

# How we solved them

**The key insight:** Separate planning from execution.

1. **Planner creates a structured plan** — Instead of letting the agent call tools directly, we ask it to generate a detailed plan in a predefined JSON format.

2. **Executor runs the plan deterministically** — Tool calls are no longer made by the agent. The executor reads the plan and programmatically calls the right tools in the right sequence.

<div class="mt-8">

> By moving tool calls out of the agent's hands, we turned an unreliable process into a predictable one.

</div>

---

# The Plan Structure

```
Color palette, fonts, margins (tokens)
  ↓
Global Styles (email body width, padding, margins, background)
  ↓
Email Metadata (subject, preheader)
  ↓
Rows (hero, features, footer...)
  ↓
Columns (how many columns in each row? 1, 2, 3...)
  ↓
Blocks (what type of content goes in each column? text, image, button...)
```

<div class="mt-4 text-base opacity-80">

Token-based design system ensures consistency. Hierarchical structure makes it predictable.

</div>

---
layout: center
class: text-center
---

# Demo

<div class="mt-8 text-lg opacity-70" style="font-style: italic;">
"Please, god of the demo, stay with us..."
</div>

---
layout: default
class: '!p-0 no-watermark'
---

<script setup>
import { ref } from 'vue'

const zoomedIframe = ref(null)
const hoveredButton = ref(null)

const toggleZoom = (index) => {
  zoomedIframe.value = zoomedIframe.value === index ? null : index
}
</script>

<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #000000; display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 10px; padding: 10px; box-sizing: border-box;">
  <div 
    v-for="i in 4" 
    :key="i" 
    :style="{
      overflow: 'hidden',
      border: '1px solid #e0e0e0',
      borderRadius: '4px',
      position: 'relative',
      display: zoomedIframe !== null && zoomedIframe !== i ? 'none' : 'block',
      gridColumn: zoomedIframe === i ? '1 / 3' : 'auto',
      gridRow: zoomedIframe === i ? '1 / 3' : 'auto'
    }"
  >
    <iframe 
      src="https://beefree.io/app/index.html" 
      :style="{
        width: zoomedIframe === i ? '180%' : '200%',
        height: zoomedIframe === i ? '180%' : '200%',
        border: 'none',
        transform: zoomedIframe === i ? 'scale(0.56)' : 'scale(0.5)',
        transformOrigin: '0 0'
      }"
    ></iframe>
    <button
      @click="toggleZoom(i)"
      @mouseenter="hoveredButton = i"
      @mouseleave="hoveredButton = null"
      :style="{
        position: 'absolute',
        bottom: '5px',
        right: '5px',
        width: '20px',
        height: '20px',
        background: 'rgba(0, 0, 0, 0.7)',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '10px',
        color: 'white',
        transition: 'all 0.3s ease',
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        opacity: hoveredButton === i ? '1' : '0.15'
      }"
      :title="zoomedIframe === i ? 'Exit fullscreen' : 'Fullscreen'"
    >
      {{ zoomedIframe === i ? '✕' : '⛶' }}
    </button>
  </div>
</div>

---

# Lessons Learned

1. **JSON output schema is the key to good results.**  
   Garbage in, garbage out — a tight schema changes everything.

2. **Teach the LLM your mental model, not just your format.**  
   Our builder has no concept of a "body" — the LLM kept trying to create one. You have to rewire its assumptions.

3. **Less AI is sometimes the right call.**  
   The executor story. Deterministic beats autonomous when you need reliability.

4. **Prompt engineering is never done — and addition is the enemy.**  
   Every edge case someone wants to fix with a new line. Resist it.

---

# What's Next

We're still learning. Two directions we're actively exploring:

- **Fine-tuning on our toolset**  
  Instead of teaching the LLM our JSON through prompts, train it to speak our language natively.

- **Parallelizing the planner**  
  Split into an orchestrator + N parallel section planners. Faster, and better at complex multi-section emails.

<div class="mt-8 text-xl">

> "The Beefree AI Co-Pilot you saw today is v1. The interesting part is just starting."

</div>

---
layout: center
class: text-center
---

# Thanks for Listening!

<div class="mt-8 text-2xl">
Questions?
</div>


<!-- Write a travel inspiration email in Airbnb's style. Tone: warm, human, wanderlust-driven. Structure: full-bleed destination hero → friendly headline about belonging anywhere → two-sentence intro → three-column destination cards each with a photo, location name, and starting price → host spotlight split-screen with photo and short quote → CTA: 'Start Exploring.' Warm coral and white palette. -->

<!-- Write a premiere email for a new dark thriller series in Netflix's style. Tone: cinematic, mysterious. Structure: full-bleed key art hero with title treatment overlay → release date in red → two-line series logline → three-column episode preview strip with stills and one-line teasers → cast spotlight split-screen → CTA: 'Watch Now.' Black background, Netflix red accents only. -->

<!-- Write a feature announcement email in Spotify's style. Tone: friendly, energetic, slightly playful. Structure: colorful gradient hero with feature name large → two-sentence explanation of what's new → three-column icon triptych showing how it works step by step → animated GIF of the feature in the app → user testimonial pull quote → CTA: 'Try It Now.' Spotify green on dark background. -->

<!-- Write a launch email for a new iPhone in Apple's style. Tone: quiet confidence, zero hype. Structure: full-bleed product hero on white → five-word headline → two-sentence intro → alternating split-screen sections for three key features, each with a close-up shot and one paragraph → specs comparison table against previous model → primary CTA: 'Order Now'. Pure white background, SF Pro typography implied, single grey accent. -->