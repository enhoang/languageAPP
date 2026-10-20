import type { TopicId, WordType } from '../types';

/** Display order. Labels: dictionary keys `common.wordType.<type>`. */
export const WORD_TYPES: WordType[] = ['noun', 'pronoun', 'verb', 'adjective', 'adverb', 'number', 'particle', 'determiner', 'preposition', 'conjunction', 'interjection', 'phrase', 'proper-noun'];

/** Display order. Labels: dictionary keys `common.topic.<topic>`. */
export const TOPICS: TopicId[] = ['basics', 'greetings', 'people', 'family', 'numbers', 'time', 'food', 'places', 'school', 'daily', 'feelings', 'countries', 'nature', 'questions'];
