

export interface todo { title: string, description: string, done: boolean, tags: number[], id: string };

export type categoryType = 'all' | 'work' | 'entertainment' | 'study' | 'family' | string

export interface category { type: categoryType, color: string, id: number };

