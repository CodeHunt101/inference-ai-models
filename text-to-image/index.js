import { HfInference } from '@huggingface/inference'

const MODEL = 'black-forest-labs/FLUX.1-dev'

const inference = new HfInference(import.meta.env.VITE_HF_TOKEN)

const promptInput = document.getElementById('promptInput')
const resolutionSelect = document.getElementById('resolutionSelect')
const generateBtn = document.getElementById('generateBtn')
const loadingDiv = document.getElementById('loading')
const errorDiv = document.getElementById('error')
const generatedImage = document.getElementById('generatedImage')


function getResolutionDimensions(resolutionString) {
  const [width, height] = resolutionString.split('x').map(Number)
  return { width, height }
}

async function generateImage(prompt) {
  const { width, height } = getResolutionDimensions(resolutionSelect.value)

  const response = await inference.textToImage({
    model: MODEL,
    inputs: prompt,
    parameters: {
      guidance_scale: 7.5,
      num_inference_steps: 34,
      width,
      height,
    },
  })

  return URL.createObjectURL(response)
}

generateBtn.addEventListener('click', async () => {
  const prompt = promptInput.value.trim()

  if (!prompt) {
    errorDiv.textContent = 'Please enter a description'
    errorDiv.style.display = 'block'
    return
  }

  // Reset UI
  errorDiv.style.display = 'none'
  generatedImage.style.display = 'none'
  loadingDiv.style.display = 'block'
  generateBtn.disabled = true

  try {
    const imageUrl = await generateImage(prompt)
    generatedImage.src = imageUrl
    generatedImage.style.display = 'block'
  } catch (error) {
    console.error('Generation error:', error)
    errorDiv.textContent =
      'Error generating image. Please check your API token and try again.'
    errorDiv.style.display = 'block'
  } finally {
    loadingDiv.style.display = 'none'
    generateBtn.disabled = false
  }
})

// Update image aspect ratio when resolution changes
resolutionSelect.addEventListener('change', () => {
  const { width, height } = getResolutionDimensions(resolutionSelect.value)
  generatedImage.style.aspectRatio = `${width} / ${height}`
})

// Allow generating image with Ctrl+Enter
promptInput.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'Enter' && !generateBtn.disabled) {
    generateBtn.click()
  }
})

