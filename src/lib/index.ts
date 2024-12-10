import { type PluginOptions, type Plugin, defaultPluginOptions, access } from '@neokit-dev/core';
import sqlstring from 'sqlstring';

export const id = 'dev.neokit.relational';
export const defaultNamespace = 'relational';
export const apiVersion = 2;
export const version = 1;

export class RelationalPlugin {
	queryFn: (query: string) => Promise<Record<string, unknown>[]>;
	stringifyObjects: boolean;
	timezone: string;

	constructor(options: RelationalPluginOptions) {
		this.queryFn = options.queryFn;
		this.stringifyObjects = options.stringifyObjects ?? true;
		this.timezone = options.timezone ?? 'local';
	}

	query(q: string, ...p: unknown[]): Promise<Record<string, unknown>[]> {
		return this.queryFn(sqlstring.format(q, p, this.stringifyObjects, this.timezone));
	}
}

export interface RelationalPluginOptions extends PluginOptions {
	queryFn: (query: string) => Promise<Record<string, unknown>[]>;
	stringifyObjects?: boolean;
	timezone?: string;
}

export function plugin(options: RelationalPluginOptions): Plugin {
	return {
		id,
		version,
		apiVersion,
		plugin: new RelationalPlugin(options),
		...defaultPluginOptions(options, { namespace: defaultNamespace })
	};
}

export function query(q: string, ...p: unknown[]): Promise<Record<string, unknown>[]> {
	return namespace(defaultNamespace).query(q, ...p);
}

export function namespace(namespace: string): RelationalPlugin {
  return access(id)[namespace].plugin as RelationalPlugin;
}
