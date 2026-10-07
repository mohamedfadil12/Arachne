# Features & Alignment Decision

## Alignment Method
- **Method**: WhisperX forced alignment.
- **Why**: High accuracy and phoneme-level timing.
- **Process against supplied transcript**: WhisperX will be provided the *known transcript* rather than running open-ended ASR. It will map the acoustic features directly to the text provided.
- **Fallback**: Edit-distance matching between the forced alignment output and the supplied transcript. If the alignment fails significantly (>20% unaligned), it triggers a fallback that sets `fallback_used: true` and flags the output with `low_confidence`.

## Hardware Strategy
- Supports GPU (CUDA) for fast batch processing.
- Supports CPU gracefully via PyTorch device fallbacks, though at slower transcription speeds (expect ~1.5x real-time on CPU).
