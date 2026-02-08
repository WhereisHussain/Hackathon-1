import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class RoboticsSkills:
    @staticmethod
    def explain_code(code_snippet: str):
        """Skill: Specifically explain robotics-oriented code (ROS2, Python control loops)."""
        prompt = f"Explain this robotics code snippet clearly, focusing on the kinematic or control logic involved:\n\n{code_snippet}"
        response = openai_client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "system", "content": "You are a robotics expert."}, {"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content

    @staticmethod
    def solve_kinematics(problem_description: str):
        """Skill: Help solve rigid body kinematics problems."""
        prompt = f"Help the student solve this kinematics problem step-by-step:\n\n{problem_description}"
        response = openai_client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "system", "content": "You are a physics and robotics tutor."}, {"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content

    @staticmethod
    def summarize_chapter(content: str):
        """Skill: Generate a concise summary and key takeaways for a chapter."""
        prompt = f"Summarize this chapter content and list 3-5 key takeaways for a student:\n\n{content}"
        response = openai_client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content
