// Mock AI Service to simulate the structured response we would get from Gemini or OpenAI

export const generateCookingPlan = async (userInput) => {
  // Simulate network delay for a more realistic feel
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // In a real implementation, we would send userInput to the AI API
  // and request a structured JSON response.

  const budget = parseFloat(userInput.budget) || 50;
  
  // Calculate a mock estimated cost based on the budget
  const estimatedCost = budget * 0.85 + (Math.random() * 10);

  return {
    summary: `Here is a custom meal plan tailored for your ${userInput.dayDescription?.toLowerCase() || 'busy'} day.`,
    meals: {
      breakfast: {
        name: "Quick Oat & Berry Parfait",
        time: "5 mins",
        calories: "350 kcal",
        ingredients: ["Oats", "Greek Yogurt", "Mixed Berries", "Honey"]
      },
      lunch: {
        name: "Power Quinoa Salad Bowl",
        time: "15 mins",
        calories: "500 kcal",
        ingredients: ["Quinoa", "Spinach", "Cherry Tomatoes", "Feta Cheese", "Olive Oil"]
      },
      dinner: {
        name: "One-Pan Lemon Herb Chicken",
        time: "30 mins",
        calories: "650 kcal",
        ingredients: ["Chicken Breast", "Lemon", "Rosemary", "Broccoli", "Potatoes"]
      }
    },
    groceries: [
      { item: "Oats", category: "Pantry", substitution: "Chia seeds" },
      { item: "Greek Yogurt", category: "Dairy", substitution: "Coconut yogurt" },
      { item: "Mixed Berries", category: "Produce", substitution: "Banana" },
      { item: "Quinoa", category: "Pantry", substitution: "Brown rice" },
      { item: "Spinach", category: "Produce", substitution: "Kale" },
      { item: "Chicken Breast", category: "Meat", substitution: "Tofu (Vegetarian)" }
    ],
    budgetAnalysis: {
      allocated: budget,
      estimated: estimatedCost,
      status: estimatedCost > budget ? "danger" : (estimatedCost > budget * 0.9 ? "warning" : "success"),
      message: estimatedCost > budget 
        ? "Warning: This plan slightly exceeds your budget. Consider substitutions."
        : "Great! This plan fits comfortably within your budget."
    }
  };
};
