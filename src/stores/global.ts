import { createStore, atom } from 'jotai'
export const globalStore = createStore()

export const themeAtom = atom<'dark' | 'light'>('light')
