// Build/Cut persona shared between the hero toggle and the WebGL scene, outside React so the
// render loop can read it every frame without re-rendering.
export type Persona = 'build' | 'cut';

let current: Persona = 'build';

export const persona = {
  get: () => current,
  set: (next: Persona) => {
    current = next;
  },
};
