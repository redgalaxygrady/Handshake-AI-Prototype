
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
      label: "Reasoning failure",
      decisiveSignal: "The facts are fine, but the causal link is invalid.",
      explanation: "Boarding time does not causally affect an aircraft’s ability to take off."
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
      label: "Reasoning failure",
      decisiveSignal: "The facts are fine, but the causal link is invalid.",
      explanation: "Weight is a real attribute, but it is not causally relevant to whether luggage is loaded."
    }
  },
  {
    id: 3,
    label: "Quick check",
    aiResponse: "The hotel reservation was cancelled because the hotel system deletes bookings automatically if the confirmation email is not opened within 24 hours.",
    prompt: "What kind of failure is this?",
    choices: [ErrorType.REASONING, ErrorType.RECALL],
    correctChoice: ErrorType.RECALL,
    reveal: {
      highlightText: "deletes bookings automatically if the confirmation email is not opened",
      label: "Recall failure",
      decisiveSignal: "The key fact is wrong or invented.",
      explanation: "Hotel booking systems do not cancel reservations based on whether a confirmation email is opened. This describes a fabricated system rule."
    }
  },
  {
    id: 4,
    label: "Borderline case",
    aiResponse: "The passenger missed the connection because the airline updated the schedule after booking.",
    prompt: "Why is this case difficult to classify?",
    choices: [], // Reflection only
    reveal: {
      highlightText: "airline updated the schedule after booking",
      label: "Classification ambiguity",
      decisiveSignal: "The signal is insufficient to determine the failure type.",
      explanation: "This example is intentionally ambiguous. The explanation could reflect missing contextual information or an unclear causal relationship. The key point is recognizing when a response does not cleanly fit a single failure category."
    }
  }
];
