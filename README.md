# Hugging Face Inference Examples

This repository contains multiple examples of using the Hugging Face Inference API to interact with various open-source AI models. Each example demonstrates a different capability of the API, from text generation to image creation.

## Project Structure

```
huggingface-inference/
├── text-classification/     # Sentiment/emotion analysis
├── text-generation/         # Text completion and generation
├── text-to-image/           # Converting text prompts to images
├── text-to-speech/          # Converting text to audio
└── text-translations/       # Language translation
```

## Getting Started

### Prerequisites
- Node.js installed on your system
- A Hugging Face API token (get one at https://huggingface.co/settings/tokens)

### Installation

1. Clone the repository
2. Navigate to any example directory
3. Install dependencies:
```bash
npm install
```
4. Create a `.env` file in the project directory and add your Hugging Face token:
```
VITE_HF_TOKEN=your_token_here
```

### Running the Examples

Each example can be run using:
```bash
npm start
```

This will start a Vite development server and open the example in your browser.

## Examples Overview

### 1. Text Classification
- Uses the `SamLowe/roberta-base-go_emotions` model
- Analyzes text for emotional content
- Returns emotional classification and confidence scores

### 2. Text Generation
- Uses the `HuggingFaceH4/zephyr-7b-beta` model
- Generates text completions based on prompts
- Suitable for creative writing, definitions, and explanations

### 3. Text-to-Image
- Uses the `black-forest-labs/FLUX.1-dev` model
- Converts text descriptions into images
- Features:
  - Customizable image dimensions
  - Negative prompting support
  - Guidance scale and inference step controls

### 4. Text-to-Speech
- Uses the `espnet/kan-bayashi_ljspeech_vits` model
- Converts text into natural-sounding speech
- Returns audio in a playable format

### 5. Text Translation
- Uses the `facebook/mbart-large-50-many-to-many-mmt` model
- Supports multiple language pairs
- Features a user-friendly interface for language selection

## Technical Details

### Key Dependencies
```json
{
  "@huggingface/inference": "2.6.1",
  "vite": "latest"
}
```

### Environment Configuration
All examples use Vite for development and build processes. Environment variables are handled through `.env` files with the following format:
```
VITE_HF_TOKEN=your_huggingface_token
```

## Common Usage Patterns

### Basic Inference Call Structure
```javascript
import { HfInference } from '@huggingface/inference'

const hf = new HfInference(import.meta.env.VITE_HF_TOKEN)

const response = await hf.taskName({
    model: "model-name",
    inputs: inputData,
    parameters: {
        // Optional parameters specific to the task
    }
})
```

## Important Notes

- Each model has different input requirements and output formats
- Rate limits may apply depending on your Hugging Face account type
- Some models may have specific usage restrictions or licenses
