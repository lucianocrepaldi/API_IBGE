import type { Estado, Municipio } from "../types/ibge";

const BASE = "https://servicodados.ibge.gov.br/api/v1/localidades";

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`HTTP ${res.status} – ${msg}`);
  }
  return res.json() as Promise<T>;
}

export async function getEstados(): Promise<Estado[]> {
  // ordena alfabeticamente
  return fetchJSON<Estado[]>(`${BASE}/estados?orderBy=nome`);
}

export async function getMunicipiosByEstadoId(estadoId: number): Promise<Municipio[]> {
  return fetchJSON<Municipio[]>(`${BASE}/estados/${estadoId}/municipios`);
}
