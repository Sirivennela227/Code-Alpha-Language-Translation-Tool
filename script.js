/**
 * CodeAlpha AI Internship - Task 1: Language Translation Tool
 * Author: CodeAlpha Intern
 * Description: Client-side JavaScript handling translation APIs, language swapping,
 *              speech synthesis, debounced input, and UI interaction.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element References ---
    const sourceLangSelect = document.getElementById('sourceLanguageSelect');
    const targetLangSelect = document.getElementById('targetLanguageSelect');
    const sourceText = document.getElementById('sourceText');
    const targetText = document.getElementById('targetText');
    const sourceCharCount = document.getElementById('sourceCharCount');
    const translateBtn = document.getElementById('translateBtn');
    const resetAllBtn = document.getElementById('resetAllBtn');
    const swapLangBtn = document.getElementById('swapLangBtn');
    const clearTextBtn = document.getElementById('clearTextBtn');
    const pasteBtn = document.getElementById('pasteBtn');
    const copyTargetBtn = document.getElementById('copyTargetBtn');
    const listenSourceBtn = document.getElementById('listenSourceBtn');
    const listenTargetBtn = document.getElementById('listenTargetBtn');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const detectedLangTag = document.getElementById('detectedLangTag');
    const detectedLangName = document.getElementById('detectedLangName');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = document.getElementById('toastIcon');
    const sampleButtons = document.querySelectorAll('.sample-btn');

    // Language Code to Display Name Mapping
    const languageNames = {
        'auto': 'Auto Detect',
        'en': 'English',
        'te': 'Telugu',
        'hi': 'Hindi',
        'ta': 'Tamil',
        'kn': 'Kannada',
        'ml': 'Malayalam',
        'bn': 'Bengali',
        'mr': 'Marathi',
        'gu': 'Gujarati',
        'es': 'Spanish',
        'fr': 'French',
        'de': 'German',
        'ja': 'Japanese',
        'ko': 'Korean',
        'zh': 'Chinese',
        'ar': 'Arabic'
    };

    let debounceTimer = null;

    // --- Core Translation Function (With Resilient API Fallbacks) ---
    async function performTranslation() {
        const text = sourceText.value.trim();
        const sourceLang = sourceLangSelect.value;
        const targetLang = targetLangSelect.value;

        if (!text) {
            targetText.value = '';
            detectedLangTag.classList.add('hidden');
            return;
        }

        // Show Loading Overlay
        showLoading(true);

        try {
            // Attempt Provider 1: MyMemory API
            let translatedText = await fetchFromMyMemory(text, sourceLang, targetLang);

            // If Primary Provider succeeded
            if (translatedText) {
                targetText.value = translatedText;
            } else {
                // Attempt Provider 2: Google GTX Endpoint Fallback
                translatedText = await fetchFromGoogleGTX(text, sourceLang, targetLang);
                if (translatedText) {
                    targetText.value = translatedText;
                } else {
                    throw new Error('All translation providers failed. Please check network connection.');
                }
            }
        } catch (error) {
            console.error('Translation Error:', error);
            showToast(error.message || 'Translation failed. Please try again.', true);
        } finally {
            showLoading(false);
        }
    }

    // Provider 1: MyMemory API
    async function fetchFromMyMemory(text, source, target) {
        try {
            const langpair = `${source === 'auto' ? 'autodetect' : source}|${target}`;
            const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langpair}`;

            const response = await fetch(url);
            if (!response.ok) return null;

            const data = await response.json();
            
            if (data && data.responseData && data.responseData.translatedText) {
                // If auto-detected, show detected language
                if (data.matches && data.matches.length > 0 && source === 'auto') {
                    const detected = data.matches[0].srclang;
                    if (detected && languageNames[detected.toLowerCase()]) {
                        detectedLangName.textContent = languageNames[detected.toLowerCase()];
                        detectedLangTag.classList.remove('hidden');
                    }
                }
                return data.responseData.translatedText;
            }
            return null;
        } catch (e) {
            console.warn('MyMemory API failed, falling back...', e);
            return null;
        }
    }

    // Provider 2: Google Translate GTX Endpoint
    async function fetchFromGoogleGTX(text, source, target) {
        try {
            const sl = source === 'auto' ? 'auto' : source;
            const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${target}&dt=t&q=${encodeURIComponent(text)}`;

            const response = await fetch(url);
            if (!response.ok) return null;

            const data = await response.json();
            if (data && data[0]) {
                const translatedParts = data[0].map(item => item[0]).filter(Boolean);
                
                // Check detected source language
                if (data[2] && source === 'auto') {
                    const detected = data[2];
                    if (languageNames[detected]) {
                        detectedLangName.textContent = languageNames[detected];
                        detectedLangTag.classList.remove('hidden');
                    }
                }
                return translatedParts.join('');
            }
            return null;
        } catch (e) {
            console.warn('Google GTX API failed...', e);
            return null;
        }
    }

    // --- Helper Functions ---
    function showLoading(isLoading) {
        if (isLoading) {
            loadingOverlay.classList.remove('hidden');
        } else {
            loadingOverlay.classList.add('hidden');
        }
    }

    function showToast(message, isError = false) {
        toastMessage.textContent = message;
        if (isError) {
            toast.classList.add('error');
            toastIcon.className = 'fa-solid fa-circle-exclamation';
        } else {
            toast.classList.remove('error');
            toastIcon.className = 'fa-solid fa-circle-check';
        }
        
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3500);
    }

    function updateCharacterCount() {
        const length = sourceText.value.length;
        sourceCharCount.textContent = length;

        if (length > 0) {
            clearTextBtn.classList.remove('hidden');
        } else {
            clearTextBtn.classList.add('hidden');
        }
    }

    // --- Event Listeners ---

    // Live typing with debounce
    sourceText.addEventListener('input', () => {
        updateCharacterCount();
        clearTimeout(debounceTimer);
        
        if (sourceText.value.trim() === '') {
            targetText.value = '';
            detectedLangTag.classList.add('hidden');
            return;
        }

        debounceTimer = setTimeout(() => {
            performTranslation();
        }, 600);
    });

    // Translate Button Click
    translateBtn.addEventListener('click', () => {
        if (!sourceText.value.trim()) {
            showToast('Please enter text to translate.', true);
            sourceText.focus();
            return;
        }
        performTranslation();
    });

    // Swap Languages
    swapLangBtn.addEventListener('click', () => {
        const currentSource = sourceLangSelect.value;
        const currentTarget = targetLangSelect.value;

        if (currentSource === 'auto') {
            showToast('Cannot swap when Source is set to "Detect Language". Select a specific language first.', true);
            return;
        }

        // Swap dropdown selections
        sourceLangSelect.value = currentTarget;
        targetLangSelect.value = currentSource;

        // Swap text contents
        const tempText = sourceText.value;
        sourceText.value = targetText.value;
        targetText.value = tempText;

        updateCharacterCount();
        if (sourceText.value.trim()) {
            performTranslation();
        }
    });

    // Language Dropdown Changes
    sourceLanguageSelect.addEventListener('change', () => {
        if (sourceLanguageSelect.value !== 'auto') {
            detectedLangTag.classList.add('hidden');
        }
        if (sourceText.value.trim()) {
            performTranslation();
        }
    });

    targetLanguageSelect.addEventListener('change', () => {
        if (sourceText.value.trim()) {
            performTranslation();
        }
    });

    // Clear Button
    clearTextBtn.addEventListener('click', () => {
        sourceText.value = '';
        targetText.value = '';
        updateCharacterCount();
        detectedLangTag.classList.add('hidden');
        sourceText.focus();
    });

    // Reset All Button
    resetAllBtn.addEventListener('click', () => {
        sourceText.value = '';
        targetText.value = '';
        sourceLangSelect.value = 'auto';
        targetLangSelect.value = 'te';
        updateCharacterCount();
        detectedLangTag.classList.add('hidden');
        showToast('All fields reset.');
    });

    // Paste from Clipboard
    pasteBtn.addEventListener('click', async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (text) {
                sourceText.value = text;
                updateCharacterCount();
                performTranslation();
                showToast('Pasted from clipboard!');
            }
        } catch (err) {
            showToast('Clipboard permission denied or unavailable.', true);
        }
    });

    // Copy Translation
    copyTargetBtn.addEventListener('click', () => {
        if (!targetText.value.trim()) {
            showToast('Nothing to copy yet!', true);
            return;
        }

        navigator.clipboard.writeText(targetText.value).then(() => {
            showToast('Translation copied to clipboard!');
        }).catch(() => {
            showToast('Failed to copy text.', true);
        });
    });

    // Text To Speech (Audio Listener)
    function speakText(text, langCode) {
        if (!text.trim()) {
            showToast('No text available to read aloud.', true);
            return;
        }

        if (!('speechSynthesis' in window)) {
            showToast('Text-to-speech is not supported in your browser.', true);
            return;
        }

        window.speechSynthesis.cancel(); // Stop any ongoing speech
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Map language code to speech synthesis locale if available
        if (langCode && langCode !== 'auto') {
            utterance.lang = langCode;
        }

        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
        showToast(`Playing audio (${langCode || 'default'})...`);
    }

    listenSourceBtn.addEventListener('click', () => {
        speakText(sourceText.value, sourceLangSelect.value);
    });

    listenTargetBtn.addEventListener('click', () => {
        speakText(targetText.value, targetLangSelect.value);
    });

    // Quick Samples Click Handlers
    sampleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sampleText = button.getAttribute('data-sample');
            sourceText.value = sampleText;
            updateCharacterCount();
            performTranslation();
        });
    });

    // Initial character count update
    updateCharacterCount();
});
