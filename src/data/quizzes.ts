
import { Quiz } from "@/types/quiz";

export const quizzes: Quiz[] = [
  {
    id: "personality",
    title: "What's Your Personality Type?",
    description: "Discover what kind of personality you have!",
    image: "/placeholder.svg",
    questions: [
      {
        id: "q1",
        text: "How do you prefer to spend your weekend?",
        options: [
          { id: "q1a", text: "With a large group of friends", points: 5 },
          { id: "q1b", text: "With one or two close friends", points: 3 },
          { id: "q1c", text: "Alone with a good book or movie", points: 1 }
        ]
      },
      {
        id: "q2",
        text: "When faced with a difficult decision, you usually:",
        options: [
          { id: "q2a", text: "Follow your heart and intuition", points: 1 },
          { id: "q2b", text: "Make a list of pros and cons", points: 5 },
          { id: "q2c", text: "Ask friends or family for advice", points: 3 }
        ]
      },
      {
        id: "q3",
        text: "In a team project, which role do you naturally take?",
        options: [
          { id: "q3a", text: "Leader who organizes everything", points: 5 },
          { id: "q3b", text: "Contributor with creative ideas", points: 3 },
          { id: "q3c", text: "Supportive team member who helps others", points: 1 }
        ]
      }
    ],
    results: [
      {
        id: "introvert",
        title: "The Thoughtful Introvert",
        description: "You're reflective, analytical, and value deep connections. You recharge by spending time alone and prefer meaningful conversations to small talk.",
        minScore: 3,
        maxScore: 7,
        image: "/placeholder.svg"
      },
      {
        id: "ambivert",
        title: "The Balanced Ambivert",
        description: "You have a healthy mix of introverted and extroverted traits. You're adaptable and can thrive in both social situations and solitude.",
        minScore: 8,
        maxScore: 11,
        image: "/placeholder.svg"
      },
      {
        id: "extrovert",
        title: "The Energetic Extrovert",
        description: "You're outgoing, talkative, and draw energy from social interactions. You love meeting new people and are often the life of the party!",
        minScore: 12,
        maxScore: 15,
        image: "/placeholder.svg"
      }
    ]
  },
  {
    id: "food",
    title: "What Food Matches Your Personality?",
    description: "Find out which food represents you!",
    image: "/placeholder.svg",
    questions: [
      {
        id: "q1",
        text: "How would you describe your ideal day?",
        options: [
          { id: "q1a", text: "Relaxing at home with comfort and familiarity", points: 1 },
          { id: "q1b", text: "Trying something new and exciting", points: 5 },
          { id: "q1c", text: "A balance of adventure and downtime", points: 3 }
        ]
      },
      {
        id: "q2",
        text: "How do your friends describe you?",
        options: [
          { id: "q2a", text: "Reliable and comforting", points: 1 },
          { id: "q2b", text: "Complex and layered", points: 3 },
          { id: "q2c", text: "Bold and spicy", points: 5 }
        ]
      },
      {
        id: "q3",
        text: "What's your approach to life's challenges?",
        options: [
          { id: "q3a", text: "I face them head-on with energy", points: 5 },
          { id: "q3b", text: "I adapt and find creative solutions", points: 3 },
          { id: "q3c", text: "I take my time to carefully work through them", points: 1 }
        ]
      }
    ],
    results: [
      {
        id: "comfort",
        title: "Comfort Food: Mac & Cheese",
        description: "You're reliable, comforting, and make everyone around you feel at ease. Just like mac & cheese, you're a classic that everyone loves!",
        minScore: 3,
        maxScore: 7,
        image: "/placeholder.svg"
      },
      {
        id: "balanced",
        title: "Balanced Meal: Stir Fry",
        description: "You're adaptable and well-rounded with different layers to your personality. Like a good stir fry, you bring a balance of flavors to life!",
        minScore: 8,
        maxScore: 11,
        image: "/placeholder.svg"
      },
      {
        id: "spicy",
        title: "Spicy Dish: Hot Curry",
        description: "You're bold, exciting, and leave a lasting impression. Like a spicy curry, you bring heat and energy to every situation!",
        minScore: 12,
        maxScore: 15,
        image: "/placeholder.svg"
      }
    ]
  }
];

export function getQuizById(id: string): Quiz | undefined {
  return quizzes.find(quiz => quiz.id === id);
}
