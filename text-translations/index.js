import { HfInference } from '@huggingface/inference'

// Create your Hugging Face Token: https://huggingface.co/settings/tokens
const hf = new HfInference(import.meta.env.VITE_HF_TOKEN)

// Hugging Face Inference API docs: https://huggingface.co/docs/huggingface.js/inference/README

document.getElementById('translate-btn').addEventListener('click', async () => {
  const text = document.getElementById('text-input').value
  const srcLang = document.getElementById('source-lang').value
  const tgtLang = document.getElementById('target-lang').value

  // https://huggingface.co/facebook/mbart-large-50-many-to-many-mmt#languages-covered

  const response = await hf.translation({
    model: 'facebook/mbart-large-50-many-to-many-mmt',
    inputs: text,
    parameters: {
      src_lang: srcLang,
      tgt_lang: tgtLang,
    },
  })

  document.getElementById('output').innerText = response.translation_text

  console.log('\ntranslation:\n')
  console.log(response.translation_text)
})


hf.textToImage(
  
)