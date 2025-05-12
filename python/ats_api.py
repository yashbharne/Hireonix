from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel, ValidationError
from sentence_transformers import SentenceTransformer, util
import uvicorn

app = FastAPI()
model = SentenceTransformer("all-MiniLM-L6-v2")  # Fast & good enough


class TextPair(BaseModel):
    jd: str
    resume: str

# Global error handler for validation errors
@app.exception_handler(ValidationError)
async def validation_exception_handler(request: Request, exc: ValidationError):
    return JSONResponse(
        status_code=422,
        content={"message": "Invalid input format."},
    )

# Global error handler for unexpected errors
@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"message": "Internal Server Error", "error": str(exc)},
    )

@app.post("/score")
def get_ats_score(payload: TextPair):
    try:
        print("fjkdb")
        # payload=TextPair(payload)
        # Validate input explicitly if needed
        if not payload.jd.strip() or not payload.resume.strip():
            raise HTTPException(status_code=400, detail="JD and Resume cannot be empty.")

        # Encode and compute similarity
        jd_embedding = model.encode(payload.jd, convert_to_tensor=True)
        resume_embedding = model.encode(payload.resume, convert_to_tensor=True)
        similarity = util.pytorch_cos_sim(jd_embedding, resume_embedding).item()
        score = round(similarity * 100, 2)

        return {"ats_score": score}

    except HTTPException as he:
        print("Hello guys")
        raise he  # Let FastAPI handle it as an HTTP error

    except Exception as e:
        print("Hello guys 2")
        raise HTTPException(status_code=500, detail=f"Error computing ATS score: {str(e)}")
