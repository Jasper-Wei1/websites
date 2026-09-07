// Original time-varying light field. Different phase velocities change the
// wave's shape; this is not a translated texture or a recording of the source.
export const vertexShader = `
attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`;

export const fragmentShader = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_mask;
float grain(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void main() {
  vec2 uv = vec2(gl_FragCoord.x, u_resolution.y - gl_FragCoord.y) / u_resolution;
  float t = u_time;
  float warp = 0.075 * sin(uv.x * 7.1 + t * 0.23);
  float wave = 0.70
    + 0.13 * sin((uv.x + warp) * 5.6 - t * 0.42)
    + 0.075 * sin(uv.x * 10.4 + t * 0.31 + 1.8)
    + 0.035 * sin(uv.x * 2.9 - t * 0.67);
  float d = uv.y - wave;
  float front = smoothstep(-0.13, 0.09, d);
  float rim = exp(-pow((d - 0.025) / 0.115, 2.0));
  float core = exp(-pow((d - 0.07) / 0.085, 2.0));
  float mask = texture2D(u_mask, uv).a;
  vec3 outside = vec3(0.008) + vec3(0.72, 0.009, 0.002) * front;
  outside += vec3(0.28, 0.035, 0.01) * rim;
  vec3 letters = mix(vec3(0.035, 0.022, 0.024), vec3(0.97, 0.30, 0.22), front);
  letters = mix(letters, vec3(1.0, 0.71, 0.48), rim * 0.90);
  letters = mix(letters, vec3(1.0, 0.85, 0.76), core * 0.65);
  vec3 color = mix(outside, letters, mask);
  float noise = (grain(gl_FragCoord.xy) - 0.5) * 0.065;
  color += noise * (rim + front * 0.25);
  // Keep the metadata region in quiet black regardless of wave phase.
  color *= smoothstep(0.26, 0.43, uv.y);
  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;

export function waveHeight(x, time) {
  const warp = 0.075 * Math.sin(x * 7.1 + time * 0.23);
  return 0.70 + 0.13 * Math.sin((x + warp) * 5.6 - time * 0.42)
    + 0.075 * Math.sin(x * 10.4 + time * 0.31 + 1.8)
    + 0.035 * Math.sin(x * 2.9 - time * 0.67);
}

export function parallaxOffset(scroll, height, reduced = false, mobile = false) {
  if (reduced) return 0;
  return Math.max(0, Math.min(scroll, height)) * (mobile ? 0.24 : 0.40);
}
