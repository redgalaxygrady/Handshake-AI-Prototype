
import { Interaction, ErrorType } from './types';

export const INTERACTIONS: Interaction[] = [
  {
    id: 1,
    aiResponse: "The flight was delayed because passengers boarded too early, which slowed down the plane’s ability to take off.",
    prompt: "What kind of failure is this?",
    choices: [ErrorType.REASONING, ErrorType.RECALL],
    correctChoice: ErrorType.REASONING,
    reveal: {
      highlightText: "because passengers boarded too early",
      label: "Reasoning breaks here",
      explanation: "Boarding time does not causally affect an aircraft’s ability to take off.",
      definitions: {
        reasoning: "The model has the relevant facts but connects them incorrectly, leading to a false conclusion.",
        recall: "The model fails because a basic fact is missing, wrong, or fabricated."
      }
    }
  },
  {
    id: 2,
    aiResponse: "The luggage did not arrive because the suitcase was too heavy to fit inside the airplane.",
    prompt: "What kind of failure is this?",
    choices: [ErrorType.REASONING, ErrorType.RECALL],
    correctChoice: ErrorType.REASONING,
    reveal: {
      highlightText: "because the suitcase was too heavy",
      label: "Reasoning breaks here",
      explanation: "Weight is a real attribute, but it is not causally relevant to whether luggage is loaded."
    }
  },
  {
    id: 3,
    aiResponse: "The hotel reservation was cancelled because the confirmation email was not opened.",
    prompt: "What kind of failure is this?",
    choices: [ErrorType.REASONING, ErrorType.RECALL],
    correctChoice: ErrorType.RECALL,
    reveal: {
      explanation: "Opening an email does not control whether a reservation is cancelled. This is a false description of how the system works."
    }
  },
  {
    id: 4,
    aiResponse: "The passenger missed the connection because the airline updated the schedule after booking.",
    prompt: "Which error is primary?",
    choices: [ErrorType.REASONING, ErrorType.RECALL],
    reveal: {
      explanation: "This example is intentionally ambiguous. The failure could stem from missing context or flawed reasoning about timing. In real evaluation work, cases like this may be flagged rather than force-classified."
    }
  }
];
