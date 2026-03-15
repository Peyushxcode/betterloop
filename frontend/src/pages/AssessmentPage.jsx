import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AssessmentPage() {

  const navigate = useNavigate();

  const [addictionType, setAddictionType] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const [goal, setGoal] = useState("");
  const [triggers, setTriggers] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/profile/create", {
        addictionType,
        frequency,
        duration,
        triggers: triggers.split(","),
        goal
      });

      navigate("/dashboard");

    } catch (error) {

      alert("Failed to create profile");

    }

  };

  return (

    <div>

      <h2>Addiction Assessment</h2>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Addiction Type (e.g. social media)"
          value={addictionType}
          onChange={(e)=>setAddictionType(e.target.value)}
        />

        <br/><br/>

        <input
          placeholder="Frequency (e.g. multiple times a day)"
          value={frequency}
          onChange={(e)=>setFrequency(e.target.value)}
        />

        <br/><br/>

        <input
          placeholder="Duration (e.g. 2 years)"
          value={duration}
          onChange={(e)=>setDuration(e.target.value)}
        />

        <br/><br/>

        <input
          placeholder="Triggers (comma separated)"
          value={triggers}
          onChange={(e)=>setTriggers(e.target.value)}
        />

        <br/><br/>

        <input
          placeholder="Goal"
          value={goal}
          onChange={(e)=>setGoal(e.target.value)}
        />

        <br/><br/>

        <button type="submit">
          Generate My Recovery Plan
        </button>

      </form>

    </div>

  );

}

export default AssessmentPage;