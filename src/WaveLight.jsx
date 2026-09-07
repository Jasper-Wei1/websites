import { useEffect, useRef, useState } from 'react';
import { vertexShader, fragmentShader } from './wave-field.js';

export function WaveLight({ paused }) {
  const ref = useRef(null), pausedRef = useRef(paused), wake = useRef(() => {});
  const [epoch, setEpoch] = useState(0);
  useEffect(() => { pausedRef.current = paused; wake.current(); }, [paused]);
  useEffect(() => {
    const canvas = ref.current, hero = canvas.closest('.hero');
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, powerPreference: 'low-power' });
    if (!gl) return;
    let program, buffer, texture, frame = 0, time = 0, last = 0, visible = true, destroyed = false;
    const shaders = [];
    try {
      const compile = (type, source) => {
        const shader = gl.createShader(type);
        shaders.push(shader); gl.shaderSource(shader, source); gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
        return shader;
      };
      program = gl.createProgram();
      gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexShader));
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentShader));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
      gl.useProgram(program);
      buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      texture = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    } catch (error) {
      console.warn('Live light unavailable; using the static cover.', error);
      shaders.forEach(shader => gl.deleteShader(shader));
      if (program) gl.deleteProgram(program);
      if (buffer) gl.deleteBuffer(buffer);
      if (texture) gl.deleteTexture(texture);
      return;
    }
    const resolution = gl.getUniformLocation(program, 'u_resolution'), clock = gl.getUniformLocation(program, 'u_time');
    const mask = document.createElement('canvas');
    const paint = () => {
      if (destroyed || gl.isContextLost()) return;
      gl.uniform1f(clock, time); gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    const tick = timestamp => {
      frame = 0;
      if (destroyed || document.hidden || !visible || pausedRef.current || gl.isContextLost()) { last = 0; return; }
      if (last) time += Math.min((timestamp - last) / 1000, 0.05);
      last = timestamp; paint(); frame = requestAnimationFrame(tick);
    };
    const schedule = () => {
      cancelAnimationFrame(frame); frame = 0; last = 0;
      paint();
      if (!document.hidden && visible && !pausedRef.current && !destroyed && !gl.isContextLost()) frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      if (destroyed || gl.isContextLost()) return;
      const word = hero.querySelector('h1.wordmark');
      if (!word) return;
      const bounds = hero.getBoundingClientRect(), textBounds = word.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5, Math.sqrt(2400000 / (bounds.width * bounds.height)));
      canvas.width = mask.width = Math.max(1, Math.round(bounds.width * ratio));
      canvas.height = mask.height = Math.max(1, Math.round(bounds.height * ratio));
      const ctx = mask.getContext('2d'), style = getComputedStyle(word), size = parseFloat(style.fontSize);
      ctx.font = '400 ' + size + 'px Anton';
      const metrics = ctx.measureText('JASPER');
      const spacing = parseFloat(style.letterSpacing) || 0;
      const naturalWidth = [...'JASPER'].reduce((sum, letter) => sum + ctx.measureText(letter).width + spacing, 0);
      const ascent = metrics.fontBoundingBoxAscent ?? size * 1.1;
      const descent = metrics.fontBoundingBoxDescent ?? size * 0.3;
      const baseline = (size - ascent - descent) / 2 + ascent + parseFloat(style.paddingTop);
      ctx.scale(ratio, ratio);
      ctx.translate(textBounds.left - bounds.left, textBounds.top - bounds.top);
      ctx.scale(textBounds.width / naturalWidth, 1);
      ctx.fillStyle = '#fff';
      let x = 0;
      for (const letter of 'JASPER') { ctx.fillText(letter, x, baseline); x += ctx.measureText(letter).width + spacing; }
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, mask);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolution, canvas.width, canvas.height);
      paint(); hero.classList.add('wave-ready'); canvas.dataset.renderer = 'live-wave'; schedule();
    };
    const observer = new ResizeObserver(resize); observer.observe(hero);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); }); intersection.observe(hero);
    const lost = event => { event.preventDefault(); cancelAnimationFrame(frame); hero.classList.remove('wave-ready'); canvas.dataset.renderer = 'fallback'; };
    const restored = () => setEpoch(value => value + 1);
    canvas.addEventListener('webglcontextlost', lost); canvas.addEventListener('webglcontextrestored', restored);
    document.addEventListener('visibilitychange', schedule);
    document.fonts.ready.then(resize); wake.current = schedule;
    return () => {
      destroyed = true; cancelAnimationFrame(frame); wake.current = () => {};
      observer.disconnect(); intersection.disconnect(); hero.classList.remove('wave-ready');
      document.removeEventListener('visibilitychange', schedule);
      canvas.removeEventListener('webglcontextlost', lost); canvas.removeEventListener('webglcontextrestored', restored);
      gl.deleteTexture(texture); gl.deleteBuffer(buffer); gl.deleteProgram(program); shaders.forEach(shader => gl.deleteShader(shader));
    };
  }, [epoch]);
  return <canvas ref={ref} className="wave-canvas" aria-hidden="true" />;
}
