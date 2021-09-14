

export interface ITodo { title: string, description: string, done: boolean, tags: number[], id: string };

export type ICategoryType = 'all' | 'work' | 'entertainment' | 'study' | 'family' | string

export interface ICategory { type: ICategoryType, color: string, id: number };

