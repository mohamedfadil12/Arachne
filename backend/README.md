# Multimodal AI Hackathon 2026 - Track C

This repository contains the Track C project for the Multimodal AI Hackathon 2026. The goal is to provide causal explainability and temporal grounding for evaluating public speaking performances, specifically looking at dimensions like pace, pause, and energy.

## Folder Map
- `app/`: FastAPI backend server for the Dashboard
- `config/`: Pipeline configuration files
- `data/`: Processed audio files and dataset contents
- `dataset/`: Dataset management and annotation tools
- `docs/`: Technical documentation and schema descriptions
- `eval/`: Evaluation scripts and outputs
- `Instructions/`: Hackathon instructions and process files
- `schemas/`: Machine-readable Pydantic schemas (`models.py`)
- `src/audio/`: Feature extraction and alignment pipeline
- `src/scoring/`: Rubric implementation and scoring logic
- `submission/`: Devpost checklist and final video materials

## Requirements and Prerequisites
- Python 3.10+
- See `requirements.txt` for Python dependencies.

## Setup
1. Clone this repository.
2. Install dependencies: `pip install -r requirements.txt`

## Run Command
Start the FastAPI backend server:
```bash
uvicorn app.main:app --reload
```
The API documentation will be available at `http://localhost:8000/docs`.

## How to run the evaluation
(TBD - Integration in Phase 3)

## Dataset Access
(TBD - Drive link or repository location will be added here)

## AI Coding Tools Used
AI coding assistants were used in the development of this project:
- Repository skeleton and initial API schemas were generated with AI assistance.

## Limitations
This system focuses on temporal dimensions (pace, pauses, energy) and does not evaluate semantic content, emotion, or intent. Comparisons are made strictly against one reference baseline per dataset speech.

## License
TBD
