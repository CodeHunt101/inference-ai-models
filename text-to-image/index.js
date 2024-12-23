import { HfInference } from '@huggingface/inference';

        const MODEL = "black-forest-labs/FLUX.1-dev";  // Using the FLUX model as specified

        const inference = new HfInference(import.meta.env.VITE_HF_TOKEN)

        const promptInput = document.getElementById('promptInput');
        const negativePrompt = document.getElementById('negativePrompt');
        const generateBtn = document.getElementById('generateBtn');
        const loadingDiv = document.getElementById('loading');
        const errorDiv = document.getElementById('error');
        const generatedImage = document.getElementById('generatedImage');

        async function generateImage(prompt, negative) {
            const response = await inference.textToImage({
                model: MODEL,
                inputs: prompt,
                parameters: {
                    negative_prompt: negative || undefined,
                    guidance_scale: 7.5,
                    num_inference_steps: 50,
                    width: 1024,
                    height: 1024
                },
            });

            return URL.createObjectURL(response);
        }

        generateBtn.addEventListener('click', async () => {
            const prompt = promptInput.value.trim();
            const negative = negativePrompt.value.trim();
            
            if (!prompt) {
                errorDiv.textContent = 'Please enter a description';
                errorDiv.style.display = 'block';
                return;
            }

            // Reset UI
            errorDiv.style.display = 'none';
            generatedImage.style.display = 'none';
            loadingDiv.style.display = 'block';
            generateBtn.disabled = true;

            try {
                const imageUrl = await generateImage(prompt, negative);
                generatedImage.src = imageUrl;
                generatedImage.style.display = 'block';
            } catch (error) {
                console.error('Generation error:', error);
                errorDiv.textContent = 'Error generating image. Please check your API token and try again.';
                errorDiv.style.display = 'block';
            } finally {
                loadingDiv.style.display = 'none';
                generateBtn.disabled = false;
            }
        });

        // Allow generating image with Ctrl+Enter
        promptInput.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter' && !generateBtn.disabled) {
                generateBtn.click();
            }
        });

        negativePrompt.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter' && !generateBtn.disabled) {
                generateBtn.click();
            }
        });