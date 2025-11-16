import { InferenceClient } from '@huggingface/inference';

const MODEL = 'tencent/HunyuanImage-3.0'

const inference = new InferenceClient(import.meta.env.VITE_HF_TOKEN)

const promptInput = document.getElementById('promptInput')
const resolutionSelect = document.getElementById('resolutionSelect')
const generateBtn = document.getElementById('generateBtn')
const loadingDiv = document.getElementById('loading')
const errorDiv = document.getElementById('error')
const generatedImage = document.getElementById('generatedImage')

let timerInterval
let startTime
const timerElement = document.getElementById('timer')
const placeholderElement = document.getElementById('placeholder')

function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000)
  const minutes = Math.floor(elapsed / 60)
  const seconds = elapsed % 60
  timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`
}

function startTimer() {
  startTime = Date.now()
  timerElement.style.display = 'block'
  timerInterval = setInterval(updateTimer, 1000)
}

function stopTimer() {
  clearInterval(timerInterval)
  timerElement.style.display = 'none'
}

function updatePlaceholderDimensions() {
  const { width, height } = getResolutionDimensions(resolutionSelect.value)
  placeholderElement.style.aspectRatio = `${width} / ${height}`
}

function getResolutionDimensions(resolutionString) {
  const [width, height] = resolutionString.split('x').map(Number)
  return { width, height }
}

async function generateImage(prompt) {
  const { width, height } = getResolutionDimensions(resolutionSelect.value)

  const response = await inference.textToImage({
    provider: "fal-ai",
    model: MODEL,
    inputs: prompt,
    parameters: {
      // guidance_scale: 7.5,
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

  // Show placeholder and start timer
  placeholderElement.style.display = 'block'
  startTimer()
  updatePlaceholderDimensions()

  try {
    const imageUrl = await generateImage(prompt)
    generatedImage.src = imageUrl
    generatedImage.style.display = 'block'
  } catch (error) {
    console.error('Generation error:', error)
    errorDiv.textContent = 'Error generating image. Please try again.'
    errorDiv.style.display = 'block'
  } finally {
    loadingDiv.style.display = 'none'
    generateBtn.disabled = false
    placeholderElement.style.display = 'none'
    stopTimer()
  }
})

// Update image aspect ratio when resolution changes
resolutionSelect.addEventListener('change', () => {
  const { width, height } = getResolutionDimensions(resolutionSelect.value)
  generatedImage.style.aspectRatio = `${width} / ${height}`
  updatePlaceholderDimensions()
})

// Allow generating image with Ctrl+Enter
promptInput.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'Enter' && !generateBtn.disabled) {
    generateBtn.click()
  }
})

updatePlaceholderDimensions()
