export type ProductMode = 'cos' | 'mind-place';

export function productModeFromEnvironment(value: string | undefined): ProductMode {
  return value === '1' ? 'mind-place' : 'cos';
}

export function mindPlaceMode(value: string | undefined): boolean {
  return productModeFromEnvironment(value) === 'mind-place';
}
