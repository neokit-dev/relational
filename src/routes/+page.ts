import { plugin, query } from '$lib/index.js';
import { init, load as loadPlugin } from '@neokit-dev/core';

init();
loadPlugin(plugin({
  queryFn: async (query: string): Promise<Record<string, unknown>[]> => {
    return [{ query }]; // not really a database, but you get the idea
  }
}));

export async function load() {
  const result = (await query('SELECT * FROM table1 WHERE id = ?', 'abcd')) as { query: string }[];
  
  return {
    result
  }
}