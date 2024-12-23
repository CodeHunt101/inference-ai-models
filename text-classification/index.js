import { HfInference } from '@huggingface/inference'

// Create your Hugging Face Token: https://huggingface.co/settings/tokens
const hf = new HfInference(import.meta.env.VITE_HF_TOKEN)

// Hugging Face Inference API docs: https://huggingface.co/docs/huggingface.js/inference/README

const textToClassify = "I just bought a new camera. It's been a real disappointment."

const response = await hf.textClassification({
    model: "SamLowe/roberta-base-go_emotions",
    inputs: textToClassify
})

console.log(response[0].label)
console.log(response)

