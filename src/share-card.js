import { TEST_PUBLIC_URL } from "./data.js";

const CARD_WIDTH = 1080;
const CARD_HEIGHT = 1920;
const GEMINI_LOCKUP = "./assets/gemini/google-gemini-lockup.png";

const themes = {
  baekyang: ["#F5F9FF", "#00256C", "#1F2933"],
  akaraka: ["#EEF5FF", "#003B8E", "#243B5A"],
  gongdae: ["#F4F7FB", "#0057A8", "#263238"],
  space: ["#EAF6F7", "#007C89", "#173F47"],
  specup: ["#FFF8E8", "#00256C", "#4A3A1A"],
  romance: ["#FFF4F0", "#B45309", "#43302A"]
};

export async function generateResultCard(type, matchNames) {
  const canvas = document.querySelector("#share-renderer") ?? document.createElement("canvas");
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const ctx = canvas.getContext("2d");
  const [background, accent, ink] = themes[type.id] ?? themes.baekyang;

  await drawBackground(ctx, type, background, accent, ink);

  drawCenteredText(ctx, "나의 연세대 2학기 생존 독수리는", 540, 1008, 40, ink, "800");
  drawTypeTitle(ctx, type.name, 540, 1096, 820, accent);
  drawWrappedText(ctx, type.oneLiner, 540, 1328, 780, 38, 1.42, ink, "800", "center");

  drawInfoPill(ctx, `찰떡궁합 ${matchNames.good}`, 140, 1460, 800, accent, "#FFFFFF");
  drawInfoPill(ctx, `거리두기 ${matchNames.bad}`, 140, 1552, 800, ink, "#FFFFFF");

  const logo = await loadImage(GEMINI_LOCKUP);
  drawContainedImage(ctx, logo, 330, 1640, 420, 74);

  ctx.fillStyle = ink;
  ctx.font = "700 30px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("대학생·대학원생이라면", 540, 1746);
  ctx.fillStyle = accent;
  ctx.font = "900 42px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillText("Google AI Plus 12개월 무료", 540, 1800);

  ctx.fillStyle = ink;
  ctx.font = "800 36px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillText(TEST_PUBLIC_URL, 540, 1862);

  return canvasToBlob(canvas);
}

export async function saveOrShareResultCard(type, matchNames) {
  const blob = await generateResultCard(type, matchNames);
  const filename = `yonsei-eagle-${type.id}.png`;
  downloadBlob(blob, filename);
  return "downloaded";
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function drawBackground(ctx, type, background, accent, ink) {
  const paper = "#F6FAFF";
  ctx.fillStyle = paper;
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  const image = await loadImage(type.backgroundAsset ?? type.imageAsset);
  drawCoverImage(ctx, image, 0, 0, CARD_WIDTH, CARD_HEIGHT);
  drawVerticalFade(ctx, 800, 1240, paper);

  ctx.globalAlpha = 0.08;
  ctx.fillStyle = ink;
  for (let y = 1430; y < CARD_HEIGHT; y += 190) {
    ctx.fillRect(85, y, 910, 4);
  }
  ctx.globalAlpha = 1;

  ctx.beginPath();
  ctx.roundRect(86, 112, 908, 1778, 44);
  ctx.strokeStyle = accent;
  ctx.lineWidth = 8;
  ctx.stroke();
}

function drawCoverImage(ctx, image, x, y, width, height) {
  const sourceRatio = image.naturalWidth / image.naturalHeight;
  const targetRatio = width / height;
  let sourceX = 0;
  let sourceY = 0;
  let sourceWidth = image.naturalWidth;
  let sourceHeight = image.naturalHeight;

  if (sourceRatio > targetRatio) {
    sourceWidth = image.naturalHeight * targetRatio;
    sourceX = (image.naturalWidth - sourceWidth) / 2;
  } else {
    sourceHeight = image.naturalWidth / targetRatio;
    sourceY = (image.naturalHeight - sourceHeight) / 2;
  }

  ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
}

function drawVerticalFade(ctx, fromY, toY, color) {
  const gradient = ctx.createLinearGradient(0, fromY, 0, toY);
  gradient.addColorStop(0, withAlpha(color, 0));
  gradient.addColorStop(0.46, withAlpha(color, 0.8));
  gradient.addColorStop(1, color);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, fromY, CARD_WIDTH, toY - fromY);
  ctx.fillStyle = color;
  ctx.fillRect(0, toY, CARD_WIDTH, CARD_HEIGHT - toY);
}

function drawInfoPill(ctx, text, x, y, width, fill, textColor) {
  ctx.beginPath();
  ctx.roundRect(x, y, width, 76, 38);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.fillStyle = textColor;
  ctx.font = "800 29px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(text, x + width / 2, y + 49);
}

function drawContainedImage(ctx, image, x, y, width, height) {
  const ratio = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * ratio;
  const drawHeight = image.naturalHeight * ratio;
  ctx.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
}

function drawCenteredText(ctx, text, x, y, size, color, weight = "700") {
  ctx.fillStyle = color;
  ctx.font = `${weight} ${size}px system-ui, -apple-system, BlinkMacSystemFont, sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText(text, x, y);
}

function drawTypeTitle(ctx, name, x, y, maxWidth, color) {
  const { prefix, eagle } = splitEagleTitle(name);
  drawCenteredText(ctx, prefix, x, y, 54, color, "900");
  drawWrappedText(ctx, eagle, x, y + 84, maxWidth, 96, 1.02, color, "900", "center");
}

function drawWrappedText(ctx, text, x, y, maxWidth, size, lineHeight, color, weight, align = "left") {
  ctx.fillStyle = color;
  ctx.font = `${weight} ${size}px system-ui, -apple-system, BlinkMacSystemFont, sans-serif`;
  ctx.textAlign = align;

  const words = text.split(" ");
  const lines = [];
  let line = "";

  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = testLine;
    }
  });
  lines.push(line);

  lines.forEach((wrappedLine, index) => {
    ctx.fillText(wrappedLine, x, y + index * size * lineHeight);
  });
}

function splitEagleTitle(name) {
  const parts = name.trim().split(" ");
  const eagle = parts.splice(-2).join(" ") || name;
  return {
    prefix: parts.join(" "),
    eagle
  };
}

function withAlpha(hex, alpha) {
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("결과 이미지를 만들지 못했습니다."));
    }, "image/png");
  });
}
