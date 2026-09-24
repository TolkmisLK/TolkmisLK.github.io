"use client";

import { useEffect, useId, useState, type FormEvent, type ReactNode } from "react";
import { useMotionEnvironment } from "./studio-effects";

type Locale = "en" | "zh";
type DemoProps = { locale: Locale; motionEnabled: boolean };

function DemoFrame({ title, hint, motionEnabled, children }: { title: string; hint: string; motionEnabled: boolean; children: ReactNode }) {
  const titleId = useId();
  return (
    <section className="project-demo" data-animate={motionEnabled ? "true" : "false"} aria-labelledby={titleId}>
      <div className="project-demo-heading"><p className="work-kicker">{hint}</p><h4 id={titleId}>{title}</h4></div>
      <div className="project-demo-stage">{children}</div>
    </section>
  );
}

const adbCopy = {
  en: { hint: "Try it", title: "From connection to capture", device: "Sample device", offline: "Waiting for a connection", connecting: "Connecting…", connected: "Device ready. Take a capture.", capturing: "Capturing screen…", captured: "Capture ready", connect: "Connect", capture: "Take screenshot", again: "Capture again", preview: "Screen capture preview" },
  zh: { hint: "试一试", title: "连接设备，再截一张图", device: "示例设备", offline: "等待连接", connecting: "连接中…", connected: "设备已就绪，可以截图。", capturing: "正在截图…", captured: "截图已就绪", connect: "连接设备", capture: "截取屏幕", again: "重新截图", preview: "屏幕截图预览" },
} as const;

type AdbPhase = "idle" | "connecting" | "connected" | "capturing" | "captured";
export function AdbDemo({ locale, motionEnabled }: DemoProps) {
  const text = adbCopy[locale];
  const { visible } = useMotionEnvironment();
  const [phase, setPhase] = useState<AdbPhase>("idle");
  useEffect(() => {
    if (!visible || (phase !== "connecting" && phase !== "capturing")) return;
    const timer = window.setTimeout(() => setPhase(phase === "connecting" ? "connected" : "captured"), 700);
    return () => window.clearTimeout(timer);
  }, [phase, visible]);
  const connected = phase === "connected" || phase === "capturing" || phase === "captured";
  const status = { idle: text.offline, connecting: text.connecting, connected: text.connected, capturing: text.capturing, captured: text.captured }[phase];
  return <DemoFrame title={text.title} hint={text.hint} motionEnabled={motionEnabled}>
    <div className="adb-layout">
      <div className="adb-device" data-awake={connected} aria-hidden="true"><span className="adb-device-top" /><span className="adb-device-screen"><span className="adb-screen-orbit" /><span className="adb-screen-line" /></span></div>
      <div className="adb-side"><p className="demo-device-name"><span className="demo-status-dot" data-on={connected} />{text.device}</p><p className="demo-status" role="status" aria-live="polite">{status}</p>
        {phase === "captured" && <div className="adb-capture"><span className="adb-thumbnail" aria-hidden="true"><i /><b /></span><span>{text.preview}</span></div>}
        <div className="demo-actions"><button className="primary-link" type="button" disabled={phase === "connecting" || phase === "capturing"} onClick={() => setPhase(connected ? "capturing" : "connecting")}>{connected ? phase === "captured" ? text.again : text.capture : text.connect}</button></div>
      </div>
    </div>
  </DemoFrame>;
}

const mcpCopy = {
  en: { hint: "See the call", title: "A request through the trace", client: "Client", recorder: "Trace", server: "Server", idle: "Ready for a tool call", request: "Client sends a request…", recorded: "Trace records the request…", serverStep: "Server handles the call…", reply: "Response passes through the trace…", done: "Tool result returned", failed: "Tool error recorded and returned", error: "Show an error", run: "Run request", again: "Run again", busy: "Calling…", details: "View request and response", requestLabel: "Request", responseLabel: "Response" },
  zh: { hint: "看看如何运作", title: "沿着调用记录走一遍", client: "客户端", recorder: "记录层", server: "服务端", idle: "准备发起工具调用", request: "客户端发出请求…", recorded: "记录层写入请求…", serverStep: "服务端处理调用…", reply: "响应经过记录层…", done: "工具结果已返回", failed: "工具错误已记录并返回", error: "展示错误", run: "发起请求", again: "再调用一次", busy: "调用中…", details: "查看请求与响应", requestLabel: "请求", responseLabel: "响应" },
} as const;
type McpPhase = "idle" | "request" | "recorded" | "serverStep" | "reply" | "done";
export function McpDemo({ locale, motionEnabled }: DemoProps) {
  const text = mcpCopy[locale];
  const { visible } = useMotionEnvironment();
  const [phase, setPhase] = useState<McpPhase>("idle");
  const [error, setError] = useState(false);
  const [runError, setRunError] = useState(false);
  const busy = phase !== "idle" && phase !== "done";
  useEffect(() => {
    if (!visible || !busy) return;
    const timer = window.setTimeout(() => setPhase((current) => ({ request: "recorded", recorded: "serverStep", serverStep: "reply", reply: "done" } as Partial<Record<McpPhase, McpPhase>>)[current] ?? current), 600);
    return () => window.clearTimeout(timer);
  }, [phase, busy, visible]);
  const status = phase === "done" ? runError ? text.failed : text.done : text[phase];
  const response = runError ? '{"jsonrpc":"2.0","id":1,"error":{"code":-32603,"message":"Tool unavailable"}}' : '{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"Hello"}]}}';
  return <DemoFrame title={text.title} hint={text.hint} motionEnabled={motionEnabled}>
    <div className="mcp-route" data-phase={phase} aria-hidden="true"><span>{text.client}</span><i /><span>{text.recorder}</span><i /><span>{text.server}</span></div>
    <p className="demo-status" role="status" aria-live="polite">{status}</p>
    <div className="demo-actions"><label className="demo-check"><input type="checkbox" checked={error} disabled={busy} onChange={(event) => setError(event.target.checked)} />{text.error}</label><button type="button" className="primary-link" disabled={busy} onClick={() => { setRunError(error); setPhase("request"); }}>{busy ? text.busy : phase === "done" ? text.again : text.run}</button></div>
    {phase === "done" && <details className="mcp-details"><summary>{text.details}</summary><div><p>{text.requestLabel}</p><pre>{'{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"greet"}}'}</pre><p>{text.responseLabel}</p><pre>{response}</pre></div></details>}
  </DemoFrame>;
}

const transferCopy = {
  en: { hint: "Try it", title: "Pause and resume a file", file: "sample.txt", ready: "Ready to transfer", sending: "Sending chunk", paused: "Transfer paused after chunk", verifying: "Checking file hash…", done: "All chunks received · hash matches", start: "Start transfer", pause: "Pause", resume: "Resume", again: "Send again", chunks: "chunks" },
  zh: { hint: "试一试", title: "暂停，再接着传文件", file: "sample.txt", ready: "准备传输", sending: "正在发送第", paused: "已在第", verifying: "正在校验文件摘要…", done: "分块已收齐 · 摘要一致", start: "开始传输", pause: "暂停", resume: "继续", again: "再传一次", chunks: "个分块" },
} as const;
type TransferPhase = "idle" | "sending" | "paused" | "verifying" | "done";
export function TransferDemo({ locale, motionEnabled }: DemoProps) {
  const text = transferCopy[locale];
  const { visible } = useMotionEnvironment();
  const [phase, setPhase] = useState<TransferPhase>("idle");
  const [chunks, setChunks] = useState(0);
  useEffect(() => {
    if (!visible || (phase !== "sending" && phase !== "verifying")) return;
    const timer = window.setTimeout(() => {
      if (phase === "verifying") setPhase("done");
      else if (chunks === 3) { setChunks(4); setPhase("verifying"); }
      else setChunks((count) => count + 1);
    }, 850);
    return () => window.clearTimeout(timer);
  }, [phase, chunks, visible]);
  const status = phase === "idle" ? text.ready : phase === "paused" ? locale === "zh" ? `${text.paused} ${chunks} 个分块后暂停` : `${text.paused} ${chunks}` : phase === "sending" ? locale === "zh" ? `${text.sending} ${chunks + 1} 个分块…` : `${text.sending} ${chunks + 1}…` : text[phase];
  function action() {
    if (phase === "sending") setPhase("paused");
    else if (phase === "paused") setPhase("sending");
    else { setChunks(0); setPhase("sending"); }
  }
  const actionLabel = phase === "sending" ? text.pause : phase === "paused" ? text.resume : phase === "done" ? text.again : text.start;
  return <DemoFrame title={text.title} hint={text.hint} motionEnabled={motionEnabled}>
    <div className="transfer-file"><span className="transfer-file-icon" aria-hidden="true">TXT</span><div><strong>{text.file}</strong><small>4 {text.chunks}</small></div><span className="transfer-count">{chunks}/4</span></div>
    <div className="transfer-track" role="progressbar" aria-label={text.file} aria-valuemin={0} aria-valuemax={4} aria-valuenow={chunks}><span style={{ width: `${chunks * 25}%` }} /></div>
    <p className="demo-status" role="status" aria-live="polite">{status}</p>
    <div className="demo-actions"><button type="button" className="primary-link" disabled={phase === "verifying"} onClick={action}>{actionLabel}</button></div>
  </DemoFrame>;
}

const chatCopy = {
  en: { hint: "Try it", title: "Send a note into the conversation", placeholder: "Write a short note", label: "Your note", send: "Send", sending: "Sending…", ready: "Write a note to start", arrived: "Note arrived in the preview", conversation: "Conversation preview", sample: "Example conversation", hello: "Hello there 👋" },
  zh: { hint: "试一试", title: "写张纸条，送进会话", placeholder: "写一句话", label: "纸条内容", send: "发送", sending: "发送中…", ready: "写一句话试试", arrived: "纸条已送达预览会话", conversation: "会话预览", sample: "示例会话", hello: "你好呀 👋" },
} as const;
export function ChatDemo({ locale, motionEnabled }: DemoProps) {
  const text = chatCopy[locale];
  const { visible } = useMotionEnvironment();
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState<string | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  useEffect(() => {
    if (!visible || pending === null) return;
    const timer = window.setTimeout(() => { setMessages((current) => [...current.slice(-2), pending]); setPending(null); }, 700);
    return () => window.clearTimeout(timer);
  }, [pending, visible]);
  function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const note = draft.trim();
    if (!note || pending !== null) return;
    setPending(note);
    setDraft("");
  }
  return <DemoFrame title={text.title} hint={text.hint} motionEnabled={motionEnabled}>
    <div className="chat-playground"><div className="chat-window"><p>{text.conversation} <span>· {text.sample}</span></p><div className="chat-bubble chat-bubble--received">{text.hello}</div>{messages.map((message, index) => <div className="chat-bubble chat-bubble--sent" key={`${index}-${message}`}>{message}</div>)}</div>{pending !== null && <div className="chat-note-flight" aria-hidden="true">{pending}</div>}</div>
    <p className="demo-status" role="status" aria-live="polite">{pending !== null ? text.sending : messages.length ? text.arrived : text.ready}</p>
    <form className="chat-form" onSubmit={send}><label className="sr-only" htmlFor="chat-demo-input">{text.label}</label><input id="chat-demo-input" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={text.placeholder} maxLength={120} /><button className="primary-link" type="submit" disabled={!draft.trim() || pending !== null}>{text.send}</button></form>
  </DemoFrame>;
}
