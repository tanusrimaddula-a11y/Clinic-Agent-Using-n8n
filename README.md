# 🏥 Lotus Medicals — AI Clinic Receptionist

> An AI-powered clinic receptionist that can answer clinic questions, help patients find suitable doctors, check real-time availability, and automate appointment booking through an n8n-powered agent workflow.

---

## ✨ Overview

**Lotus Medicals AI Clinic Receptionist** is an AI-first healthcare assistant designed to automate the first layer of patient interaction.

Instead of forcing patients to search through clinic information or wait for a receptionist, the system provides a conversational interface where patients can simply type what they need.

For example:

> "I need an appointment."

> "What are your clinic timings?"

> "I need a dermatologist."

> "Which doctors are available?"

> "Book me an appointment with Dr. ___."

The AI understands the request and routes it to the appropriate workflow automatically.

---

# 🧠 What Makes This Project Different?

This project is not just a chatbot UI.

It combines:

**AI conversation + intelligent routing + clinic knowledge retrieval + doctor search + availability checking + appointment automation**

into one workflow.

### Patient
↓  
### Lotus Medicals AI Receptionist
↓  
### Intent Detection
↓  
┌───────────────────────┬────────────────────────┐
│                       │                        │
▼                       ▼                        │
FAQ Agent          Appointment Agent            │
│                       │                        │
▼                       ├── Doctor List          │
Pinecone Knowledge      ├── Doctor Availability  │
                       └── Save Appointment      │
                                │                │
                                ▼                │
                         Google Sheets           │
                                                 │
                         Patient Response ◄──────┘

---

# 🚀 Core Features

### 🤖 AI Receptionist

The main AI agent acts as the clinic's conversational receptionist.

It understands the patient's request and routes it to the appropriate specialist workflow.

---

### 💬 Clinic FAQ Assistant

Patients can ask questions such as:

- Clinic timings
- Clinic location
- Available departments
- General clinic policies
- Contact-related questions

The FAQ system uses a **Retrieval-Augmented Generation (RAG)** architecture so clinic information can be retrieved from the knowledge base instead of relying entirely on the language model.

---

### 🧠 AI Knowledge Retrieval

Clinic information is processed into embeddings and stored inside **Pinecone**.

The flow is:

```text
Clinic PDF
    ↓
Document Loader
    ↓
Gemini Embeddings
    ↓
Pinecone Vector Database
    ↓
FAQ Agent
    ↓
Patient Answer
