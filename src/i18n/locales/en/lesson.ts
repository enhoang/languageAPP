import type vi from '../vi/lesson';
import type { Messages } from '../../messages';

const lesson: Messages<typeof vi> = {
  notFound: 'Lesson not found.',
  backToPath: 'Back to learning path',
  locked: {
    title: 'This lesson is still locked',
    body: 'Finish {{lesson}} first.',
    goTo: 'Go to Day {{day}}',
  },
  completed: 'Completed',
  switching: 'Switching to the {{course}} course…',
  noPrevious: 'Finish the previous lesson first.',
  steps: {
    label: 'Lesson steps',
    goals: 'Goals',
    lesson: 'Lesson',
    practice: 'Practice',
    quiz: 'Quiz',
    summary: 'Summary',
  },
  objectives: 'Lesson goals',
  intro: 'Introduction',
  enterLesson: 'Start the lesson',
  toPractice: 'Practice',
  practice: {
    intro: 'Guided practice: you’ll see an explanation after each question. This part doesn’t count towards completing the lesson.',
    finish: 'Finish practice',
    done: 'Practice done: {{correct}}/{{total}} correct',
    ready: 'Ready for the short quiz? Score at least {{pass}}% to complete the lesson.',
    again: 'Practice again',
    takeQuiz: 'Take the quiz',
    skip: 'Skip and go straight to the quiz',
  },
  quiz: {
    intro_one: 'Knowledge check: {{count}} question · you need at least {{pass}}%.',
    intro_other: 'Knowledge check: {{count}} questions · you need at least {{pass}}%.',
    retake: 'Retake the quiz',
  },
  summary: {
    title: 'Lesson summary',
    bestScore_one: 'Best quiz score: {{score}}% ({{count}} attempt)',
    bestScore_other: 'Best quiz score: {{score}}% ({{count}} attempts)',
    completedTitle: 'You’ve completed Day {{day}}!',
    completedBody: 'The new words from this lesson are now in your review schedule (first review: tomorrow).',
    nextLesson: 'Next lesson: Day {{day}}',
    viewPath: 'View learning path',
    morePractice: 'Practice more',
    hint: 'Tip: one lesson a day, and reviewing due words before starting a new lesson, helps you remember longer.',
    notCompletedTitle: 'Lesson not completed yet',
    notCompletedBody: 'Go back over the lesson and retake the quiz (you need at least {{pass}}%).',
    reviewLesson: 'Review the lesson',
    retakeQuiz: 'Retake the quiz',
  },
};

export default lesson;
