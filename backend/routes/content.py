# content.py
# API routes for content generation (e.g., blog, script, tweet).
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from services.openai_service import generate_blog_content

router = APIRouter()

class BlogRequest(BaseModel):
    seo_topic: str
    tone: str
    target_audience: str

@router.post('/generate/blog')
def generate_blog(blog_req: BlogRequest):
    try:
        content = generate_blog_content(
            seo_topic=blog_req.seo_topic,
            tone=blog_req.tone,
            target_audience=blog_req.target_audience
        )
        return {"content": content}
    except Exception as e:
        import traceback
        print("ERROR in /generate/blog:", e)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.post('/generate/content')
async def generate_content(request: Request):
    try:
        data = await request.json()
        content_type = data.get('content_type', 'blog')
        # Build prompt based on content type
        if content_type == 'blog':
            prompt = f"Write a blog post about '{data.get('seo_topic')}' in a {data.get('tone')} tone for {data.get('target_audience')}."
        elif content_type == 'tweet':
            prompt = f"Write a Twitter thread about '{data.get('topic')}' with a {data.get('hook_style')} hook and {data.get('thread_depth')} depth."
        elif content_type == 'ad':
            prompt = f"Write an ad with USP '{data.get('usp')}', platform '{data.get('platform')}', and CTA '{data.get('cta')}'."
        elif content_type == 'caption':
            prompt = f"Write a social media caption with mood '{data.get('mood')}', hashtags '{data.get('hashtags')}', and target demographic '{data.get('demographic')}'."
        elif content_type == 'newsletter':
            prompt = f"Write a newsletter with sections '{data.get('sections')}', personalization '{data.get('personalization')}', and goal '{data.get('goal')}'."
        else:
            prompt = data.get('prompt', 'Write something creative.')
        content = generate_blog_content(prompt=prompt)
        return {"content": content}
    except Exception as e:
        import traceback
        print("ERROR in /generate/content:", e)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e)) 