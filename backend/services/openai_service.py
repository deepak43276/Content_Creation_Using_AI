import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
)

def generate_blog_content(prompt: str) -> str:
    extra_headers = {
        "HTTP-Referer": os.getenv("OPENROUTER_SITE_URL", ""),
        "X-Title": os.getenv("OPENROUTER_SITE_NAME", ""),
    }
    response = client.chat.completions.create(
        extra_headers=extra_headers,
        model="mistralai/mistral-7b-instruct",
        messages=[
            {"role": "system", "content": "You are a helpful content writer."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=600,
        temperature=0.7,
    )
    return response.choices[0].message.content.strip() 