"use client";

export type Segment = {
  text: string;
  pauseAfterMs?: number;
  rate?: number;
  pitch?: number;
};

export type AudioState = "idle" | "playing" | "paused" | "ended";

type AudioListener = (state: {
  state: AudioState;
  index: number;
  total: number;
}) => void;

export class AudioQueue {
  private segments: Segment[] = [];
  private idx = 0;
  private state: AudioState = "idle";
  private listeners = new Set<AudioListener>();
  private pauseTimer: number | null = null;
  private currentUtter: SpeechSynthesisUtterance | null = null;

  load(segments: Segment[]) {
    this.stop();
    this.segments = segments;
    this.idx = 0;
    this.notify();
  }

  play() {
    if (typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) {
      console.error("Speech synthesis não disponível");
      return;
    }
    if (this.state === "paused") {
      window.speechSynthesis.resume();
      this.state = "playing";
      this.notify();
      return;
    }
    this.state = "playing";
    this.notify();
    this.runSegment();
  }

  pause() {
    if (typeof window === "undefined") return;
    if (this.pauseTimer !== null) {
      window.clearTimeout(this.pauseTimer);
      this.pauseTimer = null;
    }
    window.speechSynthesis.pause();
    this.state = "paused";
    this.notify();
  }

  stop() {
    if (typeof window === "undefined") return;
    if (this.pauseTimer !== null) {
      window.clearTimeout(this.pauseTimer);
      this.pauseTimer = null;
    }
    window.speechSynthesis.cancel();
    this.currentUtter = null;
    this.idx = 0;
    this.state = "idle";
    this.notify();
  }

  skipNext() {
    if (typeof window === "undefined") return;
    if (this.pauseTimer !== null) {
      window.clearTimeout(this.pauseTimer);
      this.pauseTimer = null;
    }
    window.speechSynthesis.cancel();
    this.idx += 1;
    if (this.idx >= this.segments.length) {
      this.state = "ended";
      this.notify();
      return;
    }
    if (this.state === "playing") {
      this.runSegment();
    } else {
      this.notify();
    }
  }

  goTo(index: number) {
    if (typeof window === "undefined") return;
    if (index < 0 || index >= this.segments.length) return;
    if (this.pauseTimer !== null) {
      window.clearTimeout(this.pauseTimer);
      this.pauseTimer = null;
    }
    window.speechSynthesis.cancel();
    this.idx = index;
    if (this.state === "playing") this.runSegment();
    else this.notify();
  }

  subscribe(fn: AudioListener) {
    this.listeners.add(fn);
    fn({ state: this.state, index: this.idx, total: this.segments.length });
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    for (const fn of this.listeners) {
      fn({ state: this.state, index: this.idx, total: this.segments.length });
    }
  }

  private runSegment() {
    if (typeof window === "undefined") return;
    if (this.idx >= this.segments.length) {
      this.state = "ended";
      this.notify();
      return;
    }
    const seg = this.segments[this.idx];
    const u = new SpeechSynthesisUtterance(seg.text);
    u.lang = "pt-PT";
    u.rate = seg.rate ?? 0.95;
    u.pitch = seg.pitch ?? 1;
    u.onend = () => {
      if (this.state !== "playing") return;
      const pause = seg.pauseAfterMs ?? 600;
      this.pauseTimer = window.setTimeout(() => {
        this.pauseTimer = null;
        this.idx += 1;
        if (this.idx >= this.segments.length) {
          this.state = "ended";
          this.notify();
        } else {
          this.notify();
          this.runSegment();
        }
      }, pause);
    };
    u.onerror = () => {
      this.state = "idle";
      this.notify();
    };
    this.currentUtter = u;
    window.speechSynthesis.speak(u);
    this.notify();
  }
}
