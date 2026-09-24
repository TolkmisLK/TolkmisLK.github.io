"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import site from "../content/site.json";
import "./studio-scene.css";

type StudioSceneProps = {
  locale: "en" | "zh";
  motionEnabled: boolean;
  onToggleLamp: () => void;
};

const imageBasePath = new URL(site.identity.siteUrl).pathname.replace(/\/$/, "");

const words = {
  en: {
    workspace: "An illustrated workspace with a green desk lamp, an NCC computer, and a coffee cup",
    lamp: "Toggle the desk lamp and color theme",
    cat: "Say hello to the cat",
    wakeCat: "Wake the sleeping cat",
    lampHint: "Try the lamp",
    catHint: "Meet the cat",
    catResponse: "A little stretch. Hello!",
  },
  zh: {
    workspace: "工作室插画：绿色台灯、显示 NCC 的电脑和咖啡杯",
    lamp: "点击台灯，切换灯光与页面主题",
    cat: "和小猫打招呼",
    wakeCat: "叫醒睡着的小猫",
    lampHint: "点点台灯",
    catHint: "逗逗小猫",
    catResponse: "伸了个懒腰，喵！",
  },
} as const;

export function StudioScene({
  locale,
  motionEnabled,
  onToggleLamp,
}: StudioSceneProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const catTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [catSleeping, setCatSleeping] = useState(false);
  const [catResponding, setCatResponding] = useState(false);
  const [activityVersion, setActivityVersion] = useState(0);
  const copy = words[locale];

  useEffect(() => {
    if (!motionEnabled) return;
    const idleTimer = setTimeout(() => setCatSleeping(true), 12000);
    return () => clearTimeout(idleTimer);
  }, [motionEnabled, activityVersion]);

  useEffect(() => {
    return () => {
      if (catTimerRef.current) clearTimeout(catTimerRef.current);
    };
  }, []);

  function resetCatLook() {
    stageRef.current?.style.setProperty("--studio-look-x", "0px");
    stageRef.current?.style.setProperty("--studio-look-y", "0px");
    stageRef.current?.style.setProperty("--studio-look-angle", "0deg");
  }

  function followPointer(event: PointerEvent<HTMLDivElement>) {
    if (
      !motionEnabled ||
      catSleeping ||
      event.pointerType !== "mouse" ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

    const stage = stageRef.current;
    if (!stage) return;
    const bounds = stage.getBoundingClientRect();
    const catX = bounds.left + bounds.width * 0.775;
    const catY = bounds.top + bounds.height * 0.56;
    const x = Math.max(-1, Math.min(1, (event.clientX - catX) / (bounds.width * 0.5)));
    const y = Math.max(-1, Math.min(1, (event.clientY - catY) / (bounds.height * 0.5)));

    stage.style.setProperty("--studio-look-x", `${(x * 3).toFixed(1)}px`);
    stage.style.setProperty("--studio-look-y", `${(y * 2).toFixed(1)}px`);
    stage.style.setProperty("--studio-look-angle", `${(x * 1.4).toFixed(1)}deg`);
  }

  function greetCat() {
    setCatSleeping(false);
    setCatResponding(true);
    setActivityVersion((version) => version + 1);
    resetCatLook();
    if (catTimerRef.current) clearTimeout(catTimerRef.current);
    catTimerRef.current = setTimeout(() => {
      setCatResponding(false);
      catTimerRef.current = null;
    }, 1900);
  }

  return (
    <figure className="studio-scene" data-motion={motionEnabled ? "on" : "off"}>
      <div
        className="studio-stage"
        ref={stageRef}
        onPointerMove={followPointer}
        onPointerLeave={resetCatLook}
      >
        <Image
          className="studio-workspace-image"
          src={`${imageBasePath}/studio/workspace.webp`}
          alt={copy.workspace}
          loading="eager"
          fill
          sizes="(max-width: 720px) 100vw, 480px"
          unoptimized
        />
        <span className="studio-lamp-glow" aria-hidden="true" />
        <button
          className="studio-lamp-button"
          type="button"
          onClick={onToggleLamp}
          aria-label={copy.lamp}
          title={copy.lamp}
        >
          <span className="studio-lamp-cue" aria-hidden="true">✦</span>
        </button>
        <button
          className="studio-cat-button"
          type="button"
          onClick={greetCat}
          data-sleeping={catSleeping ? "true" : "false"}
          data-responding={catResponding ? "true" : "false"}
          aria-label={catSleeping ? copy.wakeCat : copy.cat}
          title={catSleeping ? copy.wakeCat : copy.cat}
        >
          <Image
            className="studio-cat-image studio-cat-image--awake"
            src={`${imageBasePath}/studio/cat.webp`}
            alt=""
            fill
            sizes="(max-width: 720px) 24vw, 110px"
            unoptimized
          />
          <Image
            className="studio-cat-image studio-cat-image--sleep"
            src={`${imageBasePath}/studio/cat-sleep.webp`}
            alt=""
            fill
            sizes="(max-width: 720px) 24vw, 110px"
            unoptimized
          />
        </button>
        <span className="studio-cat-response" aria-live="polite" aria-atomic="true">
          {catResponding ? copy.catResponse : ""}
        </span>
      </div>
      <figcaption className="studio-scene-caption">
        <span>{copy.lampHint} <span aria-hidden="true">↗</span></span>
        <span>{copy.catHint} <span aria-hidden="true">↗</span></span>
      </figcaption>
    </figure>
  );
}
