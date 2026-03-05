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

# Agent vs Tools

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
<span style="color: #7747ff; font-weight: bold; font-size: 0.7rem;">beefree_add_section</span><br/>
<span style="color: #666; font-size: 0.65rem;">Creates email rows</span>
</div>

<div style="background: #f8f6ff; padding: 0.5rem; border-radius: 6px; margin-bottom: 0.5rem; border-left: 3px solid #7747ff;">
<span style="color: #7747ff; font-weight: bold; font-size: 0.7rem;">beefree_add_image</span><br/>
<span style="color: #666; font-size: 0.65rem;">Adds images</span>
</div>

<div style="background: #f8f6ff; padding: 0.5rem; border-radius: 6px; margin-bottom: 0.5rem; border-left: 3px solid #7747ff;">
<span style="color: #7747ff; font-weight: bold; font-size: 0.7rem;">beefree_add_button</span><br/>
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

<style>
.cycle-card ul {
  margin: 0;
  padding-left: 1.2rem;
}
.cycle-card li {
  margin: 0.3rem 0;
}
</style>

# Beefree AI Co-Pilot Capabilities

<div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 2rem; margin-top: 2rem; font-size: 0.9rem;">

<div class="cycle-card" style="background: linear-gradient(135deg, #f8f6ff 0%, #ffffff 100%); padding: 1.2rem; border-radius: 12px; min-height: 220px; box-shadow: 0 4px 12px rgba(119, 71, 255, 0.15); border: 1px solid #e8deff;">

<h3 style="text-align: center; color: #7747ff; margin-bottom: 0rem !important; font-size: 1.1rem;">Cycle 1</h3>
<div style="text-align: center; color: #999; font-size: 0.75rem; margin-bottom: 1rem;">Sep - Oct</div>

- **Tech stack setup**
- **Basic agent**
- **Attachments**
- **Chat engine**
- **Traceability setup**

</div>

<div class="cycle-card" style="background: linear-gradient(135deg, #f8f6ff 0%, #ffffff 100%); padding: 1.2rem; border-radius: 12px; min-height: 220px; box-shadow: 0 4px 12px rgba(119, 71, 255, 0.15); border: 1px solid #e8deff;">

<h3 style="text-align: center; color: #7747ff; margin-bottom: 0rem !important; font-size: 1.1rem;">Cycle 2</h3>
<div style="text-align: center; color: #999; font-size: 0.75rem; margin-bottom: 1rem;">Nov - Dec</div>

- **Email creation ↑**
- **User feedbacks**
- **User reports**
- **Stop requests**
- **Bug hunt**

</div>

<div class="cycle-card" style="background: linear-gradient(135deg, #f8f6ff 0%, #ffffff 100%); padding: 1.2rem; border-radius: 12px; min-height: 220px; box-shadow: 0 4px 12px rgba(119, 71, 255, 0.15); border: 1px solid #e8deff;">

<h3 style="text-align: center; color: #7747ff; margin-bottom: 0rem !important; font-size: 1.1rem;">Cycle 3</h3>
<div style="text-align: center; color: #999; font-size: 0.75rem; margin-bottom: 1rem;">Jan - Feb</div>

- **Email creation ↑↑**
- **Email editing**
- **Workspace styles**
- **Create with AI**
- **Bug hunt**

</div>

<div style="background: linear-gradient(135deg, #ffffff 0%, #f8f6ff 100%); padding: 1.2rem; border-radius: 12px; min-height: 220px; box-shadow: 0 4px 12px rgba(119, 71, 255, 0.08); border: 2px dashed #e8deff; display: flex; flex-direction: column; align-items: center; justify-content: center;">

<div style="font-size: 2.5rem; color: #7747ff; opacity: 0.4; margin-bottom: 0.5rem;">...</div>
<div style="color: #7747ff; opacity: 0.6; font-style: italic; text-align: center; font-size: 0.85rem;">More cycles<br/>to come</div>

</div>

</div>

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

1. **Consistency**: Tools get called correctly, but not consistently. <br/>Use blue in row 1, red in row 2, blue again in row 3.
2. **Prompt engineering**: Every line you add to the system prompt competes with every line already there. <br/> By adding you dellute.
4. **Evaluating correctness**: You can't unit test an agent. Knowing if it's doing a good job is non-trivial.
5. **LLMs know HTML, CSS, Python, React** and other common languages fluently. 
They've seen them millions of times. <br/>
On the other hand **LLM doesn't know Beefree custom JSON format** or our specific **MCP toolset**.


> Our email JSON format is harder to work with but it's **why our emails render correctly on many email clients**.

---

# How we solved them

**The key insight:** Separate planning from execution.

1. **Planner creates a structured plan** — Instead of letting the agent call tools directly, we ask it to generate a detailed plan in a predefined JSON format.

2. **Executor runs the plan deterministically** — Tool calls are no longer made by the agent. The executor reads the plan and programmatically calls the right tools in the right sequence.

<div class="mt-8">

> By moving tool calls out of the agent's hands, we turned an unreliable process into a predictable one.

</div>

---

<h1 style="margin-bottom: 0.5rem !important;">Before & After</h1>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const step = ref(0)
let interval = null

onMounted(() => {
  interval = setInterval(() => {
    step.value = (step.value + 1) % 4
  }, 2500)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 0rem;">

<div>
<h2 style="text-align: center; color: #ff4444; margin-bottom: 0.2rem !important; font-size: 0.95rem;">❌ Before: Direct Tool Calls</h2>

<div style="background: #fff5f5; padding: 1rem; border-radius: 12px; border: 2px solid #ffcccc;">

<div style="font-size: 0.7rem;">

<div style="background: #e8f5e9; padding: 0.5rem; border-radius: 8px; margin-bottom: 0.4rem;">
<strong>User:</strong> "Create 3-section email"
</div>

<div style="font-weight: bold; margin-bottom: 0.3rem; font-size: 0.75rem;">Agent calls:</div>
<div style="display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 0.5rem;">
<div :style="{ opacity: step >= 1 ? 1 : 0.3, transition: 'opacity 0.4s' }">
<code style="background: #f8f6ff; padding: 0.3rem 0.5rem; border-radius: 4px; font-size: 0.65rem; display: block;">add_section(color: "#0000ff")</code>
</div>
<div :style="{ opacity: step >= 2 ? 1 : 0.3, transition: 'opacity 0.4s' }">
<code style="background: #f8f6ff; padding: 0.3rem 0.5rem; border-radius: 4px; font-size: 0.65rem; display: block;">add_section(color: "#ff0000")</code>
</div>
<div :style="{ opacity: step >= 3 ? 1 : 0.3, transition: 'opacity 0.4s' }">
<code style="background: #f8f6ff; padding: 0.3rem 0.5rem; border-radius: 4px; font-size: 0.65rem; display: block;">add_section(color: "#0000ff")</code>
</div>
</div>

<div style="font-weight: bold; margin-bottom: 0.3rem; font-size: 0.75rem;">Result:</div>
<div style="display: flex; flex-direction: column; gap: 0.4rem;">
<div v-if="step >= 1" :style="{ background: '#0000ff', height: '30px', borderRadius: '6px', opacity: step >= 1 ? 1 : 0, transition: 'opacity 0.5s' }"></div>
<div v-if="step >= 2" :style="{ background: '#ff0000', height: '30px', borderRadius: '6px', opacity: step >= 2 ? 1 : 0, transition: 'opacity 0.5s' }"></div>
<div v-if="step >= 3" :style="{ background: '#0000ff', height: '30px', borderRadius: '6px', opacity: step >= 3 ? 1 : 0, transition: 'opacity 0.5s' }"></div>
</div>

<div v-if="step === 3" style="margin-top: 0.5rem; color: #ff4444; font-weight: bold; font-size: 0.75rem; text-align: center;">
⚠️ Inconsistent!
</div>

</div>

</div>
</div>

<div>
<h2 style="text-align: center; color: #22bb33; margin-bottom: 0.2rem !important; font-size: 0.95rem;">✅ After: Plan → Execute</h2>

<div style="background: #f0fff4; padding: 1rem; border-radius: 12px; border: 2px solid #bbf7d0;">

<div style="font-size: 0.7rem;">

<div style="background: #e8f5e9; padding: 0.5rem; border-radius: 8px; margin-bottom: 0.4rem;">
<strong>User:</strong> "Create 3-section email"
</div>

<div :style="{ opacity: step >= 1 ? 1 : 0.3, transition: 'opacity 0.4s', marginBottom: '0.5rem' }">
<div style="font-weight: bold; margin-bottom: 0.2rem; font-size: 0.7rem;">1. Planner generates JSON:</div>
<pre style="background: #f8f6ff; padding: 0.5rem; border-radius: 6px; font-size: 0.6rem; margin: 0; overflow: hidden; line-height: 1.3;">{ 
  "palette": { "primary": "#0000ff" },
  "sections": [
    { "color": "primary" },
    { "color": "primary" },
    { "color": "primary" }
  ]
}</pre>
</div>

<div v-if="step >= 2" style="font-weight: bold; margin-bottom: 0.3rem; font-size: 0.75rem;">2. Executor runs it → Result:</div>

<div v-if="step >= 2" style="display: flex; flex-direction: column; gap: 0.4rem;">
<div :style="{ background: '#0000ff', height: '30px', borderRadius: '6px', opacity: step >= 2 ? 1 : 0, transition: 'opacity 0.5s' }"></div>
<div :style="{ background: '#0000ff', height: '30px', borderRadius: '6px', opacity: step >= 3 ? 1 : 0, transition: 'opacity 0.5s' }"></div>
<div v-if="step === 3" :style="{ background: '#0000ff', height: '30px', borderRadius: '6px', opacity: 1, transition: 'opacity 0.5s' }"></div>
</div>

<div v-if="step === 3" style="margin-top: 0.5rem; color: #22bb33; font-weight: bold; font-size: 0.75rem; text-align: center;">
✓ Consistent by design!
</div>

</div>

</div>
</div>

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
   A tight output schema changes everything.

2. **Less AI is sometimes the right call.**  
   The executor story. Deterministic beats autonomous when you need reliability.

3. **Prompt engineering is never done — and addition is the enemy.**  
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