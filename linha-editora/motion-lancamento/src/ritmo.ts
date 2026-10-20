// Velocidade geral do vídeo: 1 = original; 1.5 = 50% mais lento. Todas as animações e durações usam este valor.
export const LENTO = 1.5;
export const dur = (quadros: number) => Math.round(quadros * LENTO);
