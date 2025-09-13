// src/types/ibge.ts
export interface Regiao {
  id: number;
  sigla: string;
  nome: string;
}

export interface Estado {
  id: number;
  sigla: string;
  nome: string;
  regiao: Regiao;
}

export interface Municipio {
  id: number;
  nome: string;
}

// Reexport explícito (ajuda o TS a “enxergar” os named exports)
export type { Regiao as TRegiao, Estado as TEstado, Municipio as TMunicipio };
