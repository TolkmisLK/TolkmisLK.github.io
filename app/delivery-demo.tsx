"use client";

import { useEffect, useId, useState } from "react";
import { useMotionEnvironment } from "./studio-effects";

type Phase = "idle" | "sending" | "waiting" | "retrying" | "delivered";
const copy = {
  en: {
    eyebrow: "An interactive example",
    title: "Send a message. See how retries work.",
    note: "Illustrated simulation · stays in your browser",
    description: "An endpoint can have a bad moment. Try sending a message, then let the first attempt fail.",
    fail: "Let the first attempt fail",
    send: "Send a message", again: "Send another", busy: "Delivering…",
    sender: "Your app", queue: "Delivery queue", receiver: "Receiver",
    idle: "One event, ready to go.", sending: "Attempt 1 · sending the event…",
    waiting: "503 · the receiver is unavailable. Waiting to retry…",
    retrying: "Attempt 2 · sending the same event again…",
    success: "204 · delivered on the first attempt.", recovered: "204 · delivered on attempt 2. The same event, safely received.",
    footnote: "This simplified sequence illustrates retries, not the project's exact timings. At-least-once delivery means receivers must handle duplicate events.",
    message: "A hello from NCC",
  },
  zh: {
    eyebrow: "一个互动小示例",
    title: "送一封信，看看它怎么到达。",
    note: "原理模拟 · 仅在浏览器内运行",
    description: "接收接口也会偶尔忙不过来。试着发送一条消息，再让第一次投递遇到一点小意外。",
    fail: "让第一次投递失败",
    send: "寄出一封信", again: "再寄一封", busy: "正在投递…",
    sender: "你的应用", queue: "投递队列", receiver: "接收接口",
    idle: "一条事件，准备出发。", sending: "第 1 次尝试 · 正在发送事件…",
    waiting: "503 · 接收接口暂时不可用，稍后重试…",
    retrying: "第 2 次尝试 · 再次发送同一条事件…",
    success: "204 · 第一次投递就送达了。", recovered: "204 · 第 2 次尝试送达，仍然是同一条事件。",
    footnote: "这是简化的重试过程，时间间隔不代表项目的实际配置。至少一次投递意味着接收方需要处理重复事件。",
    message: "来自 NCC 的一声问候",
  },
} as const;

export function DeliveryDemo({ locale, motionEnabled }: { locale: "en" | "zh"; motionEnabled: boolean }) {
  const text = copy[locale];
  const titleId = useId();
  const [failFirst, setFailFirst] = useState(false);
  const [runFailed, setRunFailed] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const { visible } = useMotionEnvironment();
  const busy = phase !== "idle" && phase !== "delivered";

  useEffect(() => {
    if (!busy || !visible) return;
    const timer = window.setTimeout(() => {
      setPhase((current) => {
        if (current === "sending") return runFailed ? "waiting" : "delivered";
        if (current === "waiting") return "retrying";
        if (current === "retrying") return "delivered";
        return current;
      });
    }, phase === "waiting" ? 1400 : 1000);
    return () => window.clearTimeout(timer);
  }, [phase, busy, runFailed, visible]);

  function send() {
    if (busy) return;
    setRunFailed(failFirst);
    setPhase("sending");
  }

  const status = phase === "delivered" ? (runFailed ? text.recovered : text.success) : text[phase];
  return (
    <section className="delivery-demo" data-phase={phase} data-animate={motionEnabled ? "true" : "false"} aria-labelledby={titleId}>
      <div className="delivery-intro">
        <p className="work-kicker">{text.eyebrow}</p>
        <h4 id={titleId}>{text.title}</h4>
        <p>{text.description}</p>
        <span className="delivery-disclaimer">{text.note}</span>
      </div>
      <div className="delivery-playground">
        <div className="delivery-route" aria-hidden="true">
          <span>{text.sender}</span><i /><span>{text.queue}</span><i /><span>{text.receiver}</span>
        </div>
        <div className="delivery-track" aria-hidden="true">
          <div className="delivery-letter">
            <span className="letter-stamp">NCC</span>
            <span className="letter-heading">hello.json</span>
            <span>{text.message}</span>
            <span className="letter-id">event_001</span>
          </div>
          <span className="delivery-receipt">{phase === "waiting" ? "503" : phase === "delivered" ? "204 ✓" : "POST"}</span>
        </div>
        <p className="delivery-status" role="status" aria-live="polite" aria-atomic="true">{status}</p>
        <div className="delivery-controls">
          <label><input type="checkbox" checked={failFirst} disabled={busy} onChange={(event) => setFailFirst(event.target.checked)} />{text.fail}</label>
          <button type="button" className="primary-link" disabled={busy} onClick={send}>{busy ? text.busy : phase === "delivered" ? text.again : text.send}<span aria-hidden="true"> ↗</span></button>
        </div>
        <p className="delivery-footnote">{text.footnote}</p>
      </div>
    </section>
  );
}
