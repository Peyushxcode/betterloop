import { useEffect, useState } from "react";
import API from "../services/api";

function DashboardPage() {

  const [plan, setPlan] = useState(null);

  useEffect(() => {

    const fetchPlan = async () => {

      try {
        const userId = localStorage.getItem("userId");
        const res = await API.get(`/plan/${userId}`);

        setPlan(res.data);

      } catch (error) {

        console.error("Failed to fetch plan");

      }

    };

    fetchPlan();

  }, []);

  if (!plan) {
    return <h2>Loading your recovery plan...</h2>;
  }

  return (

    <div>

      <h2>Your Recovery Plan</h2>

      <h3>Motivation</h3>
      <p>{plan.motivation}</p>

      <h3>Good Habit</h3>
      <p>{plan.goodHabit}</p>

      <h3>Plan Steps</h3>

      <ul>
        {plan.planSteps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>

    </div>

  );

}

export default DashboardPage;