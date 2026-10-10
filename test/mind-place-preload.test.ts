import { afterEach, expect, it, vi } from 'vitest';

const { expose } = vi.hoisted(() => ({ expose: vi.fn() }));

vi.mock('electron', () => ({
  contextBridge: { exposeInMainWorld: expose },
  ipcRenderer: { invoke: vi.fn(), on: vi.fn(), removeListener: vi.fn() },
  webUtils: { getPathForFile: vi.fn() }
}));

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
  expose.mockReset();
});

it('tells the renderer when the app was launched as Mind Place', async () => {
  vi.stubEnv('MIND_PLACE_MODE', '1');

  await import('../src/preload/index.js');

  const api = expose.mock.calls[0]![1];
  expect(api.productMode).toBe('mind-place');
});
