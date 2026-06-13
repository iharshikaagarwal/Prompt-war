import React, { useState } from 'react';
import { ChefHat, Loader2, UtensilsCrossed, CalendarDays, ShoppingCart, DollarSign, RefreshCw, CheckCircle2 } from 'lucide-react';
import { generateCookingPlan } from './services/ai';

function App() {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [formData, setFormData] = useState({
    dayDescription: '',
    budget: '',
    dietary: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await generateCookingPlan(formData);
      setPlan(result);
    } catch (error) {
      console.error("Failed to generate plan", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="header animate-fade-in">
        <h1>
          <ChefHat className="inline-block mr-3 mb-2" size={40} />
          AI Cooking Assistant
        </h1>
        <p>Plan your meals, manage your groceries, and stay within budget instantly.</p>
      </header>

      <div className="card animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <h2 className="card-title">
          <CalendarDays className="text-primary-color" />
          Tell me about your day
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">How's your day looking?</label>
            <textarea 
              className="form-textarea" 
              name="dayDescription"
              value={formData.dayDescription}
              onChange={handleInputChange}
              rows="3"
              placeholder="e.g., Working late until 7 PM, need quick meals..."
              required
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Daily Budget ($)</label>
              <input 
                type="number" 
                className="form-input" 
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                placeholder="e.g., 30"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Dietary Restrictions</label>
              <input 
                type="text" 
                className="form-input" 
                name="dietary"
                value={formData.dietary}
                onChange={handleInputChange}
                placeholder="e.g., Vegetarian, No nuts"
              />
            </div>
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : <UtensilsCrossed />}
            {loading ? 'Generating Your Plan...' : 'Generate Plan'}
          </button>
        </form>
      </div>

      {plan && (
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          
          <div className="card">
            <h2 className="card-title">
              <UtensilsCrossed className="text-primary-color" />
              Your Meal Plan
            </h2>
            <div className="meal-grid">
              {Object.entries(plan.meals).map(([type, details]) => (
                <div key={type} className="meal-card">
                  <span className="meal-type">{type}</span>
                  <h3 className="meal-name">{details.name}</h3>
                  <ul className="meal-details">
                    <li><strong>Time:</strong> {details.time}</li>
                    <li><strong>Calories:</strong> {details.calories}</li>
                    <li><strong>Core Ingredients:</strong> {details.ingredients.join(', ')}</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
            
            <div className="card">
              <h2 className="card-title">
                <ShoppingCart className="text-primary-color" />
                Grocery List
              </h2>
              <ul className="todo-list">
                {plan.groceries.map((item, index) => (
                  <li key={index} className="todo-item">
                    <CheckCircle2 className="text-border-color" />
                    <div className="todo-text">
                      <div style={{ fontWeight: '600' }}>{item.item}</div>
                      <div className="todo-sub">
                        <RefreshCw size={12} className="inline mr-1" />
                        Sub: {item.substitution}
                      </div>
                    </div>
                    <span style={{ fontSize: '0.8rem', background: 'var(--background-color)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                      {item.category}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h2 className="card-title">
                <DollarSign className="text-primary-color" />
                Budget Feasibility
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                {plan.budgetAnalysis.message}
              </p>
              
              <div className="budget-bar-container">
                <div 
                  className={`budget-bar ${plan.budgetAnalysis.status}`}
                  style={{ 
                    width: `${Math.min(100, (plan.budgetAnalysis.estimated / plan.budgetAnalysis.allocated) * 100)}%` 
                  }}
                />
              </div>
              
              <div className="budget-stats">
                <span><strong>Estimated:</strong> ${plan.budgetAnalysis.estimated.toFixed(2)}</span>
                <span><strong>Budget:</strong> ${plan.budgetAnalysis.allocated.toFixed(2)}</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default App;
