import fs from 'node:fs/promises'
import type { LanguageRegistration } from 'shiki'

export const grammarGlob: LanguageRegistration = {
  name: 'glob',
  patterns: [
    { include: '#root' },
  ],
  repository: {
    '$base': undefined!,
    '$self': undefined!,
    'root': {
      patterns: [
        { include: '#star' },
        { include: '#slash' },
        { include: '#bracket-round' },
        { include: '#bracket-square' },
        { include: '#bracket-curly' },
        { include: '#operator' },
      ],
    },
    'star': {
      match: '\\*+',
      name: 'punctuation.definition.glob',
    },
    'operator': {
      match: '[?]',
      name: 'keyword.operator.glob',
    },
    'slash': {
      match: '[/\\\\]+',
      name: 'punctuation.definition.glob',
    },
    'bracket-round': {
      begin: '(\\()',
      beginCaptures: {
        0: { name: 'punctuation.bracket.round.glob' },
      },
      end: '(\\))',
      endCaptures: {
        0: { name: 'punctuation.bracket.round.glob' },
      },
      patterns: [
        { include: '#root' },
      ],
    },
    'bracket-square': {
      begin: '(\\[)',
      beginCaptures: {
        0: { name: 'punctuation.bracket.square.glob' },
      },
      end: '(\\])',
      endCaptures: {
        0: { name: 'punctuation.bracket.square.glob' },
      },
      patterns: [
        {
          match: '-',
          name: 'punctuation.definition.glob',
        },
        {
          match: '[^\\]-]',
          name: 'constant.glob',
        },
      ],
    },
    'bracket-curly': {
      begin: '(\\{)',
      beginCaptures: {
        0: { name: 'punctuation.bracket.curly.glob' },
      },
      end: '(\\})',
      endCaptures: {
        0: { name: 'punctuation.bracket.curly.glob' },
      },
      patterns: [
        {
          match: ',',
          name: 'punctuation.definition.glob',
        },
        {
          match: '[^\\],]',
          name: 'constant.glob',
        },
      ],
    },
    'string': {
      name: 'string.glob',
      match: '.+',
    },
  },
  scopeName: 'text.glob',
}

await fs.mkdir('./grammars', { recursive: true })
await fs.writeFile('./grammars/glob.json', JSON.stringify(grammarGlob, null, 2), 'utf-8')
