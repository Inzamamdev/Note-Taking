export const startRecording = async (
  setIsRecording,
  setTranscribedText,
  setSpeechError
) => {
  if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
    alert("Speech recognition is not supported in this browser.");
    return;
  }

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = false; // Stop automatically when speech ends
  recognition.interimResults = false; // Get only final results
  recognition.lang = "en-US";

  let maxDurationTimeout;
  recognition.onstart = () => {
    setTranscribedText("");
    setIsRecording(true);
    setSpeechError(false);

    maxDurationTimeout = setTimeout(() => {
      recognition.stop();
      setSpeechError("Recording timed out after 1 minute");
    }, 60000);
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setTranscribedText(transcript);
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    setSpeechError(event.error);
    setIsRecording(false);
  };

  recognition.onend = () => {
    clearTimeout(maxDurationTimeout);
    setIsRecording(false);
  };

  recognition.start();
};

export const stopRecording = (setIsRecording) => {
  setIsRecording(false);
};
